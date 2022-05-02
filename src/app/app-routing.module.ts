import { NgModule } from '@angular/core';
import {
  AngularFireAuthGuard,
  redirectUnauthorizedTo
} from '@angular/fire/compat/auth-guard';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const redirectUnauthorizedToHome = () => redirectUnauthorizedTo('/');

const modalRoute = {
  path: 'user',
  outlet: 'modal',
  loadChildren: () =>
    import('./features/user/user.module').then((m) => m.UserModule)
};

const routes: Routes = [
  {
    path: '',
    component: HomeComponent
  },
  {
    path: 'about',
    loadChildren: () =>
      import('./features/about/about.module').then((m) => m.AboutModule)
  },
  {
    path: 'video',
    canActivate: [AngularFireAuthGuard],
    data: {
      redirectOnLoggedOutUrl: '/',
      authGuardPipe: redirectUnauthorizedToHome
    },
    loadChildren: () =>
      import('./features/video/video.module').then((m) => m.VideoModule)
  },
  {
    path: 'clips',
    loadChildren: () =>
      import('./features/clips/clips.module').then((m) => m.ClipsModule)
  },
  // modal outlet routes
  modalRoute,
  // wild path
  {
    path: '**',
    loadChildren: () =>
      import('./features/not-found/not-found.module').then(
        (m) => m.NotFoundModule
      )
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
