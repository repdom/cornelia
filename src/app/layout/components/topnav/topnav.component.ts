import { Component, OnInit } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';
import { TranslateService } from '@ngx-translate/core';
import { CookieService } from 'ngx-cookie-service';
import * as crypto from 'crypto-js';

@Component({
    selector: 'app-topnav',
    templateUrl: './topnav.component.html',
    styleUrls: ['./topnav.component.scss']
})
export class TopnavComponent implements OnInit {
    public pushRightClass: string;
    public esAdministrador = false;
    public estaLogeado = false;

    constructor(public router: Router, private translate: TranslateService, private coockieService: CookieService) {
        this.router.events.subscribe(val => {
            if (val instanceof NavigationEnd && window.innerWidth <= 992 && this.isToggled()) {
                this.toggleSidebar();
            }
        });
    }

    ngOnInit() {
        this.pushRightClass = 'push-right';
        setInterval(() => {
            if (this.coockieService.check('usuario') !== false && this.coockieService.check('contrasenia') !== false) {
                this.estaLogeado = true;
                if (Boolean(crypto.AES.decrypt(this.coockieService.check('esAdmin'), 'contrasenia')) === true) {
                    this.esAdministrador = true;
                }
            }
            // console.log('pasando');
        }, 100);
    }

    isToggled(): boolean {
        const dom: Element = document.querySelector('body');
        return dom.classList.contains(this.pushRightClass);
    }

    toggleSidebar() {
        const dom: any = document.querySelector('body');
        dom.classList.toggle(this.pushRightClass);
    }

    onLoggedout() {
        localStorage.removeItem('isLoggedin');
        this.router.navigate(['/login']);
    }

    changeLang(language: string) {
        this.translate.use(language);
    }
}
