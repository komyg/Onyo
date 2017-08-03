import { ProductTreeHelper } from './product-tree.helper';
import { Node } from '../model/node';

describe('Product Tree Reducer Helper', () => {

  let treeMap: Map<number, Node>;

  beforeEach(() => {
    const data = require('../../assets/test/product-tree-map-category.json');
    const menuItemData = require('../../assets/test/product-tree-map-menu-item-26.json');
    const choosableData_441 = require('../../assets/test/product-tree-map-choosable-26-441.json');
    const choosableData_542 = require('../../assets/test/product-tree-map-choosable-26-542.json');
    const simpleData_441 = require('../../assets/test/product-tree-map-simple-26-441.json');
    const simpleData_542 = require('../../assets/test/product-tree-map-simple-26-542.json');
    const menuItemData_28 = require('../../assets/test/product-tree-map-menu-item-28.json');

    treeMap = new Map<number, Node>(data);

    let node: Node = treeMap.get(26);
    node.children = new Map<number, Node>(menuItemData);

    node = node.children.get(441);
    node.children = new Map<number, Node>(choosableData_441);

    node = node.children.get(442);
    node.children = new Map<number, Node>(simpleData_441);

    node = treeMap.get(26).children.get(542);
    node.children = new Map<number, Node>(choosableData_542);

    node = node.children.get(409);
    node.children = new Map<number, Node>(simpleData_542);

    node = treeMap.get(28);
    node.children = new Map<number, Node>(menuItemData_28);
  });

  describe('Find node by id', () => {

    it('should find top level node', () => {
      const node: Node = ProductTreeHelper.findNodeById(26, undefined, treeMap);

      expect(node).toBeTruthy();
      expect(node.id).toBe(26);
    });

    it('should find a middle level node', () => {
      const node: Node = ProductTreeHelper.findNodeById(441, 26, treeMap);

      expect(node).toBeTruthy();
      expect(node.id).toBe(441);
    });

    it('should find a leaf node', () => {
      const node: Node = ProductTreeHelper.findNodeById(444, 442, treeMap);

      expect(node).toBeTruthy();
      expect(node.id).toBe(444);
    });

    it('should find a repeated leaf node', () => {

      let node: Node = ProductTreeHelper.findNodeById(249, 442, treeMap);

      expect(node).toBeTruthy();
      expect(node.id).toBe(249);
      expect(node.parentId).toBe(442);

      node = ProductTreeHelper.findNodeById(249, 409, treeMap);

      expect(node).toBeTruthy();
      expect(node.id).toBe(249);
      expect(node.parentId).toBe(409);
    });

    it('should not find a node with wrong parent', () => {

      let node: Node = ProductTreeHelper.findNodeById(249, 441, treeMap);
      expect(node).toBeFalsy();

      node = ProductTreeHelper.findNodeById(441, 28, treeMap);
      expect(node).toBeFalsy();
    });
  });

});
