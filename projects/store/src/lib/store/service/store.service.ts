import { Inject, Injectable, Optional } from '@angular/core';
import { AnyAction, ReducersMapObject, Store } from 'redux';
import { from, Observable } from 'rxjs';
import { buildStore, createReducer } from '../redux/store';
import { defaultStoreConfig, StoreConfig, STORE_CONFIG_TOKEN } from '../redux/store.config';

/**
 * 封装redux的核心服务
 */
@Injectable({ providedIn: 'root' })
export class StoreService {
  private store: Store<any>;
  private config: StoreConfig;

  constructor(@Optional() @Inject(STORE_CONFIG_TOKEN) config?: StoreConfig) {
    this.config = Object.assign({}, defaultStoreConfig, config || {});
    this.store = buildStore(this.config);
  }
  /**
   * 获取整个state快照
   */
  getState(): any {
    return this.store.getState();
  }
  /**
   * 获取state observable
   */
  getState$(): Observable<any> {
    return from(<any>this.store);
  }
  /**
   * 发布一个redux action
   * @param action redux action
   */
  dispatch(action: AnyAction): void {
    this.store.dispatch(action);
  }
  /**
   * 动态替换reducer
   * @param nextReducer next reducer
   */
  replaceReducer(reducerMap: ReducersMapObject) {
    const nextReducer = createReducer({ ...this.config.extraReducers, ...reducerMap }, this.config.reducerEnhancer);
    this.store.replaceReducer(nextReducer);
  }
}
