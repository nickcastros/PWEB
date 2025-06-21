import { Component } from '@angular/core';
import { Supabase } from '../supabase';
import {
  FormGroup,
  FormControl,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputComponent } from '../shared/input/input';
import { CommonModule } from '@angular/common';
import { Router } from '@angular/router';

@Component({
  selector: 'app-auth',
  imports: [ReactiveFormsModule, InputComponent, CommonModule],
  templateUrl: './auth.html',
  styleUrl: './auth.scss',
})
export class Auth {
  loading = false;
  isSignUp = false;

  signInForm = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(6),
      Validators.maxLength(32),
    ]),
    confirmEmail: new FormControl('', []),
    confirmPassword: new FormControl('', []),
  });

  constructor(private readonly supabase: Supabase, private router: Router) {}

  ngOnInit() {
    // Se já estiver logado, redireciona para home
    if (this.supabase.session) {
      this.router.navigate(['/']);
    }
  }

  get controls() {
    return this.signInForm.controls;
  }

  switchMode() {
    this.isSignUp = !this.isSignUp;
    // Limpa os campos de confirmação ao alternar
    this.signInForm.get('confirmEmail')?.reset();
    this.signInForm.get('confirmPassword')?.reset();
    // Ajusta validação dos campos de confirmação
    if (this.isSignUp) {
      this.signInForm
        .get('confirmEmail')
        ?.setValidators([Validators.required, Validators.email]);
      this.signInForm
        .get('confirmPassword')
        ?.setValidators([
          Validators.required,
          Validators.minLength(6),
          Validators.maxLength(32),
        ]);
    } else {
      this.signInForm.get('confirmEmail')?.clearValidators();
      this.signInForm.get('confirmPassword')?.clearValidators();
    }
    this.signInForm.get('confirmEmail')?.updateValueAndValidity();
    this.signInForm.get('confirmPassword')?.updateValueAndValidity();
  }

  async onSubmit(): Promise<void> {
    try {
      this.loading = true;
      const email = this.signInForm.value.email as string;
      const password = this.signInForm.value.password as string;

      if (this.isSignUp) {
        if (
          email !== this.signInForm.value.confirmEmail ||
          password !== this.signInForm.value.confirmPassword
        ) {
          alert('E-mail ou senha não conferem!');
          return;
        }
        // Chama o método de cadastro
        const { error } = await this.supabase.signUp(email, password);
        if (error) throw error;
        alert('Conta criada com sucesso! Verifique seu e-mail para confirmar.');
      } else {
        const { error } = await this.supabase.signIn(email, password);
        if (error) throw error;
        this.router.navigate(['/']);
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(error.message);
      }
    } finally {
      this.signInForm.reset();
      this.loading = false;
    }
  }
}
