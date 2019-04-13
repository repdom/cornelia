import { Component, OnInit, AfterViewInit, ElementRef, AfterViewChecked } from '@angular/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxIndexedDB } from 'ngx-indexed-db';
declare const microlink;


@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, AfterViewInit, AfterViewChecked {
    constructor(private translate: TranslateService, private elementRef: ElementRef) {
        translate.setDefaultLang('es');
    }
    ngAfterViewInit() {
      this.elementRef.nativeElement.ownerDocument.body.style.backgroundColor = '#474350';
      // microlink('.link-preview');
    }
    ngAfterViewChecked() {
        microlink('.link-preview');
    }
    ngOnInit() {
    }
}
