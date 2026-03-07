import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

const paymentMethods = [
  { id: "card", label: "Credit/Debit Card" },
  { id: "upi", label: "UPI" },
  { id: "cod", label: "Cash on Delivery" },
];

export default function Payment() {
  const [method, setMethod] = useState("card");
  const [isPaying, setIsPaying] = useState(false);
  const navigate = useNavigate();
  const { clearCart, totalPrice } = useCart();

  const handlePay = async () => {
    setIsPaying(true);
    // Simulate payment processing
    await new Promise((res) => setTimeout(res, 1500));
    setIsPaying(false);
    toast.success(`Payment successful! Order placed.`, {
      description: `Paid $${totalPrice.toFixed(2)} by ${paymentMethods.find((m) => m.id === method)?.label}`,
    });
    clearCart();
    navigate("/cart?paid=1");
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-md">
      <Card>
        <CardHeader>
          <CardTitle>Choose Payment Method</CardTitle>
        </CardHeader>
        <CardContent>
          <RadioGroup value={method} onValueChange={setMethod} className="mb-6 space-y-3">
            {paymentMethods.map((opt) => (
              <RadioGroupItem key={opt.id} value={opt.id} className="flex items-center gap-2">
                {opt.label}
              </RadioGroupItem>
            ))}
          </RadioGroup>
          <Button className="w-full" size="lg" onClick={handlePay} disabled={isPaying}>
            {isPaying ? "Processing..." : "Pay & Place Order"}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
