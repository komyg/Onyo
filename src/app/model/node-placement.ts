import { Node } from './node';

export class NodePlacement {
  categoryItem: Node;
  menuItems: Node[];
  choosableItems: Node[];
  simpleItems: Node[]

  constructor() {
    this.menuItems = new Array<Node>();
    this.choosableItems = new Array<Node>();
    this.simpleItems = new Array<Node>();
  }
}
