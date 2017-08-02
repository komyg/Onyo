import { State, productTreeReducer } from './product-tree.reducer';
import * as productTreeActions from '../actions/product-tree.action';

import { Node } from '../model/node';

fdescribe('Product Tree Reducer', () => {

  let initialStateMap: Map<number, Node>;

  beforeEach(() => {
    const data = require('../../assets/test/product-tree-map-category.json');
    const menuItemData = require('../../assets/test/product-tree-map-menu-item-26.json');
    const choosableData_441 = require('../../assets/test/product-tree-map-choosable-26-441.json');
    const choosableData_542 = require('../../assets/test/product-tree-map-choosable-26-542.json');
    const simpleData_441 = require('../../assets/test/product-tree-map-simple-26-441.json');
    const simpleData_542 = require('../../assets/test/product-tree-map-simple-26-542.json');
    const menuItemData_28 = require('../../assets/test/product-tree-map-menu-item-28.json');

    initialStateMap = new Map<number, Node>(data);

    let node: Node = initialStateMap.get(26);
    node.children = new Map<number, Node>(menuItemData);

    node = node.children.get(441);
    node.children = new Map<number, Node>(choosableData_441);

    node = node.children.get(442);
    node.children = new Map<number, Node>(simpleData_441);

    node = initialStateMap.get(26).children.get(542);
    node.children = new Map<number, Node>(choosableData_542);

    node = node.children.get(409);
    node.children = new Map<number, Node>(simpleData_542);

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
      expect(parentNode.children.has(456)).toBeTruthy();

    });

    it('should delete a 3rd level (choosable) node', () => {

      let parentNode: Node = initialStateMap.get(26).children.get(441);
      const nodeToDelete: Node = parentNode.children.get(442);
      const action = new productTreeActions.DeleteBranchAction(nodeToDelete);

      const newState = productTreeReducer(initialState, action);

      parentNode = newState.productTree.get(26).children.get(441);
      expect(parentNode.children.has(442)).toBeFalsy();

      parentNode = newState.productTree.get(28);
      expect(parentNode.children.has(456)).toBeTruthy();

    });

    it('should delete a 4th level (simple) node', () => {

      let parentNode: Node = initialStateMap.get(26).children.get(441).children.get(442);
      const nodeToDelete: Node = parentNode.children.get(443);
      const action = new productTreeActions.DeleteBranchAction(nodeToDelete);

      const newState = productTreeReducer(initialState, action);

      parentNode = newState.productTree.get(26).children.get(441).children.get(442);
      expect(parentNode.children.has(443)).toBeFalsy();
      expect(parentNode.children.has(444)).toBeTruthy();

      parentNode = newState.productTree.get(28);
      expect(parentNode.children.has(456)).toBeTruthy();

    });

  });

});
