import { Type } from '@angular/core';
import { checkArgument, MD_SELECT, SelectMetadata, StateKeyType, warning } from '../definitions';
import { registerReduxPointcut } from '../service/store-aspect.service';
import { getType } from '../../tools';
import { getModel } from './model.annotation';

/**
 * 从redux的store中监听某个
 * @param stateKey 指定一个state的key 可以给当一个model类或者指定一个model的“属性标识”
 */
export function Select(stateKey?: Type<any> | StateKeyType<any>) {
  if (stateKey) {
    const modelConfig = getModel(<Type<any>>stateKey);
    if (modelConfig) {
      // 说明直接传递进来的是一个model类,想要监听整个model对应的state
      stateKey = { model: <Type<any>>stateKey };
    }
  }
  return function (target: any, propertyKey: string) {
    if (!stateKey) {
      let type = getType(target, propertyKey);
      type = typeof type === 'function' ? type : null;
      stateKey = { model: type };
    }
    const tmp = <StateKeyType<any>>stateKey;
    checkArgument(tmp && tmp.model && !!getModel(tmp.model), `${propertyKey}指定的Store model未使用@Model标识`);

    const { constructor } = target;
    const mds: { [key: string]: SelectMetadata } = Reflect.getOwnMetadata(MD_SELECT, constructor) || [];
    if (mds[propertyKey]) {
      warning(`propertykey ${propertyKey}已经有个select的标记了`);
    } else {
      mds[propertyKey] = { propertyKey, ...tmp };
      Reflect.defineMetadata(MD_SELECT, mds, constructor);
      registerReduxPointcut(constructor);
    }
  };
}
