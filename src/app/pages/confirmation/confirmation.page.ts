import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Order } from '../../models/order.model';
import { OrderService } from '../../services/order.service';
import { formatCop } from '../../utils/money';

@Component({
  selector: 'app-confirmation',
  templateUrl: './confirmation.page.html',
  styleUrls: ['./confirmation.page.scss'],
  standalone: false,
})
export class ConfirmationPage implements OnInit {
  order: Order | null = null;
  readonly formatCop = formatCop;

  constructor(
    private readonly orderService: OrderService,
    private readonly router: Router
  ) {}

  ngOnInit(): void {
    this.order = this.orderService.getLastOrder();
    if (!this.order) {
      this.router.navigate(['/catalog']);
    }
  }
}
