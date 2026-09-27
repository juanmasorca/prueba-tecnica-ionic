import { Component } from '@angular/core';
import { addIcons } from 'ionicons';
import {
  bagHandleOutline,
  cartOutline,
  checkmarkCircleOutline,
  logOutOutline,
  personOutline,
  removeOutline,
  addOutline,
  trashOutline,
  storefrontOutline,
} from 'ionicons/icons';

@Component({
  selector: 'app-root',
  templateUrl: 'app.component.html',
  styleUrls: ['app.component.scss'],
  standalone: false,
})
export class AppComponent {
  constructor() {
    addIcons({
      bagHandleOutline,
      cartOutline,
      checkmarkCircleOutline,
      logOutOutline,
      personOutline,
      removeOutline,
      addOutline,
      trashOutline,
      storefrontOutline,
    });
  }
}
