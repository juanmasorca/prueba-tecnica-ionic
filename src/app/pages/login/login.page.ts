import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false,
})
export class LoginPage implements OnInit {
  returnUrl = '/catalog';
  submitted = false;

  readonly form = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required]],
  });

  constructor(
    private readonly fb: FormBuilder,
    private readonly auth: AuthService,
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly toastController: ToastController
  ) {}

  ngOnInit(): void {
    this.returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/catalog';
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const { email, password } = this.form.getRawValue();
    const result = this.auth.login(email ?? '', password ?? '');
    const toast = await this.toastController.create({
      message: result.message,
      duration: 1800,
      color: result.ok ? 'success' : 'danger',
    });
    await toast.present();

    if (result.ok) {
      await this.router.navigateByUrl(this.returnUrl);
    }
  }
}
