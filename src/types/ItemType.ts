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
