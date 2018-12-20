import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalFooterComponent } from './global-footer/global-footer.component';
import { GlobalFooterItemComponent } from './global-footer/GlobalFooterItemComponent';
import { RouterModule } from '@angular/router';

const COMPONENTS = [GlobalFooterComponent, GlobalFooterItemComponent];

@NgModule({
  declarations: [...COMPONENTS],
  imports: [CommonModule, RouterModule],
  exports: [...COMPONENTS]
})
export class LayoutModule {
}
