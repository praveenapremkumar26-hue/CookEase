import { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Separator } from "@/components/ui/separator";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { toast } from "sonner";
import { useCart } from "@/context/CartContext";

const paymentMethods = [
    { id: "card", label: "Credit/Debit Card" },
    { id: "upi", label: "UPI" },
    { id: "cash", label: "Cash" },
];

export default function CookPayment() {
    const { contractId } = useParams();
    const navigate = useNavigate();
    const { contracts, completeContract } = useCart();

    const contract = contracts?.find(c => c.id === contractId);

    const [method, setMethod] = useState("card");
    const [tip, setTip] = useState(0);
    const [review, setReview] = useState("");
    const [isPaying, setIsPaying] = useState(false);

    if (!contract || contract.status === "completed") {
        return (
            <main className="container mx-auto px-4 py-20 text-center">
                <h1 className="text-2xl font-bold mb-4">Contract Not Found or Already Paid</h1>
                <Button onClick={() => navigate("/cook-management")}>Back to Management</Button>
            </main>
        );
    }

    const basePay = contract.totalCost;
    const finalTotal = basePay + tip;

    const handlePayment = async () => {
        setIsPaying(true);
        // Simulate payment processing
        await new Promise((res) => setTimeout(res, 1500));
        setIsPaying(false);

        completeContract(contract.id, tip, review);

        toast.success(`Payment successful!`, {
            description: `Paid $${finalTotal.toFixed(2)} to ${contract.cookName}.`,
        });

        navigate("/cook-management");
    };

    return (
        <main className="container mx-auto px-4 py-12 max-w-lg">
            <div className="mb-8">
                <h1 className="text-3xl font-bold text-foreground">Finalize Contract</h1>
                <p className="text-muted-foreground mt-2">
                    Complete payment and review your experience with {contract.cookName}.
                </p>
            </div>

            <Card className="mb-6 border-primary/20">
                <CardContent className="p-6">
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-16 h-16 rounded-xl bg-accent flex items-center justify-center text-4xl shrink-0">
                            {contract.emoji}
                        </div>
                        <div>
                            <h2 className="text-xl font-bold">{contract.cookName}</h2>
                            <p className="text-sm text-muted-foreground">{contract.hoursBooked} hours booked</p>
                        </div>
                    </div>

                    <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                            <span className="text-muted-foreground">Base Contract Pay</span>
                            <span className="font-medium">${basePay.toFixed(2)}</span>
                        </div>

                        <div className="pt-2">
                            <Label htmlFor="tip" className="text-sm text-muted-foreground mb-2 block">
                                Add a Tip (Optional)
                            </Label>
                            <div className="relative">
                                <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground">$</span>
                                <Input
                                    id="tip"
                                    type="number"
                                    min="0"
                                    step="1"
                                    className="pl-7"
                                    value={tip || ""}
                                    onChange={(e) => setTip(parseFloat(e.target.value) || 0)}
                                    placeholder="0.00"
                                />
                            </div>
                        </div>

                        <Separator className="my-4" />
                        <div className="flex justify-between text-lg font-bold">
                            <span>Total Payment</span>
                            <span className="text-primary">${finalTotal.toFixed(2)}</span>
                        </div>
                    </div>
                </CardContent>
            </Card>

            <Card className="mb-6">
                <CardHeader>
                    <CardTitle>Leave a Review</CardTitle>
                    <CardDescription>Tell us about your experience with {contract.cookName}</CardDescription>
                </CardHeader>
                <CardContent>
                    <Textarea
                        placeholder="They were an amazing chef! The pasta was perfectly al dente..."
                        className="min-h-[100px] resize-none"
                        value={review}
                        onChange={(e) => setReview(e.target.value)}
                    />
                </CardContent>
            </Card>

            <Card>
                <CardHeader>
                    <CardTitle>Payment Method</CardTitle>
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
                    <Button
                        className="w-full"
                        size="lg"
                        onClick={handlePayment}
                        disabled={isPaying}
                    >
                        {isPaying ? "Processing..." : `Finalize & Pay $${finalTotal.toFixed(2)}`}
                    </Button>
                </CardContent>
            </Card>
        </main>
    );
}
