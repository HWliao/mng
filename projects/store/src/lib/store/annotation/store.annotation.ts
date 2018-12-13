import { Type } from '@angular/core';
import { MD_STORE, StroeMetaData, warning } from '../definitions';
import { registerReduxPointcut } from '../service/store-aspect.service';

/**
 * 标记property为某个model的代理
 * @param model model类
 */
export function Store(model: Type<any>) {
  return function (target: any, propertyKey: string) {
    const { constructor } = target;
    const mds: { [key: string]: StroeMetaData } = Reflect.getOwnMetadata(MD_STORE, constructor) || {};
    if (mds[propertyKey]) {
      warning(`${propertyKey} 已经有一个store的标记了`);
    } else {
      mds[propertyKey] = { propertyKey, model };
      Reflect.defineMetadata(MD_STORE, mds, constructor);
      registerReduxPointcut(constructor);
    }
  };
}
