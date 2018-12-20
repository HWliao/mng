import { Provider } from '@angular/core';
import { windowProvider } from './window.service';
import { documentProvider } from './document.service';

export const globalProviders: Provider[] = [windowProvider, documentProvider];
