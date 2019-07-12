import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebserverComponent } from './webserver.component';

describe('WebserverComponent', () => {
  let component: WebserverComponent;
  let fixture: ComponentFixture<WebserverComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebserverComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebserverComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
