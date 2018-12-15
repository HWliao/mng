import { Component } from '@angular/core';

@Component({
  selector: 'mz-error',
  template: '<mz-exception [type]="500"></mz-exception>'
})
export class ErrorComponent {
  constructor() {
  }
}
