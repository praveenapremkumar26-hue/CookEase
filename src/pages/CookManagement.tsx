import { useCart, CookContract } from "@/context/CartContext";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ClipboardList, Clock, CheckCircle } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

export default function CookManagement() {
    const { contracts } = useCart();
    const navigate = useNavigate();
    // We use this to force-render time elapsed calculations every minute
    const [now, setNow] = useState(Date.now());

    useEffect(() => {
        const timer = setInterval(() => setNow(Date.now()), 60000); // update every minute
        return () => clearInterval(timer);
    }, []);

    const handlePayCook = (contractId: string) => {
        navigate(`/cook-payment/${contractId}`);
    };

    const calculateProgress = (contract: CookContract) => {
        const elapsedMinutes = Math.max(0, Math.floor((now - contract.startTime) / 60000));
        const totalMinutesBooked = contract.hoursBooked * 60;

        // Cap progress at 100%
        const progressPercent = Math.min(100, Math.floor((elapsedMinutes / totalMinutesBooked) * 100));

        return {
            elapsedMinutes,
            totalMinutesBooked,
            progressPercent,
            isOvertime: elapsedMinutes > totalMinutesBooked
        };
    };

    if (!contracts || contracts.length === 0) {
        return (
            <main className="container mx-auto px-4 py-20 text-center max-w-2xl">
                <ClipboardList className="mx-auto h-16 w-16 text-muted-foreground/40 mb-4" />
                <h1 className="text-2xl font-bold text-foreground mb-2">No active cook contracts</h1>
                <p className="text-muted-foreground mb-6">Looking for a professional chef to cook for you?</p>
                <Link to="/hire-cook">
                    <Button className="w-full sm:w-auto">Hire a Cook</Button>
                </Link>
            </main>
        );
    }

    const activeContracts = contracts.filter(c => c.status === "active");
    const completedContracts = contracts.filter(c => c.status === "completed");

    return (
        <main className="container mx-auto px-4 py-12 max-w-3xl">
            <div className="mb-8 flex justify-between items-end">
                <div>
                    <h1 className="text-3xl font-bold text-foreground mb-2 flex items-center gap-2">
                        <ClipboardList className="h-8 w-8 text-primary" />
                        Cook Management
                    </h1>
                    <p className="text-muted-foreground">Monitor and manage your hired professionals</p>
                </div>
            </div>

            {activeContracts.length > 0 && (
                <section className="mb-12">
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2">
                        <Clock className="h-5 w-5 text-amber-500" /> Active Contracts
                    </h2>
                    <div className="space-y-4">
                        {activeContracts.map((contract) => {
                            const { elapsedMinutes, totalMinutesBooked, progressPercent, isOvertime } = calculateProgress(contract);

                            return (
                                <Card key={contract.id} className="border-primary/20 bg-primary/5">
                                    <CardContent className="p-6">
                                        <div className="flex flex-col md:flex-row gap-6">
                                            <div className="w-16 h-16 rounded-xl bg-background flex items-center justify-center text-4xl shrink-0 shadow-sm border">
                                                {contract.emoji}
                                            </div>

                                            <div className="flex-1 space-y-4">
                                                <div className="flex justify-between items-start">
                                                    <div>
                                                        <h3 className="font-bold text-lg">{contract.cookName}</h3>
                                                        <p className="text-sm text-muted-foreground">
                                                            Started: {new Date(contract.startTime).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                                                        </p>
                                                    </div>
                                                    <Badge variant="outline" className="border-amber-500 text-amber-600 bg-amber-50">
                                                        In Progress
                                                    </Badge>
                                                </div>

                                                <div className="space-y-1">
                                                    <div className="flex justify-between text-sm">
                                                        <span className="text-muted-foreground">Contract Time</span>
                                                        <span className="font-medium">
                                                            {Math.floor(elapsedMinutes / 60)}h {elapsedMinutes % 60}m / {contract.hoursBooked}h 0m
                                                        </span>
                                                    </div>
                                                    <div className="w-full bg-accent rounded-full h-2">
                                                        <div
                                                            className={`h-2 rounded-full ${isOvertime ? 'bg-destructive' : 'bg-primary'}`}
                                                            style={{ width: `${progressPercent}%` }}
                                                        />
                                                    </div>
                                                    {isOvertime && (
                                                        <p className="text-xs text-destructive text-right mt-1 font-medium">Overtime rates may apply</p>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    </CardContent>
                                    <CardFooter className="bg-background/50 border-t p-4 flex justify-between items-center">
                                        <div>
                                            <p className="text-sm text-muted-foreground">Base Contract Total</p>
                                            <p className="font-bold text-lg">${contract.totalCost.toFixed(2)}</p>
                                        </div>
                                        <Button onClick={() => handlePayCook(contract.id)}>
                                            Complete & Pay <CheckCircle className="ml-2 h-4 w-4" />
                                        </Button>
                                    </CardFooter>
                                </Card>
                            );
                        })}
                    </div>
                </section>
            )}

            {completedContracts.length > 0 && (
                <section>
                    <h2 className="text-xl font-bold mb-4 flex items-center gap-2 text-muted-foreground">
                        <CheckCircle className="h-5 w-5" /> Completed Contracts
                    </h2>
                    <div className="space-y-4">
                        {completedContracts.map((contract) => (
                            <Card key={contract.id} className="opacity-75 hover:opacity-100 transition-opacity">
                                <CardContent className="p-4 flex items-center gap-4">
                                    <div className="w-12 h-12 rounded-lg bg-accent flex items-center justify-center text-2xl shrink-0">
                                        {contract.emoji}
                                    </div>
                                    <div className="flex-1">
                                        <h3 className="font-semibold">{contract.cookName}</h3>
                                        <p className="text-xs text-muted-foreground">
                                            {new Date(contract.startTime).toLocaleDateString()} for {contract.hoursBooked}h
                                        </p>
                                    </div>
                                    <div className="text-right">
                                        <p className="font-bold">${((contract.totalCost || 0) + (contract.tipAmount || 0)).toFixed(2)}</p>
                                        {contract.tipAmount && contract.tipAmount > 0 ? (
                                            <p className="text-xs text-green-600">Includes ${contract.tipAmount.toFixed(2)} tip</p>
                                        ) : null}
                                    </div>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            )}
        </main>
    );
}
