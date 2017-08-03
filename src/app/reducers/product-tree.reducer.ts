import { Observable } from 'rxjs/Observable';
import { createSelector, createFeatureSelector } from '@ngrx/store';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';

import * as productTreeOperations from '../actions/product-tree.action';

import { Node } from '../model/node';
import { NodeType } from '../model/node-type.enum';
import { ProductTreeHelper } from '../helpers/product-tree.helper';

export interface AppState {
  productTree: State;
}

export interface State {
  productTree: Map<number, Node>;
  errorMsg: string;
}

const initialState: State = {
  productTree: new Map<number, Node>(),
  errorMsg: ''
};

export const selectFeature = createFeatureSelector<State>('productTree');
export const selectFeatureProductTree = createSelector(selectFeature, (state: State) => state.productTree);

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
      return addChild(action.payload.parent, action.payload.newChild, state);

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


function addChild(parent: Node, newChild: Node, state: State): State {

  if (parent.type === NodeType.simple) {
    console.warn('Not allowed to add children to simple type objects');
    return state;
  }
  else if (parent.children.has(newChild.id)) {
    console.warn('Parent already has this child');
    return state;
  }

  const newState = Object.assign({}, state);
  const newStateParent: Node = ProductTreeHelper.findNodeById(parent.id, parent.parentId, newState.productTree);

  // Set parent
  newChild.parentId = newStateParent.id;
  newChild.parent = newStateParent;

  // Set type based on parent's type.
  switch (newStateParent.type) {
    case NodeType.category:
      newChild.type = NodeType.menuItem;
      break;

    case NodeType.menuItem:
      newChild.type = NodeType.choosable;
      break;

    case NodeType.choosable:
      newChild.type = NodeType.simple;
      break;
  }

  // Add child to parent
  newStateParent.children.set(newChild.id, newChild);

  return newState;
}
