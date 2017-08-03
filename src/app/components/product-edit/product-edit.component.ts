import { Component, OnInit, OnDestroy, AfterViewInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Store } from '@ngrx/store';

import { Node } from '../../model/node';

import * as productTreeActions from '../../actions/product-tree.action';
import { State } from '../../reducers/product-tree.reducer';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit, OnDestroy {

  categoryMap: Map<number, Node>;
  categoryObs$;
  categoryObsSubscription;

  constructor(private store: Store<State>) { }

  ngOnInit() {
    // Retrieve data from the backend.
    this.categoryObs$ = this.store.select('productTree');
    this.categoryObsSubscription = this.categoryObs$.subscribe((res: State) => {
      this.categoryMap = res.productTree;
    }, (error) => {
      console.error(error);
    });

    this.store.dispatch(new productTreeActions.LoadProductTreeAction(1));
  }

  ngOnDestroy() {
    this.categoryObsSubscription.unsubscribe();
  }

}
