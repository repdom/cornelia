import { Component, OnInit } from '@angular/core';
import { RedireccionService } from '../services/redireccion/redireccion.service';
import { ActivatedRoute, Router } from '@angular/router';
import { Url } from '../layout/dashboard/acortador/acortador.component';

@Component({
  selector: 'app-redireccion',
  templateUrl: './redireccion.component.html',
  styleUrls: ['./redireccion.component.scss']
})
export class RedireccionComponent implements OnInit {
  hash: string;
  url: Url = new Url();

  constructor(private redireccionService: RedireccionService,
              private route: ActivatedRoute,
              private router: Router) { }

  ngOnInit(): void {
    // throw new Error('Method not implemented.');
    this.hash = this.route.snapshot.params.hash;
    this.redireccionService.redireccionar(this.hash).subscribe(hashResponse => {
      console.log(hashResponse);
      this.url.codigo = hashResponse['codigo'];
      this.url.usuario = hashResponse['usuario'];
      this.url.hash = hashResponse['hashMaked'];
      this.url.dominio = hashResponse['url'];

      window.location.href = this.url.dominio;
    });
  }
}
