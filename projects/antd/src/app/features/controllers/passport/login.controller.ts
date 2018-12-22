import { Injectable } from '@angular/core';

@Injectable({ providedIn: 'root' })
export class LoginController {

  authentication(data: any): Promise<string> {
    console.log(data);
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        reject('lhw');
      }, 2000);
    });
  }
}
