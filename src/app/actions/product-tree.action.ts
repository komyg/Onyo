import { Action } from '@ngrx/store';

import { Node } from '../model/node';

export const LOAD_PRODUCT_TREE = 'load-product-tree';
export const LOAD_PRODUCT_TREE_COMPLETE = 'load-product-tree-complete';
export const LOAD_PRODUCT_TREE_FAIL = 'load-product-tree-fail';

export const DELETE_BRANCH = 'delete-branch';
export const ADD_CHILD = 'add-child';

/**
 * Loads tree from backend and resets current state.
 */
export class LoadProductTreeAction implements Action {
  readonly type = LOAD_PRODUCT_TREE;
  constructor (public payload: number) { }
}

/**
 * Returns the loaded tree from the backend.
 */
export class LoadProductTreeCompleteAction implements Action {
  readonly type = LOAD_PRODUCT_TREE_COMPLETE;
  constructor (public payload: Map<number, Node>) { }
}

/**
 * Returns an error that happened when the tree was being loaded from the backend.
 */
export class LoadProductTreeFailAction implements Action {
  readonly type = LOAD_PRODUCT_TREE_FAIL;
  constructor (public payload: string) { }
}

/**
 * Deletes an entire branch of the tree (the current node and all child nodes).
 */
export class DeleteBranchAction implements Action {
  readonly type = DELETE_BRANCH;
  constructor (public payload: Node) { }
}

/**
 * Adds a child to a node.
 */
export class AddChildAction implements Action {
  readonly type = ADD_CHILD;
  constructor (public payload: { parent: Node, newChild: Node }) { }
}

export type Actions = LoadProductTreeAction |
                      LoadProductTreeCompleteAction |
                      LoadProductTreeFailAction |
                      DeleteBranchAction |
                      AddChildAction;
