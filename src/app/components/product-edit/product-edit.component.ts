import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Node } from '../../model/node';

import * as productTreeActions from '../../actions/product-tree.action';
import * as productTreeReducer from '../../reducers/product-tree.reducer';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  categoryMap: Map<number, Node>;
  categoryObs$: Observable<Map<number, Node>>;
  categoryObsSubscription;

  constructor(private store: Store<productTreeReducer.AppState>) { }

  ngOnInit() {
    // Retrieve data from the backend.
    this.categoryObs$ = this.store.select(productTreeReducer.selectFeatureProductTree);
    this.categoryObsSubscription = this.categoryObs$.subscribe((res: Map<number, Node>) => {
      this.categoryMap = res;
    }, (error) => {
      console.error(error);
    });

    this.store.dispatch(new productTreeActions.LoadProductTreeAction(1));
  }

  ngOnDestroy() {
    this.categoryObsSubscription.unsubscribe();
  }

}
