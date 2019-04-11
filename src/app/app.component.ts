import { Component, OnInit, AfterViewInit, ElementRef } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxIndexedDB } from 'ngx-indexed-db';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit {
    constructor(private translate: TranslateService, private elementRef: ElementRef) {
        translate.setDefaultLang('es');
    }
    ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#474350';
    }

    ngOnInit() {
    }
}
