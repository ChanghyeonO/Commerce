import React, { createContext, useContext, useState, ReactNode } from "react";

interface SortContextProps {
  sortOption: string;
  handleSortChange: (option: string) => void;
}

const SortContext = createContext<SortContextProps>({
  sortOption: "정렬 ▼",
  handleSortChange: () => {},
});

export const useSort = () => useContext(SortContext);

interface SortProviderProps {
  children: ReactNode;
}

export const SortProvider = ({ children }: SortProviderProps) => {
  const [sortOption, setSortOption] = useState<string>("정렬 ▼");

  const handleSortChange = (option: string) => {
    setSortOption(option);
  };

  return (
    <SortContext.Provider value={{ sortOption, handleSortChange }}>
      {children}
    </SortContext.Provider>
  );
};
