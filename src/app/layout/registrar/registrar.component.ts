import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';
import { Router } from '@angular/router';
import { NgxSpinnerService } from 'ngx-spinner';

export class Usuario {
  public nombre = '';
  public nombreSegundo = '';
  public apellido = '';
  public apellidoSegundo = '';
  public usuario = '';
  public contrasenia = '';
  public email = '';
  public rol = '';
}

@Component({
  selector: 'app-registrar',
  templateUrl: './registrar.component.html',
  styleUrls: ['./registrar.component.scss']
})
export class RegistrarComponent implements OnInit {
  usuario: Usuario = new Usuario();

  constructor(private usuarioService: UsuarioService,
              private router: Router,
              private spinnerService: NgxSpinnerService) { }

  ngOnInit() {
  }

  cancelar() {
    this.usuario = new Usuario();
  }

  guardarUsuario() {
    const usuario = {
      nombre: this.usuario.nombre,
      nombreSegundo: this.usuario.nombreSegundo,
      apellido: this.usuario.apellido,
      apellidoSegundo: this.usuario.apellidoSegundo,
      usuario: this.usuario.usuario,
      contrasenia: this.usuario.contrasenia,
      email: this.usuario.email,
      rol: 'Usuario',
    };
    this.spinnerService.show();
    this.usuarioService.create(usuario).subscribe(response => {
      console.log(response);
    }, (error) => {
      throw new Error(error);
    }, () => {
      this.spinnerService.hide();
      this.usuario = new Usuario();
      this.router.navigate(['/login']);
    });

  }

}
