import { createContext, useContext, useReducer, ReactNode, useEffect } from "react";

export interface CartItemCustomization {
  healthOptions: string[];
  allergyNotes: string;
  instructions: string;
}

export interface CartItem {
  id: string;
  cartId: string;
  type: "food" | "utensil" | "cook";
  name: string;
  price: number;
  quantity: number;
  emoji: string;
  customizations?: CartItemCustomization;
  rentalDays?: number;
  cookHours?: number;
}

interface CartState {
  items: CartItem[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { cartId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "LOAD_CART"; payload: CartItem[] };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.id === action.payload.id && i.type === action.payload.type && !action.payload.customizations
      );
      if (existing && !action.payload.customizations) {
        return {
          items: state.items.map((i) =>
            i.cartId === existing.cartId ? { ...i, quantity: i.quantity + action.payload.quantity } : i
          ),
        };
      }
      return { items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return { items: state.items.filter((i) => i.cartId !== action.payload) };
    case "UPDATE_QUANTITY":
      return {
        items: state.items.map((i) =>
          i.cartId === action.payload.cartId ? { ...i, quantity: Math.max(0, action.payload.quantity) } : i
        ).filter((i) => i.quantity > 0),
      };
    case "CLEAR_CART":
      return { items: [] };
    case "LOAD_CART":
      return { items: action.payload };
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  addItem: (item: CartItem) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [] });

  useEffect(() => {
    const saved = localStorage.getItem("freshbite-cart");
    if (saved) {
      try {
        dispatch({ type: "LOAD_CART", payload: JSON.parse(saved) });
      } catch {}
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("freshbite-cart", JSON.stringify(state.items));
  }, [state.items]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
        removeItem: (cartId) => dispatch({ type: "REMOVE_ITEM", payload: cartId }),
        updateQuantity: (cartId, quantity) => dispatch({ type: "UPDATE_QUANTITY", payload: { cartId, quantity } }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
        totalItems,
        totalPrice,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}
