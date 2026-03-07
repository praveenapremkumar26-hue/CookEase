import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CheckCircle2, Circle, Clock, Package, MapPin, Truck } from "lucide-react";
import { Link } from "react-router-dom";
import { useCart, Order } from "@/context/CartContext";

export default function OrderTracking() {
  const { orders } = useCart();

  if (orders.length === 0) {
    return (
      <main className="container mx-auto px-4 py-20 text-center max-w-2xl">
        <Package className="mx-auto h-16 w-16 text-muted-foreground/40 mb-4" />
        <h1 className="text-2xl font-bold text-foreground mb-2">No Active Orders</h1>
        <p className="text-muted-foreground mb-6">Looks like you haven't placed any orders yet.</p>
        <Link to="/menu">
          <Button className="w-full sm:w-auto">Browse Menu</Button>
        </Link>
      </main>
    );
  }

  const steps = [
    { label: "Order Placed", description: "We have received your order", icon: Package, key: "placed" },
    { label: "Preparing", description: "Your order is being prepared", icon: Clock, key: "preparing" },
    { label: "Out for Delivery", description: "Rider is on the way", icon: Truck, key: "out-for-delivery" },
    { label: "Delivered", description: "Enjoy your items", icon: MapPin, key: "delivered" },
  ];

  const getStatusLevel = (status: Order["status"]) => {
    const levels = { preparing: 1, "out-for-delivery": 2, delivered: 3 };
    return levels[status];
  };

  return (
    <main className="container mx-auto px-4 py-12 max-w-2xl">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-foreground mb-2">Track Your Orders</h1>
        <p className="text-muted-foreground">You have {orders.length} active order(s)</p>
      </div>

      {orders.map((order, orderIndex) => {
        const currentLevel = getStatusLevel(order.status);

        return (
          <Card key={order.orderId} className="mb-8 overflow-hidden">
            <div className="bg-accent/30 px-6 py-4 flex justify-between items-center border-b border-border/50">
              <div>
                <h3 className="font-semibold text-lg">Order #{order.orderId}</h3>
                <p className="text-sm text-muted-foreground">
                  {new Date(order.placedAt).toLocaleString([], { dateStyle: 'short', timeStyle: 'short' })}
                </p>
              </div>
              <div className="text-right">
                <span className="font-bold text-primary">${order.totalPrice.toFixed(2)}</span>
                <p className="text-sm text-muted-foreground">{order.items.length} items</p>
              </div>
            </div>

            <CardContent className="pt-6">
              <div className="mb-6 pb-6 border-b border-border/50">
                <h4 className="font-medium mb-3">Items Ordered</h4>
                <div className="space-y-3">
                  {order.items.map((item) => (
                    <div key={item.id + item.cartId} className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded bg-accent flex items-center justify-center text-xl shrink-0">
                        {item.emoji}
                      </div>
                      <div className="flex-1">
                        <p className="text-sm font-medium">{item.name}</p>
                        <p className="text-xs text-muted-foreground">Qty: {item.quantity}</p>
                      </div>
                      <div className="text-sm font-medium">
                        ${(item.price * item.quantity).toFixed(2)}
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              <div>
                <h4 className="font-medium mb-4">Tracking Status</h4>
                <div className="relative border-l-2 border-primary/20 ml-4 md:ml-6 space-y-6 pl-8 py-2">
                  {steps.map((step, index) => {
                    let stepStatus = "upcoming";
                    if (index < currentLevel) stepStatus = "completed";
                    if (index === currentLevel) stepStatus = "current";

                    return (
                      <div key={index} className="relative">
                        <span className="absolute -left-[41px] top-0 bg-background p-1">
                          {stepStatus === "completed" ? (
                            <CheckCircle2 className="h-6 w-6 text-primary fill-primary/20" />
                          ) : stepStatus === "current" ? (
                            <Circle className="h-6 w-6 text-primary animate-pulse" />
                          ) : (
                            <Circle className="h-6 w-6 text-muted-foreground/30" />
                          )}
                        </span>
                        <div>
                          <h3 className={`font-semibold ${stepStatus === "upcoming" ? "text-muted-foreground" : ""}`}>
                            {step.label}
                          </h3>
                          <p className="text-sm text-muted-foreground mt-1">{step.description}</p>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        );
      })}

      <div className="flex flex-col sm:flex-row gap-4 justify-center mt-8 pt-4">
        <Link to="/menu" className="w-full sm:w-auto">
          <Button variant="outline" className="w-full">Continue Shopping</Button>
        </Link>
        <Link to="/" className="w-full sm:w-auto">
          <Button className="w-full">Go to Home</Button>
        </Link>
      </div>
    </main>
  );
}
