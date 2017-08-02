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

}
