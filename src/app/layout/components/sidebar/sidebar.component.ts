import { Component, OnInit } from '@angular/core';
import { CookieService } from 'ngx-cookie-service';
import * as crypto from 'crypto-js';

@Component({
    selector: 'app-sidebar',
    templateUrl: './sidebar.component.html',
    styleUrls: ['./sidebar.component.scss']
})
export class SidebarComponent implements OnInit {
    public showMenu: string;
    esAdministrador = false;
    constructor(private cookieService: CookieService) {
    }

    ngOnInit() {
        this.showMenu = '';
                // setInterval(() => {
                    if (this.cookieService.check('usuario') !== false && this.cookieService.check('contrasenia') !== false) {
                        if (crypto.AES.decrypt(this.cookieService.get('esAdmin'), 'contrasenia').toString(crypto.enc.Utf8) === 'true') {
                            this.esAdministrador = true;
                        } else {
                            this.esAdministrador = false;
                        }
                    } else {
                        this.esAdministrador = false;
                    }
                    // console.log('pasando');
                // }, 1000);
    }

    addExpandClass(element: any) {
        if (element === this.showMenu) {
            this.showMenu = '0';
        } else {
            this.showMenu = element;
        }
    }
}
