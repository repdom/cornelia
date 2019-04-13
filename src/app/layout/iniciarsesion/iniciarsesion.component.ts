import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';
import Swal from 'sweetalert2';
import * as crypto from 'crypto-js';
import { NgxSpinnerService } from 'ngx-spinner';

@Component({
  selector: 'app-iniciarsesion',
  templateUrl: './iniciarsesion.component.html',
  styleUrls: ['./iniciarsesion.component.scss']
})
export class IniciarsesionComponent implements OnInit {
  usuario: string;
  contrasenia: string;

  constructor(private usuarioService: UsuarioService,
              private router: Router, private cookieService: CookieService,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
    if (this.cookieService.check('usuario') !== false && this.cookieService.check('contrasenia') !== false) {
      this.router.navigate(['/dashboard']);
    }
  }

  onLogin() {
    // localStorage.setItem('isLoggedin', 'true');
    this.spinnerService.show();
    this.usuarioService.logearse(this.usuario, this.contrasenia).subscribe(response => {
      if (response !== null) {
        this.cookieService.set('usuario', crypto.AES.encrypt(this.usuario, 'contrasenia'), 5000);
        this.cookieService.set('contrasenia', crypto.AES.encrypt(this.contrasenia, 'contrasenia'), 5000);
        this.cookieService.set('esAdmin', crypto.AES.encrypt((response['rol'] === 'manager' ? 'true' : 'false'), 'contrasenia', 5000));
        this.router.navigate(['/dashboard']);
      } else {
        this.spinnerService.hide();
        Swal.fire({
          type: 'error',
          title: 'Oops...',
          text: 'Contraseña o Usuario incorrectos',
        });
      }
      // console.log(response);
    }, (error) => {
      this.spinnerService.hide();
    }, () => {
      // this.cookieService.set('')
      this.spinnerService.hide();
    });
  }

}
