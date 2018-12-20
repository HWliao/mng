import { ChangeDetectionStrategy, Component, ContentChildren, HostBinding, Inject, Input, QueryList } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalFooterLink } from './GlobalFooterLink';
import { GlobalFooterItemComponent } from './GlobalFooterItemComponent';
import { WINDOW } from '../../../core/global/window.service';

@Component({
  selector: 'mz-global-footer',
  templateUrl: './global-footer.component.html',
  styleUrls: ['./global-footer.component.less'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class GlobalFooterComponent {

  @HostBinding('class.global-footer')
  footerClass = true;

  @Input()
  links: GlobalFooterLink[] = [];

  @ContentChildren(GlobalFooterItemComponent)
  items!: QueryList<GlobalFooterItemComponent>;

  constructor(private router: Router, @Inject(WINDOW) private win: Window) {
  }

  to(item: GlobalFooterLink) {
    if (!item.href) {
      return;
    }
    if (item.blankTarget) {
      this.win.open(item.href);
      return;
    }
    if (/^https?:\/\//.test(item.href)) {
      this.win.location.href = item.href;
    } else {
      this.router.navigateByUrl(item.href);
    }
  }
}
