import { Injectable } from '@angular/core';
import { Http, RequestOptions, Headers } from '@angular/http';
import { Config } from '../config';
import { DataService } from '../data.service';
import { map, catchError } from 'rxjs/operators';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService extends DataService {

  constructor(http: Http) {
    super(Config.host + '/usuarios/', http);
  }

  logearse(usuario: string, contrasenia: string) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    // headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + 'login/' + usuario + '/' + contrasenia, options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

  getUrls(usuario: string) {
    const headers = new Headers({ 'Accept': 'application/json', 'Content-Type': 'application/json'});
    // headers.append('Authorization', this.cookieService);
    const options = new RequestOptions({ headers: headers });
    return this.http.get(this.url + 'urls/' + usuario, options)
      .pipe(
        map(response => response.json()),
        catchError(this.handlerError)
      );
  }

  estaLogeado(logueado: boolean, admin?: boolean) {
    return Observable.create((logueado) => {

    });
  }
}
