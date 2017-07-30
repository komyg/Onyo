import { Component, OnInit, Input } from '@angular/core';

import { Node } from '../../model/node';

@Component({
  selector: 'app-node-card',
  templateUrl: './node-card.component.html',
  styleUrls: ['./node-card.component.scss']
})
export class NodeCardComponent implements OnInit {
  @Input() node: Node;

  constructor() { }

  ngOnInit() {

  }

}
