import { registerLocaleData as regist } from '@angular/common';
import zh from '@angular/common/locales/zh';
import { Inject, Injectable, InjectionToken, LOCALE_ID, Provider } from '@angular/core';
import * as df_zh_cn from 'date-fns/locale/zh_cn';
import { NZ_I18N, zh_CN as nz_zh_cn } from 'ng-zorro-antd';
import { zh_CN as mng_zh_cn } from './locals/zh_CN';

export const DF_I18N_TOKEN = new InjectionToken<any>('date-fns-i18n');
export const MNG_I18N_TOKEN = new InjectionToken<any>('mng-i18b');

/**
 * 注册angular本地化数据
 */
export function registerLocaleData() {
  regist(zh);
}

export const i18nProviders: Provider[] = [
  // angular i18n 配置
  { provide: LOCALE_ID, useValue: 'zh-Hans' },
  // ng-zorro-antd i18n 配置
  { provide: NZ_I18N, useValue: nz_zh_cn },
  // date-fns i18n 配置
  { provide: DF_I18N_TOKEN, useValue: df_zh_cn },
  // 本项目定义的i18n 配置
  { provide: MNG_I18N_TOKEN, useValue: mng_zh_cn }
];

@Injectable({ providedIn: 'root' })
export class I18nService {

  private locale: any;

  constructor(
    @Inject(MNG_I18N_TOKEN) locale: any,
    @Inject(DF_I18N_TOKEN) dfLocale: any
  ) {
    this.locale = locale;
    this.setDateFns(dfLocale);
  }

  /**
   * 设置date-fns i8n
   * @param locale 本地化信息
   */
  private setDateFns(locale: any) {
    (window as any).__locale__ = locale;
    return this;
  }

  /**
   * 获取标题本地化数据
   * @param tKey title key
   */
  public getTile(tKey: string): string {
    const title = this.locale && this.locale.title ? this.locale.title : {};
    return title[tKey] || tKey;
  }
}
