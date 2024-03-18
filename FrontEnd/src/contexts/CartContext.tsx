import React, {
  createContext,
  useContext,
  useState,
  ReactNode,
  useEffect,
} from "react";

interface CartContextType {
  selectedCategory: "funding" | "other" | null;
  setSelectedCategory: (category: "funding" | "other" | null) => void;
}

const cartContextDefaultValue: CartContextType = {
  selectedCategory: null,
  setSelectedCategory: () => {},
};

const CartContext = createContext<CartContextType>(cartContextDefaultValue);

export const useCart = () => useContext(CartContext);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [selectedCategory, setSelectedCategory] = useState<
    "funding" | "other" | null
  >(null);

  useEffect(() => {
    console.log("Selected Category:", selectedCategory);
  }, [selectedCategory]);

  const value = { selectedCategory, setSelectedCategory };

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
};
