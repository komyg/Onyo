import { Component, OnInit, Input } from '@angular/core';

import { Node } from '../../model/node';
import { NodeType } from '../../model/node-type.enum';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit {

  @Input() productTree: Map<number, Node>;

  menuItem: Node;

  constructor() { }

  ngOnInit() {
  }

}
