import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { GlobalFooterComponent } from './global-footer/global-footer.component';

@NgModule({
  declarations: [GlobalFooterComponent],
  imports: [
    CommonModule
  ],
  exports: [GlobalFooterComponent]
})
export class LayoutModule {
}
