import { createContext, useContext, useState, useCallback, useMemo } from 'react';

export interface CartItem {
  name: string;
  price: number;
  priceLabel: string;
  qty: number;
}

interface PreviewRuntime {
  /** Generic key-value store shared across all forms */
  variables: Record<string, any>;
  setVariable: (name: string, value: any) => void;
  getVariable: (name: string) => any;

  /** Interpolate {{varName}} in text */
  interpolate: (text: string) => string;

  // Cart helpers (built on top of variables)
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  removeFromCart: (itemName: string) => void;
  clearCart: () => void;
  cartTotal: number;
}

const PreviewRuntimeContext = createContext<PreviewRuntime | null>(null);

export function usePreviewRuntime() {
  return useContext(PreviewRuntimeContext);
}

/** Interpolate {{varName}} patterns in a string using the variables store */
function interpolateText(text: string, variables: Record<string, any>): string {
  return text.replace(/\{\{(\w+)\}\}/g, (_, key) => {
    const val = variables[key];
    if (val === undefined || val === null) return `{{${key}}}`;
    return String(val);
  });
}

export function PreviewRuntimeProvider({ children }: { children: React.ReactNode }) {
  const [variables, setVariables] = useState<Record<string, any>>({});
  const [cart, setCart] = useState<CartItem[]>([]);

  const setVariable = useCallback((name: string, value: any) => {
    setVariables(prev => ({ ...prev, [name]: value }));
  }, []);

  const getVariable = useCallback((name: string) => variables[name], [variables]);

  const addToCart = useCallback((item: CartItem) => {
    setCart(prev => {
      const existing = prev.find(c => c.name === item.name);
      if (existing) {
        return prev.map(c => c.name === item.name ? { ...c, qty: c.qty + item.qty } : c);
      }
      return [...prev, item];
    });
  }, []);

  const removeFromCart = useCallback((itemName: string) => {
    setCart(prev => prev.filter(c => c.name !== itemName));
  }, []);

  const clearCart = useCallback(() => setCart([]), []);

  const cartTotal = cart.reduce((sum, item) => sum + item.price * item.qty, 0);

  // Auto-publish cart-related variables so any component can use {{cartTotal}}, {{cartCount}}
  const allVariables = useMemo(() => ({
    ...variables,
    cartTotal,
    cartCount: cart.length,
  }), [variables, cartTotal, cart.length]);

  const interpolate = useCallback((text: string) => {
    return interpolateText(text, allVariables);
  }, [allVariables]);

  return (
    <PreviewRuntimeContext.Provider value={{
      variables: allVariables,
      setVariable,
      getVariable,
      interpolate,
      cart, addToCart, removeFromCart, clearCart, cartTotal,
    }}>
      {children}
    </PreviewRuntimeContext.Provider>
  );
}
