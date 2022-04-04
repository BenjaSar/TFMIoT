import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () =>
      import('./home/home.module').then((m) => m.HomePageModule),
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadChildren: () =>
      import('./auth/login/login.module').then((m) => m.LoginPageModule),
  },
  {
    path: 'registration',
    loadChildren: () =>
      import('./auth/registration/registration.module').then(
        (m) => m.RegistrationPageModule
      ),
  },
  {
    path: 'forgot-password',
    loadChildren: () =>
      import('./auth/forgot-password/forgot-password.module').then(
        (m) => m.ForgotPasswordPageModule
      ),
  },
  {
    path: 'sensors/:id',
    loadChildren: () =>
      import('./sensors/sensors.module').then((m) => m.SensorsPageModule),
  },
  {
    path: 'nodes/:id',
    loadChildren: () =>
      import('./nodes/nodes.module').then((m) => m.NodesPageModule),
  },
  {
    path: 'home-user',
    loadChildren: () =>
      import('./auth/home-user/home-user.module').then(
        (m) => m.HomeUserPageModule
      ),
  },
  {
    path: 'temperatures/:id/todas',
    loadChildren: () =>
      import('./temperatures/temperatures.module').then(
        (m) => m.TemperaturesPageModule
      ),
  },

  {
    path: 'add-nodes',
    loadChildren: () =>
      import('./nodes/add-nodes/add-nodes.module').then(
        (m) => m.AddNodesPageModule
      ),
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules }),
  ],
  exports: [RouterModule],
})
export class AppRoutingModule {}
