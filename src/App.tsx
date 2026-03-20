import { useState } from "react";
import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Link, useLocation } from "react-router-dom";
import { CartProvider, useCart } from "./context/CartContext";
import { AuthProvider, useAuth } from "./context/AuthContext";
import { ShoppingCart, Menu, X, Leaf, Package, ClipboardList, LogOut, User } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";

import Index from "./pages/Index";
import MenuPage from "./pages/Menu"; // Renamed to avoid confusion with Lucide Menu
import Cart from "./pages/Cart";
import Utensils from "./pages/Utensils";
import CookHiring from "./pages/CookHiring";
import NotFound from "./pages/NotFound";
import Payment from "./pages/Payment";
import OrderTracking from "./pages/OrderTracking";
import CookManagement from "./pages/CookManagement";
import CookPayment from "./pages/CookPayment";
import Login from "./pages/Login";
import Register from "./pages/Register";

const queryClient = new QueryClient();

// This is the main Navbar logic now inside App.tsx
const NavbarSection = () => {
  const { totalItems } = useCart();
  const { user, isAuthenticated, logout } = useAuth();
  const location = useLocation();
  const [mobileOpen, setMobileOpen] = useState(false);

  const navLinks = [
    { to: "/", label: "Home" },
    { to: "/menu", label: "Menu" },
    { to: "/utensils", label: "Utensils" },
    { to: "/hire-cook", label: "Hire a Cook" },
  ];

  return (
    <header className="sticky top-0 z-50 border-b bg-background">
      <nav className="container mx-auto flex h-16 items-center justify-between px-4">
        <Link to="/" className="flex items-center gap-2 font-bold text-xl text-primary">
          <Leaf className="h-6 w-6" />
          FreshBite
        </Link>

        {/* Desktop nav */}
        <div className="hidden md:flex items-center gap-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              className={`px-4 py-2 rounded-lg text-sm font-medium ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </div>

        <div className="flex items-center gap-2">
          <Link to="/cart">
            <Button variant="outline" size="icon" className="relative">
              <ShoppingCart className="h-5 w-5" />
              {totalItems > 0 && (
                <Badge className="absolute -top-2 -right-2 h-5 w-5 flex items-center justify-center p-0 text-xs">
                  {totalItems}
                </Badge>
              )}
            </Button>
          </Link>
          <Link to="/tracking">
            <Button variant="ghost" size="icon">
              <Package className="h-5 w-5" />
            </Button>
          </Link>
          <Link to="/cook-management">
            <Button variant="ghost" size="icon">
              <ClipboardList className="h-5 w-5" />
            </Button>
          </Link>

          <div className="hidden md:flex items-center ml-2 border-l pl-4">
            {isAuthenticated && user ? (
              <div className="flex items-center gap-4">
                <span className="text-sm font-medium flex items-center gap-2">
                  <User className="h-4 w-4" /> {user.name}
                </span>
                <Button variant="ghost" size="sm" onClick={logout} className="gap-2">
                  <LogOut className="h-4 w-4" /> Logout
                </Button>
              </div>
            ) : (
              <div className="flex items-center gap-2">
                <Link to="/login">
                  <Button variant="ghost" size="sm">Login</Button>
                </Link>
                <Link to="/register">
                  <Button size="sm">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>

          <Button
            variant="ghost"
            size="icon"
            className="md:hidden"
            onClick={() => setMobileOpen(!mobileOpen)}
          >
            {mobileOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </Button>
        </div>
      </nav>

      {/* Mobile nav */}
      {mobileOpen && (
        <div className="md:hidden border-t bg-background px-4 py-3 space-y-1">
          {navLinks.map((link) => (
            <Link
              key={link.to}
              to={link.to}
              onClick={() => setMobileOpen(false)}
              className={`block px-4 py-2.5 rounded-lg text-sm font-medium ${
                location.pathname === link.to
                  ? "bg-primary text-primary-foreground"
                  : "text-foreground hover:bg-accent"
              }`}
            >
              {link.label}
            </Link>
          ))}
          <div className="pt-4 pb-2 border-t mt-2">
            {isAuthenticated && user ? (
              <div className="flex flex-col gap-3">
                <span className="px-4 text-sm font-medium text-muted-foreground flex items-center gap-2">
                  <User className="h-4 w-4" /> Signed in as {user.name}
                </span>
                <Button variant="ghost" className="justify-start px-4 w-full text-destructive hover:bg-destructive/10 hover:text-destructive" onClick={() => { logout(); setMobileOpen(false); }}>
                  <LogOut className="h-4 w-4 mr-2" /> Logout
                </Button>
              </div>
            ) : (
              <div className="flex flex-col gap-2 px-2">
                <Link to="/login" onClick={() => setMobileOpen(false)}>
                  <Button variant="outline" className="w-full">Login</Button>
                </Link>
                <Link to="/register" onClick={() => setMobileOpen(false)}>
                  <Button className="w-full">Sign Up</Button>
                </Link>
              </div>
            )}
          </div>
        </div>
      )}
    </header>
  );
};

const FooterSection = () => (
  <footer className="border-t bg-muted mt-auto">
    <div className="container mx-auto px-4 py-10">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2 font-bold text-lg text-primary">
          <Leaf className="h-5 w-5" />
          FreshBite
        </div>
        <p className="text-sm text-muted-foreground text-center">
          Healthy food, delivered with care. © 2026 FreshBite. All rights reserved.
        </p>
        <div className="flex gap-6 text-sm text-muted-foreground">
          <a href="#">Privacy</a>
          <a href="#">Terms</a>
          <a href="#">Contact</a>
        </div>
      </div>
    </div>
  </footer>
);

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <NavbarSection />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/menu" element={<MenuPage />} />
                  <Route path="/cart" element={<Cart />} />
                  <Route path="/utensils" element={<Utensils />} />
                  <Route path="/hire-cook" element={<CookHiring />} />
                  <Route path="/payment" element={<Payment />} />
                  <Route path="/tracking" element={<OrderTracking />} />
                  <Route path="/cook-management" element={<CookManagement />} />
                  <Route path="/cook-payment/:contractId" element={<CookPayment />} />
                  <Route path="/login" element={<Login />} />
                  <Route path="/register" element={<Register />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </div>
              <FooterSection />
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
