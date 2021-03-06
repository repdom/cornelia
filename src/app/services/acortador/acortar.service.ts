import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Config } from '../config';
import { Http, RequestOptions, Headers } from '@angular/http';
import { map, catchError } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AcortarService extends DataService {

  constructor(http: Http) {
    super(Config.host + '/agregandoUrl', http);
  }

  porUsuario(usuario: string, resourse) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    // headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    return this.http.post(this.url + '/' + usuario, JSON.stringify(resourse), options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }
}
