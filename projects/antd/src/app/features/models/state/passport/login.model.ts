import { Hack, Model } from 'store';

@Model('mng.antd.login')
export class LoginModel {
  error = '';
  submit = false;

  init({ error, submit }: LoginModel) {
    this.error = error;
    this.submit = submit;
  }
}

export const LoginHack = Hack(LoginModel);
