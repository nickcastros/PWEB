import { Routes } from '@angular/router';
import { Home } from './home/home';
import { Auth } from './auth/auth';
import { Details } from './details/details';
import { MyReviews } from './my-reviews/my-reviews';
import { authGuard } from './auth.guard';

export const routes: Routes = [
  { path: '', component: Home },
  { path: 'auth', component: Auth },
  { path: 'details/:id', component: Details },
  { path: 'myreviews', component: MyReviews, canActivate: [authGuard] },
];
