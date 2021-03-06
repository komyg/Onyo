import { State, productTreeReducer } from './product-tree.reducer';
import * as productTreeActions from '../actions/product-tree.action';

import { ProductTreeHelper } from '../helpers/product-tree.helper';
import { Node } from '../model/node';
import { NodeType } from '../model/node-type.enum';

describe('Product Tree Reducer', () => {

  let initialStateMap: Map<number, Node>;

  beforeEach(() => {

    // Load the data from the test json files.
    const data = require('../../assets/test/product-tree-map-category.json');
    const menuItemData = require('../../assets/test/product-tree-map-menu-item-26.json');
    const choosableData_441 = require('../../assets/test/product-tree-map-choosable-26-441.json');
    const choosableData_542 = require('../../assets/test/product-tree-map-choosable-26-542.json');
    const simpleData_441 = require('../../assets/test/product-tree-map-simple-26-441.json');
    const simpleData_542 = require('../../assets/test/product-tree-map-simple-26-542.json');
    const menuItemData_28 = require('../../assets/test/product-tree-map-menu-item-28.json');

    const producTree = new Map<number, Node>(data);

    let node: Node = producTree.get(26);
    node.children = new Map<number, Node>(menuItemData);

    node = node.children.get(441);
    node.children = new Map<number, Node>(choosableData_441);

    node = node.children.get(442);
    node.children = new Map<number, Node>(simpleData_441);

    node = producTree.get(26).children.get(542);
    node.children = new Map<number, Node>(choosableData_542);

    node = node.children.get(409);
    node.children = new Map<number, Node>(simpleData_542);

    node = producTree.get(28);
    node.children = new Map<number, Node>(menuItemData_28);

    initialStateMap = producTree;
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

  describe('ADD_CHILD Action', () => {

    let initialState: State;
    let fakeChildData;

    beforeEach(() => {

      initialState = {
        productTree: initialStateMap,
        errorMsg: ''
      };

      fakeChildData = {
        numericalId: 321,
        name: 'Cachorro Quente',
        type: 'simple'
      }

    });

    it('should add a new child to the top level', () => {

      const child: Node = new Node(fakeChildData);
      const parent: Node = initialStateMap.get(26);

      const action = new productTreeActions.AddChildAction({ parent: parent, newChild: child });

      // Execute
      const newState = productTreeReducer(initialState, action);

      const newParent = newState.productTree.get(26);
      expect(newParent.children.has(321)).toBeTruthy();

      const newChild = newParent.children.get(321);
      expect(newChild.id).toBe(321);
      expect(newChild.name).toBe('Cachorro Quente');
      expect(newChild.type).toBe(NodeType.menuItem);

    });

    it('should add a new child to the middle (choosable) level', () => {

      const child: Node = new Node(fakeChildData);
      const parent: Node = initialStateMap.get(26).children.get(542);

      const action = new productTreeActions.AddChildAction({ parent: parent, newChild: child });

      // Execute
      const newState = productTreeReducer(initialState, action);

      const newParent = newState.productTree.get(26).children.get(542);
      expect(newParent.children.has(321)).toBeTruthy();

      const newChild = newParent.children.get(321);
      expect(newChild.id).toBe(321);
      expect(newChild.name).toBe('Cachorro Quente');
      expect(newChild.type).toBe(NodeType.choosable);

    });

    it('should add a new child to the leaf (simple) level', () => {

      const child: Node = new Node(fakeChildData);
      const parent: Node = initialStateMap.get(26).children.get(542).children.get(409);

      const action = new productTreeActions.AddChildAction({ parent: parent, newChild: child });

      // Execute
      const newState = productTreeReducer(initialState, action);

      const newParent = newState.productTree.get(26).children.get(542).children.get(409);
      expect(newParent.children.has(321)).toBeTruthy();

      const newChild = newParent.children.get(321);
      expect(newChild.id).toBe(321);
      expect(newChild.name).toBe('Cachorro Quente');
      expect(newChild.type).toBe(NodeType.simple);

    });

    it('should not add child below leaf (simple) level', () => {

      const child: Node = new Node(fakeChildData);
      const parent: Node = initialStateMap.get(26).children.get(542).children.get(409).children.get(249);

      const action = new productTreeActions.AddChildAction({ parent: parent, newChild: child });

      // Execute
      const newState = productTreeReducer(initialState, action);

      const newParent = newState.productTree.get(26).children.get(542).children.get(409).children.get(249);

      // If we defined a Map for this level.
      if (newParent.children.has) {
        expect(newParent.children.has(321)).toBeFalsy();
      }
      else {
        expect(newParent.children.has).toBeFalsy();
      }

    });
  });

});
