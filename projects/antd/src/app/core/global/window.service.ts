import { InjectionToken, Provider } from '@angular/core';

export const WINDOW = new InjectionToken<Window>('Window');
export const windowProvider: Provider = { provide: WINDOW, useValue: window };
