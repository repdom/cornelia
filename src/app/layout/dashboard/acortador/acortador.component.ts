import { Component, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxIndexedDB } from 'ngx-indexed-db';
import { Md5 } from 'ts-md5/dist/md5';
import * as bases from 'bases';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Config } from '../../../services/config';
import { AcortarService } from '../../../services/acortador/acortar.service';
import swal from 'sweetalert2';


/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

export class Url {
  public codigo = 0;
  public dominio = '';
  public hash = '';
  public logueado = '';
  public usuario = '';
}

@Component({
  selector: 'app-acortador',
  templateUrl: './acortador.component.html',
  styleUrls: ['./acortador.component.scss']
})
export class AcortadorComponent implements OnInit {
  url: string;
  db: NgxIndexedDB;
  urls: Url[] = [];
  dataSource: MatTableDataSource<Url>;
  displayedColumns = ['url', 'urlCortada', 'acciones'];
  dominio = '';

  urlFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
  ]);

  matcher = new MyErrorStateMatcher();

  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private translate: TranslateService,
              private changeDetectorRefs: ChangeDetectorRef, private acrotarService: AcortarService) { }

  ngOnInit() {
    // const h1 = Md5.hashStr('1');
    // const h2 = Md5.hashStr('5', true);
    const b16 = bases.toBase16('250');
    console.log(b16);
    this.dominio = Config.dominioBase;
  }

  agregarUrl() {
      /*this.db.add('url', {
        dominio: this.urlFormControl.value,
        hash: Md5.hashAsciiStr(this.urlFormControl.value),
        logueado: false,
        usuario: null
      }).then(
        () => {
          this.urlFormControl.setValue('');
        },
        error => {
          console.log(error);
        }
      );*/
      const url = {
        url: this.urlFormControl.value,
        hashMaked: Md5.hashAsciiStr(this.urlFormControl.value),
        usuario: null,
      };
      this.acrotarService.create(url).subscribe(response => {
        this.urlFormControl.setValue(`${Config.dominioBase}${response['hashMaked']}`);
      }, (error) => {
        swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Algo malo sucedió, vuelva a intentarlo. Revise conexión de internet.',
        });
      }, () => {

      });
  }

  listarUrls() {
    /*this.db.getAll('url').then(
      url => {
        console.log(url);
        this.urls = url;
        this.dataSource = new MatTableDataSource(this.urls);
        this.changeDetectorRefs.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error => {
        console.log();
      }
    );*/
  }
}
