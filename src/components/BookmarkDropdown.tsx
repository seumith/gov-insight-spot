import { useState } from "react";
import { Bookmark, Plus, Trash2, FolderPlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useBookmarks } from "@/contexts/BookmarkContext";
import { useNavigate } from "react-router-dom";

const BookmarkDropdown = () => {
  const { bookmarks, categories, removeBookmark, addCategory, getSchemeById, addBookmark } = useBookmarks();
  const navigate = useNavigate();
  const [showDropdown, setShowDropdown] = useState(false);
  const [showAddCategory, setShowAddCategory] = useState(false);
  const [newCategoryName, setNewCategoryName] = useState("");
  const [newCategoryColor, setNewCategoryColor] = useState("#3b82f6");

  const colorOptions = [
    "#ef4444", "#f97316", "#f59e0b", "#eab308", "#84cc16", "#22c55e",
    "#10b981", "#14b8a6", "#06b6d4", "#0ea5e9", "#3b82f6", "#6366f1",
    "#8b5cf6", "#a855f7", "#d946ef", "#ec4899", "#f43f5e"
  ];

  const handleAddCategory = () => {
    if (newCategoryName.trim()) {
      addCategory(newCategoryName.trim(), newCategoryColor);
      setNewCategoryName("");
      setNewCategoryColor("#3b82f6");
      setShowAddCategory(false);
    }
  };

  const handleSchemeClick = (schemeId: string) => {
    navigate(`/scheme/${schemeId}`);
    setShowDropdown(false);
  };

  const moveBookmarkToSchemeCategory = (schemeId: string) => {
    const scheme = getSchemeById(schemeId);
    if (!scheme) return;
    const targetCategoryName = (scheme.category || "").toLowerCase();
    const matchingCategory = categories.find(c => c.name.toLowerCase() === targetCategoryName);
    const fallbackCategory = categories.find(c => c.id === "favorites") || categories[0];
    const categoryId = matchingCategory ? matchingCategory.id : (fallbackCategory?.id || categories[0]?.id);
    addBookmark(schemeId, categoryId);
  };

  return (
    <div className="relative">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => setShowDropdown(!showDropdown)}
        className="relative"
      >
        <Bookmark className="w-4 h-4" />
        {bookmarks.length > 0 && (
          <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
            {bookmarks.length}
          </span>
        )}
      </Button>

      {showDropdown && (
        <div className="absolute top-full right-0 mt-2 w-80 bg-card border border-border rounded-lg shadow-lg z-50 max-h-96 overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="flex items-center justify-between">
              <h3 className="font-semibold">Bookmarks ({bookmarks.length})</h3>
              <Button
                variant="ghost"
                size="sm"
                onClick={() => setShowAddCategory(true)}
              >
                <FolderPlus className="w-4 h-4" />
              </Button>
            </div>
          </div>

          <div className="max-h-64 overflow-y-auto">
            {categories.map((category) => {
              const categoryBookmarks = bookmarks.filter(b => b.categoryId === category.id);
              if (categoryBookmarks.length === 0) return null;

              return (
                <div key={category.id} className="border-b border-border last:border-b-0">
                  <div className="px-4 py-2 bg-muted/30">
                    <div className="flex items-center gap-2">
                      <div 
                        className="w-3 h-3 rounded-full" 
                        style={{ backgroundColor: category.color }}
                      />
                      <span className="text-sm font-medium">{category.name}</span>
                      <span className="text-xs text-muted-foreground">
                        ({categoryBookmarks.length})
                      </span>
                    </div>
                  </div>
                  
                  <div className="px-4 py-2 space-y-1">
                    {categoryBookmarks.map((bookmark) => {
                      const scheme = getSchemeById(bookmark.schemeId);
                      if (!scheme) return null;

                      return (
                        <div
                          key={bookmark.id}
                          className="flex items-center justify-between p-2 hover:bg-muted/50 rounded"
                          onClick={() => handleSchemeClick(scheme.id)}
                        >
                          <div className="flex-1 min-w-0">
                            <div className="text-sm font-medium truncate">
                              {scheme.title}
                            </div>
                            <div className="text-xs text-muted-foreground truncate">
                              {scheme.category}
                            </div>
                          </div>
                          <div className="flex items-center gap-1">
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => { e.stopPropagation(); moveBookmarkToSchemeCategory(scheme.id); }}
                              className="text-muted-foreground"
                              title="Move to scheme category"
                            >
                              <Plus className="w-3 h-3" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="sm"
                              onClick={(e) => { e.stopPropagation(); removeBookmark(bookmark.id); }}
                              className="text-muted-foreground hover:text-destructive"
                            >
                              <Trash2 className="w-3 h-3" />
                            </Button>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                </div>
              );
            })}

            {bookmarks.length === 0 && (
              <div className="p-8 text-center text-muted-foreground">
                <Bookmark className="w-8 h-8 mx-auto mb-2 opacity-50" />
                <p className="text-sm">No bookmarks yet</p>
                <p className="text-xs">Bookmark schemes to see them here</p>
              </div>
            )}
          </div>

          {showAddCategory && (
            <div className="p-4 border-t border-border bg-muted/20">
              <h4 className="text-sm font-medium mb-3">Add New Category</h4>
              <div className="space-y-3">
                <input
                  type="text"
                  placeholder="Category name"
                  value={newCategoryName}
                  onChange={(e) => setNewCategoryName(e.target.value)}
                  className="w-full h-8 px-2 text-sm rounded border border-input bg-background"
                />
                
                <div className="space-y-2">
                  <label className="text-xs text-muted-foreground">Color</label>
                  <div className="grid grid-cols-8 gap-1">
                    {colorOptions.map((color) => (
                      <button
                        key={color}
                        onClick={() => setNewCategoryColor(color)}
                        className={`w-6 h-6 rounded border-2 ${
                          newCategoryColor === color ? "border-foreground" : "border-transparent"
                        }`}
                        style={{ backgroundColor: color }}
                      />
                    ))}
                  </div>
                </div>

                <div className="flex gap-2">
                  <Button
                    size="sm"
                    onClick={handleAddCategory}
                    disabled={!newCategoryName.trim()}
                    className="flex-1"
                  >
                    Add
                  </Button>
                  <Button
                    variant="outline"
                    size="sm"
                    onClick={() => {
                      setShowAddCategory(false);
                      setNewCategoryName("");
                    }}
                    className="flex-1"
                  >
                    Cancel
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      )}

      {showDropdown && (
        <div 
          className="fixed inset-0 z-40" 
          onClick={() => setShowDropdown(false)}
        />
      )}
    </div>
  );
};

export default BookmarkDropdown;
