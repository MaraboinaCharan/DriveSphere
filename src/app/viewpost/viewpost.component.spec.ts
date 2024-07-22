import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ViewpostComponent } from './viewpost.component';

describe('ViewpostComponent', () => {
  let component: ViewpostComponent;
  let fixture: ComponentFixture<ViewpostComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [ViewpostComponent]
    });
    fixture = TestBed.createComponent(ViewpostComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
