import { createContext, useContext, useEffect, useState } from "react";
import { schemes } from "@/data/schemes";

export type BookmarkCategory = {
  id: string;
  name: string;
  color: string;
};

export type Bookmark = {
  id: string;
  schemeId: string;
  categoryId: string;
  createdAt: string;
};

type BookmarkContextValue = {
  bookmarks: Bookmark[];
  categories: BookmarkCategory[];
  addBookmark: (schemeId: string, categoryId: string) => void;
  removeBookmark: (bookmarkId: string) => void;
  addCategory: (name: string, color: string) => void;
  removeCategory: (categoryId: string) => void;
  updateCategory: (categoryId: string, name: string, color: string) => void;
  isBookmarked: (schemeId: string) => boolean;
  getBookmarksByCategory: (categoryId: string) => Bookmark[];
  getSchemeById: (schemeId: string) => typeof schemes[0] | undefined;
};

const BookmarkContext = createContext<BookmarkContextValue | null>(null);

const STORAGE_KEY = "gov-schemes-bookmarks";
const CATEGORIES_KEY = "gov-schemes-categories";

const defaultCategories: BookmarkCategory[] = [
  { id: "favorites", name: "Favorites", color: "#ef4444" },
  { id: "healthcare", name: "Healthcare", color: "#10b981" },
  { id: "education", name: "Education", color: "#3b82f6" },
  { id: "housing", name: "Housing", color: "#8b5cf6" },
  { id: "employment", name: "Employment", color: "#f59e0b" },
  { id: "agriculture", name: "Agriculture", color: "#84cc16" },
];

export const BookmarkProvider = ({ children }: { children: React.ReactNode }) => {
  const [bookmarks, setBookmarks] = useState<Bookmark[]>([]);
  const [categories, setCategories] = useState<BookmarkCategory[]>(defaultCategories);

  // Load from localStorage on mount
  useEffect(() => {
    try {
      const savedBookmarks = localStorage.getItem(STORAGE_KEY);
      const savedCategories = localStorage.getItem(CATEGORIES_KEY);
      
      if (savedBookmarks) {
        setBookmarks(JSON.parse(savedBookmarks));
      }
      
      if (savedCategories) {
        setCategories(JSON.parse(savedCategories));
      }
    } catch (error) {
      console.error("Failed to load bookmarks:", error);
    }
  }, []);

  // Save to localStorage whenever bookmarks change
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(bookmarks));
    } catch (error) {
      console.error("Failed to save bookmarks:", error);
    }
  }, [bookmarks]);

  // Save to localStorage whenever categories change
  useEffect(() => {
    try {
      localStorage.setItem(CATEGORIES_KEY, JSON.stringify(categories));
    } catch (error) {
      console.error("Failed to save categories:", error);
    }
  }, [categories]);

  const addBookmark = (schemeId: string, categoryId: string) => {
    const existingBookmark = bookmarks.find(b => b.schemeId === schemeId);
    if (existingBookmark) {
      // Update existing bookmark's category
      setBookmarks(prev => prev.map(b => 
        b.id === existingBookmark.id ? { ...b, categoryId } : b
      ));
    } else {
      // Add new bookmark
      const newBookmark: Bookmark = {
        id: `bookmark_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        schemeId,
        categoryId,
        createdAt: new Date().toISOString(),
      };
      setBookmarks(prev => [...prev, newBookmark]);
    }
  };

  const removeBookmark = (bookmarkId: string) => {
    setBookmarks(prev => prev.filter(b => b.id !== bookmarkId));
  };

  const addCategory = (name: string, color: string) => {
    const newCategory: BookmarkCategory = {
      id: `category_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
      name,
      color,
    };
    setCategories(prev => [...prev, newCategory]);
  };

  const removeCategory = (categoryId: string) => {
    // Remove category and all bookmarks in it
    setCategories(prev => prev.filter(c => c.id !== categoryId));
    setBookmarks(prev => prev.filter(b => b.categoryId !== categoryId));
  };

  const updateCategory = (categoryId: string, name: string, color: string) => {
    setCategories(prev => prev.map(c => 
      c.id === categoryId ? { ...c, name, color } : c
    ));
  };

  const isBookmarked = (schemeId: string) => {
    return bookmarks.some(b => b.schemeId === schemeId);
  };

  const getBookmarksByCategory = (categoryId: string) => {
    return bookmarks.filter(b => b.categoryId === categoryId);
  };

  const getSchemeById = (schemeId: string) => {
    return schemes.find(s => s.id === schemeId);
  };

  const value: BookmarkContextValue = {
    bookmarks,
    categories,
    addBookmark,
    removeBookmark,
    addCategory,
    removeCategory,
    updateCategory,
    isBookmarked,
    getBookmarksByCategory,
    getSchemeById,
  };

  return (
    <BookmarkContext.Provider value={value}>
      {children}
    </BookmarkContext.Provider>
  );
};

export const useBookmarks = () => {
  const context = useContext(BookmarkContext);
  if (!context) {
    throw new Error("useBookmarks must be used within a BookmarkProvider");
  }
  return context;
};
