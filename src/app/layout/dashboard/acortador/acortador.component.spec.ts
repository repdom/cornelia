import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcortadorComponent } from './acortador.component';

describe('AcortadorComponent', () => {
  let component: AcortadorComponent;
  let fixture: ComponentFixture<AcortadorComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcortadorComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcortadorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
