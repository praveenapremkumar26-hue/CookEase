import { Toaster } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { CartProvider } from "./context/CartContext";
import { AuthProvider } from "./context/AuthContext";
import Navbar from "./components/Navbar";
import Footer from "@/components/Footer";
import Index from "./pages/Index";
import Menu from "./pages/Menu";
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

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <AuthProvider>
        <CartProvider>
          <Toaster />
          <BrowserRouter>
            <div className="flex flex-col min-h-screen">
              <Navbar />
              <div className="flex-1">
                <Routes>
                  <Route path="/" element={<Index />} />
                  <Route path="/menu" element={<Menu />} />
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
              <Footer />
            </div>
          </BrowserRouter>
        </CartProvider>
      </AuthProvider>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
