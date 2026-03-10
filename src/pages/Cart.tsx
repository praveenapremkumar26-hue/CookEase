import { useCart } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Trash2, Minus, Plus, ShoppingBag, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { toast } from "sonner";
import { useState } from "react";

export default function Cart() {
  const { items, removeItem, updateQuantity, clearCart, totalPrice } = useCart();
  const [isPaying, setIsPaying] = useState(false);

  // Simulated payment gateway handler
  const handlePayment = async () => {
    setIsPaying(true);
    // TODO: Replace this with real payment gateway integration (e.g., Stripe, Razorpay)
    await new Promise((res) => setTimeout(res, 2000)); // Simulate payment delay
    setIsPaying(false);
    toast.success("Payment successful! Order placed.", {
      description: `Total: ₹${totalPrice.toFixed(2)}. Replace with real payment confirmation.`,
    });
    clearCart();
  };

  if (items.length === 0) {
    return (
      <main className="container mx-auto px-4 py-20 text-center">
        <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground/40 mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">Your cart is empty</h1>
        <p className="text-muted-foreground mb-6">Add some delicious items to get started!</p>
        <Link to="/menu">
          <Button className="gap-2">Browse Menu <ArrowRight className="h-4 w-4" /></Button>
        </Link>
      </main>
    );
  }

  return (
    <main className="container mx-auto px-4 py-8 max-w-3xl">
      <h1 className="text-3xl font-bold text-foreground mb-6">Your Cart</h1>

      <div className="space-y-4">
        {items.map((item) => (
          <div key={item.cartId} className="flex gap-4 p-4 rounded-xl border bg-card">
            <div className="w-16 h-16 rounded-lg bg-accent flex items-center justify-center text-3xl shrink-0">
              {item.emoji}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-start justify-between gap-2">
                <div>
                  <h3 className="font-semibold text-sm">{item.name}</h3>
                  <Badge variant="secondary" className="text-[10px] mt-1">
                    {item.type === "food" ? "Food" : item.type === "utensil" ? "Rental" : "Cook Booking"}
                  </Badge>
                </div>
                <span className="font-bold text-primary">₹{(item.price * item.quantity).toFixed(2)}</span>
              </div>

              {item.customizations && (
                <div className="mt-2 text-xs text-muted-foreground space-y-0.5">
                  {item.customizations.healthOptions.length > 0 && (
                    <p>🏥 {item.customizations.healthOptions.join(", ")}</p>
                  )}
                  {item.customizations.allergyNotes && <p>⚠️ {item.customizations.allergyNotes}</p>}
                  {item.customizations.instructions && <p>📝 {item.customizations.instructions}</p>}
                </div>
              )}
              {item.rentalDays && (
                <p className="text-xs text-muted-foreground mt-1">📅 {item.rentalDays} day(s) rental</p>
              )}
              {item.cookHours && (
                <p className="text-xs text-muted-foreground mt-1">⏱️ {item.cookHours} hour(s) booking</p>
              )}

              <div className="flex items-center gap-2 mt-3">
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateQuantity(item.cartId, item.quantity - 1)}
                >
                  <Minus className="h-3 w-3" />
                </Button>
                <span className="text-sm font-medium w-6 text-center">{item.quantity}</span>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-7 w-7"
                  onClick={() => updateQuantity(item.cartId, item.quantity + 1)}
                >
                  <Plus className="h-3 w-3" />
                </Button>
                <Button
                  variant="ghost"
                  size="icon"
                  className="h-7 w-7 ml-auto text-destructive"
                  onClick={() => removeItem(item.cartId)}
                >
                  <Trash2 className="h-3.5 w-3.5" />
                </Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Summary */}
      <div className="mt-8 rounded-xl border bg-card p-6 space-y-4">
        <div className="flex justify-between text-lg font-bold">
          <span>Total</span>
          <span className="text-primary">₹{totalPrice.toFixed(2)}</span>
        </div>
        <Link to="/payment">
          <Button className="w-full gap-2" size="lg">
            Proceed to Payment <ArrowRight className="h-4 w-4" />
          </Button>
        </Link>
        <p className="text-xs text-center text-muted-foreground">
          Choose your payment method on the next page.
        </p>
      </div>
    </main>
  );
}
