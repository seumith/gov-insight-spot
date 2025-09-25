import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "@/components/Header";
import { useLanguage } from "@/i18n/LanguageProvider";
import { useAuth } from "@/contexts/AuthContext";

const Login = () => {
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const { t } = useLanguage();
  const { login } = useAuth();
  const navigate = useNavigate();

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const ok = await login(email, password);
    if (ok) {
      if (email === "admin@example.com" && password === "admin123") navigate("/admin");
      else navigate("/");
    }
  };

  return (
    <>
      <Header />
      <main className="min-h-[70vh] flex items-center justify-center px-4">
        <div className="w-full max-w-md bg-card text-card-foreground rounded-lg border border-border shadow-card">
          <div className="p-6 border-b border-border">
            <div className="flex items-center justify-center gap-2">
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === "login" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                onClick={() => setMode("login")}
              >
                {t("login_login")}
              </button>
              <button
                className={`px-4 py-2 rounded-md text-sm font-medium transition-colors ${mode === "signup" ? "bg-primary text-primary-foreground" : "bg-muted"}`}
                onClick={() => setMode("signup")}
              >
                {t("login_signup")}
              </button>
            </div>
          </div>

          <form className="p-6 space-y-4" onSubmit={onSubmit}>
            {mode === "signup" && (
              <div className="space-y-1">
                <label className="text-sm" htmlFor="name">{t("login_fullname")}</label>
                <input
                  id="name"
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder={t("login_fullname")}
                  className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
            )}

            <div className="space-y-1">
              <label className="text-sm" htmlFor="email">{t("login_email")}</label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              />
            </div>

            <div className="space-y-1">
              <label className="text-sm" htmlFor="password">{t("login_password")}</label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                required
              />
            </div>

            <button
              type="submit"
              className="w-full h-11 inline-flex items-center justify-center rounded-md bg-primary text-primary-foreground hover:opacity-90 transition-opacity"
            >
              {mode === "login" ? t("login_cta_login") : t("login_cta_signup")}
            </button>

            {mode === "login" ? (
              <p className="text-xs text-muted-foreground text-center">
                {t("login_no_account")} {" "}
                <button type="button" className="underline" onClick={() => setMode("signup")}>{t("login_signup")}</button>
              </p>
            ) : (
              <p className="text-xs text-muted-foreground text-center">
                {t("login_has_account")} {" "}
                <button type="button" className="underline" onClick={() => setMode("login")}>{t("login_login")}</button>
              </p>
            )}

            <p className="text-[11px] text-muted-foreground text-center">
              {t("login_terms")} <Link to="#" className="underline">{t("login_terms_terms")}</Link> {" "}and{" "}
              <Link to="#" className="underline">{t("login_terms_privacy")}</Link>.
            </p>
          </form>
        </div>
      </main>
    </>
  );
};

export default Login;


