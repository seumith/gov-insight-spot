import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, SendHorizontal } from "lucide-react";
import { useLanguage } from "@/i18n/LanguageProvider";

type ChatMessage = { role: "user" | "bot"; text: string };

const ChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [loading, setLoading] = useState(false);
  const chatboxRef = useRef<HTMLDivElement | null>(null);
  const { t } = useLanguage();

  useEffect(() => {
    if (open && chatboxRef.current) {
      chatboxRef.current.scrollTop = chatboxRef.current.scrollHeight;
    }
  }, [open, messages]);

  const sendMessage = async () => {
    const query = input.trim();
    if (!query || loading) return;
    const next: ChatMessage[] = [...messages, { role: "user", text: query }];
    setMessages(next);
    setInput("");
    setLoading(true);

    try {
      const resp = await fetch("http://localhost:5000/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ query }),
      });
      const data = await resp.json();
      const answer = data?.answer || "Sorry, I couldn't generate a response.";
      setMessages((m) => [...m, { role: "bot", text: answer }]);
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "bot", text: "Network error. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Floating button */}
      <button
        aria-label="Open chat"
        onClick={() => setOpen(true)}
        className="fixed bottom-6 right-6 z-50 inline-flex items-center justify-center rounded-full bg-primary text-primary-foreground shadow-lg hover:opacity-90 transition-opacity h-14 w-14"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chat window */}
      {open && (
        <div className="fixed bottom-24 right-6 z-50 w-80 sm:w-96 bg-card text-card-foreground border border-border rounded-lg shadow-xl flex flex-col overflow-hidden">
          <div className="flex items-center justify-between px-4 py-3 bg-background border-b border-border">
            <div className="font-semibold">{t("chat_title")}</div>
            <button
              aria-label="Close chat"
              className="p-1 rounded-md hover:bg-muted"
              onClick={() => setOpen(false)}
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          <div ref={chatboxRef} className="flex-1 p-3 space-y-2 overflow-y-auto max-h-80 bg-muted/30">
            {messages.length === 0 && (
              <div className="text-sm text-muted-foreground">{t("chat_hint")}</div>
            )}
            {messages.map((m, idx) => (
              <div
                key={idx}
                className={
                  m.role === "user"
                    ? "ml-auto max-w-[85%] rounded-lg px-3 py-2 bg-primary text-primary-foreground shadow"
                    : "mr-auto max-w-[85%] rounded-lg px-3 py-2 bg-card text-card-foreground border"
                }
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="mr-auto max-w-[85%] rounded-lg px-3 py-2 border text-sm text-muted-foreground bg-card">{t("chat_thinking")}</div>
            )}
          </div>

          <div className="flex items-center gap-2 p-3 bg-background border-t border-border">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={onKeyDown}
              placeholder={t("chat_placeholder")}
              className="flex-1 h-10 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
            />
            <button
              onClick={sendMessage}
              disabled={loading || !input.trim()}
              className="inline-flex items-center justify-center h-10 w-10 rounded-md bg-primary text-primary-foreground disabled:opacity-50"
            >
              <SendHorizontal className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default ChatWidget;


