import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions, ResponseType } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { ProductService } from './product.service';

describe('ProductService', () => {
  let mockBackend: MockBackend;
  let service: ProductService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        ProductService,
        MockBackend,
        BaseRequestOptions,
        {
          provide: Http,
          useFactory: (backend, options) => new Http(backend, options),
          deps: [MockBackend, BaseRequestOptions]
        }
      ]
    });
  });

  // Inject the service
  beforeEach(async(inject([ProductService, MockBackend], (dataService, backend) => {
    service = dataService;
    mockBackend = backend;
  })));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve raw product data', async(() => {

    // tslint:disable-next-line: max-line-length
    const mockData = '{ "pagination": { "next": null, "total": 1, "page": 1, "previous": null }, "data": [{ "numericalId": 974, "sequence": 0, "image": [{ "url": "", "width": 525, "repeatable": false, "context": "offer", "height": 242 }, { "url": "", "width": 480, "repeatable": false, "context": "menu-product", "height": 480 }] }, { "numericalId": 416, "sequence": 1, "image": [] }] }';

    // Listen and return the mock data.
    mockBackend.connections.subscribe(
      (conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions(({ status: 200, body: mockData }))));
    });

    service.getRawProductDataByCompanyId(1).subscribe((productData: any) => {
      expect(productData).toBeTruthy();
      expect(productData.data[0].numericalId).toBe(974);
    });
  }));

  it('should create a product map', async(() => {

    const mockData = require('../../assets/test/product-data.json');

    // Listen and return the mock data.
    mockBackend.connections.subscribe((connection: MockConnection) => {
      connection.mockRespond(new Response(new ResponseOptions({ status: 200, body: mockData })));
    });

    service.getProductDataByCompanyId(1).subscribe((productMap: Map<number, any>) => {
      expect(productMap).toBeDefined();
      expect(productMap.size).toBeGreaterThan(0);

      // Auxiliary variable to generate a JSON for the product-map.json file.
      const temp = JSON.stringify(Array.from(productMap.entries()));
      console.debug('Product Map\n' + temp); // tslint:disable-line no-console

      expect(productMap.get(441)).toBeTruthy();
      expect(productMap.get(441)).toEqual(jasmine.objectContaining({
        numericalId: 441,
        name: 'Tomate e Manjericão',
        type: 'menu-item'
      }));

      expect(productMap.get(444)).toBeTruthy();
      expect(productMap.get(444)).toEqual(jasmine.objectContaining({
        numericalId: 444,
        name: 'Penne',
        type: 'simple'
      }));
    });

  }));

});
