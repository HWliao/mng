import { InjectionToken, Provider } from '@angular/core';

export const DOCUMENT = new InjectionToken<Document>('Document');
export const documentProvider: Provider = { provide: DOCUMENT, useValue: document };
