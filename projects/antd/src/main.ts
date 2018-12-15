import { enableProdMode } from '@angular/core';
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import 'hammerjs';
import { AppModule } from './app/app.module';
import { preloaderFinished } from './app/components/preloader';
import { environment } from './environments/environment';


const preloaderDone = preloaderFinished();

if (environment.production) {
  enableProdMode();
}

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .finally(preloaderDone)
  .catch(err => console.error(err));
