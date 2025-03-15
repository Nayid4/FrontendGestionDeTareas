import { TestBed } from '@angular/core/testing';

import { ListaDeTareasService } from './lista-de-tareas.service';

describe('ListaDeTareasService', () => {
  let service: ListaDeTareasService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ListaDeTareasService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
