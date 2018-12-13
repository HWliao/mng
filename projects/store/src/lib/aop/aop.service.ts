import { Injectable, InjectionToken, Injector, Type } from '@angular/core';
import { checkArgumentFn, getConstructor, warningFn } from '../tools';

// aspect
// advice 通知
// poincut 切入点
// weaving 编织
// target object 目标元素

export const AOP_TITLE = '@@[aop]';
const checkArgument = checkArgumentFn(AOP_TITLE);
const warning = warningFn(AOP_TITLE);
/**
 * 在target object的metadata关于aspect advice的标识
 * value为一个数组,内部存储了附加在target object上的aspect service/handler
 */
export const MD_ADVICE_ASPECT = `${AOP_TITLE}advice.aspect`;
/**
 * 在target object上为pointcut注册对应的aspect
 * @param target 目标对象
 * @param name aspect name
 * @param token angular inject token
 * @param handler 处理函数
 */
export function registerPointcut(target: Type<any>, name: string, token?: Type<any> | InjectionToken<any>, weave?: (any) => any) {
  checkArgument(!!(token || weave), `注册切面时必须指定token或者handler`);

  const advices: { [key: string]: AspectAdvice } = Reflect.getOwnMetadata(MD_ADVICE_ASPECT, target) || {};
  const theAdvice = advices[name];
  // 待注册的token或者handler与原有的token/handler 不一致则错误提示
  if (theAdvice && ((token && token !== theAdvice.token) || (weave && weave !== theAdvice.weave))) {
    warning(`切面 ${name} 已经被注册了`);
  } else if (!theAdvice) {
    advices[name] = { name, token, weave };
    Reflect.defineMetadata(MD_ADVICE_ASPECT, advices, target);
  }
}
/**
 * piontcut aspect advice
 * token或者weave必须存在一个,优先使用token
 */
export interface AspectAdvice {
  /**
   * aspect 位置名称
   */
  name: string;
  /**
   * 用于从angular中获取服务的token
   */
  token?: Type<any> | InjectionToken<any>;
  /**
   * 编织函数
   */
  weave?: (target: any) => any;
}

/**
 * aspect接口
 */
export interface Aspect {
  /**
   * aspect处理函数
   */
  weave(target: any): any;

  [key: string]: any;
  [key: number]: any;
}

/**
 * aop service 主要用来对target object进行weaving(编织)
 */
@Injectable({ providedIn: 'root' })
export class AopService {
  constructor(private readonly root: Injector) { }
  weave(target: any, theInjector?: Injector) {
    // 优先使用参数中给定的注入器
    const injector = theInjector || this.root;

    const constructor = getConstructor(target);
    const advices: { [key: string]: AspectAdvice } = Reflect.getOwnMetadata(MD_ADVICE_ASPECT, constructor) || [];

    Object.values(advices).forEach(advice => {
      const service: Aspect = injector.get(advice.token, { weave: advice.weave });
      if (service && service.weave && typeof service.weave === 'function') {
        service.weave(target);
      } else {
        warning(`切面 ${advice.name} 没有对应的token/handler`);
      }
    });
  }
}
