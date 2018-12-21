import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'mz-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.less']
})
export class LoginComponent {

  form: FormGroup;

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      userName: ['', [Validators.required, Validators.minLength(5)]],
      password: ['', Validators.required]
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
    console.log(this.form);
  }
}
