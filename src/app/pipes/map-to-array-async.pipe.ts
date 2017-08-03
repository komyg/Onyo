import { Pipe, PipeTransform } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import 'rxjs/add/operator/map';

@Pipe({
  name: 'mapToArrayAsync'
})
export class MapToArrayAsyncPipe implements PipeTransform {

  transform(value: Observable<Map<any, any>>, args?: any): Observable<Array<any>> {
    return value.map((map: Map<any, any>) => Array.from(map.values()));
  }

}
