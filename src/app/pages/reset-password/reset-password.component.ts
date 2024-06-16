import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import AuthService from 'src/app/services/auth.service';
import { PasswordValidator } from 'src/app/validators/confirm-password-validator';

@Component({
  selector: 'app-reset-password',
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
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.scss'],
})
export default class ResetPasswordComponent {
  fb = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  activatedRoute = inject(ActivatedRoute);
  resetPasswordForm!: FormGroup;

  AuthService = inject(AuthService);

  public hide = true;
  public token!: string;

  ngOnInit() {
    this.activatedRoute.params.subscribe((params) => {
      this.token = params['token'];
      console.log(this.token);
    });
    this.resetPasswordForm = this.fb.group(
      {
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      {
        validator: PasswordValidator('password', 'confirmPassword'),
      }
    );
  }


  submit() {
    const credentials = this.resetPasswordForm.value;
    let resetOBJ= {
      password: credentials.password,
      token: this.token,
    }
    console.log(credentials);
    this.AuthService.resetPasswordService(resetOBJ).subscribe({
      next: (response) => {
        this.snackBar.open('Senha atualizada!', 'fechar', {
          duration: 3000,
        });
        this.router.navigate(['login']);
        this.resetPasswordForm.reset();
      },
      error: (err) => {
        this.snackBar.open(err.error.message, 'fechar', {
          duration: 3000,
        });
        console.error(err);
      },
    });
  }
}
