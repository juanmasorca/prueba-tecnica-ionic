import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { Product } from '../../models/product.model';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { ProductService } from '../../services/product.service';
import { formatCop } from '../../utils/money';

@Component({
  selector: 'app-catalog',
  templateUrl: './catalog.page.html',
  styleUrls: ['./catalog.page.scss'],
  standalone: false,
})
export class CatalogPage {
  readonly products: Product[] = this.productService.getAll();
  readonly formatCop = formatCop;

  constructor(
    readonly cart: CartService,
    readonly auth: AuthService,
    private readonly productService: ProductService,
    private readonly toastController: ToastController,
    private readonly router: Router
  ) {}

  async addToCart(product: Product): Promise<void> {
    this.cart.add(product);
    const toast = await this.toastController.create({
      message: `${product.name} agregado al carrito`,
      duration: 1400,
      color: 'success',
      position: 'bottom',
    });
    await toast.present();
  }

  logout(): void {
    this.auth.logout();
    this.router.navigate(['/catalog']);
  }
}
