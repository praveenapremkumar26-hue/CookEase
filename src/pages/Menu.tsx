import { useState, useMemo } from "react";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Search } from "lucide-react";
import { foodItems, categories, dietaryFilters, type FoodItem } from "@/data/menuData";
import FoodCard from "@/components/FoodCard";
import FoodCustomization from "@/components/FoodCustomization";
import { cn } from "@/lib/utils";

export default function Menu() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [customizeItem, setCustomizeItem] = useState<FoodItem | null>(null);

  const toggleFilter = (f: string) =>
    setActiveFilters((prev) => (prev.includes(f) ? prev.filter((x) => x !== f) : [...prev, f]));

  const filtered = useMemo(() => {
    return foodItems.filter((item) => {
      if (category !== "All" && item.category !== category) return false;
      if (search && !item.name.toLowerCase().includes(search.toLowerCase()) && !item.description.toLowerCase().includes(search.toLowerCase())) return false;
      if (activeFilters.length > 0 && !activeFilters.some((f) => item.tags.includes(f))) return false;
      return true;
    });
  }, [search, category, activeFilters]);

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">Our Menu</h1>
      <p className="text-muted-foreground mb-6">Fresh, healthy meals customized to your dietary needs.</p>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Search dishes..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Categories */}
      <div className="flex flex-wrap gap-2 mb-4">
        {categories.map((cat) => (
          <button
            key={cat}
            onClick={() => setCategory(cat)}
            className={cn(
              "px-4 py-1.5 rounded-full text-sm font-medium border transition-colors",
              category === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:bg-accent"
            )}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dietary filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {dietaryFilters.map((f) => (
          <Badge
            key={f}
            variant={activeFilters.includes(f) ? "default" : "outline"}
            className="cursor-pointer"
            onClick={() => toggleFilter(f)}
          >
            {f}
          </Badge>
        ))}
      </div>

      {/* Grid */}
      {filtered.length === 0 ? (
        <div className="text-center py-20 text-muted-foreground">
          <p className="text-lg">No dishes found matching your criteria.</p>
        </div>
      ) : (
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
          {filtered.map((item) => (
            <FoodCard key={item.id} item={item} onCustomize={setCustomizeItem} />
          ))}
        </div>
      )}

      <FoodCustomization
        item={customizeItem}
        open={!!customizeItem}
        onClose={() => setCustomizeItem(null)}
      />
    </main>
  );
}
