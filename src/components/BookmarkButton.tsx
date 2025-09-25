import { useState } from "react";
import { Bookmark, BookmarkCheck } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/contexts/BookmarkContext";

type BookmarkButtonProps = {
  schemeId: string;
  size?: "sm" | "default" | "lg";
  variant?: "ghost" | "outline" | "default";
  showText?: boolean;
};

const BookmarkButton = ({ 
  schemeId, 
  size = "default", 
  variant = "ghost", 
  showText = false 
}: BookmarkButtonProps) => {
  const { bookmarks, isBookmarked, addBookmark, removeBookmark, categories, getSchemeById } = useBookmarks();
  const [busy, setBusy] = useState(false);
  
  const bookmarked = isBookmarked(schemeId);
  const bookmark = bookmarks.find(b => b.schemeId === schemeId);
  const scheme = getSchemeById(schemeId);

  const handleBookmarkClick = async () => {
    if (busy) return;
    setBusy(true);
    try {
      if (bookmarked && bookmark) {
        removeBookmark(bookmark.id);
      } else {
        // Auto-select category based on the scheme's category name
        const targetCategoryName = (scheme?.category || "").toLowerCase();
        const matchingCategory = categories.find(c => c.name.toLowerCase() === targetCategoryName);
        const fallbackCategory = categories.find(c => c.id === "favorites") || categories[0];
        const categoryId = matchingCategory ? matchingCategory.id : (fallbackCategory?.id || categories[0]?.id);
        addBookmark(schemeId, categoryId);
      }
    } finally {
      setBusy(false);
    }
  };

  return (
    <Button
      variant={variant}
      size={size}
      onClick={handleBookmarkClick}
      disabled={busy}
      className={`flex items-center gap-2 ${bookmarked ? "text-red-500" : ""}`}
      aria-label={bookmarked ? "Remove bookmark" : "Add bookmark"}
    >
      {bookmarked ? (
        <BookmarkCheck className="w-4 h-4" />
      ) : (
        <Bookmark className="w-4 h-4" />
      )}
      {showText && (
        <span>
          {bookmarked ? "Bookmarked" : "Bookmark"}
        </span>
      )}
    </Button>
  );
};

export default BookmarkButton;
