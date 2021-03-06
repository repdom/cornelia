import { IniciarsesionModule } from './../../.history/src/app/layout/iniciarsesion/iniciarsesion.module_20190411144000';
import { LayoutModule } from '@angular/cdk/layout';
import { OverlayModule } from '@angular/cdk/overlay';
import { NgModule } from '@angular/core';
import {
    MatButtonModule,
    MatIconModule,
    MatListModule,
    MatSidenavModule,
    MatToolbarModule
} from '@angular/material';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { TranslateLoader, TranslateModule } from '@ngx-translate/core';
import { TranslateHttpLoader } from '@ngx-translate/http-loader';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RedireccionComponent } from './redireccion/redireccion.component';
import { RedireccionModule } from './redireccion/redireccion.module';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatLinkPreviewModule } from '@angular-material-extensions/link-preview';
import { ServiceWorkerModule } from '@angular/service-worker';
import { environment } from '../environments/environment';


// AoT requires an exported function for factories
export const createTranslateLoader = (http: HttpClient) => {
    /* for development
    return new TranslateHttpLoader(
        http,
        '/start-javascript/sb-admin-material/master/dist/assets/i18n/',
        '.json'
    );*/
    return new TranslateHttpLoader(http, './assets/i18n/', '.json');
};

@NgModule({
    declarations: [AppComponent],
    imports: [
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,
        LayoutModule,
        OverlayModule,
        HttpClientModule,
        MatToolbarModule,
        RedireccionModule,
        NgxSpinnerModule,
        TranslateModule.forRoot({
            loader: {
                provide: TranslateLoader,
                useFactory: createTranslateLoader,
                deps: [HttpClient]
            }
        }),
        MatLinkPreviewModule.forRoot(),
        ServiceWorkerModule.register('ngsw-worker.js', { enabled: environment.production }),
    ],
    providers: [],
    bootstrap: [AppComponent]
})
export class AppModule {}
