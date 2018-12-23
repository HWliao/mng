import { Injectable, OnDestroy } from '@angular/core';
import { AopService, Store, Subscribe } from 'store';
import { LoginAuthentication, LoginInit } from '../../models/state/passport/login.event';
import { LoginModel } from '../../models/state/passport/login.model';

@Injectable({ providedIn: 'root' })
export class LoginController implements OnDestroy {

  @Store()
  login: LoginModel;

  constructor(aop: AopService) {
    aop.weave(this);
  }

  @Subscribe(LoginInit)
  init(init: LoginInit) {
    this.login.init(init);
  }

  @Subscribe(LoginAuthentication)
  authentication(data: LoginAuthentication): void {
    console.log(data);
    this.login.submit = true;

    setTimeout(() => {
      this.login.submit = false;
      this.login.error = 'lhw';
    }, 2000);
  }

  ngOnDestroy(): void {
  }
}
