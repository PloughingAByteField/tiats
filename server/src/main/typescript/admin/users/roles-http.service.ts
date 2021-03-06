import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Observable } from 'rxjs/Observable';

import { CachedHttpService } from '../../http/cached-http.service';
import { Data } from '../../model/data.model';

@Injectable()
export class AdminRolesHttpService extends CachedHttpService {

    private headers = new HttpHeaders({ 'Content-Type': 'application/json' });
    private endPoint: string = '/rest/users/roles';

    constructor(protected http: HttpClient) {
        super(http);
     }

    public getRoles(): Observable<Data> {
        return this.getData(this.endPoint);
    }

}
