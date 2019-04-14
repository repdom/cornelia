import { Component, OnInit, ChangeDetectorRef, ViewChild } from '@angular/core';
import { MatTableDataSource, MatPaginator, MatSort } from '@angular/material';
import { Usuario } from '../registrar/registrar.component';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import * as crypto from 'crypto-js';
import { throwError } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';
import { UrlService } from '../../services/url/url.service';
import { Url } from '../dashboard/acortador/acortador.component';
import { Config } from '../../services/config';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-admin-panel',
  templateUrl: './admin-panel.component.html',
  styleUrls: ['./admin-panel.component.scss']
})
export class AdminPanelComponent implements OnInit {
  public usuarios: Usuario[] = [];
  dataSource: MatTableDataSource<Usuario>;
  dataSourceUrl: MatTableDataSource<Url>;
  displayedColumns = ['usuario', 'nommbreCompleto', 'Acciones'];
  displayedColumnsUrl = ['url', 'urlCortada', 'qr', 'preview', 'acciones'];
  urls: Url[] = [];
  activar = false;
  qrType = 'url';

  @ViewChild('matPaginatorUsuarios') paginator: MatPaginator;
  @ViewChild('matSortUsuarios') sort: MatSort;

  @ViewChild('matPaginatorUrl') paginatorUrl: MatPaginator;
  @ViewChild('matSortUrl') sortUrl: MatSort;

  constructor(
    private changeDetectorRefs: ChangeDetectorRef,
    private usuarioService: UsuarioService,
    private router: Router,
    private cookieService: CookieService,
    private spinnerService: NgxSpinnerService,
    private urlService: UrlService
  ) { }

  ngOnInit() {
    this.spinnerService.show();
    if (this.cookieService.check('usuario') !== false && this.cookieService.check('contrasenia') !== false) {
      if (crypto.AES.decrypt(this.cookieService.get('esAdmin'), 'contrasenia').toString(crypto.enc.Utf8) === 'true') {
        this.listarUsuarios();
      } else {
        this.spinnerService.hide();
        this.router.navigate(['/dashboard']);
      }
    }
  }
  listarUsuarios() {
    this.spinnerService.show();
    this.usuarioService.getAll().subscribe(userResponse => {
      // console.log(userResponse);
      userResponse.forEach(element => {
        const u: Usuario = {
          nombre: element['nombre'],
          nombreSegundo: element['nombreSegundo'],
          apellido: element['apellido'],
          apellidoSegundo: element['apellidoSegundo'],
          usuario: element['usuario'],
          contrasenia: '',
          email: element['email'],
          rol: element['rol'],
        };
        console.log(u);
        this.usuarios.push(u);
        this.dataSource = new MatTableDataSource(this.usuarios);
        this.changeDetectorRefs.detectChanges();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.spinnerService.hide();
      });
    }, error => {
      throwError('Error cargando, revisar conexión a inetrnet');
    }, () => {
    });
  }

  cambiarRol(usuario: Usuario) {
    this.spinnerService.show();
    this.usuarioService.editarRol(usuario.rol, usuario.usuario).subscribe(editarRolResponse => {
      usuario.rol = editarRolResponse['rol'];
    }, (error) => {
      throwError('Error cargando, revisar conexión a inetrnet');
    }, () => {
      this.spinnerService.hide();
    });
  }

  listarUrls(usuario: Usuario) {
    this.spinnerService.show();
    this.activar = true;
    this.urls = [];
  // console.log(crypto.AES.decrypt(this.cookieService.get('usuario'), 'contrasenia').toString(crypto.enc.Utf8));
    this.usuarioService.getUrls(usuario.usuario).subscribe(response => {
                              // console.log(response);
      if (response !== null) {
        response.forEach(element => {
          this.urls.push(
            {
              codigo: element['codigo'],
              dominio: element['url'],
              hash: element['hashMaked'],
              logueado: '',
              usuario: usuario.usuario,
              dominioAcortado: Config.dominioBase + '/' + element['hashMaked'],
            }
          );
          // console.log(element);
        });
      }
    }, (error) => {
      this.spinnerService.hide();
    }, () => {
      this.dataSourceUrl = new MatTableDataSource(this.urls);
      this.changeDetectorRefs.detectChanges();
      this.dataSourceUrl.paginator = this.paginatorUrl;
      this.dataSourceUrl.sort = this.sortUrl;
      this.spinnerService.hide();
    });
  }
  eliminarUrl(url: Url) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: '¡No va a poder deshacer esta acción!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        const u = {
          codigo: url.codigo,
          url: url.dominioAcortado
        };
        this.urlService.publicdelete(u).subscribe(responseDeleteUrl => {
          this.urls.splice(this.urls.findIndex(
              f => f.codigo === url.codigo), 1
          );
          this.dataSourceUrl.data = [];
          this.dataSourceUrl.data = this.urls;
        }, (error) => {
          throwError('No se pudo eliminar, revisar conexión a internet');
        }, () => {

        });
      }
    });
  }
  eliminarUsuario(usuario: Usuario) {
    Swal.fire({
      title: '¿Esta seguro?',
      text: '¡No va a poder deshacer esta acción!',
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#1F0322',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Eliminar'
    }).then((result) => {
      if (result.value) {
        const u = {
          codigo: usuario.usuario,
          usuario: usuario.usuario
        };
        this.usuarioService.publicdelete(u).subscribe(responseDeleteUser => {
          if (responseDeleteUser === true) {
            this.usuarios.splice(this.usuarios.findIndex(
              f => f.usuario === usuario.usuario), 1
          );
          this.dataSource.data = [];
          this.dataSource.data = this.usuarios;
          } else {
            Swal.fire({
              type: 'error',
              title: 'Oops...',
              text: 'No puede eliminar usuario administrador',
            });
          }
      }, (error) => {
        throwError('No se pudo eliminar, revisar conexión a internet');
      }, () => {

      });
      }
    });
  }
}
