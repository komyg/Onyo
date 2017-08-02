import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';

import * as productTreeOperations from '../actions/product-tree.action';

import { Node } from '../model/node';
import { ProductTreeHelper } from '../helpers/product-tree.helper';

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
      return deleteBranch(action.payload, state);

    case productTreeOperations.ADD_CHILD:
      return addChild(action.payload.parent, action.payload.child, state);

    default:
      return state;
  }
}

function deleteBranch(node: Node, state: State): State {
  const newState = Object.assign({}, state);

  // If we have a top level node.
  if (!node.parentId) {
    newState.productTree.delete(node.id);
  }
  else {
    // Get the path to the uppermost node.
    const path: Array<number> = ProductTreeHelper.getPathToParent(node);

    // Drill down on the new structure until we reach the parent of the node to delete.
    let deleteNodeParent: Node = newState.productTree.get(path.pop());
    while (path.length > 0) {
      deleteNodeParent = deleteNodeParent.children.get(path.pop());
    }

    // Delete the node.
    deleteNodeParent.children.delete(node.id);
  }

  return newState;
}


function addChild(parent: Node, child: Node, state: State): State {

  return null;

}
