import { Component } from '@angular/core';
import { CountModel, CountHack } from './model/count.model';
import { Select, AopService, Publish, Store } from 'store';
import { Observable } from 'rxjs';
import { InitCount, AddCount } from './event/count.event';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'mng';

  @Store(CountModel)
  countModel: CountModel;
  @Select(CountHack.count)
  count: Observable<number>;

  constructor(aop: AopService) { aop.weave(this); }

  @Publish(InitCount)
  initCount(): InitCount {
    return new InitCount(100);
  }

  @Publish()
  addCount() {
    return new AddCount(2);
  }

  changeTitle() {
    this.title = `mng-${this.countModel.count}`;
  }
}
