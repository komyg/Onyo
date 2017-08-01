import { Component, OnInit, Input, ViewChildren, ViewChild, AfterViewInit } from '@angular/core';

import { Node } from '../../model/node';
import { NodeType } from '../../model/node-type.enum';

@Component({
  selector: 'app-tree',
  templateUrl: './tree.component.html',
  styleUrls: ['./tree.component.scss']
})
export class TreeComponent implements OnInit, AfterViewInit {

  @Input() productTree: Map<number, Node>;
  @ViewChildren('categories') categories;
  @ViewChildren('menuItems') menuItems;
  @ViewChild('lineCanvas') canvasRef;

  testItem1;
  testItem2;

  constructor() { }

  ngOnInit() {
  }

  ngAfterViewInit() {

    const array = this.categories.toArray();
    this.testItem1 = array[0];
    this.testItem2 = array[1];

  }

}
