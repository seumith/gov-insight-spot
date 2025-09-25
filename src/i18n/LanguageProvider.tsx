import { createContext, useContext, useMemo, useState } from "react";

export type LanguageCode = "en" | "hi";

type Dictionary = Record<string, string>;

const en: Dictionary = {
  // Header
  nav_home: "Home",
  nav_browse: "Browse Schemes",
  nav_about: "About",
  nav_contact: "Contact",
  nav_login: "Login",
  search_placeholder: "Search schemes by name, category, or description...",
  search_no_results: "No results found.",
  search_hint: "Enter to open • Esc to close",

  // Hero
  hero_title_1: "Discover Government Schemes",
  hero_title_2: "Made Simple",
  hero_subtitle: "Find the perfect government schemes for you. From education to healthcare, housing to employment - access all benefits in one place.",
  hero_browse: "Browse All Schemes",
  hero_find: "Find My Schemes",

  // Featured
  featured_title: "Popular Government Schemes",
  featured_subtitle: "Explore the most sought-after government schemes that are transforming lives across India",
  featured_learn_more: "Learn More",
  featured_view_all: "View All Schemes",
  featured_beneficiaries: "Beneficiaries:",
  featured_benefit: "Benefit:",

  // Login
  login_login: "Login",
  login_signup: "Sign Up",
  login_fullname: "Full name",
  login_email: "Email",
  login_password: "Password",
  login_cta_login: "Login",
  login_cta_signup: "Create account",
  login_no_account: "Don’t have an account?",
  login_has_account: "Already have an account?",
  login_terms: "By continuing you agree to our",
  login_terms_terms: "Terms",
  login_terms_privacy: "Privacy Policy",

  // Chat
  chat_title: "Gov Insight Assistant",
  chat_placeholder: "Type your question...",
  chat_thinking: "Thinking...",
  chat_hint: "Ask me about schemes, eligibility, or benefits.",
};

const hi: Dictionary = {
  // Header
  nav_home: "होम",
  nav_browse: "योजनाएँ देखें",
  nav_about: "परिचय",
  nav_contact: "संपर्क",
  nav_login: "लॉगिन",
  search_placeholder: "योजना का नाम, श्रेणी या विवरण से खोजें...",
  search_no_results: "कोई परिणाम नहीं मिला।",
  search_hint: "खोलने के लिए एंटर • बंद करने के लिए एस्क",

  // Hero
  hero_title_1: "सरकारी योजनाएँ खोजें",
  hero_title_2: "अब आसान",
  hero_subtitle: "शिक्षा से स्वास्थ्य, आवास से रोजगार तक — सभी लाभ एक स्थान पर पाएं।",
  hero_browse: "सभी योजनाएँ देखें",
  hero_find: "मेरी योजनाएँ खोजें",

  // Featured
  featured_title: "लोकप्रिय सरकारी योजनाएँ",
  featured_subtitle: "भारत भर में जीवन बदल रहीं सबसे अधिक मांग वाली योजनाएँ",
  featured_learn_more: "और जानें",
  featured_view_all: "सभी योजनाएँ",
  featured_beneficiaries: "लाभार्थी:",
  featured_benefit: "लाभ:",

  // Login
  login_login: "लॉगिन",
  login_signup: "साइन अप",
  login_fullname: "पूरा नाम",
  login_email: "ईमेल",
  login_password: "पासवर्ड",
  login_cta_login: "लॉगिन",
  login_cta_signup: "खाता बनाएँ",
  login_no_account: "खाता नहीं है?",
  login_has_account: "पहले से खाता है?",
  login_terms: "आगे बढ़ने पर आप सहमत हैं",
  login_terms_terms: "नियम",
  login_terms_privacy: "गोपनीयता नीति",

  // Chat
  chat_title: "गव इनसाइट सहायक",
  chat_placeholder: "अपना प्रश्न लिखें...",
  chat_thinking: "सोच रहा है...",
  chat_hint: "योजनाएँ, पात्रता या लाभ के बारे में पूछें।",
};

const dictionaries: Record<LanguageCode, Dictionary> = { en, hi };

type LanguageContextValue = {
  lang: LanguageCode;
  setLang: (l: LanguageCode) => void;
  t: (key: string) => string;
};

const LanguageContext = createContext<LanguageContextValue | null>(null);

export const useLanguage = (): LanguageContextValue => {
  const ctx = useContext(LanguageContext);
  if (!ctx) throw new Error("useLanguage must be used within LanguageProvider");
  return ctx;
};

export const LanguageProvider = ({ children }: { children: React.ReactNode }) => {
  const [lang, setLang] = useState<LanguageCode>("en");
  const value = useMemo<LanguageContextValue>(() => ({
    lang,
    setLang,
    t: (key: string) => dictionaries[lang][key] ?? key,
  }), [lang]);

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  );
};


