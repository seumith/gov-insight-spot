import { Button } from "@/components/ui/button";
import { Menu, X, User, Search } from "lucide-react";
import { useEffect, useMemo, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { schemes } from "@/data/schemes";
import { useLanguage } from "@/i18n/LanguageProvider";
import BookmarkDropdown from "@/components/BookmarkDropdown";
import { useAuth } from "@/contexts/AuthContext";

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isSearchOpen, setIsSearchOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");
  const navigate = useNavigate();
  const { lang, setLang, t } = useLanguage();
  const { isAdmin, user, logout } = useAuth();

  const matches = useMemo(() => {
    const q = searchQuery.trim().toLowerCase();
    if (!q) return [] as typeof schemes;
    return schemes.filter(s =>
      s.title.toLowerCase().includes(q) ||
      s.description.toLowerCase().includes(q) ||
      (s.category || "").toLowerCase().includes(q)
    ).slice(0, 8);
  }, [searchQuery]);

  useEffect(() => {
    if (!isSearchOpen) setSearchQuery("");
  }, [isSearchOpen]);

  useEffect(() => {
    const open = () => setIsSearchOpen(true);
    // Listen for global open-search event (e.g., from Hero button)
    window.addEventListener("open-search" as any, open as any);
    return () => window.removeEventListener("open-search" as any, open as any);
  }, []);

  const handleSelect = (id: string) => {
    setIsSearchOpen(false);
    setSearchQuery("");
    navigate(`/scheme/${id}`);
  };

  const navItems = [
    { name: t("nav_home"), href: "/" },
    { name: t("nav_browse"), href: "/browse-schemes" },
    { name: t("nav_about"), href: "/about" },
    { name: t("nav_contact"), href: "#contact" },
    ...(isAdmin ? [{ name: "Dashboard", href: "/admin" }] : []),
  ];

  return (
    <header className="bg-background/95 backdrop-blur-sm border-b border-border sticky top-0 z-50">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold bg-gradient-primary bg-clip-text text-transparent">
              GovSchemes
            </Link>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center space-x-8">
            {navItems.map((item) => (
              item.href.startsWith('/') ? (
                <Link
                  key={item.name}
                  to={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  {item.name}
                </Link>
              ) : (
                <a
                  key={item.name}
                  href={item.href}
                  className="text-foreground hover:text-primary transition-colors duration-200"
                >
                  {item.name}
                </a>
              )
            ))}
          </nav>

          {/* Desktop Actions */}
          <div className="hidden md:flex items-center space-x-4">
            <Button variant="ghost" size="sm" onClick={() => setIsSearchOpen(true)}>
              <Search className="w-4 h-4" />
            </Button>
            <BookmarkDropdown />
            <div className="relative">
              <select
                value={lang}
                onChange={(e) => setLang(e.target.value as any)}
                className="h-9 px-2 text-sm rounded-md border border-input bg-background"
                aria-label="Language"
              >
                <option value="en">English</option>
                <option value="hi">हिंदी</option>
              </select>
            </div>
            {user ? (
              <Button variant="outline" size="sm" onClick={() => logout()}>
                Logout
              </Button>
            ) : (
              <Button variant="outline" size="sm" onClick={() => navigate("/login")}>
                <User className="w-4 h-4 mr-2" />
                {t("nav_login")}
              </Button>
            )}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setIsMenuOpen(!isMenuOpen)}
            >
              {isMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </Button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden border-t border-border">
            <div className="px-2 pt-2 pb-3 space-y-1">
              {navItems.map((item) => (
                item.href.startsWith('/') ? (
                  <Link
                    key={item.name}
                    to={item.href}
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </Link>
                ) : (
                  <a
                    key={item.name}
                    href={item.href}
                    className="block px-3 py-2 text-foreground hover:text-primary transition-colors duration-200"
                    onClick={() => setIsMenuOpen(false)}
                  >
                    {item.name}
                  </a>
                )
              ))}
              <div className="flex flex-col space-y-2 mt-4 px-3">
                <div className="flex items-center gap-2">
                  <span className="text-sm">Language:</span>
                  <select
                    value={lang}
                    onChange={(e) => setLang(e.target.value as any)}
                    className="h-9 px-2 text-sm rounded-md border border-input bg-background"
                    aria-label="Language"
                  >
                    <option value="en">English</option>
                    <option value="hi">हिंदी</option>
                  </select>
                </div>
                <div className="flex justify-center">
                  <BookmarkDropdown />
                </div>
                {user ? (
                  <Button variant="outline" size="sm" className="justify-start" onClick={() => { setIsMenuOpen(false); logout(); }}>
                    Logout
                  </Button>
                ) : (
                  <Button variant="outline" size="sm" className="justify-start" onClick={() => { setIsMenuOpen(false); navigate("/login"); }}>
                    <User className="w-4 h-4 mr-2" />
                    {t("nav_login")}
                  </Button>
                )}
              </div>
            </div>
          </div>
        )}
        {/* Search Overlay */}
        {isSearchOpen && (
          <div className="fixed inset-0 z-[60] flex items-start justify-center pt-24 bg-background/70 backdrop-blur-sm">
            <div className="w-full max-w-xl mx-4 rounded-lg border border-border bg-card shadow-xl">
              <div className="p-3 border-b border-border">
                <input
                  autoFocus
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === 'Escape') setIsSearchOpen(false);
                    if (e.key === 'Enter' && matches[0]) handleSelect(matches[0].id);
                  }}
                  placeholder={"Search schemes by name, category, or description..."}
                  className="w-full h-11 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:ring-2 focus-visible:ring-ring"
                />
              </div>
              <div className="max-h-80 overflow-y-auto">
                {searchQuery && matches.length === 0 && (
                  <div className="px-4 py-6 text-sm text-muted-foreground">{"No results found."}</div>
                )}
                {matches.map((s) => (
                  <button
                    key={s.id}
                    onClick={() => handleSelect(s.id)}
                    className="w-full text-left px-4 py-3 hover:bg-muted/60 transition-colors"
                  >
                    <div className="font-medium">{s.title}</div>
                    <div className="text-xs text-muted-foreground line-clamp-2">{s.description}</div>
                  </button>
                ))}
              </div>
              <div className="flex items-center justify-between px-4 py-2 border-t border-border text-xs text-muted-foreground">
                <span>{"Enter to open • Esc to close"}</span>
                <button className="underline" onClick={() => setIsSearchOpen(false)}>{"Close"}</button>
              </div>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};

export default Header;