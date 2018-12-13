import { Injectable, OnDestroy } from '@angular/core';
import { Subscribe, Store, AopService } from 'store';
import { InitCount, AddCount } from '../event/count.event';
import { CountModel } from '../model/count.model';

@Injectable({ providedIn: 'root' })
export class CountService implements OnDestroy {

  @Store(CountModel)
  count: CountModel;

  constructor(aop: AopService) { aop.weave(this); }

  @Subscribe(InitCount)
  doInitCount(count: InitCount) {
    this.count.setCount(count.count);
  }

  @Subscribe(AddCount)
  doAddCount(count: AddCount) {
    this.count.setCount(this.count.count + count.count);
  }

  ngOnDestroy() { }
}
