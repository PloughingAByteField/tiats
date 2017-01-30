import { EventEmitter, Injectable } from '@angular/core';
import { Http, URLSearchParams } from '@angular/http';
import { Observable } from 'rxjs/Observable';

import { Race } from '../models/race.model';

@Injectable()
export class RacesService {
  public searchEvent: EventEmitter<any> = new EventEmitter();

  constructor(private http: Http) {}

  public getRaces(): Observable<Race[]> {
    return this.http.get('/rest/races')
      .map((response) => response.json());
  }
}
