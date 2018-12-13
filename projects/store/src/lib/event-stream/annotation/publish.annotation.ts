import { Type } from '@angular/core';
import { DESIGN_RETURNTYPE } from '../../design-metadata';
import { MD_EVENT_PUB_ADVICE, PublishMetadata, checkArgument, warning } from '../definitions';
import { registerEventPointcut } from '../service/event.aspect';

/**
 * 发布
 */
export function Publish(EventType?: Type<any>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    checkArgument(typeof target[propertyKey] === 'function', `${propertyKey} 必须标识实例方法`);
    const returnType = Reflect.getOwnMetadata(DESIGN_RETURNTYPE, target, propertyKey);
    if (EventType) {
      checkArgument(returnType && returnType === EventType, `${propertyKey} 标识的方法返回值必须为指定类型`);
    }

    const constructor = target.constructor;
    const ads: { [key: string]: PublishMetadata } = Reflect.getOwnMetadata(MD_EVENT_PUB_ADVICE, constructor) || {};
    if (ads[propertyKey]) {
      warning(`${propertyKey} 上已经了publish标识,不能再次标识`);
    } else {
      ads[propertyKey] = { propertyKey };
      Reflect.defineMetadata(MD_EVENT_PUB_ADVICE, ads, constructor);
      registerEventPointcut(constructor);
    }
  };
}
