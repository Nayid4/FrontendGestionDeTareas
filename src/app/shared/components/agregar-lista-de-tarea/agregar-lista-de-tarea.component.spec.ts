import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AgregarListaDeTareaComponent } from './agregar-lista-de-tarea.component';

describe('AgregarListaDeTareaComponent', () => {
  let component: AgregarListaDeTareaComponent;
  let fixture: ComponentFixture<AgregarListaDeTareaComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AgregarListaDeTareaComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AgregarListaDeTareaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
