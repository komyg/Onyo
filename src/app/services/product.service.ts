import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class ProductService {

  constructor(private http: Http) { }

  /**
   * Retrieves all product data for a given company ID.
   */
  public getProductDataByCompanyId(companyId: Number): Observable<any> {

    const url = `http://api.onyo.com/v1/mobile/company/${companyId}/products`

    return this.http.get(url).map((res: Response) => res.json()).catch(this.handleError);
  }

  private handleError(error: Response) {
    const msg = 'Error retrieving product data. Status: ' + error.status + ' ' + error.statusText;

    console.error(msg);
    return Observable.throw(msg);
  }

}
