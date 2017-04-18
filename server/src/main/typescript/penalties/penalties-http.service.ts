import { Injectable } from '@angular/core';
import { Http, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Penalty, convertObjectToPenalty } from './penalty.model';

@Injectable()
export class PenaltiesHttpService {
  protected endpoint: string = '/rest/penalties';

  constructor(protected http: Http) {}

  public getPenalties(): Observable<Penalty[]> {
    return this.http.get(this.endpoint)
      .map(convertJsonToPenalties).share();
   }
}

export function convertJsonToPenalties(response: Response): Penalty[] {
    let jsonPenalties: Penalty[] = response.json();
    let penalties: Penalty[] = new Array<Penalty>();
    jsonPenalties.map((json: Penalty) => {
      penalties.push(convertObjectToPenalty(json));
    });
    return penalties;
}
