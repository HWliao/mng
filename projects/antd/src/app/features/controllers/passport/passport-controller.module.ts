import { NgModule } from '@angular/core';
import { LoginController } from './login.controller';

const PROVIDERS = [LoginController];

@NgModule({
  providers: [...PROVIDERS]
})
export class PassportControllerModule {
  constructor(login: LoginController) {
  }
}
