import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { Separator } from "@/components/ui/separator";

const paymentMethods = [
  { id: "card", label: "Credit/Debit Card" },
  { id: "upi", label: "UPI" },
  { id: "cod", label: "Cash on Delivery" },
];

export default function Payment() {
  const [method, setMethod] = useState("card");
  const [isPaying, setIsPaying] = useState(false);
  const navigate = useNavigate();
  const { items, placeOrder, totalPrice } = useCart();

  const handlePay = async () => {
    setIsPaying(true);
    // Simulate payment processing
    await new Promise((res) => setTimeout(res, 1500));
    setIsPaying(false);

    const newOrder = {
      orderId: Math.floor(100000 + Math.random() * 900000).toString(),
      items: [...items],
      totalPrice: finalTotal,
      status: "preparing" as const,
      placedAt: Date.now(),
    };

    toast.success(`Payment successful! Order placed.`, {
      description: `Paid $${finalTotal.toFixed(2)} by ${paymentMethods.find((m) => m.id === method)?.label}`,
    });

    placeOrder(newOrder);
    navigate("/tracking");
  };

  const taxAmount = totalPrice * 0.05; // 5% tax
  const finalTotal = totalPrice + taxAmount;

  return (
    <main className="container mx-auto px-4 py-12 max-w-md">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Bill Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">${totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (5%)</span>
            <span className="font-medium">${taxAmount.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">${finalTotal.toFixed(2)}</span>
          </div>
        </CardContent>
      </Card>

      <Card>
        <CardHeader>
          <CardTitle>Choose Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={method} onValueChange={setMethod} className="mb-6 space-y-3">
            {paymentMethods.map((opt) => (
              <div key={opt.id} className="flex items-center space-x-3 border p-3 rounded-lg cursor-pointer hover:bg-accent/50 transition-colors" onClick={() => setMethod(opt.id)}>
                <RadioGroupItem value={opt.id} id={opt.id} />
                <label htmlFor={opt.id} className="text-sm font-medium leading-none cursor-pointer flex-1">
                  {opt.label}
                </label>
              </div>
            ))}
          </RadioGroup>
          <Button className="w-full" size="lg" onClick={handlePay} disabled={isPaying || totalPrice === 0}>
            {isPaying ? "Processing..." : `Pay $${finalTotal.toFixed(2)} & Place Order`}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
