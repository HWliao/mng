import { Type } from '@angular/core';
import { DESIGN_PARAMTYPES } from '../../design-metadata';
import { checkArgument, MD_EVENT_SUB_ADVICE, SubscribeMetadata, warning } from '../definitions';
import { registerEventPointcut } from '../service/event.aspect';

/**
 * 订阅
 */
export function Subscribe(EventType?: Type<any>) {
  return function (target: any, propertyKey: string, descriptor: PropertyDescriptor) {
    checkArgument(typeof target[propertyKey] === 'function', `subscribe 标记的${propertyKey}必须为实例方法`);

    const params: any[] = Reflect.getOwnMetadata(DESIGN_PARAMTYPES, target, propertyKey);
    // 如果未指定参数,则使用第一个参数类型作为EventType
    EventType = EventType ? EventType : params && params[0] ? params[0] : null;
    checkArgument(
      params && params.length === 1 && typeof params[0] === 'function' && params[0] === EventType,
      `subscribe method ${propertyKey} 只能有一个参数,且类型必须与订阅类型一致`
    );

    const constructor = target.constructor;
    const ads: { [key: string]: SubscribeMetadata } = Reflect.getOwnMetadata(MD_EVENT_SUB_ADVICE, constructor) || {};
    if (ads[propertyKey]) {
      warning(`[event-stream]subscribe method ${propertyKey} 已经被标记为了订阅者,不能在次标记`);
    } else {
      ads[propertyKey] = { event: EventType, propertyKey: propertyKey };
      Reflect.defineMetadata(MD_EVENT_SUB_ADVICE, ads, constructor);
      registerEventPointcut(constructor);
    }
  };
}
