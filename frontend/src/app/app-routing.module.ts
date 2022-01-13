import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { PublicGuard } from './guards/public/public.guard';

const routes: Routes = [
  {
    path: 'registration',
    canActivate: [PublicGuard],
    canLoad: [PublicGuard],
    loadChildren: () => import('./views/registration/registration.module').then(module => module.RegistrationModule),
  },
  {
    path: 'login',
    canActivate: [PublicGuard],
    canLoad: [PublicGuard],
    loadChildren: () => import('./views/login/login.module').then(module => module.LoginModule),
  },
  {
    path: '',
    pathMatch: 'full',
    redirectTo: 'login',
  },
  {
    path: '',
    loadChildren: () => import('./views/private/private.module').then(module => module.PrivateModule),
  },
  {
    path: '**',
    loadChildren: () => import('./views/not-found/not-found.module').then(module => module.NotFoundModule),
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule { }
