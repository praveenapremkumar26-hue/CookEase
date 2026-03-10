import { useState } from "react";
import { utensils } from "@/data/menuData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useCart } from "@/context/CartContext";
import { Plus } from "lucide-react";
import { toast } from "sonner";

export default function Utensils() {
  const { addItem } = useCart();
  const [days, setDays] = useState<Record<string, number>>({});

  const handleAdd = (utensil: typeof utensils[0]) => {
    const rentalDays = days[utensil.id] || 1;
    addItem({
      id: utensil.id,
      cartId: `${utensil.id}-${Date.now()}`,
      type: "utensil",
      name: utensil.name,
      price: utensil.pricePerDay * rentalDays,
      quantity: 1,
      emoji: utensil.emoji,
      rentalDays,
    });
    toast.success(`${utensil.name} added for ${rentalDays} day(s)`);
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">Utensil Rental</h1>
      <p className="text-muted-foreground mb-8">Rent premium tableware and equipment for your events.</p>

      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {utensils.map((u) => (
          <div key={u.id} className="rounded-xl border bg-card overflow-hidden hover:shadow-md transition-shadow">
            <div className="h-36 bg-accent flex items-center justify-center text-6xl">
              {u.emoji}
            </div>
            <div className="p-4 space-y-3">
              <h3 className="font-semibold">{u.name}</h3>
              <p className="text-sm text-muted-foreground">{u.description}</p>
              <div className="flex items-center justify-between">
                <span className="font-bold text-primary">₹{u.pricePerDay}/day</span>
                <span className="text-xs text-muted-foreground">{u.available} available</span>
              </div>
              <div className="flex items-end gap-2">
                <div className="flex-1">
                  <Label htmlFor={`days-${u.id}`} className="text-xs">Days</Label>
                  <Input
                    id={`days-${u.id}`}
                    type="number"
                    min={1}
                    max={30}
                    value={days[u.id] || 1}
                    onChange={(e) => setDays({ ...days, [u.id]: Math.max(1, parseInt(e.target.value) || 1) })}
                    className="h-9"
                  />
                </div>
                <Button size="sm" className="gap-1" onClick={() => handleAdd(u)}>
                  <Plus className="h-3.5 w-3.5" /> Add
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
