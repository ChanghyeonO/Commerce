import { Timestamp, FieldValue } from "firebase/firestore";

export interface Item {
  id: string;
  name: string;
  price: number;
  productCount: number;
  description: string;
  option: string[];
  deadLine?: Timestamp;
  targetSales: number;
  salesCount: number;
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

export interface PostData {
  name: string;
  description: string;
  price: number;
  productCount: number;
  itemDescription: {
    description: string;
    imageUrl: string;
  }[];
  option: string[];
  createdAt: FieldValue;
  targetSales?: number;
  salesCount: number;
  deadLine?: Timestamp | null;
  emailSendCheck?: boolean;
}
