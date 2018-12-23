import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { LoginModel } from '../../../models/state/passport/login.model';
import { AopService, Publish, Select } from 'store';
import { LoginAuthentication, LoginInit } from '../../../models/state/passport/login.event';

@Component({
  selector: 'mz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent implements OnInit {

  form: FormGroup;
  @Select()
  login: LoginModel;

  constructor(
    fb: FormBuilder,
    private msg: NzMessageService,
    aop: AopService,
  ) {
    aop.weave(this);

    this.form = fb.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', Validators.required],
      remenberMe: [true]
    });
  }

  get userName() {
    return this.form.get('userName');
  }

  get password() {
    return this.form.get('password');
  }

  @Publish(LoginAuthentication)
  onSubmit(): LoginAuthentication {
    for (const key in this.form.controls) {
      if (this.form.controls.hasOwnProperty(key)) {
        this.form.controls[key].markAsDirty();
        this.form.controls[key].updateValueAndValidity();
      }
    }
    if (!this.form.valid) {
      return;
    }
    return new LoginAuthentication(<LoginAuthentication>this.form.value);
  }

  forgetPassword() {
    this.msg.info('user/pwd: admin/admin');
  }

  @Publish()
  ngOnInit(): any {
    return new LoginInit();
  }
}
