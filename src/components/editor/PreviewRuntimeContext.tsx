import { createContext, useContext, useState, useCallback } from 'react';

export interface CartItem {
  name: string;
  price: number;
  priceLabel: string;
  qty: number;
}

interface PreviewRuntime {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
  cartTotal: number;
  filters: Record<string, string>;
  setFilter: (name: string, value: string) => void;
}

const PreviewRuntimeContext = createContext<PreviewRuntime | null>(null);

export function usePreviewRuntime() {
  return useContext(PreviewRuntimeContext);
}

export function PreviewRuntimeProvider({ children }: { children: React.ReactNode }) {
  const [cart, setCart] = useState<CartItem[]>([]);
  const [filters, setFilters] = useState<Record<string, string>>({});

  const addToCart = useCallback((item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.name === item.name);
      if (existing) {
        return prev.map(c => c.name === item.name ? { ...c, qty: c.qty + item.qty } : c);
      }
      return [...prev, item];
    });
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const setFilter = useCallback((name: string, value: string) => {
    setFilters(prev => ({ ...prev, [name]: value }));
  }, []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  return (
    <PreviewRuntimeContext.Provider value={{ cart, addToCart, clearCart, cartTotal, filters, setFilter }}>
      {children}
    </PreviewRuntimeContext.Provider>
  );
}
