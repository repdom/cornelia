import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Config } from '../config';
import { DataService } from '../data.service';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RedireccionService extends DataService {

  constructor(http: Http) {
    super(Config.host + '/redireccionar', http);
  }

  public redireccionar(hash: string) {
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
