import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../../services/usuario/usuario.service';

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

  constructor(private usuarioService: UsuarioService) { }

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

    this.usuarioService.create(usuario).subscribe(response => {
      console.log(response);
    }, (error) => {
      throw new Error(error);
    }, () => {
      this.usuario = new Usuario();
    });

  }

}
