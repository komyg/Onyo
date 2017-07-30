import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';
import 'rxjs/add/observable/forkJoin';

import { CompanyService } from './company.service';
import { ProductService } from './product.service';

import { Node } from '../model/node';
import { NodeType } from '../model/node-type.enum';

import { ProductUrlHelper } from '../helpers/product-url.helper';

@Injectable()
export class ProductTreeService {

  constructor(private companyService: CompanyService, private productService: ProductService) {

  }

  public createTree(companyId: number): Observable<Map<number, Node>> {
    const productData = this.productService.getProductDataByCompanyId(companyId).map(this.createProductTree.bind(this));
    const categoryData = this.companyService.getCategoriesById(companyId).map(this.createCategoryTree.bind(this));

    return Observable.forkJoin(categoryData, productData).map(this.addProductsToCategories.bind(this));
  }

  /**
   * Add the products to their respective categories.
   */
  // private addProductsToCategories(categories: Map<number, Node>, products: Map<number, Node>): Map<number, Node> {
  private addProductsToCategories(res: Array<any>): Map<number, Node> {

    const categories: Map<number, Node> = res[0];
    const products: Map<number, Node> = res[1];

    for (const productKey of Array.from(products.keys())) {
      const product = products.get(productKey);

      const parentCategoryId = ProductUrlHelper.getIdFromUrl(product.getData().category);
      const category = categories.get(parentCategoryId);

      category.children.set(product.getId(), product);
      product.parent = category;
    }

    return categories;
  }

  /**
   * Creates a category tree from the retrieved categories
   */
  private createCategoryTree(categoryData: Map<number, any>): Map<number, Node> {
    const categoryTree = new Map<number, Node>();

    for (const key of Array.from(categoryData.keys())) {
      const category = categoryData.get(key);
      const node = new Node(category);

      categoryTree.set(key, node);
    }

    return categoryTree;
  }

  /**
   * Creates a product tree from the retrieved products.
   */
  private createProductTree(productData: Map<number, any>): Map<number, Node> {

    const productTree = new Map<number, Node>();

    // Iterate over menu-item objects.
    for (const entry of Array.from(productData.entries())) {

      const product = entry[1];
      if (product.type === 'menu-item') {
        const node = new Node(product);
        productTree.set(entry[0], node);

        // Add this node's children.
        this.addChildNodesToNode(node, productData);
      }

    }
    return productTree;
  }

  /**
   * Add child nodes to a parent node recursively.
   */
  private addChildNodesToNode(root: Node, productData: Map<number, any>) {

    // Get this node's children
    for (const productUrl of root.getData().products) {
      const childId = ProductUrlHelper.getIdFromUrl(productUrl);

      // Create a new child.
      const child = new Node(productData.get(childId));
      root.children.set(childId, child);
      child.parent = root;

      this.addChildNodesToNode(child, productData);
    }
  }

}
