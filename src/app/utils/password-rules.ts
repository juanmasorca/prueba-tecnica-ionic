import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export interface PasswordRule {
  id: string;
  label: string;
  test: (value: string) => boolean;
}

export const PASSWORD_RULES: PasswordRule[] = [
  {
    id: 'minLength',
    label: 'Mínimo 6 caracteres',
    test: (value) => value.length >= 6,
  },
  {
    id: 'upper',
    label: 'Al menos una letra mayúscula',
    test: (value) => /[A-ZÁÉÍÓÚÜÑ]/.test(value),
  },
  {
    id: 'lower',
    label: 'Al menos una letra minúscula',
    test: (value) => /[a-záéíóúüñ]/.test(value),
  },
  {
    id: 'number',
    label: 'Al menos un número',
    test: (value) => /\d/.test(value),
  },
];

export const passwordRulesValidator: ValidatorFn = (
  control: AbstractControl
): ValidationErrors | null => {
  const value = String(control.value ?? '');
  const failed = PASSWORD_RULES.filter((rule) => !rule.test(value)).map((rule) => rule.id);
  return failed.length ? { passwordRules: failed } : null;
};
