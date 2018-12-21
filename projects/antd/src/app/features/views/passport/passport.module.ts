import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PassportRoutingModule } from './passport.routing.module';
import { PassportLayoutComponent } from './passport-layout/passport-layout.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { RegisterResultComponent } from './register-result/register-result.component';
import { LockComponent } from './lock/lock.component';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { LayoutModule } from '../../../components/layout/layout.module';
import { ReactiveFormsModule } from '@angular/forms';

const COMPONENTS = [PassportLayoutComponent, LoginComponent, RegisterComponent, RegisterResultComponent, LockComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [
    CommonModule,
    PassportRoutingModule,
    NgZorroAntdModule,
    LayoutModule,
    ReactiveFormsModule
  ]
})
export class PassportModule {
}
