import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { cooks } from "@/data/menuData";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Badge } from "@/components/ui/badge";
import { useCart } from "@/context/CartContext";
import { Star, Plus } from "lucide-react";
import { toast } from "sonner";

export default function CookHiring() {
  const { startContract } = useCart();
  const [hours, setHours] = useState<Record<string, number>>({});
  const navigate = useNavigate();

  const handleHire = (cook: typeof cooks[0]) => {
    const h = hours[cook.id] || 1;
    const isFullDay = h >= 8;
    const price = isFullDay ? cook.fullDayRate * Math.ceil(h / 8) : cook.hourlyRate * h;

    startContract({
      id: `${cook.id}-${Date.now()}`,
      cookId: cook.id,
      cookName: cook.name,
      emoji: cook.emoji,
      hourlyRate: price / h, // estimated average
      hoursBooked: h,
      totalCost: price,
      startTime: Date.now(),
      status: "active" as const
    });

    toast.success(`Contract started with ${cook.name} for ${h} hour(s)`);
    navigate("/cook-management");
  };

  return (
    <main className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold text-foreground mb-2">Hire a Cook</h1>
      <p className="text-muted-foreground mb-8">Book professional chefs for your events and gatherings.</p>

      <div className="grid sm:grid-cols-2 gap-6">
        {cooks.map((cook) => (
          <div key={cook.id} className="rounded-xl border bg-card p-6 hover:shadow-md transition-shadow">
            <div className="flex items-start gap-4">
              <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center text-4xl shrink-0">
                {cook.emoji}
              </div>
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <h3 className="font-semibold">{cook.name}</h3>
                  {!cook.available && <Badge variant="secondary">Unavailable</Badge>}
                </div>
                <p className="text-sm text-muted-foreground">{cook.specialty}</p>
                <div className="flex items-center gap-1 mt-1 text-sm">
                  <Star className="h-3.5 w-3.5 fill-primary text-primary" />
                  <span className="font-medium">{cook.rating}</span>
                </div>
              </div>
            </div>

            <div className="mt-4 flex items-center gap-4 text-sm">
              <span className="text-primary font-bold">${cook.hourlyRate}/hr</span>
              <span className="text-muted-foreground">•</span>
              <span className="text-primary font-bold">${cook.fullDayRate}/day</span>
            </div>

            <div className="mt-4 flex items-end gap-2">
              <div className="flex-1">
                <Label htmlFor={`hours-${cook.id}`} className="text-xs">Hours</Label>
                <Input
                  id={`hours-${cook.id}`}
                  type="number"
                  min={1}
                  max={24}
                  value={hours[cook.id] || 1}
                  onChange={(e) => setHours({ ...hours, [cook.id]: Math.max(1, parseInt(e.target.value) || 1) })}
                  className="h-9"
                  disabled={!cook.available}
                />
              </div>
              <Button
                size="sm"
                className="gap-1"
                disabled={!cook.available}
                onClick={() => handleHire(cook)}
              >
                <Plus className="h-3.5 w-3.5" /> Book
              </Button>
            </div>
          </div>
        ))}
      </div>
    </main>
  );
}
