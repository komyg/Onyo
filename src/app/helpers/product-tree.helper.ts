import { Node } from '../model/node';

export class ProductTreeHelper {

  /**
   * Returns a LIFO array with the path from a node to its parents.
   */
  public static getPathToParent(node: Node): Array<number> {
    const path = new Array<number>();

    // If the node doesn't have a parent.
    if (!node.parent) {
      path.push(node.id);
    }
    else {
      let currentNode = node;
      while (currentNode.parent) {
        path.push(currentNode.parent.id);
        currentNode = currentNode.parent;
      }
    }

    return path;
  }

  /**
   * Finds a node by its ID and its parent's ID. If the node is not found, returns undefined.
   * Note: we must use the parent's ID, because we can have more than one node with the
   * same ID in the tree.
   */
  public static findNodeById(nodeId: number, parentId: number, tree: Map<number, Node>): Node {

    let node: Node;
    let candidate: Node;
    const searchArray = new Array<Node>();

    // Trivial case, Node is top level.
    if (tree.has(nodeId)) {

      // Check if the parent id matches.
      candidate = tree.get(nodeId);
      if (candidate.parentId === parentId) {
        return candidate;
      }
    }

    // Add top level nodes to search array.
    for (node of Array.from(tree.values())) {
      searchArray.push(node);
    }

    // Search
    while (searchArray.length > 0) {

      node = searchArray.shift();

      // During testing we can have leaf nodes that don't have a children Map,
      // so we should guard for this.
      if (node.children.has === undefined) {
        continue;
      }

      if (node.children.has(nodeId)) {

        // Check parent node.
        candidate = node.children.get(nodeId);
        if (candidate.parentId === parentId) {
          return candidate;
        }
      }

      // If the node wasn't found, add it's children to the end of the queue.
      for (const child of Array.from(node.children.values())) {
        searchArray.push(child);
      }
    }

    // If the node wasn't found.
    return undefined;
  }

  /**
   * Load a test product tree from the available test data.
   */
  public static createTestTree(): Map<number, Node> {

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

    return producTree;
  }

}
