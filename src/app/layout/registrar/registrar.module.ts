import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RegistrarComponent } from './registrar.component';
import {
  MatInputModule,
  MatCheckboxModule,
  MatButtonModule,
  MatTabsModule,
  MatCardModule,
  MatTableModule,
  MatPaginatorModule,
  MatDialogModule,
  MatButtonToggleModule,
  MatIconModule,
  MatTreeModule,
  MatGridListModule,
  MatListModule,
  MatExpansionModule,
  MatSortModule } from '@angular/material';
import { FormsModule } from '@angular/forms';
import { FlexLayoutModule } from '@angular/flex-layout';
import { UsuarioService } from '../../services/usuario/usuario.service';

@NgModule({
  declarations: [
    RegistrarComponent
  ],
  imports: [
    CommonModule,
    MatInputModule,
    MatCheckboxModule,
    MatButtonModule,
    MatTabsModule,
    MatCardModule,
    MatTableModule,
    MatPaginatorModule,
    MatDialogModule,
    MatButtonToggleModule,
    MatIconModule,
    MatTreeModule,
    MatGridListModule,
    MatListModule,
    MatExpansionModule,
    MatSortModule,
    FormsModule,
    FlexLayoutModule,
    FlexLayoutModule.withConfig({addFlexToParent: false})
  ],
  providers: [
    UsuarioService
  ]
})
export class RegistrarModule { }
