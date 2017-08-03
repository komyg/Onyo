import { async, ComponentFixture, TestBed } from '@angular/core/testing';
import { DebugElement } from '@angular/core';
import { By } from '@angular/platform-browser';
import { StoreModule, combineReducers, Store } from '@ngrx/store';
import { NgbModule } from '@ng-bootstrap/ng-bootstrap';

import * as productTreeActions from '../../actions/product-tree.action';
import { State, productTreeReducer } from '../../reducers/product-tree.reducer';

import { NodeAccordionComponent } from './node-accordion.component';

import { Node } from '../../model/node';

describe('NodeAccordionComponent', () => {
  let component: NodeAccordionComponent;
  let fixture: ComponentFixture<NodeAccordionComponent>;
  let store: Store<State>;
  let fakeNode: Node;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports: [
        NgbModule.forRoot(),
        StoreModule.forRoot({ productTree: productTreeReducer })
      ],
      declarations: [ NodeAccordionComponent ]
    })
    .compileComponents();
  }));

  // Setup store.
  beforeEach(() => {
    store = TestBed.get(Store);
    spyOn(store, 'dispatch').and.callThrough();
  });

  // Setup the component.
  beforeEach(() => {
    const fakeChildData = {
      numericalId: 321,
      name: 'Cachorro Quente',
      type: 'simple'
    }
    fakeNode = new Node(fakeChildData);

    fixture = TestBed.createComponent(NodeAccordionComponent);
    component = fixture.componentInstance;
    component.node = fakeNode;
    fixture.detectChanges();
  });

  it('should be created', () => {
    expect(component).toBeTruthy();
  });

  it('should call DELETE_BRANCH action', () => {
    const button = fixture.debugElement.query(By.css('.button-delete-branch'));
    expect(button).toBeTruthy();

    const action = new productTreeActions.DeleteBranchAction(fakeNode);

    button.nativeElement.click();
    expect(store.dispatch).toHaveBeenCalledWith(action);
  });

});
