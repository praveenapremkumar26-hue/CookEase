import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { healthOptions, type FoodItem } from "@/data/menuData";
import { useCart } from "@/context/CartContext";
import { ShieldCheck } from "lucide-react";

interface Props {
  item: FoodItem | null;
  open: boolean;
  onClose: () => void;
}

export default function FoodCustomization({ item, open, onClose }: Props) {
  const { addItem } = useCart();
  const [selected, setSelected] = useState<string[]>([]);
  const [allergyNotes, setAllergyNotes] = useState("");
  const [instructions, setInstructions] = useState("");

  const toggle = (opt: string) =>
    setSelected((prev) => (prev.includes(opt) ? prev.filter((o) => o !== opt) : [...prev, opt]));

  const handleAdd = () => {
    if (!item) return;
    addItem({
      id: item.id,
      cartId: `${item.id}-custom-${Date.now()}`,
      type: "food",
      name: item.name,
      price: item.price,
      quantity: 1,
      emoji: item.emoji,
      customizations: {
        healthOptions: selected,
        allergyNotes,
        instructions,
      },
    });
    setSelected([]);
    setAllergyNotes("");
    setInstructions("");
    onClose();
  };

  if (!item) return null;

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg max-h-[85vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle className="flex items-center gap-2">
            <ShieldCheck className="h-5 w-5 text-primary" />
            Customize: {item.name}
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-5 py-2">
          <div>
            <Label className="text-sm font-semibold mb-3 block">Health & Dietary Preferences</Label>
            <div className="grid grid-cols-2 gap-2">
              {healthOptions.map((opt) => (
                <label
                  key={opt}
                  className="flex items-center gap-2 rounded-lg border px-3 py-2 cursor-pointer hover:bg-accent transition-colors text-sm"
                >
                  <Checkbox
                    checked={selected.includes(opt)}
                    onCheckedChange={() => toggle(opt)}
                  />
                  {opt}
                </label>
              ))}
            </div>
          </div>

          <div>
            <Label htmlFor="allergy" className="text-sm font-semibold">
              Allergy Notes & Medical Conditions
            </Label>
            <Input
              id="allergy"
              placeholder="e.g., Peanut allergy, shellfish intolerance..."
              value={allergyNotes}
              onChange={(e) => setAllergyNotes(e.target.value)}
              className="mt-1.5"
            />
          </div>

          <div>
            <Label htmlFor="instructions" className="text-sm font-semibold">
              Custom Instructions
            </Label>
            <Textarea
              id="instructions"
              placeholder="Any special preparation requests..."
              value={instructions}
              onChange={(e) => setInstructions(e.target.value)}
              className="mt-1.5"
              rows={3}
            />
          </div>
        </div>

        <DialogFooter>
          <Button variant="outline" onClick={onClose}>Cancel</Button>
          <Button onClick={handleAdd}>Add to Cart</Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
