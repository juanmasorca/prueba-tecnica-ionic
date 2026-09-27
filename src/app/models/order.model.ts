import { CartItem } from './cart-item.model';

export interface Order {
  id: string;
  userId: string;
  userEmail: string;
  items: CartItem[];
  total: number;
  createdAt: string;
}
