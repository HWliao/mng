import { Injectable, Type } from '@angular/core';
import { getConstructor } from '../../tools';
import { Aspect, registerPointcut } from '../../aop/aop.service';
import { MD_EVENT_ASPECT, MD_EVENT_PUB_ADVICE, MD_EVENT_SUB_ADVICE, PublishMetadata, SubscribeMetadata, warning } from '../definitions';
import { EventService } from './event.service';

/**
 * 注册切入点
 * @param target 目标对象
 */
export function registerEventPointcut(target: Type<any>) {
  return registerPointcut(target, MD_EVENT_ASPECT, EventAspect);
}

/**
 * event stream aspect service
 */
@Injectable({ providedIn: 'root' })
export class EventAspect implements Aspect {

  constructor(private event: EventService) {
  }

  weave(target: any) {
    const constructor = getConstructor(target);

    const pubMdObj: { [key: string]: PublishMetadata } = Reflect.getOwnMetadata(MD_EVENT_PUB_ADVICE, constructor) || {};
    const subMdObj: { [key: string]: SubscribeMetadata } = Reflect.getOwnMetadata(MD_EVENT_SUB_ADVICE, constructor) || {};

    this.proxyPub(target, Object.values(pubMdObj));
    this.proxySub(target, Object.values(subMdObj));
  }

  /**
   * 代理订阅者
   * @param target 目标对象
   * @param subs 订阅者
   */
  private proxySub(target: any, subs: SubscribeMetadata[]): any {
    const subscribes = [];
    subs.forEach(sub => {
      let method: (event: any) => void = target[sub.propertyKey];
      method = method.bind(target);
      const event = sub.event;
      this.event.subscribe(event, method);
      subscribes.push({ event, method });
    });
    if (subscribes && subscribes.length > 0) {
      const ngOnDestroy: Function = target.ngOnDestroy;
      if (typeof ngOnDestroy !== 'function') {
        warning(`存在订阅者的服务需要实现angular的OnDestroy,需要用于动态添加回收订阅的方法`);
      }
      target.ngOnDestroy = () => {
        if (typeof ngOnDestroy === 'function') {
          Reflect.apply(ngOnDestroy, target, []);
        }
        subscribes.forEach(subscribe => this.event.unsubscribe(subscribe.event, subscribe.method));
      };
    }
  }

  /**
   * 代理发布者
   * @param target 对象
   * @param pubs 发布者
   */
  private proxyPub(target: any, pubs: PublishMetadata[]): any {
    pubs.forEach(pub => {
      const method = target[pub.propertyKey];
      Reflect.defineProperty(target, pub.propertyKey, {
        set: () => warning(`${pub.propertyKey} 不能通过setter赋值`),
        get: () => (...args: any[]) => {
          const data = Reflect.apply(method, target, args);
          // 只有返回了值才进行发布
          if (data !== null && data !== undefined) {
            this.event.publish(data);
          }
          return data;
        },
        enumerable: true
      });
    });
  }
}
