import { Model, HackType } from '../../store/annotation/model.annotation';
import { EVENT_TITLE, EVENT_INIT_MSG } from '../definitions';

/**
 * 事件队列model
 */
@Model(EVENT_TITLE)
export class EventModel {
  /**
   * 事件描述
   */
  event: {} | string = EVENT_INIT_MSG;

  /**
   * 发布事件
   * @param event 事件
   */
  publish(event: any) {
    this.event = event;
  }
}

export const EventModelHack = HackType(EventModel);
