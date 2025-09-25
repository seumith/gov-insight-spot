import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Index from "./pages/Index";
import About from "./pages/About";
import BrowseSchemes from "./pages/BrowseSchemes";
import SchemeDetail from "./pages/SchemeDetail";
import NotFound from "./pages/NotFound";
import Login from "./pages/Login";
import ChatWidget from "./components/ChatWidget";
import { LanguageProvider } from "./i18n/LanguageProvider";
import { BookmarkProvider } from "./contexts/BookmarkContext";
import { AuthProvider } from "./contexts/AuthContext";
import { SchemesProvider } from "./contexts/SchemesContext";
import Admin from "./pages/Admin";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <SchemesProvider>
          <BookmarkProvider>
            <TooltipProvider>
              <Toaster />
              <Sonner />
              <BrowserRouter>
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/about" element={<About />} />
                  <Route path="/browse-schemes" element={<BrowseSchemes />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/admin" element={<Admin />} />
                  <Route path="/scheme/:schemeName" element={<SchemeDetail />} />
                  {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
                  <Route path="*" element={<NotFound />} />
                </Routes>
                <ChatWidget />
              </BrowserRouter>
            </TooltipProvider>
          </BookmarkProvider>
        </SchemesProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

export default App;
