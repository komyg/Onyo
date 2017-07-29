import { Injectable } from '@angular/core';
import { Http, Response, RequestOptionsArgs } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/catch';
import 'rxjs/add/observable/throw';

@Injectable()
export class CompanyService {

  constructor(private http: Http) { }

  /**
   * Retrieves the raw company data for a given ID.
   */
  public getRawCompanyDataById(id: number): Observable<any> {
    const url = this.getUrl(id);

    return this.http.get(url).map((res: Response) => res.json()).catch(this.handleError);
  }

  /**
   * Retrieves the category data and returns it as a map indexed by the category id.
   */
  public getCategoriesById(id: number): Observable<Map<number, any>> {
    const url = this.getUrl(id);

    return this.http.get(url).map(this.createCategoryMap).catch(this.handleError);
  }

  /**
   * Creates a map of category objects indexed by their id.
   */
  private createCategoryMap(res: Response): Map<number, any> {

    const data = res.json();
    const categoryMap = new Map<number, any>();

    let i: number;
    for (i = 0; i < data.categories.length; i++) {
      categoryMap.set(data.categories[i].numericalId, data.categories[i]);
    }

    return categoryMap;
  }

  private getUrl(id: number): string {
    return `http://api.onyo.com/v1/mobile/company/${id}`;
  }

  private handleError(error: Response) {
    const msg = 'Error retrieving company data. Status: ' + error.status + ' ' + error.statusText;

    console.error(msg);
    return Observable.throw(msg);
  }

}
