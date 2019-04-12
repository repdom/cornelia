import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatInputModule,
    MatListModule,
    MatMenuModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { TranslateModule } from '@ngx-translate/core';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { TopnavComponent } from './components/topnav/topnav.component';
import { LayoutRoutingModule } from './layout-routing.module';
import { LayoutComponent } from './layout.component';
import { NavComponent } from './nav/nav.component';
import { RegistrarModule } from './registrar/registrar.module';
import { ComunesModule } from '../comunes/comunes.module';
import { IniciarsesionModule } from './iniciarsesion/iniciarsesion.module';
import { CookieService } from 'ngx-cookie-service';

@NgModule({
    imports: [
        CommonModule,
        LayoutRoutingModule,
        MatToolbarModule,
        MatButtonModule,
        MatSidenavModule,
        MatIconModule,
        MatInputModule,
        MatMenuModule,
        MatListModule,
        TranslateModule,
        RegistrarModule,
        ComunesModule,
        IniciarsesionModule,
    ],
    declarations: [LayoutComponent, NavComponent, TopnavComponent, SidebarComponent],
    providers: [
        CookieService
    ]
})
export class LayoutModule {}
