import { Component } from '@angular/core';

@Component({
  selector: 'mz-no-permission',
  template: '<mz-exception [type]="403"></mz-exception>'
})
export class NoPermissionComponent {
  constructor() {
  }
}
