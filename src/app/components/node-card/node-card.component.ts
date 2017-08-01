import { Component, OnInit, Input, ElementRef, AfterViewInit, ViewChild } from '@angular/core';

import { Node } from '../../model/node';

@Component({
  selector: 'app-node-card',
  templateUrl: './node-card.component.html',
  styleUrls: ['./node-card.component.scss']
})
export class NodeCardComponent implements OnInit, AfterViewInit {
  @Input() node: Node;
  @ViewChild('mainDiv') mainDiv;

  constructor() { }

  ngOnInit() {

  }

  ngAfterViewInit() {

  }

  public getX(): number {
    // return this.mainDiv.nativeElement.getBoundingClientRect().left;
    return this.mainDiv.nativeElement.offsetLeft;
  }

  public getY(): number {
    // return this.mainDiv.nativeElement.getBoundingClientRect().top;
    return this.mainDiv.nativeElement.offsetTop;
  }

}
