import { DESIGN_PARAMTYPES, DESIGN_RETURNTYPE, DESIGN_TYPE } from './design-metadata';

/**
 * 获取给定元素的类构造器
 * @param target 目标元素
 */
export function getConstructor(target: any): Function {
  return Reflect.getPrototypeOf(target).constructor;
}
export function getReturnType(target: any, propertyKey: string) {
  return Reflect.getOwnMetadata(DESIGN_RETURNTYPE, target, propertyKey);
}
export function getParamtypes(target: any, propertyKey?: string) {
  if (propertyKey) {
    return Reflect.getOwnMetadata(DESIGN_PARAMTYPES, target, propertyKey);
  } else {
    return Reflect.getOwnMetadata(DESIGN_PARAMTYPES, target);
  }
}
export function getType(target: any, propertyKey: string) {
  return Reflect.getOwnMetadata(DESIGN_TYPE, target, propertyKey);
}
/**
 * Prints a warning in the console if it exists.
 *
 * @param  message The warning message.
 */
export function warning(message: string) {
  if (typeof console !== 'undefined' && typeof console.error === 'function') {
    console.error(message);
  }
  try {
    // This error was thrown as a convenience so that if you enable
    // "break on all exceptions" in your console,
    // it would pause the execution at this line.
    throw new Error(message);
  } catch (e) { }
}
export function warningFn(name: string) {
  return function (msessage: string) {
    warning(`${name}${msessage}`);
  };
}
/**
 * 判断表达式
 * @param expression 表达式
 * @param msg 提示
 */
export function checkArgument(expression: boolean, msg?: string) {
  if (!expression) {
    throw new Error(msg || 'Parameter error!');
  }
}
export function checkArgumentFn(name: string) {
  return function (expression: boolean, msg?: string) {
    checkArgument(expression, `${name}${msg || ''}`);
  };
}
/**
 *
 * @param obj 检查是为空对象
 */
export function isEmptyObject(obj: object) {
  // tslint:disable-next-line
  for (const name in obj) {
    return false;
  }
  return true;
}
/**
 * 空函数
 */
export const noop = () => {
};
/**
 * 返回自己的函数
 * @param m 参数
 */
export const returnSelf = m => m;
