import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { registerLocaleData, i18nProviders } from './core/i18n/i18n.service';
import { FormsModule } from '@angular/forms';
import { NgZorroAntdModule } from 'ng-zorro-antd';
import { HttpClientModule } from '@angular/common/http';
import { AppInitializer } from './core/app-init';
import { titleProviders } from './core/title/title.service';
import { globalProviders } from './core/global';


registerLocaleData();

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    NgZorroAntdModule
  ],
  providers: [
    ...globalProviders,
    ...i18nProviders,
    ...titleProviders,
    AppInitializer
  ],
  bootstrap: [AppComponent]
})
export class AppModule {
}
