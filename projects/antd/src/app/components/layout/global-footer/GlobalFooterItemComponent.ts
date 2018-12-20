import { Component, ElementRef, Input, ViewChild } from '@angular/core';

@Component({
  selector: 'mz-global-footer-item',
  template: `<ng-template #host><ng-content></ng-content></ng-template>`,
})
export class GlobalFooterItemComponent {
  @ViewChild('host')
  host: ElementRef;

  @Input() href: string;
  @Input() blankTarget: boolean;
}
