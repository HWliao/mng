import { Type } from '@angular/core';
import { produce } from 'immer';
import { AnyAction, Reducer } from 'redux';
import { MD_MODEL_TOKEN, ModelConfig, ModelMetadata, StateKeyType, checkArgument } from '../definitions';
import { getParamtypes } from '../../tools';

/**
 * 用来检查model name是否唯一
 */
const modelNameMap = {};

/**
 * Model注解
 * @param config model配置
 */
export function Model(config: ModelConfig | string) {
  config = typeof config === 'string' ? { name: config } : config;

  checkArgument(config.name && config.name.trim() !== '', `model name 不能为null/undefined/空字符串`);
  checkArgument(!modelNameMap[config.name], `model ${config.name} 已经存在了,model name必须唯一`);
  checkArgument(
    !!((!config.reducer && !config.createAction) || (config.reducer && config.createAction)),
    '自定义 reducer和createAction必须同时存在或者不存在!'
  );
  config = Object.assign({}, config);

  return (Target: Type<any>) => {
    const params = getParamtypes(Target);
    checkArgument(!params || params.length === 0, `model 类构造函数不能有参数！`);

    const target = new Target();

    // 以下主要完成3个工作
    // 1.在target构造函数上创建辅助用的属性
    // 2.创建默认的createAction
    // 3.创建默认的reducer

    // 默认state 必须为plain object
    const initState = {};

    // state keys 都是在直接存在实例对象之上属性，在初始化过程中被赋予了初始值
    const stateKeys = <string[]>Reflect.ownKeys(target).filter(key => typeof key === 'string');
    // 在目标对象构造器上定义state key的辅助属性
    stateKeys.forEach(key => Reflect.defineProperty(Target, key, { get: () => ({ key: key, model: Target }), enumerable: true }));
    // 设置默认的状态值 此部分为有效的state值
    stateKeys.forEach(key => initState[key] = target[key]);

    // 沿着原型链查找有效的方法,方法名作为action type;方法本省作为对应的reducer
    const actionReducers = {};
    const actionKeys: string[] = [];
    let proto = Reflect.getPrototypeOf(target);
    while (proto && Reflect.getPrototypeOf(proto)) {
      const currKeys = Reflect.ownKeys(proto);
      for (let i = 0; i < currKeys.length; i++) {
        const currKey = currKeys[i];
        if (typeof currKey !== 'string') {
          continue;
        }
        if (currKey === 'contructor') {
          // contructor属性过滤掉
          continue;
        }
        if (initState[currKey]) {
          // prototype上的属性在构造器中重新初始化了,将导致其作为state
          continue;
        }
        if (typeof target[currKey] !== 'function') {
          // action key对应的值必须为函数
          continue;
        }
        if (actionReducers[currKey]) {
          // 子类中的action覆盖掉父类的action
          continue;
        }

        actionKeys.push(currKey);
        // 记录action对应的reducer处理函数
        const actionKey = createActionType((<ModelConfig>config).name, currKey);
        actionReducers[actionKey] = target[currKey];
        // 在目标对象构造器上定义action type辅助属性
        Reflect.defineProperty(Target, currKey, { get: () => actionKey, enumerable: true });
      }
      proto = Reflect.getPrototypeOf(proto);
    }

    // 定义默认的createAction
    // type为有效的actionKey
    // payload为actionkey对象的函数的参数列表
    const createAction: (actinType: string, args: any[]) => AnyAction = (type: string, payload: any[]) => ({ type, payload });

    // 这里需要将有效的actin key对应的函数设置到initState中
    // 这些设置的值都是函数,不是有效的状态值
    // 目的是为了在"代理model"中实现方法的嵌套调用
    actionKeys.forEach(key => initState[key] = target[key]);

    // 定义默认的reducer
    // 借助immer进行值得处理
    const reducer: Reducer = (state = initState, action: AnyAction) => {
      if (action && actionReducers[action.type]) {
        const actionReducer = actionReducers[action.type];
        return produce(state, draftState => {
          Reflect.apply(actionReducer, draftState, action.payload);
        });
      }
      return state;
    };

    // model 类元数据
    const modelMd: ModelMetadata = {
      config: <ModelConfig>config,
      reducer: reducer,
      createAction: createAction,
      stateKeys,
      actionKeys
    };
    // 将model配置绑定到目标类上
    Reflect.defineMetadata(MD_MODEL_TOKEN, modelMd, Target);
  };
}
/**
 * 从model中获取model元数据
 * @param model model类
 */
export function getModel(model: Type<any>): ModelMetadata {
  return Reflect.getOwnMetadata(MD_MODEL_TOKEN, model);
}
/**
 * 创建action type
 */
export function createActionType(name: string, type: string) {
  return `${name}.${type}`;
}
/**
 * 转换model类的类型
 * @param c 目标model类
 */
export function HackType<T>(c: Type<T>): Type<T> & { [key in keyof T]: StateKeyType<T> } {
  return <Type<T> & { [key in keyof T]: StateKeyType<T> }>c;
}
