import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CategoriesHomeComponent } from './categories-home.component';

xdescribe('CategoriesHomeComponent', () => {
  let component: CategoriesHomeComponent;
  let fixture: ComponentFixture<CategoriesHomeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CategoriesHomeComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CategoriesHomeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
