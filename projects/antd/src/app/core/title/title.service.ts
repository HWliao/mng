import { InjectionToken, Provider, Optional, Inject, Injectable, OnDestroy } from '@angular/core';
import { Subscription } from 'rxjs';
import { Router, RoutesRecognized, RouterState, RouterStateSnapshot, ActivatedRouteSnapshot } from '@angular/router';
import { Title } from '@angular/platform-browser';
import { I18nService } from '../i18n/i18n.service';
import { filter, map, distinctUntilChanged, tap } from 'rxjs/operators';

export interface TitleConfig {
  /**
   * 标题前缀
   */
  prefix?: string;
  /**
   * 标题后缀
   */
  suffix?: string;
  /**
   * 分隔符
   */
  separator?: string;
  /**
   * 是否倒转
   */
  reverse?: boolean;
  /**
   * 默认标题
   */
  default?: string;
}

/**
 * 默认title配置
 */
export const DEFAULT_TITLE_CONFIG: TitleConfig = {
  prefix: '',
  suffix: '',
  separator: '',
  reverse: false,
  default: 'No Page Name'
};
/**
 * 标题配置token
 */
export const TITLE_CONFIG_TOKEN = new InjectionToken<TitleConfig>('htmlTitleConfigToken');

export const titleProviders: Provider[] = [
  { provide: TITLE_CONFIG_TOKEN, useValue: { suffix: 'root', separator: ' - ', default: '' } }
];

/**
 * 标题服务
 */
@Injectable({ providedIn: 'root' })
export class TitleService implements OnDestroy {

  private config: TitleConfig;

  private readonly titleChange$: Subscription;

  constructor(
    @Optional()
    private router: Router,
    private title: Title,
    @Optional()
    @Inject(TITLE_CONFIG_TOKEN)
    config: TitleConfig,
    private i18nService: I18nService
  ) {
    // 通过注入设置配置项
    this.setConfig(config);

    if (this.router) {
      this.titleChange$ = this.router.events.pipe(
        filter(event => event instanceof RoutesRecognized),
        map((event: RoutesRecognized) => event.state),
        map(this.getTitleFromRouterStateSnapshot.bind(this)),
        distinctUntilChanged(),
        tap(this.setTitle.bind(this))
      ).subscribe();
    }
  }

  private getTitleFromRouterState(state: RouterState): string {
    return this.getTitleFromRouterStateSnapshot(state.snapshot);
  }

  private getTitleFromRouterStateSnapshot(snapshot: RouterStateSnapshot): string {
    let route: ActivatedRouteSnapshot = snapshot.root;
    let title = route.queryParams.title || route.data.title || this.config.default;

    while (route.firstChild) {
      route = route.firstChild;
      title = route.queryParams.title || route.data.title || title;
    }
    return title;
  }

  private setTitle(title?: string | string[]) {
    title = title || this.config.default;

    if (title && !Array.isArray(title)) {
      title = [title];
    }
    let newTiles = (title as string[]).map(t => this.i18nService.getTile(t));
    if (this.config.prefix) {
      newTiles.unshift(this.i18nService.getTile(this.config.prefix));
    }
    if (this.config.suffix) {
      newTiles.push(this.i18nService.getTile(this.config.suffix));
    }

    if (this.config.reverse) {
      newTiles = newTiles.reverse();
    }
    this.title.setTitle(newTiles.join(this.config.separator));
  }

  setConfig(value: TitleConfig) {
    this.config = Object.assign(DEFAULT_TITLE_CONFIG, value || {});
  }

  ngOnDestroy(): void {
    if (this.titleChange$) {
      this.titleChange$.unsubscribe();
    }
  }
}
