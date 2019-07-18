import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AppPoolAnnotationComponent } from './app-pool-annotation.component';

describe('AppPoolAnnotationComponent', () => {
  let component: AppPoolAnnotationComponent;
  let fixture: ComponentFixture<AppPoolAnnotationComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AppPoolAnnotationComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AppPoolAnnotationComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
