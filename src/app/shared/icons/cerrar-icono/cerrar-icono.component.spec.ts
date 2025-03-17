import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CerrarIconoComponent } from './cerrar-icono.component';

describe('CerrarIconoComponent', () => {
  let component: CerrarIconoComponent;
  let fixture: ComponentFixture<CerrarIconoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CerrarIconoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(CerrarIconoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
