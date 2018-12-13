import { Model, Hack } from 'store';

@Model('app.count')
export class CountModel {
  count = 0;

  add() {
    this.count++;
  }
  setCount(count: number) {
    this.count = count;
  }
}

export const CountHack = Hack(CountModel);
