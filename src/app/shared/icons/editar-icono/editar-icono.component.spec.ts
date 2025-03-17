import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EditarIconoComponent } from './editar-icono.component';

describe('EditarIconoComponent', () => {
  let component: EditarIconoComponent;
  let fixture: ComponentFixture<EditarIconoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EditarIconoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EditarIconoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
