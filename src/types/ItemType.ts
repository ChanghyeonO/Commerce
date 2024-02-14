export interface Item {
  id: string;
  name: string;
  price: number;
  description: string;
  itemDescription: {
    imageUrl: string;
    description: string;
  }[];
}

export interface CartItem {
  id: string;
  name: string;
  count: number;
  totalPrice: number;
}
