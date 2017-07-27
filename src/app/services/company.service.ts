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
   * Retrieves the company data for a given ID.
   */
  public getCompanyDataById(id: Number): Observable<any> {

    const url = `http://api.onyo.com/v1/mobile/company/${id}`;

    return this.http.get(url).map((res: Response) => res.json()).catch(this.handleError);
  }

  private handleError(error: Response) {
    const msg = 'Error retrieving company data. Status: ' + error.status + ' ' + error.statusText;

    console.error(msg);
    return Observable.throw(msg);
  }

}
