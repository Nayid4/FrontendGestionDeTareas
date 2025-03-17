import { Component, OnInit } from '@angular/core';
import { AlertaService } from '../../../core/services/alerta.service';
import { Alerta } from '../../../core/models/Alerta';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-alerta',
  standalone: true,
  imports: [
    CommonModule
  ],
  templateUrl: './alerta.component.html',
  styleUrl: './alerta.component.css'
})
export class AlertaComponent implements OnInit {
  alertas: Alerta[] = [];

  constructor(private alertaService: AlertaService) {}

  ngOnInit() {
    this.alertaService.alertas$.subscribe(alertas => {
      this.alertas = alertas;
    });
  }
}
