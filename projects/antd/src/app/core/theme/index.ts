import { Provider } from '@angular/core';
import { NZ_ICON_DEFAULT_TWOTONE_COLOR } from 'ng-zorro-antd';

export const themeProviders: Provider[] = [
  { provide: NZ_ICON_DEFAULT_TWOTONE_COLOR, useValue: '#fa541c' }
];
