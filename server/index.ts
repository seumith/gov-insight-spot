import express from "express";
import cors from "cors";
import fetch from "node-fetch";
import dotenv from "dotenv";
import { schemes as appSchemes, type Scheme } from "../src/data/schemes";

dotenv.config();
const app = express();
app.use(cors());
app.use(express.json());

// Use full schemes from src/data/schemes.ts for richer answers
const schemes: Scheme[] = appSchemes;

const flatten = (value: unknown): string => {
  if (!value) return "";
  if (Array.isArray(value)) return value.join("; ");
  if (typeof value === "object") return Object.entries(value as Record<string, unknown>)
    .map(([k, v]) => `${k}: ${flatten(v)}`)
    .join("; ");
  return String(value);
};

const schemeSearchText = (s: Scheme): string => {
  return [
    s.title,
    s.description,
    s.fullDescription,
    s.category,
    s.criteria,
    s.benefitAmount,
    s.beneficiaries,
    s.applicationDeadline,
    s.documentsRequired,
    s.applicationProcess,
    s.eligibility,
    s.contactInfo?.phone,
    s.contactInfo?.email,
    s.contactInfo?.website,
  ]
    .map(flatten)
    .filter(Boolean)
    .join(" \n ")
    .toLowerCase();
};

const HF_API_URL = "https://api-inference.huggingface.co/models/google/flan-t5-large";

app.post("/chat", async (req, res) => {
  const userQuery = (req.body?.query ?? "").toString();
  if (!userQuery) return res.status(400).json({ error: "No query provided" });

  const queryLower = userQuery.toLowerCase();
  const keywords = queryLower.split(/\W+/).filter(Boolean);

  const scored = schemes
    .map((scheme) => {
      const haystack = schemeSearchText(scheme);
      let score = 0;
      if (haystack.includes(queryLower)) score += 5;
      for (const kw of keywords) {
        if (kw.length >= 3 && haystack.includes(kw)) score += 1;
      }
      return { scheme, score };
    })
    .filter((s) => s.score > 0)
    .sort((a, b) => b.score - a.score)
    .slice(0, 5);

  if (scored.length === 0) {
    return res.json({
      answer: `I couldn't find a matching scheme. Try keywords like scheme name, eligibility, or benefit.`,
    });
  }

  const relevantSchemesText = scored
    .map(({ scheme }) => {
      const sections = [
        `Name: ${scheme.title}`,
        scheme.description ? `Summary: ${scheme.description}` : "",
        scheme.fullDescription ? `Details: ${scheme.fullDescription}` : "",
        scheme.category ? `Category: ${scheme.category}` : "",
        scheme.eligibility?.length ? `Eligibility: ${scheme.eligibility.join("; ")}` : "",
        scheme.criteria?.length ? `Criteria: ${scheme.criteria.join("; ")}` : "",
        scheme.benefitAmount ? `Benefit: ${scheme.benefitAmount}` : "",
        scheme.beneficiaries ? `Beneficiaries: ${scheme.beneficiaries}` : "",
        scheme.applicationDeadline ? `Deadline: ${scheme.applicationDeadline}` : "",
        scheme.documentsRequired?.length ? `Documents: ${scheme.documentsRequired.join(", ")}` : "",
        scheme.applicationProcess?.length ? `Process: ${scheme.applicationProcess.join(" -> ")}` : "",
        scheme.contactInfo?.website ? `Website: ${scheme.contactInfo.website}` : "",
        scheme.contactInfo?.phone ? `Phone: ${scheme.contactInfo.phone}` : "",
        scheme.contactInfo?.email ? `Email: ${scheme.contactInfo.email}` : "",
      ].filter(Boolean);
      return sections.join(". ");
    })
    .join("\n\n");

  const prompt = `
You are a helpful government assistant. A user asked: "${userQuery}".
Explain the following schemes in a friendly, human-readable way as a paragraph:
${relevantSchemesText}
`;

  const buildLocalAnswer = () => {
    const best = scored[0].scheme as Scheme;
    const extras = scored.slice(1).map(({ scheme }) => scheme.title).filter(Boolean);
    const extrasText = extras.length ? ` Other relevant options include ${extras.join(", ")}.` : "";
    const parts: string[] = [];
    if (best.title) parts.push(`${best.title}`);
    if (best.description) parts.push(`${best.description}`);
    if (best.eligibility?.length) parts.push(`Eligibility: ${best.eligibility.join("; ")}.`);
    if (best.benefitAmount) parts.push(`Benefit: ${best.benefitAmount}.`);
    if (best.applicationDeadline) parts.push(`Deadline: ${best.applicationDeadline}.`);
    const paragraph = `${parts.join(" ")} ${extrasText}`.trim();
    return `${paragraph} If you want, I can check documents, process, or compare with another scheme.`;
  };

  if (!process.env.HF_API_KEY || process.env.USE_HF === "false") {
    return res.json({ answer: buildLocalAnswer() });
  }

  try {
    const response = await fetch(HF_API_URL, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${process.env.HF_API_KEY}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        inputs: prompt,
        parameters: {
          max_new_tokens: 192,
          temperature: 0.7,
          top_p: 0.9,
          repetition_penalty: 1.05,
        },
        options: { wait_for_model: true },
      }),
    });

    if (response.status === 503) {
      return res.json({ answer: buildLocalAnswer(), note: "Model is warming up; showing local results." });
    }
    if (!response.ok) {
      const errBody = await response.text();
      return res.json({ answer: buildLocalAnswer(), note: `HF error ${response.status}: ${errBody}` });
    }

    let data: any;
    try {
      data = await response.json();
    } catch (e) {
      return res.json({ answer: buildLocalAnswer(), note: "Non-JSON response from HF; showing local results." });
    }

    const raw = data?.[0]?.generated_text || "";
    const answer = raw.trim() || buildLocalAnswer();
    return res.json({ answer });
  } catch (err: any) {
    return res.json({ answer: buildLocalAnswer(), note: `HF request failed: ${err.message}` });
  }
});

const port = process.env.PORT ? Number(process.env.PORT) : 5000;
app.listen(port, () => console.log(`Server running on port ${port}`));


