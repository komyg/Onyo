import { TestBed, inject, async, fakeAsync, tick } from '@angular/core/testing';
import { BaseRequestOptions, Http, HttpModule, Response, ResponseOptions, ResponseType } from '@angular/http';
import { MockBackend, MockConnection } from '@angular/http/testing';

import { CompanyService } from './company.service';

describe('CompanyService', () => {

  let mockBackend: MockBackend;
  let service: CompanyService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        CompanyService,
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
  beforeEach(async(inject([CompanyService, MockBackend], (dataService, backend) => {
    service = dataService;
    mockBackend = backend;
  })));

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should retrieve company data', async(() => {

    const mockData = '{ "numericalId": 1, "geoLat": "-22.9829760000", "openingTimes": null }';

    // Listen and return the mock data.
    mockBackend.connections.subscribe(
      (conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions(({ status: 200, body: mockData }))));
    });

    let response;
    service.getRawCompanyDataById(1).subscribe((data: any) => {
      response = data;
    });

    expect(response).toBeDefined();
    expect(response.numericalId).toBe(1);
  }));

  it('should retrieve category data as a map', async(() => {

    const mockData = require('../../assets/test/company-data.json');

    // Listen and return the mock data.
    mockBackend.connections.subscribe(
      (conn: MockConnection) => {
        conn.mockRespond(new Response(new ResponseOptions(({ status: 200, body: mockData }))));
    });

    service.getCategoriesById(1).subscribe((categoryMap: Map<number, any>) => {
      expect(categoryMap).toBeDefined();
      expect(categoryMap.size).toBeGreaterThan(0);

      // Auxiliary variable to generate a JSON for the company-map.json file.
      const temp = JSON.stringify(Array.from(categoryMap.entries()));

      expect(categoryMap.get(26)).toBeTruthy();
      expect(categoryMap.get(26)).toEqual(jasmine.objectContaining({
        numericalId: 26,
        name: 'Massas'
      }));

      expect(categoryMap.get(28)).toBeTruthy();
      expect(categoryMap.get(28)).toEqual(jasmine.objectContaining({
        numericalId: 28,
        name: 'Sucos e Bebidas'
      }));
    });

  }));

});
