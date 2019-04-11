import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { RedireccionComponent } from './redireccion.component';

describe('RedireccionComponent', () => {
  let component: RedireccionComponent;
  let fixture: ComponentFixture<RedireccionComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ RedireccionComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(RedireccionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
