import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ExceptionModule as ExceptionCModule } from '../../common/exception/exception.module';
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
