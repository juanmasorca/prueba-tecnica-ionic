import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { createId } from '../utils/id';
import { AuthService } from './auth.service';
import { CartService } from './cart.service';
import { StorageService } from './storage.service';

const ORDERS_KEY = 'orders';
const LAST_ORDER_KEY = 'lastOrder';

@Injectable({ providedIn: 'root' })
export class OrderService {
  constructor(
    private readonly storage: StorageService,
    private readonly cart: CartService,
    private readonly auth: AuthService
  ) {}

  placeOrder(): Order | null {
    const user = this.auth.currentUser;
    if (!user || this.cart.items.length === 0) {
      return null;
    }

    const order: Order = {
      id: createId(),
      userId: user.id,
      userEmail: user.email,
      items: this.cart.items.map((item) => ({ ...item })),
      total: this.cart.total,
      createdAt: new Date().toISOString(),
    };

    const orders = this.storage.get<Order[]>(ORDERS_KEY, []);
    orders.push(order);
    this.storage.set(ORDERS_KEY, orders);
    this.storage.set(LAST_ORDER_KEY, order);
    this.cart.clear();
    return order;
  }

  getLastOrder(): Order | null {
    return this.storage.get<Order | null>(LAST_ORDER_KEY, null);
  }
}
