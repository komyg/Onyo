import { State, productTreeReducer } from './product-tree.reducer';
import * as productTreeActions from '../actions/product-tree.action';

import { Node } from '../model/node';

fdescribe('Product Tree Reducer', () => {

  let initialStateMap: Map<number, Node>;

  beforeEach(() => {
    const data = require('../../assets/test/product-tree-map-category.json');
    const menuItemData = require('../../assets/test/product-tree-map-menu-item-26.json');
    const choosableData = require('../../assets/test/product-tree-map-choosable-26.json');
    const simpleData = require('../../assets/test/product-tree-map-simple-26.json');
    const menuItemData_28 = require('../../assets/test/product-tree-map-menu-item-28.json');

    initialStateMap = new Map<number, Node>(data);

    let node: Node = initialStateMap.get(26);
    node.children = new Map<number, Node>(menuItemData);

    node = node.children.get(441);
    node.children = new Map<number, Node>(choosableData);

    node = node.children.get(442);
    node.children = new Map<number, Node>(simpleData);

    node = initialStateMap.get(28);
    node.children = new Map<number, Node>(menuItemData_28);
  });

  describe('DELETE_BRANCH Action', () => {

    let initialState: State;

    beforeEach(() => {
      initialState = {
        productTree: initialStateMap,
        errorMsg: ''
      };
    });

    it('should delete a top level node', () => {

      // Setup
      const nodeToDelete: Node = initialStateMap.get(26);
      const action = new productTreeActions.DeleteBranchAction(nodeToDelete);

      // Call reducer
      const newState = productTreeReducer(initialState, action);

      // Verify action
      expect(newState.productTree.has(26)).toBeFalsy();
      expect(newState.productTree.has(28)).toBeTruthy();

    });

    it('should delete a 2nd level (menu-item) node', () => {

      let parentNode: Node = initialStateMap.get(26);
      const nodeToDelete: Node = parentNode.children.get(441);
      const action = new productTreeActions.DeleteBranchAction(nodeToDelete);

      const newState = productTreeReducer(initialState, action);

      parentNode = newState.productTree.get(26);
      expect(parentNode.children.has(441)).toBeFalsy();

      parentNode = newState.productTree.get(28);
      expect(parentNode.children.has(456)).toBeFalsy();
    });

  });

});
