export interface User {
  userId: string;
  email: string;
  name: string;
  phoneNumber: string;
  address: string;
  addressDetail: string;
  admin: boolean;
}

export interface UserContextType {
  user: User | null;
  loading: boolean;
}
