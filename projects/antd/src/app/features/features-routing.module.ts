import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: 'exception', loadChildren: './views/exception/exception.module#ExceptionModule' },
  { path: 'passport', loadChildren: './views/passport/passport.module#PassportModule' },
  { path: '', pathMatch: 'full', redirectTo: '/passport/login' },
  { path: '**', redirectTo: 'exception/404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class FeaturesRoutingModule { }
