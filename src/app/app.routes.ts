import { Routes } from '@angular/router';

export const routes: Routes = [
  { path: '', loadComponent: () => import('./pages/home/home.component') },
  { path: 'home', loadComponent: () => import('./pages/home/home.component') },

  {
    path: 'login',
    loadComponent: () => import('./pages/login/login.component'),
  },
  {
    path: 'cadastro',
    loadComponent: () => import('./pages/register/register.component'),
  },
  {
    path: 'recuperar-senha',
    loadComponent: () =>
      import('./pages/forget-password/forget-password.component'),
  },
  {
    path: 'reset/:token',
    loadComponent: () =>
      import('./pages/reset-password/reset-password.component'),
  },
];
