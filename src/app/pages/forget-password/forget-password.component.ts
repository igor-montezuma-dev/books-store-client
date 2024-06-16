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
  selector: 'app-forget-password',
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
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.scss'],
})
export default class ForgetPasswordComponent implements OnInit {
  fb = inject(FormBuilder);
  snackBar = inject(MatSnackBar);
  router = inject(Router);
  resetPasswordForm!: FormGroup;
  public hide = true;

  AuthService = inject(AuthService);

  ngOnInit() {
    this.resetPasswordForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
    });
  }

  submit() {
    const credentials = this.resetPasswordForm.value;
    console.log(credentials);
    this.AuthService.sendEmailService(this.resetPasswordForm.value.email).subscribe({
      next: (response) => {
        this.snackBar.open('Email enviado com sucesso!', 'ok', {
          duration: 3000,
        });
        this.router.navigate(['login']);
        this.resetPasswordForm.reset();
      },
      error: (err) => {
        this.snackBar.open(err.error.message, 'ok', {
          duration: 3000,
        });
        console.error(err);
      },
    });
  }
}
