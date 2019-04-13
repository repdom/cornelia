import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import { MatTableDataSource, MatSort, MatPaginator } from '@angular/material';
import { Url } from '../acortador/acortador.component';
import { UsuarioService } from '../../../services/usuario/usuario.service';
import * as crypto from 'crypto-js';
import { Config } from '../../../services/config';
import { StatsService } from '../../../services/services/stats.service';
import { DatePipe } from '@angular/common';
import { NgxSpinnerService } from 'ngx-spinner';

export class Visita {
  codigo = 0;
  fechaGuardado = '';
  hora = '';
  ip = '';
  navegador_web = '';
  sistema_operativo = '';
  urlSn = '';
}

export class GraficoFecha {
  cantidad = 0;
  fecha = '';
}

@Component({
  selector: 'app-tablaurl',
  templateUrl: './tablaurl.component.html',
  styleUrls: ['./tablaurl.component.scss']
})
export class TablaurlComponent implements OnInit {
  dataSource: MatTableDataSource<Url>;
  displayedColumns = ['url', 'urlCortada', 'qr', 'preview', 'acciones'];
  dominio = '';
  urls: Url[] = [];
  usuario = '';
  visitas: Visita[] = [];
  chartArray: GraficoFecha[] = [];
  mostrarChart = false;
  chartLabel: string[] = [];
  barChartData: any[] = [];
  public barChartOptions: any = {
    scaleShowVerticalLines: false,
    responsive: true
  };
  public barChartLegend: boolean;
  public barChartType: string;
  qrType = 'url';


  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;

  constructor(private cookieService: CookieService,
              private changeDetectorRefs: ChangeDetectorRef,
              private usuarioService: UsuarioService,
              private statService: StatsService,
              private datePipe: DatePipe,
              private spinner: NgxSpinnerService
              ) { }

  ngOnInit() {
    this.barChartType = 'bar';
    this.barChartLegend = true;
    this.dominio = Config.dominioBase;
    if (this.cookieService.check('usuario') === true) {
      this.usuario = crypto.AES.decrypt(this.cookieService.get('usuario'), 'contrasenia').toString(crypto.enc.Utf8);
    } else {
      this.usuario = null;
    }
    this.listarUrls();
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
    );
  }*/
  console.log(crypto.AES.decrypt(this.cookieService.get('usuario'), 'contrasenia').toString(crypto.enc.Utf8));
  this.usuarioService.getUrls(crypto.AES.decrypt(this.cookieService.get('usuario'), 'contrasenia')
                            .toString(crypto.enc.Utf8)).subscribe(response => {
                              // console.log(response);
    response.forEach(element => {
      this.urls.push(
        {
          codigo: element['codigo'],
          dominio: element['url'],
          hash: element['hashMaked'],
          logueado: '',
          usuario: this.usuario,
          dominioAcortado: this.dominio + '/' + element['hashMaked'],
        }
      );
      // console.log(element);
    });
  }, (error) => {

  }, () => {
    this.dataSource = new MatTableDataSource(this.urls);
    this.changeDetectorRefs.detectChanges();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  });
  }

  obtenerGrafico(hash: string) {
    this.spinner.show();
    this.visitas = [];
    this.statService.obtenerEstadistica(hash).subscribe(statResponse => {
      // console.log(statResponse);
      statResponse.forEach(element => {
        this.visitas.push({
          codigo: element['codigo'],
          fechaGuardado: this.datePipe.transform(element['fechaGuardado'], 'yyyy-MM-dd'),
          hora: element['hora'],
          ip: element['ip'],
          navegador_web: element['navegador_web'],
          sistema_operativo: element['sistema_operativo'],
          urlSn: element['urlSn'],
        });
      });
    }, () => {

    }, () => {
      // console.log(this.visitas);
      let i = 0;
      if (this.visitas.length > 0) {
        this.visitas.forEach(v => {
          const g: GraficoFecha = new GraficoFecha();
          g.cantidad = 0;
          g.fecha = v.fechaGuardado;
          this.visitas.forEach(v2 => {
            if (v.fechaGuardado === v2.fechaGuardado) {
              g.cantidad += 1;
            }
            this.chartArray.push(g);
            // console.log(g);
          });
          if (i === this.visitas.length - 1) {
            // this.spinner.hide();
            // this.mostrarChart = true;
            let y = 0;
            this.chartArray.forEach(element => {
              this.chartLabel.push(element.fecha);
              this.barChartData.push({
                data: [element.cantidad],
                label: element.fecha
              });
              y += 1;
              if (y === this.barChartData.length) {
                  this.spinner.hide();
                  this.mostrarChart = true;
              }
            });
          }
          i += 1;
        });
      } else {
        this.mostrarChart = false;
        this.spinner.hide();
      }
    });
  }
  public chartClicked(e: any): void {
    // console.log(e);
  }

  public chartHovered(e: any): void {
    // console.log(e);
  }
}
