import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { IonicModule } from '@ionic/angular';
import { ConfirmationPage } from './confirmation.page';
import { ConfirmationPageRoutingModule } from './confirmation-routing.module';

@NgModule({
  imports: [CommonModule, IonicModule, ConfirmationPageRoutingModule],
  declarations: [ConfirmationPage],
})
export class ConfirmationPageModule {}
