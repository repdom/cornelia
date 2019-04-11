import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RedireccionComponent } from './redireccion.component';
import { RedireccionService } from '../services/redireccion/redireccion.service';
import { RouterModule } from '@angular/router';
import { HttpModule } from '@angular/http';


@NgModule({
  declarations: [
    RedireccionComponent
  ],
  imports: [
    CommonModule,
    RouterModule,
    HttpModule
  ],
  providers: [
    RedireccionService
  ]
})
export class RedireccionModule { }
