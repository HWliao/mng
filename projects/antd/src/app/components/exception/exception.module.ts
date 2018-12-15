import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { NoPermissionComponent } from './no-permission/no-permission.component';
import { ErrorComponent } from './error/error.component';
import { ExceptionComponent } from './exception/exception.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [ExceptionComponent, NotFoundComponent, NoPermissionComponent, ErrorComponent],
  imports: [
    CommonModule,
    RouterModule,
    NgZorroAntdModule
  ],
  exports: [ExceptionComponent, NotFoundComponent, NoPermissionComponent, ErrorComponent]
})
export class ExceptionModule {
}
