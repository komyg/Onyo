import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Node } from '../../model/node';

import { ProductTreeService } from '../../services/product-tree.service';

@Component({
  selector: 'app-product-edit',
  templateUrl: './product-edit.component.html',
  styleUrls: ['./product-edit.component.scss']
})
export class ProductEditComponent implements OnInit {

  categories: Node[];
  categoryMap: Map<number, Node>;

  constructor(private productTreeService: ProductTreeService) { }

  ngOnInit() {
    // Retrieve data from the backend.
    this.productTreeService.createTree(1).subscribe((res: Map<number, Node>) => {
      this.categoryMap = res;
      this.categories = Array.from(res.values());
    });
  }

}
