import { Action } from '@ngrx/store';

import { Node } from '../model/node';

export const ActionTypes = {
  LOAD_PRODUCT_TREE: 'load-product-tree',
  LOAD_PRODUCT_TREE_COMPLETE: 'load-product-tree-complete',
  LOAD_PRODUCT_TREE_FAIL: 'load-product-tree-fail'
};

export class LoadProductTreeAction implements Action {
  type = ActionTypes.LOAD_PRODUCT_TREE;
  constructor (public payload: number) { }
}

export class LoadProductTreeCompleteAction implements Action {
  type = ActionTypes.LOAD_PRODUCT_TREE_COMPLETE;
  constructor (public payload: Map<number, Node>) { }
}

export class LoadProductTreeFailAction implements Action {
  type = ActionTypes.LOAD_PRODUCT_TREE_FAIL;
  constructor (public payload: string) { }
}

export type Actions = LoadProductTreeAction | LoadProductTreeCompleteAction | LoadProductTreeFailAction;
