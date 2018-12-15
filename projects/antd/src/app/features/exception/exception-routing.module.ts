import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { NotFoundComponent } from '../../common/exception/not-found/not-found.component';
import { ErrorComponent } from '../../common/exception/error/error.component';
import { NoPermissionComponent } from '../../common/exception/no-permission/no-permission.component';

const routes: Routes = [
  { path: '404', component: NotFoundComponent, data: { title: '404' } },
  { path: '500', component: ErrorComponent, data: { title: '500' } },
  { path: '403', component: NoPermissionComponent, data: { title: '403' } },
  { path: '**', redirectTo: '404' }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ExceptionRoutingModule { }
