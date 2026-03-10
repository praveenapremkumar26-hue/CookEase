import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Plus } from "lucide-react";
import type { FoodItem } from "@/data/menuData";

interface FoodCardProps {
  item: FoodItem;
  onCustomize: (item: FoodItem) => void;
}

export default function FoodCard({ item, onCustomize }: FoodCardProps) {


  return (
    <div className="group rounded-xl border bg-card overflow-hidden hover:shadow-lg transition-all duration-300">
      <div className="h-40 bg-accent flex items-center justify-center text-6xl group-hover:scale-105 transition-transform duration-300">
        {item.emoji}
      </div>
      <div className="p-4 space-y-3">
        <div className="flex items-start justify-between gap-2">
          <h3 className="font-semibold text-sm leading-tight">{item.name}</h3>
          <span className="font-bold text-primary whitespace-nowrap">₹{item.price.toFixed(2)}</span>
        </div>
        <p className="text-xs text-muted-foreground line-clamp-2">{item.description}</p>
        <div className="flex flex-wrap gap-1">
          {item.tags.slice(0, 3).map((tag) => (
            <Badge key={tag} variant="secondary" className="text-[10px] px-1.5 py-0">
              {tag}
            </Badge>
          ))}
        </div>
        <div className="flex gap-2 pt-1">
          <Button size="sm" className="flex-1 gap-1" onClick={() => onCustomize(item)}>
            <Plus className="h-3.5 w-3.5" /> Customize & Add
          </Button>
        </div>
      </div>
    </div>
  );
}
