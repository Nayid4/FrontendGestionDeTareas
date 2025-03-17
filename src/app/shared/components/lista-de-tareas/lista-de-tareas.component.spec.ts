import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaDeTareasComponent } from './lista-de-tareas.component';

describe('ListaDeTareasComponent', () => {
  let component: ListaDeTareasComponent;
  let fixture: ComponentFixture<ListaDeTareasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ListaDeTareasComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ListaDeTareasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
