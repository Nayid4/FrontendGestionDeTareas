import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FiltroIconoComponent } from './filtro-icono.component';

describe('FiltroIconoComponent', () => {
  let component: FiltroIconoComponent;
  let fixture: ComponentFixture<FiltroIconoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FiltroIconoComponent]
    })
    .compileComponents();

    fixture = TestBed.createComponent(FiltroIconoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
