import { Injectable } from '@angular/core';
import { PRODUCTS } from '../data/products';
import { Product } from '../models/product.model';

@Injectable({ providedIn: 'root' })
export class ProductService {
  getAll(): Product[] {
    return PRODUCTS;
  }

  getById(id: string): Product | undefined {
    return PRODUCTS.find((product) => product.id === id);
  }
}
