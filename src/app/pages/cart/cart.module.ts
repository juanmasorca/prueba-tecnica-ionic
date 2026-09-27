import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { CartPage } from './cart.page';
import { CartPageRoutingModule } from './cart-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, CartPageRoutingModule],
  declarations: [CartPage],
})
export class CartPageModule {}
