import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';

import * as productTreeOperations from '../actions/product-tree.action';

import { Node } from '../model/node';
import { ProductTreeReducerHelper } from '../helpers/product-tree-reducer.helper';

export interface State {
  productTree: Map<number, Node>;
  errorMsg: string;
}

const initialState: State = {
  productTree: new Map<number, Node>(),
  errorMsg: ''
};

export function productTreeReducer(state = initialState, action: productTreeOperations.Actions): State {

  switch (action.type) {
    case productTreeOperations.LOAD_PRODUCT_TREE:
      return initialState; // Reset state

    case productTreeOperations.LOAD_PRODUCT_TREE_COMPLETE:
      return { productTree: action.payload, errorMsg: '' };

    case productTreeOperations.LOAD_PRODUCT_TREE_FAIL:
      return { productTree: undefined, errorMsg: action.payload }

    case productTreeOperations.DELETE_BRANCH:
      const node = <Node>action.payload;
      const newState = Object.assign({}, state);

      // If we have a top level node.
      if (!node.parent) {
        newState.productTree.delete(node.id);
      }
      else {
        // Get the path to the uppermost node.
        const path: Array<number> = ProductTreeReducerHelper.getPathToParent(node);

        // Drill down on the new structure until we reach the parent of the node to delete.
        let deleteNodeParent: Node = newState.productTree.get(path.pop());
        while (path.length > 0) {
          deleteNodeParent = deleteNodeParent.children.get(path.pop());
        }

        // Delete the node.
        deleteNodeParent.children.delete(node.id);
      }

      return newState;

    default:
      return state;
  }

}
