import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { User } from '../models/user.model';
import { createId } from '../utils/id';
import { StorageService } from './storage.service';

const USERS_KEY = 'users';
const CURRENT_USER_KEY = 'currentUser';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private readonly currentUserSubject = new BehaviorSubject<User | null>(
    this.storage.get<User | null>(CURRENT_USER_KEY, null)
  );

  readonly currentUser$ = this.currentUserSubject.asObservable();

  constructor(private readonly storage: StorageService) {}

  get currentUser(): User | null {
    return this.currentUserSubject.value;
  }

  isAuthenticated(): boolean {
    return this.currentUserSubject.value !== null;
  }

  register(name: string, email: string, password: string): { ok: boolean; message: string } {
    const users = this.storage.get<User[]>(USERS_KEY, []);
    const exists = users.some((user) => user.email.toLowerCase() === email.toLowerCase());
    if (exists) {
      return { ok: false, message: 'Ya existe una cuenta con ese email.' };
    }

    const user: User = {
      id: createId(),
      name: name.trim(),
      email: email.trim().toLowerCase(),
      password,
    };
    users.push(user);
    this.storage.set(USERS_KEY, users);
    this.setSession(user);
    return { ok: true, message: 'Registro exitoso.' };
  }

  login(email: string, password: string): { ok: boolean; message: string } {
    const users = this.storage.get<User[]>(USERS_KEY, []);
    const user = users.find(
      (item) => item.email.toLowerCase() === email.trim().toLowerCase() && item.password === password
    );
    if (!user) {
      return { ok: false, message: 'Email o contraseña incorrectos.' };
    }
    this.setSession(user);
    return { ok: true, message: 'Inicio de sesión correcto.' };
  }

  logout(): void {
    this.storage.remove(CURRENT_USER_KEY);
    this.currentUserSubject.next(null);
  }

  private setSession(user: User): void {
    this.storage.set(CURRENT_USER_KEY, user);
    this.currentUserSubject.next(user);
  }
}
