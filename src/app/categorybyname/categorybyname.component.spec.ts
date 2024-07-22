import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoryByNameComponent} from './categorybyname.component';

describe('CategorybynameComponent', () => {
  let component: CategoryByNameComponent;
  let fixture: ComponentFixture<CategoryByNameComponent>;

  beforeEach(() => {
    TestBed.configureTestingModule({
      declarations: [CategoryByNameComponent]
    });
    fixture = TestBed.createComponent(CategoryByNameComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
