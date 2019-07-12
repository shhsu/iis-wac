import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebserverGeneralComponent } from './webserver-general.component';

describe('WebserverGeneralComponent', () => {
  let component: WebserverGeneralComponent;
  let fixture: ComponentFixture<WebserverGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebserverGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebserverGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
