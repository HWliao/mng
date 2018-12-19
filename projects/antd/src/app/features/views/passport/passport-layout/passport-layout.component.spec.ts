import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PassportLayoutComponent } from './passport-layout.component';

describe('PassportLayoutComponent', () => {
  let component: PassportLayoutComponent;
  let fixture: ComponentFixture<PassportLayoutComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PassportLayoutComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PassportLayoutComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
