import { TestBed, inject, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/observable/of';

import { ProductTreeService } from './product-tree.service';
import { ProductService } from './product.service';
import { CompanyService } from './company.service';
import { Node } from '../model/node';
import { NodeType } from '../model/node-type.enum';

describe('ProductTreeService', () => {

  let service: ProductTreeService;

  beforeEach(() => {

    // Create mock services.
    const productService: ProductService = jasmine.createSpyObj('ProductService Spy', ['getProductDataByCompanyId']);
    productService.getProductDataByCompanyId = jasmine.createSpy('getProductDataByCompanyId spy').and.callFake((companyId: number) => {
      const data = require('../../assets/test/product-map.json');
      const map = new Map<number, any>(data);
      return Observable.of(map);
    });

    const companyService: CompanyService = jasmine.createSpyObj('CompanyService Spy', ['getCompanyDataById']);
    companyService.getCategoriesById = jasmine.createSpy('getCompanyDataById Spy').and.callFake((id: number) => {
      const data = require('../../assets/test/company-map.json');
      const map = new Map<number, any>(data);
      return Observable.of(map);
    });

    // Configure test bed
    TestBed.configureTestingModule({
      providers: [
        ProductTreeService,
        { provide: ProductService, useValue: productService },
        { provide: CompanyService, useValue: companyService }
      ]
    });
  });

  // Inject the service
  beforeEach((inject([ProductTreeService], (injectedService: ProductTreeService) => {
    service = injectedService;
  })));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should create a tree with the 26 category and its subitems', async(() => {

    service.createTree(1).subscribe((tree: Map<number, Node>) => {

      let node: Node;
      let child: Node;

      // Check if the tree was created.
      expect(tree).toBeTruthy();
      expect(tree.size).toBeGreaterThan(0);

      // Check the category
      node = tree.get(26);
      expect(node).toBeTruthy();
      expect(node).toEqual(jasmine.objectContaining({
        id: 26,
        name: 'Massas',
        type: NodeType.category
      }));

      // Check the menu-item.
      expect(node.children.size).toBeGreaterThan(0);

      node = node.children.get(441);
      expect(node).toBeTruthy();
      expect(node).toEqual(jasmine.objectContaining({
        id: 441,
        name: 'Tomate e Manjericão',
        type: NodeType.menuItem
      }));

      // Check the choosable inside the menu-item
      expect(node.children.size).toBeGreaterThan(0);

      node = node.children.get(442);
      expect(node).toBeTruthy();
      expect(node).toEqual(jasmine.objectContaining({
        id: 442,
        name: 'Opções',
        type: NodeType.choosable
      }));

      // Check the simple items insde the choosable
      expect(node.children.size).toBeGreaterThan(0);

      child = node.children.get(443);
      expect(child).toBeTruthy();
      expect(child).toEqual(jasmine.objectContaining({
        id: 443,
        name: 'Fettuccine',
        type: NodeType.simple
      }));

      child = node.children.get(444);
      expect(child).toBeTruthy();
      expect(child).toEqual(jasmine.objectContaining({
        id: 444,
        name: 'Penne',
        type: NodeType.simple
      }));

    });

  }));

  it('should create a tree with the 28 category and its subitems', async(() => {

    service.createTree(1).subscribe((tree: Map<number, Node>) => {

      let node: Node;

      // Check if the tree was created.
      expect(tree).toBeTruthy();
      expect(tree.size).toBeGreaterThan(0);

      // Check the categories in the tree.
      node = tree.get(28);
      expect(node).toBeTruthy();
      expect(node).toEqual(jasmine.objectContaining({
        id: 28,
        name: 'Sucos e Bebidas',
        type: NodeType.category
      }));

      // Check the menu-item.
      expect(node.children.size).toBeGreaterThan(0);

      node = node.children.get(456);
      expect(node).toBeTruthy();
      expect(node).toEqual(jasmine.objectContaining({
        id: 456,
        name: 'Suco Verde',
        type: NodeType.menuItem
      }));

    });

  }));
});