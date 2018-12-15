import { Component } from '@angular/core';

@Component({
  selector: 'mz-not-found',
  template: '<mz-exception [type]="404"></mz-exception>'
})
export class NotFoundComponent {
  constructor() {
  }
}
