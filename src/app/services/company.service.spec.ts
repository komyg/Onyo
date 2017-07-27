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
    service.getCompanyDataById(1).subscribe((data: any) => {
      response = data;
    });

    expect(response).toBeDefined();
    expect(response.numericalId).toBe(1);
  }));

});
