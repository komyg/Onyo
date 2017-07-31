import { Pipe, PipeTransform } from '@angular/core';

import { Node } from '../model/node';
import { NodeType } from '../model/node-type.enum';
import { NodePlacement } from '../model/node-placement';

@Pipe({
  name: 'treeNodePlacement'
})
export class TreeNodePlacementPipe implements PipeTransform {

  public transform(value): NodePlacement[] {
    const categoryMap: Map<number, Node> = value[0];
    const nodePlacementArray = new Array<NodePlacement>();

    for (const key of Array.from(categoryMap.keys())) {
      const nodePlacement = new NodePlacement();

      nodePlacement.categoryItem = categoryMap.get(key);
      for (const child of Array.from(nodePlacement.categoryItem.children.values())) {
        this.addChildren(nodePlacement, child, 0);
      }

      nodePlacementArray.push(nodePlacement);
    }

    return nodePlacementArray;
  }

  private addChildren(nodePlacement: NodePlacement, item: Node, childCount: number) {

    switch (item.getType()) {
      case NodeType.menuItem:
        nodePlacement.menuItems.push(item);
        break;

      case NodeType.choosable:
        nodePlacement.choosableItems.push(item);

        // Add hidden filler objects
        if (childCount > 0) {
          const emptyNode = new Node();
          emptyNode.hide = true;
          nodePlacement.menuItems.push(emptyNode);
        }
        break;

      case NodeType.simple:
        nodePlacement.simpleItems.push(item);

        // Add hidden filler objects
        if (childCount > 0) {
          const emptyNode = new Node();
          emptyNode.hide = true;
          nodePlacement.choosableItems.push(emptyNode);
          nodePlacement.menuItems.push(emptyNode);
        }
        break;
    }

    childCount = 0;
    for (const child of Array.from(item.children.values())) {
      this.addChildren(nodePlacement, child, childCount);
      childCount++;
    }
  }

}
