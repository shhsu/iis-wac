import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { WebsiteGeneralComponent } from './website-general.component';

describe('WebsiteGeneralComponent', () => {
  let component: WebsiteGeneralComponent;
  let fixture: ComponentFixture<WebsiteGeneralComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ WebsiteGeneralComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(WebsiteGeneralComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
