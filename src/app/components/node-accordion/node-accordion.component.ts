import { Component, OnInit, Input } from '@angular/core';

import { Node } from '../../model/node';
import { NodeType } from '../../model/node-type.enum';

@Component({
  selector: 'app-node-accordion',
  templateUrl: './node-accordion.component.html',
  styleUrls: ['./node-accordion.component.scss']
})
export class NodeAccordionComponent implements OnInit {

  @Input() node: Node;

  disabled: boolean;
  childrenPanelTitle: string;

  constructor() { }

  ngOnInit() {

    if (this.node.children.size > 0) {
      this.disabled = false;
    }
    else {
      this.disabled = true;
    }

    switch (this.node.getType()) {
      case NodeType.category:
        this.childrenPanelTitle = 'Itens do Menu';
        break;

      case NodeType.menuItem:
        this.childrenPanelTitle = 'Opções';
        break;

      case NodeType.choosable:
        this.childrenPanelTitle = 'Componentes';
        break;

      default:
        this.childrenPanelTitle = '';
        break;
    }

  }

}
