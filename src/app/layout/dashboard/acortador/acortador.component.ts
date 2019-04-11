import { Component, OnInit } from '@angular/core';
import {FormControl, FormGroupDirective, NgForm, Validators} from '@angular/forms';
import {ErrorStateMatcher} from '@angular/material/core';
import { TranslateService } from '@ngx-translate/core';
import { NgxIndexedDB } from 'ngx-indexed-db';

/** Error when invalid control is dirty, touched, or submitted. */
export class MyErrorStateMatcher implements ErrorStateMatcher {
  isErrorState(control: FormControl | null, form: FormGroupDirective | NgForm | null): boolean {
    const isSubmitted = form && form.submitted;
    return !!(control && control.invalid && (control.dirty || control.touched || isSubmitted));
  }
}

@Component({
  selector: 'app-acortador',
  templateUrl: './acortador.component.html',
  styleUrls: ['./acortador.component.scss']
})
export class AcortadorComponent implements OnInit {
  urlFormControl = new FormControl('', [
    Validators.required,
    Validators.pattern('(https?://)?([\\da-z.-]+)\\.([a-z.]{2,6})[/\\w .-]*/?'),
  ]);

  matcher = new MyErrorStateMatcher();

  constructor(private translate: TranslateService) { }

  ngOnInit() {
    // const db = new NgxIndexedDB('cortadorUrl', 1);
  }

}
