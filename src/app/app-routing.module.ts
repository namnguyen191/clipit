import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';

const modalRoute = {
  path: 'user',
  outlet: 'modal',
  loadChildren: () =>
    import('./features/user/user.module').then((m) => m.UserModule)
};

const routes: Routes = [
  modalRoute,
  {
    path: '',
    component: HomeComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {}
