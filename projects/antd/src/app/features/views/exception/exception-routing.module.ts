import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ErrorComponent } from '../../../components/exception/error/error.component';
import { NoPermissionComponent } from '../../../components/exception/no-permission/no-permission.component';
import { NotFoundComponent } from '../../../components/exception/not-found/not-found.component';

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
