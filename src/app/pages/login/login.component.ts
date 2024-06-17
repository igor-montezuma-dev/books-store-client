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

@Component({
  selector: 'app-login',
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
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export default class LoginComponent implements OnInit {
  fb = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  loginForm!: FormGroup;
  public hide = true;

  authService = inject(AuthService);


  ngOnInit() {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  login() {
    const credentials = this.loginForm.value;
    this.authService.loginService(credentials).subscribe({
      next: (response) => {
        this.snackBar.open('login efetuado com sucesso!', 'fechar', {
          duration: 3000,
        });
        localStorage.setItem('user_id', response.data._id);
        this.authService.isLoggedIn$.next(true);
        this.router.navigate(['home']);
        this.loginForm.reset();
      },
      error: (error) => {
        this.snackBar.open('Erro ao realizar login', 'fechar', {
          duration: 3000,
        });
        console.error(error);
      },
    });
  }
}
