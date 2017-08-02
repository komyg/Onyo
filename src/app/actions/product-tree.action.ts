import { Action } from '@ngrx/store';

import { Node } from '../model/node';

export const ActionTypes = {
  LOAD_PRODUCT_TREE: 'load-product-tree',
  LOAD_PRODUCT_TREE_COMPLETE: 'load-product-tree-complete',
  LOAD_PRODUCT_TREE_FAIL: 'load-product-tree-fail',

  DELETE_BRANCH: 'delete-branch'
};

/**
 * Loads tree from backend and resets current state.
 */
export class LoadProductTreeAction implements Action {
  type = ActionTypes.LOAD_PRODUCT_TREE;
  constructor (public payload: number) { }
}

/**
 * Returns the loaded tree from the backend.
 */
export class LoadProductTreeCompleteAction implements Action {
  type = ActionTypes.LOAD_PRODUCT_TREE_COMPLETE;
  constructor (public payload: Map<number, Node>) { }
}

/**
 * Returns an error that happened when the tree was being loaded from the backend.
 */
export class LoadProductTreeFailAction implements Action {
  type = ActionTypes.LOAD_PRODUCT_TREE_FAIL;
  constructor (public payload: string) { }
}

/**
 * Deletes an entire branch of the tree (the current node and all child nodes).
 */
export class DeleteBranchAction implements Action {
  type = ActionTypes.DELETE_BRANCH;
  constructor (public payload: Node) { }
}

export type Actions = LoadProductTreeAction |
                      LoadProductTreeCompleteAction |
                      LoadProductTreeFailAction |
                      DeleteBranchAction;
