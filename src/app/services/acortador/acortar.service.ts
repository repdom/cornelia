import { Injectable } from '@angular/core';
import { DataService } from '../data.service';
import { Config } from '../config';
import { Http } from '@angular/http';

@Injectable({
  providedIn: 'root'
})
export class AcortarService extends DataService {

  constructor(http: Http) {
    super(Config.host + '/agregandoUrl', http);
  }
}
