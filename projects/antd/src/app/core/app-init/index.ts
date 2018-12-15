import { APP_INITIALIZER, Provider } from '@angular/core';
import { I18nService } from '../i18n/i18n.service';
import { TitleService } from '../title/title.service';

export function AppInitializerFactory(i18n: I18nService, title: TitleService) {
  return () => {
  };
}

/**
 * 部分服务需要在应用启动后立即初始化
 */
export const AppInitializer: Provider = {
  provide: APP_INITIALIZER,
  useFactory: AppInitializerFactory,
  deps: [I18nService, TitleService],
  multi: true
};
