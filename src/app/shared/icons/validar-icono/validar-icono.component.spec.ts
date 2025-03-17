import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ValidarIconoComponent } from './validar-icono.component';

describe('ValidarIconoComponent', () => {
  let component: ValidarIconoComponent;
  let fixture: ComponentFixture<ValidarIconoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ValidarIconoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ValidarIconoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
