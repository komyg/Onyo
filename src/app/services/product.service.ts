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
   * Retrieves all product data for a given company ID and returns the raw JSON data.
   */
  public getRawProductDataByCompanyId(companyId: number): Observable<any> {
    const url = this.getUrl(companyId);

    return this.http.get(url).map((res: Response) => res.json()).catch(this.handleError);
  }

  /**
   * Retrives all the product data for a company ID, in a form of a Map indexed by the product ID.
   */
  public getProductDataByCompanyId(companyId: number): Observable<Map<number, any>> {
    const url = this.getUrl(companyId);

    return this.http.get(url).map(this.createProductMap).catch(this.handleError);
  }

  /**
   * Creates a product Map indexed by the product ID.
   */
  private createProductMap(res: Response): Map<number, any> {

    const productData = res.json();
    const products = productData.data;

    const productMap: Map<number, any> = new Map<number, any>();

    let i: number;
    for (i = 0; i < products.length; i++) {
      productMap.set(products[i].numericalId, products[i]);
    }

    return productMap;
  }

  private getUrl(id: number) {
    return `http://api.onyo.com/v1/mobile/company/${id}/products`;
  }

  private handleError(error: Response) {
    const msg = 'Error retrieving product data. Status: ' + error.status + ' ' + error.statusText;

    console.error(msg);
    return Observable.throw(msg);
  }

}
