import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { ExceptionModule as ExceptionCModule } from '../../../components/exception/exception.module';
import { ExceptionRoutingModule } from './exception-routing.module';


@NgModule({
  declarations: [],
  imports: [
    CommonModule,
    ExceptionRoutingModule,
    ExceptionCModule
  ]
})
export class ExceptionModule { }
