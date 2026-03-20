import { useState } from "react";
import { Input } from "@/components/ui/input";
import { foodItems, categories, dietaryFilters, type FoodItem } from "@/data/menuData";
import FoodCard from "@/components/FoodCard";
import FoodCustomization from "@/components/FoodCustomization";

export default function Menu() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [customizeItem, setCustomizeItem] = useState<FoodItem | null>(null);

  const toggleFilter = (f: string) => {
    if (activeFilters.includes(f)) {
      setActiveFilters(activeFilters.filter((x) => x !== f));
    } else {
      setActiveFilters([...activeFilters, f]);
    }
  };

  // Simple filtering (not memoized, more "beginner")
  const filtered = foodItems.filter((item) => {
    if (category !== "All" && item.category !== category) return false;
    if (search && !item.name.toLowerCase().includes(search.toLowerCase()) && !item.description.toLowerCase().includes(search.toLowerCase())) return false;
    if (activeFilters.length > 0 && !activeFilters.some((f) => item.tags.includes(f))) return false;
    return true;
  });

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">Our Menu</h1>
      <p className="text-muted-foreground mb-6">Fresh, healthy meals customized to your dietary needs.</p>

      {/* Search */}
      <div className="relative max-w-md mb-6">
        <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">🔍</span>
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
            className={`px-4 py-1.5 rounded-full text-sm font-medium border transition-colors ${
              category === cat
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border hover:bg-accent"
            }`}
          >
            {cat}
          </button>
        ))}
      </div>

      {/* Dietary filters */}
      <div className="flex flex-wrap gap-2 mb-8">
        {dietaryFilters.map((f) => (
          <span
            key={f}
            className={`cursor-pointer px-2.5 py-0.5 rounded-full text-xs font-semibold border ${
              activeFilters.includes(f)
                ? "bg-primary text-primary-foreground border-primary"
                : "bg-background text-foreground border-border"
            }`}
            onClick={() => toggleFilter(f)}
          >
            {f}
          </span>
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
