import { Component, OnInit } from '@angular/core';
import { FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastController } from '@ionic/angular';
import { AuthService } from '../../services/auth.service';
import { PASSWORD_RULES, passwordRulesValidator } from '../../utils/password-rules';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false,
})
export class RegisterPage implements OnInit {
  returnUrl = '/catalog';
  submitted = false;
  readonly passwordRules = PASSWORD_RULES;

  readonly form = this.fb.group({
    name: ['', [Validators.required, Validators.minLength(2)]],
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, passwordRulesValidator]],
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

  passwordMeets(ruleId: string): boolean {
    const value = String(this.form.controls.password.value ?? '');
    const rule = this.passwordRules.find((item) => item.id === ruleId);
    return rule ? rule.test(value) : false;
  }

  async onSubmit(): Promise<void> {
    this.submitted = true;
    if (this.form.invalid) {
      return;
    }

    const { name, email, password } = this.form.getRawValue();
    const result = this.auth.register(name ?? '', email ?? '', password ?? '');
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
