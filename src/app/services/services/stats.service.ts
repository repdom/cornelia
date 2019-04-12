import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Config } from '../config';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class StatsService extends DataService {

  constructor(http: Http) {
    super(Config.host + '/estadistica', http);
  }

  obtenerEstadistica(hash: string) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    // headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + '/' + hash, options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }
}
