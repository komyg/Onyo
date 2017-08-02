import { Injectable } from '@angular/core';

import { Action } from '@ngrx/store';
import { Actions, Effect, toPayload } from '@ngrx/effects';

import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/of';

import { Node } from '../model/node';
import { ProductTreeService } from '../services/product-tree.service';
import { LoadProductTreeAction, LoadProductTreeCompleteAction, LoadProductTreeFailAction } from '../actions/product-tree.action';
import * as productTreeActions from '../actions/product-tree.action';

@Injectable()
export class ProductTreeEffect {

  @Effect() loadProductTree$: Observable<Action> = this.actions.ofType(productTreeActions.LOAD_PRODUCT_TREE)
    .mergeMap((action: LoadProductTreeAction) => this.productTreeService.createTree(action.payload)
      .map((productTree: Map<number, Node>) => new LoadProductTreeCompleteAction(productTree))
      .catch(error => Observable.throw(new LoadProductTreeFailAction(error))));

  constructor(private productTreeService: ProductTreeService, private actions: Actions) { }
}
