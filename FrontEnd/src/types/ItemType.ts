export interface Item {
  id: string;
  name: string;
  price: number;
  count: number;
  description: string;
  option: string[];
  itemDescription: {
    imageUrl: string;
    description: string;
  }[];
}

export interface CartItem {
  id: string;
  name: string;
  description?: string;
  option: string;
  image: string;
  count: number;
  price: number;
  totalPrice: number;
  source?: string;
}
