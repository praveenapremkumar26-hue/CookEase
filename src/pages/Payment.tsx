import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";
import { Separator } from "@/components/ui/separator";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

const paymentMethods = [
  { id: "card", label: "Credit/Debit Card" },
  { id: "upi", label: "UPI" },
  { id: "cod", label: "Cash on Delivery" },
];

export default function Payment() {
  const [method, setMethod] = useState("card");
  const [isPaying, setIsPaying] = useState(false);
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [upiId, setUpiId] = useState("");
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
      description: `Paid ₹${finalTotal.toFixed(2)} by ${paymentMethods.find((m) => m.id === method)?.label}`,
    });

    placeOrder(newOrder);
    navigate("/tracking");
  };

  const taxAmount = totalPrice * 0.05; // 5% tax
  const finalTotal = totalPrice + taxAmount;

  const isFormValid = () => {
    if (method === "card") return cardNumber.length >= 15 && expiry.length >= 4 && cvv.length >= 3;
    if (method === "upi") return upiId.length > 3;
    return true; // COD
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-md">
      <Card className="mb-6">
        <CardHeader>
          <CardTitle>Bill Details</CardTitle>
        </CardHeader>
        <CardContent className="space-y-3">
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Subtotal</span>
            <span className="font-medium">₹{totalPrice.toFixed(2)}</span>
          </div>
          <div className="flex justify-between text-sm">
            <span className="text-muted-foreground">Tax (5%)</span>
            <span className="font-medium">₹{taxAmount.toFixed(2)}</span>
          </div>
          <Separator className="my-2" />
          <div className="flex justify-between text-lg font-bold">
            <span>Total</span>
            <span className="text-primary">₹{finalTotal.toFixed(2)}</span>
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

          {method === "card" && (
            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="cardNumber">Card Number</Label>
                <Input id="cardNumber" placeholder="0000 0000 0000 0000" value={cardNumber} onChange={(e) => setCardNumber(e.target.value)} />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="expiry">Expiry Date</Label>
                  <Input id="expiry" placeholder="MM/YY" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="cvv">CVV</Label>
                  <Input id="cvv" placeholder="123" value={cvv} onChange={(e) => setCvv(e.target.value)} />
                </div>
              </div>
            </div>
          )}

          {method === "upi" && (
            <div className="space-y-4 mb-6">
              <div className="space-y-2">
                <Label htmlFor="upiId">UPI ID / Number</Label>
                <Input id="upiId" placeholder="example@upi or 9876543210" value={upiId} onChange={(e) => setUpiId(e.target.value)} />
              </div>
            </div>
          )}

          <Button className="w-full" size="lg" onClick={handlePay} disabled={isPaying || totalPrice === 0 || !isFormValid()}>
            {isPaying ? "Processing..." : `Pay ₹${finalTotal.toFixed(2)} & Place Order`}
          </Button>
        </CardContent>
      </Card>
    </main>
  );
}
