import { LoginModel } from './login.model';

/**
 * 登入页面初始化事件
 */
export class LoginInit extends LoginModel {

}

/**
 * 登入页面鉴权事件
 */
export class LoginAuthentication {
  userName: string;
  password: string;
  remenberMe: boolean;

  constructor(data: LoginAuthentication) {
    this.userName = data.userName;
    this.password = data.password;
    this.remenberMe = data.remenberMe;
  }
}
