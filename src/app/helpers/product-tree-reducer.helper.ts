import { Node } from '../model/node';

export class ProductTreeReducerHelper {

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

}
