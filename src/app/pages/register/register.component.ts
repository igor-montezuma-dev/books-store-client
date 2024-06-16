import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { Router, RouterModule } from '@angular/router';
import AuthService from 'src/app/services/auth.service';
import { PasswordValidator } from '../../validators/confirm-password-validator';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatIconModule,
    MatButtonModule,
    MatSnackBarModule,
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export default class RegisterComponent implements OnInit {
  fb = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  registerForm!: FormGroup;
  public hide = true;

  AuthService = inject(AuthService);

  ngOnInit() {
    this.registerForm = this.fb.group(
      {
        firstName: ['', Validators.required],
        lastName: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        userName: ['', Validators.required],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: PasswordValidator('password', 'confirmPassword'),
      }
    );
  }

  register() {
    const credentials = this.registerForm.value;
    this.AuthService.registerService(credentials).subscribe({
      next: (response) => {
        this.snackBar.open('Usuário cadastrado com sucesso', 'fechar', {
          duration: 3000,
        });
        this.router.navigate(['login']);
        this.registerForm.reset();
      },
      error: (error) => {
        this.snackBar.open('Erro ao realizar cadastro', 'fechar', {
          duration: 3000,
        });
        console.error(error);
      },
    });
  }
}
