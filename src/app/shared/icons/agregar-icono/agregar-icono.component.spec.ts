import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarIconoComponent } from './agregar-icono.component';

describe('AgregarIconoComponent', () => {
  let component: AgregarIconoComponent;
  let fixture: ComponentFixture<AgregarIconoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarIconoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarIconoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
