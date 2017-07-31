import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Node } from '../../model/node';

import { ProductTreeService } from '../../services/product-tree.service';

@Component({
  selector: 'app-categories-home',
  templateUrl: './categories-home.component.html',
  styleUrls: ['./categories-home.component.scss']
})
export class CategoriesHomeComponent implements OnInit {

  categories: Node[];
  categoryMap: Map<number, Node>;

  constructor(private productTreeService: ProductTreeService, private cdr: ChangeDetectorRef) {

  }

  ngOnInit() {
    // Retrieve data from the backend.
    this.productTreeService.createTree(1).subscribe((res: Map<number, Node>) => {
      this.categoryMap = res;
      this.categories = Array.from(res.values());
    });
  }

}
