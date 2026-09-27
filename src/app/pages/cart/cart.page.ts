import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AlertController, ToastController } from '@ionic/angular';
import { CartItem } from '../../models/cart-item.model';
import { AuthService } from '../../services/auth.service';
import { CartService } from '../../services/cart.service';
import { OrderService } from '../../services/order.service';
import { formatCop } from '../../utils/money';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.page.html',
  styleUrls: ['./cart.page.scss'],
  standalone: false,
})
export class CartPage {
  readonly formatCop = formatCop;

  constructor(
    readonly cart: CartService,
    private readonly auth: AuthService,
    private readonly orderService: OrderService,
    private readonly router: Router,
    private readonly toastController: ToastController,
    private readonly alertController: AlertController
  ) {}

  increase(item: CartItem): void {
    this.cart.increase(item.product.id);
  }

  decrease(item: CartItem): void {
    this.cart.decrease(item.product.id);
  }

  remove(item: CartItem): void {
    this.cart.remove(item.product.id);
  }

  async checkout(): Promise<void> {
    if (this.cart.items.length === 0) {
      const toast = await this.toastController.create({
        message: 'El carrito está vacío.',
        duration: 1600,
        color: 'warning',
      });
      await toast.present();
      return;
    }

    if (!this.auth.isAuthenticated()) {
      await this.router.navigate(['/login'], { queryParams: { returnUrl: '/cart' } });
      return;
    }

    const alert = await this.alertController.create({
      header: 'Finalizar compra',
      message: `Total: ${this.formatCop(this.cart.total)}. Se simulará el pago y se guardará el pedido.`,
      buttons: [
        { text: 'Cancelar', role: 'cancel' },
        {
          text: 'Confirmar',
          handler: () => {
            const order = this.orderService.placeOrder();
            if (order) {
              this.router.navigate(['/confirmation']);
            }
          },
        },
      ],
    });
    await alert.present();
  }
}
