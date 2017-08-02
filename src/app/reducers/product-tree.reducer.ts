import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/let';

import * as productTreeOperations from '../actions/product-tree.action';

import { Node } from '../model/node';


export interface State {
  productTree: Map<number, Node>;
}

const initialState: State = {
  productTree: new Map<number, Node>()
};

export function productTreeReducer(state = initialState, action: productTreeOperations.Actions): State {

  switch (action.type) {
    case productTreeOperations.ActionTypes.LOAD_PRODUCT_TREE:
      return state;

    case productTreeOperations.ActionTypes.LOAD_PRODUCT_TREE_COMPLETE:
      return { productTree: <Map<number, Node>>action.payload };

    default:
      return state;
  }

}
