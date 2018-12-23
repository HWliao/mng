import { Type } from '@angular/core';
import { checkArgument, MD_STORE, StroeMetaData, warning } from '../definitions';
import { registerReduxPointcut } from '../service/store-aspect.service';
import { getType } from '../../tools';
import { getModel } from './model.annotation';

/**
 * 标记property为某个model的代理
 * @param model model类
 */
export function Store(model?: Type<any>) {
  return function (target: any, propertyKey: string) {
    const { constructor } = target;

    // 没有指定model,则使用property type
    if (!model) {
      const type = getType(target, propertyKey);
      model = typeof type === 'function' ? type : null;
    }
    checkArgument(!!(model && getModel(model)), `${propertyKey}指定的store model未使用@Model标识`);

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
