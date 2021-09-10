import {NgModule} from '@angular/core';
import {Routes, RouterModule, PreloadAllModules} from '@angular/router';

const routes: Routes = [
  {
    path: 'users',
    loadChildren: () =>
      import('./modules/user/user.module').then(m => m.UserModule)
  },
  {
    path: 'municipality',
    loadChildren: () =>
      import('./modules/municipality/municipality.module').then(m => m.MunicipalityModule)
  },
  {
    path: 'vehicles',
    loadChildren: () =>
      import('./modules/vehicle/vehicle.module').then(m => m.VehicleModule)
  },
  {
    path: 'marks',
    loadChildren: () =>
      import('./modules/mark/mark.module').then(m => m.MarkModule)
  },
  {
    path: 'home',
    loadChildren: () =>
      import('./modules/home/home.module').then(m => m.HomeModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {path: '**', redirectTo: '/404'}

];

@NgModule({
  imports: [RouterModule.forRoot(routes, {
    preloadingStrategy: PreloadAllModules,
    enableTracing: false,
    useHash: false,
    scrollPositionRestoration: 'enabled',

  })],
  exports: [RouterModule]
})
export class AppRoutingModule {
}
