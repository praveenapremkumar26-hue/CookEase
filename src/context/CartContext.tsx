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

export interface Order {
  orderId: string;
  items: CartItem[];
  totalPrice: number;
  status: "preparing" | "out-for-delivery" | "delivered";
  placedAt: number;
}

export interface CookContract {
  id: string;
  cookId: string;
  cookName: string;
  emoji: string;
  hourlyRate: number;
  hoursBooked: number;
  totalCost: number;
  startTime: number;
  status: "active" | "completed";
  tipAmount?: number;
  reviewText?: string;
}

interface CartState {
  items: CartItem[];
  orders: Order[];
  contracts: CookContract[];
}

type CartAction =
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: string }
  | { type: "UPDATE_QUANTITY"; payload: { cartId: string; quantity: number } }
  | { type: "CLEAR_CART" }
  | { type: "PLACE_ORDER"; payload: Order }
  | { type: "START_CONTRACT"; payload: CookContract }
  | { type: "COMPLETE_CONTRACT"; payload: { id: string; tipAmount: number; reviewText: string } }
  | { type: "LOAD_STATE"; payload: CartState };

function cartReducer(state: CartState, action: CartAction): CartState {
  switch (action.type) {
    case "ADD_ITEM": {
      const existing = state.items.find(
        (i) => i.id === action.payload.id && i.type === action.payload.type && !action.payload.customizations
      );
      if (existing && !action.payload.customizations) {
        return {
          ...state,
          items: state.items.map((i) =>
            i.cartId === existing.cartId ? { ...i, quantity: i.quantity + action.payload.quantity } : i
          ),
        };
      }
      return { ...state, items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return { ...state, items: state.items.filter((i) => i.cartId !== action.payload) };
    case "UPDATE_QUANTITY":
      return {
        ...state,
        items: state.items.map((i) =>
          i.cartId === action.payload.cartId ? { ...i, quantity: Math.max(0, action.payload.quantity) } : i
        ).filter((i) => i.quantity > 0),
      };
    case "CLEAR_CART":
      return { ...state, items: [] };
    case "PLACE_ORDER":
      return { ...state, items: [], orders: [...state.orders, action.payload] };
    case "START_CONTRACT":
      return { ...state, contracts: [...(state.contracts || []), action.payload] };
    case "COMPLETE_CONTRACT":
      return {
        ...state,
        contracts: state.contracts.map((c) =>
          c.id === action.payload.id
            ? { ...c, status: "completed", tipAmount: action.payload.tipAmount, reviewText: action.payload.reviewText }
            : c
        ),
      };
    case "LOAD_STATE":
      return action.payload;
    default:
      return state;
  }
}

interface CartContextType {
  items: CartItem[];
  orders: Order[];
  contracts: CookContract[];
  addItem: (item: CartItem) => void;
  removeItem: (cartId: string) => void;
  updateQuantity: (cartId: string, quantity: number) => void;
  clearCart: () => void;
  placeOrder: (order: Order) => void;
  startContract: (contract: CookContract) => void;
  completeContract: (id: string, tipAmount: number, reviewText: string) => void;
  totalItems: number;
  totalPrice: number;
}

const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, { items: [], orders: [], contracts: [] });

  useEffect(() => {
    const saved = localStorage.getItem("freshbite-state");
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        dispatch({
          type: "LOAD_STATE",
          payload: { items: parsed.items || [], orders: parsed.orders || [], contracts: parsed.contracts || [] }
        });
      } catch { }
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("freshbite-state", JSON.stringify(state));
  }, [state]);

  const totalItems = state.items.reduce((sum, i) => sum + i.quantity, 0);
  const totalPrice = state.items.reduce((sum, i) => sum + i.price * i.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        items: state.items,
        orders: state.orders,
        contracts: state.contracts,
        addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
        removeItem: (cartId) => dispatch({ type: "REMOVE_ITEM", payload: cartId }),
        updateQuantity: (cartId, quantity) => dispatch({ type: "UPDATE_QUANTITY", payload: { cartId, quantity } }),
        clearCart: () => dispatch({ type: "CLEAR_CART" }),
        placeOrder: (order) => dispatch({ type: "PLACE_ORDER", payload: order }),
        startContract: (contract) => dispatch({ type: "START_CONTRACT", payload: contract }),
        completeContract: (id, tipAmount, reviewText) => dispatch({ type: "COMPLETE_CONTRACT", payload: { id, tipAmount, reviewText } }),
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
