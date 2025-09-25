import { useState } from "react";
import { Link } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Heart, MessageCircle, Search, Filter, TrendingUp, Users } from "lucide-react";
import { schemes, categories, getSchemesByCategory, getPopularSchemes } from "@/data/schemes";

const BrowseSchemes = () => {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [searchTerm, setSearchTerm] = useState("");
  const [sortBy, setSortBy] = useState<"popularity" | "recent">("popularity");

  // Filter schemes based on category and search term
  const filteredSchemes = getSchemesByCategory(selectedCategory)
    .filter(scheme => 
      scheme.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
      scheme.description.toLowerCase().includes(searchTerm.toLowerCase())
    )
    .sort((a, b) => {
      if (sortBy === "popularity") {
        return b.likes - a.likes;
      }
      return 0; // For now, keeping same order for "recent"
    });

  const popularSchemes = getPopularSchemes().slice(0, 3);

  return (
    <div className="min-h-screen">
      <Header />
      
      {/* Hero Section */}
      <section className="py-12 bg-gradient-subtle">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-4xl mx-auto text-center">
            <h1 className="text-4xl md:text-5xl font-bold mb-4 bg-gradient-primary bg-clip-text text-transparent">
              Browse Government Schemes
            </h1>
            <p className="text-lg text-muted-foreground mb-8">
              Discover and explore government schemes tailored to your needs. Find the perfect scheme for you.
            </p>
            
            {/* Search Bar */}
            <div className="relative max-w-md mx-auto mb-8">
              <Search className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Search schemes..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          </div>
        </div>
      </section>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <aside className="lg:w-1/4">
            <Card className="mb-6">
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <Filter className="h-5 w-5" />
                  Filters
                </CardTitle>
              </CardHeader>
              <CardContent>
                {/* Categories */}
                <div className="mb-6">
                  <h3 className="font-semibold mb-3">Categories</h3>
                  <div className="space-y-2">
                    {categories.map((category) => (
                      <Button
                        key={category}
                        variant={selectedCategory === category ? "default" : "ghost"}
                        className="w-full justify-start"
                        onClick={() => setSelectedCategory(category)}
                      >
                        {category}
                      </Button>
                    ))}
                  </div>
                </div>

                {/* Sort Options */}
                <div>
                  <h3 className="font-semibold mb-3">Sort By</h3>
                  <div className="space-y-2">
                    <Button
                      variant={sortBy === "popularity" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSortBy("popularity")}
                    >
                      <TrendingUp className="h-4 w-4 mr-2" />
                      Popularity
                    </Button>
                    <Button
                      variant={sortBy === "recent" ? "default" : "ghost"}
                      className="w-full justify-start"
                      onClick={() => setSortBy("recent")}
                    >
                      Recent
                    </Button>
                  </div>
                </div>
              </CardContent>
            </Card>

            {/* Popular Schemes Widget */}
            <Card>
              <CardHeader>
                <CardTitle className="text-lg flex items-center gap-2">
                  <TrendingUp className="h-5 w-5" />
                  Most Popular
                </CardTitle>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {popularSchemes.map((scheme, index) => (
                    <Link
                      key={scheme.id}
                      to={`/scheme/${scheme.id}`}
                      className="block p-3 rounded-lg hover:bg-muted/50 transition-colors"
                    >
                      <div className="flex items-start gap-2">
                        <span className="text-sm font-bold text-primary bg-primary/10 rounded px-2 py-1 min-w-[24px] text-center">
                          {index + 1}
                        </span>
                        <div>
                          <p className="text-sm font-medium line-clamp-2">{scheme.title}</p>
                          <div className="flex items-center gap-2 mt-1">
                            <Heart className="h-3 w-3 text-red-500" />
                            <span className="text-xs text-muted-foreground">{scheme.likes.toLocaleString()}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              </CardContent>
            </Card>
          </aside>

          {/* Main Content */}
          <main className="lg:w-3/4">
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold">
                {selectedCategory === "All" ? "All Schemes" : `${selectedCategory} Schemes`}
                <span className="text-muted-foreground text-lg ml-2">
                  ({filteredSchemes.length})
                </span>
              </h2>
            </div>

            {/* Schemes Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {filteredSchemes.map((scheme) => (
                <Link
                  key={scheme.id}
                  to={`/scheme/${scheme.id}`}
                  className="block"
                >
                  <Card className="group hover:shadow-elegant transition-all duration-300 hover:-translate-y-1 h-full">
                    <CardHeader className="pb-4">
                      <div className="flex justify-between items-start mb-2">
                        <Badge variant="secondary">{scheme.category}</Badge>
                        <div className="flex items-center gap-4 text-sm text-muted-foreground">
                          <div className="flex items-center gap-1">
                            <Heart className="h-4 w-4 text-red-500" />
                            <span>{scheme.likes.toLocaleString()}</span>
                          </div>
                          <div className="flex items-center gap-1">
                            <MessageCircle className="h-4 w-4 text-blue-500" />
                            <span>{scheme.comments}</span>
                          </div>
                        </div>
                      </div>
                      <CardTitle className="text-lg group-hover:text-primary transition-colors line-clamp-2">
                        {scheme.title}
                      </CardTitle>
                    </CardHeader>
                    
                    <CardContent className="space-y-4">
                      <CardDescription className="text-muted-foreground leading-relaxed line-clamp-3">
                        {scheme.description}
                      </CardDescription>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground flex items-center gap-1">
                            <Users className="h-3 w-3" />
                            Beneficiaries:
                          </span>
                          <span className="font-semibold text-primary">{scheme.beneficiaries}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Benefit:</span>
                          <span className="font-semibold text-secondary">{scheme.benefitAmount}</span>
                        </div>
                        <div className="flex justify-between items-center text-sm">
                          <span className="text-muted-foreground">Status:</span>
                          <Badge variant="outline" className="text-xs">
                            {scheme.validity.includes("Ongoing") ? "Active" : "Limited Time"}
                          </Badge>
                        </div>
                      </div>
                      
                      <Button variant="outline" className="w-full group/btn">
                        View Details & Apply
                        <span className="ml-2 group-hover/btn:translate-x-1 transition-transform">→</span>
                      </Button>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>

            {filteredSchemes.length === 0 && (
              <div className="text-center py-12">
                <p className="text-lg text-muted-foreground mb-4">
                  No schemes found matching your criteria.
                </p>
                <Button 
                  variant="outline" 
                  onClick={() => {
                    setSelectedCategory("All");
                    setSearchTerm("");
                  }}
                >
                  Clear Filters
                </Button>
              </div>
            )}
          </main>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default BrowseSchemes;