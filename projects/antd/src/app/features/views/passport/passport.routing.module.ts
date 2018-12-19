import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LockComponent } from './lock/lock.component';
import { LoginComponent } from './login/login.component';
import { PassportLayoutComponent } from './passport-layout/passport-layout.component';
import { RegisterResultComponent } from './register-result/register-result.component';
import { RegisterComponent } from './register/register.component';

const routes: Routes = [
  {
    path: '',
    component: PassportLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'login' },
      { path: 'login', component: LoginComponent, data: { title: 'login' } },
      { path: 'register', component: RegisterComponent, data: { title: 'register' } },
      { path: 'register/result', component: RegisterResultComponent, data: { title: 'result' } },
      { path: 'lock', component: LockComponent, data: { title: 'lock' } }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class PassportRoutingModule { }
