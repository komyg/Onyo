import { Component, OnInit, Input } from '@angular/core';
import { Store } from '@ngrx/store';

import * as productTreeActions from '../../actions/product-tree.action';
import { State } from '../../reducers/product-tree.reducer';

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

  constructor(private store: Store<State>) { }

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

  showImage(): boolean {
    return this.node.image !== '';
  }

  deleteButtonClick(event) {
    event.stopPropagation();
    this.store.dispatch(new productTreeActions.DeleteBranchAction(this.node));

    return false;
  }

  addChildClick(event) {
    event.stopPropagation();

    const fakeChildData = {
      numericalId: 321,
      name: 'Cachorro Quente',
      type: 'simple'
    }
    const fakeChild = new Node(fakeChildData);

    this.store.dispatch(new productTreeActions.AddChildAction( { parent: this.node, newChild: fakeChild }));

    return false;
  }

}
