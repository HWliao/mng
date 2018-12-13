import { Type } from '@angular/core';
import { checkArgumentFn, warningFn } from '../tools';

export const EVENT_TITLE = '@@[event-stream]';
export const EVENT_INIT_MSG = `${EVENT_TITLE}init message$!@#$%`;
/**
 * event stream aspect 标识
 */
export const MD_EVENT_ASPECT = `${EVENT_TITLE}aspect`;
/**
 * event stream 监听者通知标识
 */
export const MD_EVENT_SUB_ADVICE = `${EVENT_TITLE}subscribe`;
/**
 * 订阅者元数据
 */
export interface SubscribeMetadata {
  /**
   * event type class
   */
  event: Type<any>;
  /**
   * 被标记的属性
   */
  propertyKey: string;
}
/**
 * event stream 发布者通知标识
 */
export const MD_EVENT_PUB_ADVICE = `${EVENT_TITLE}publish`;
/**
 * 发布者元数据
 */
export interface PublishMetadata {
  propertyKey: string;
}

export const warning = warningFn(EVENT_TITLE);
export const checkArgument = checkArgumentFn(EVENT_TITLE);
