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

  it('should retrieve product data', async(() => {

    // tslint:disable-next-line: max-line-length
    const mockData = '{ "pagination": { "next": null, "total": 1, "page": 1, "previous": null }, "data": [{ "numericalId": 974, "sequence": 0, "image": [{ "url": "", "width": 525, "repeatable": false, "context": "offer", "height": 242 }, { "url": "", "width": 480, "repeatable": false, "context": "menu-product", "height": 480 }] }, { "numericalId": 416, "sequence": 1, "image": [] }] }';

    // Listen and return the mock data.
    mockBackend.connections.subscribe(
      (conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions(({ status: 200, body: mockData }))));
    });

    let response;
    service.getProductDataByCompanyId(1).subscribe((data: any) => {
      response = data;
    });

    expect(response).toBeDefined();
    expect(response.data[0].numericalId).toBe(974);
  }));

});
