import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EliminarIconoComponent } from './eliminar-icono.component';

describe('EliminarIconoComponent', () => {
  let component: EliminarIconoComponent;
  let fixture: ComponentFixture<EliminarIconoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [EliminarIconoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(EliminarIconoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
