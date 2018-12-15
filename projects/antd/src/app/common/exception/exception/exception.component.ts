import { Component, ElementRef, HostBinding, Input, OnInit, ViewChild } from '@angular/core';
import { isEmpty } from '../../tools/elements';

@Component({
  selector: 'mz-exception',
  templateUrl: './exception.component.html',
  styleUrls: ['./exception.component.less']
})
export class ExceptionComponent implements OnInit {

  @HostBinding('class.exception')
  private exceptionClass = true;
  @ViewChild('conTpl') private conTpl: ElementRef;
  hasCon = false;

  _img = '';
  _title = '';
  _desc = '';

  @Input()
  set type(value: 403 | 404 | 500) {
    const item = {
      403: {
        img:
          'https://gw.alipayobjects.com/zos/rmsportal/wZcnGqRDyhPOEYFcZDnb.svg',
        title: '403',
        desc: '抱歉，你无权访问该页面',
      },
      404: {
        img:
          'https://gw.alipayobjects.com/zos/rmsportal/KpnpchXsobRgLElEozzI.svg',
        title: '404',
        desc: '抱歉，你访问的页面不存在',
      },
      500: {
        img:
          'https://gw.alipayobjects.com/zos/rmsportal/RVRUAYdCGeYNBWoKiIwB.svg',
        title: '500',
        desc: '抱歉，服务器出错了',
      },
    }[value];

    if (!item) {
      return;
    }

    this._img = item.img;
    this._title = item.title;
    this._desc = item.desc;
  }

  @Input()
  set img(value) {
    this._img = value;
  }

  @Input()
  set title(value) {
    this._title = value;
  }

  @Input()
  set desc(value) {
    this._desc = value;
  }

  checkContent() {
    this.hasCon = !isEmpty(this.conTpl.nativeElement);
  }

  ngOnInit() {
    this.checkContent();
  }
}
