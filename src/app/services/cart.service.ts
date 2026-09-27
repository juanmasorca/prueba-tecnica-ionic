import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CartItem } from '../models/cart-item.model';
import { Product } from '../models/product.model';
import { StorageService } from './storage.service';

const CART_KEY = 'cart';

@Injectable({ providedIn: 'root' })
export class CartService {
  private readonly itemsSubject = new BehaviorSubject<CartItem[]>(
    this.storage.get<CartItem[]>(CART_KEY, [])
  );

  readonly items$ = this.itemsSubject.asObservable();

  constructor(private readonly storage: StorageService) {}

  get items(): CartItem[] {
    return this.itemsSubject.value;
  }

  get itemCount(): number {
    return this.items.reduce((sum, item) => sum + item.quantity, 0);
  }

  get total(): number {
    return this.items.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  }

  add(product: Product): void {
    const items = [...this.items];
    const existing = items.find((item) => item.product.id === product.id);
    if (existing) {
      existing.quantity += 1;
    } else {
      items.push({ product, quantity: 1 });
    }
    this.persist(items);
  }

  increase(productId: string): void {
    const items = this.items.map((item) =>
      item.product.id === productId ? { ...item, quantity: item.quantity + 1 } : item
    );
    this.persist(items);
  }

  decrease(productId: string): void {
    const items = this.items
      .map((item) =>
        item.product.id === productId ? { ...item, quantity: item.quantity - 1 } : item
      )
      .filter((item) => item.quantity > 0);
    this.persist(items);
  }

  remove(productId: string): void {
    this.persist(this.items.filter((item) => item.product.id !== productId));
  }

  clear(): void {
    this.persist([]);
  }

  private persist(items: CartItem[]): void {
    this.storage.set(CART_KEY, items);
    this.itemsSubject.next(items);
  }
}
