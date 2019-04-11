import { Component, OnInit } from '@angular/core';

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

  constructor() { }

  ngOnInit() {
  }

  cancelar() {
    this.usuario = new Usuario();
  }

}
