import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { NodeAccordionComponent } from './node-accordion.component';

describe('NodeAccordionComponent', () => {
  let component: NodeAccordionComponent;
  let fixture: ComponentFixture<NodeAccordionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ NodeAccordionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(NodeAccordionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });
});
