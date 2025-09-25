import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { schemes as initialSchemesStatic, type Scheme } from "@/data/schemes";

export type SchemesContextValue = {
  schemes: Scheme[];
  createScheme: (s: Omit<Scheme, "likes" | "comments" | "analytics">) => void;
  updateScheme: (id: string, updates: Partial<Scheme>) => void;
  deleteScheme: (id: string) => void;
  getScheme: (id: string) => Scheme | undefined;
};

const SchemesContext = createContext<SchemesContextValue | null>(null);

const STORAGE_KEY = "gov-schemes-data";

export const SchemesProvider = ({ children }: { children: React.ReactNode }) => {
  const [schemes, setSchemes] = useState<Scheme[]>([]);

  // Load persisted or fallback to initial static
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        setSchemes(JSON.parse(raw));
      } else {
        setSchemes(initialSchemesStatic);
      }
    } catch {
      setSchemes(initialSchemesStatic);
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(schemes));
    } catch {}
  }, [schemes]);

  const createScheme = (s: Omit<Scheme, "likes" | "comments" | "analytics">) => {
    const newScheme: Scheme = {
      ...s,
      likes: 0,
      comments: 0,
      analytics: {
        totalApplications: 0,
        approvalRate: 0,
        averageProcessingTime: "",
        topStates: [],
      },
    };
    setSchemes(prev => [newScheme, ...prev]);
  };

  const updateScheme = (id: string, updates: Partial<Scheme>) => {
    setSchemes(prev => prev.map(s => (s.id === id ? { ...s, ...updates } : s)));
  };

  const deleteScheme = (id: string) => {
    setSchemes(prev => prev.filter(s => s.id !== id));
  };

  const getScheme = (id: string) => schemes.find(s => s.id === id);

  const value = useMemo<SchemesContextValue>(() => ({
    schemes,
    createScheme,
    updateScheme,
    deleteScheme,
    getScheme,
  }), [schemes]);

  return <SchemesContext.Provider value={value}>{children}</SchemesContext.Provider>;
};

export const useSchemesStore = (): SchemesContextValue => {
  const ctx = useContext(SchemesContext);
  if (!ctx) throw new Error("useSchemesStore must be used within SchemesProvider");
  return ctx;
};
