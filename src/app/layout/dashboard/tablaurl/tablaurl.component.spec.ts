import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { TablaurlComponent } from './tablaurl.component';

describe('TablaurlComponent', () => {
  let component: TablaurlComponent;
  let fixture: ComponentFixture<TablaurlComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ TablaurlComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(TablaurlComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
