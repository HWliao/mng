import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NzMessageService } from 'ng-zorro-antd';
import { LoginController } from '../../../controllers/passport/login.controller';

@Component({
  selector: 'mz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  form: FormGroup;
  error = '';
  submitting = false;

  constructor(
    fb: FormBuilder,
    private msg: NzMessageService,
    private login: LoginController
  ) {
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

  onSubmit() {
    for (let key in this.form.controls) {
      this.form.controls[key].markAsDirty();
      this.form.controls[key].updateValueAndValidity();
    }
    if (!this.form.valid) {
      return;
    }
    this.submitting = true;
    this.login.authentication(this.form)
      .finally(() => this.submitting = false)
      .catch(err => this.error = err);
  }
  forgetPassword() {
    this.msg.info("user/pwd: admin/admin");
  }
}
