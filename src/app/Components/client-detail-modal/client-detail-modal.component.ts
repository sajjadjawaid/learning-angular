import { Component, input, Input, OnInit } from '@angular/core';
import { Client } from '../../Model/class/Client';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-client-detail-modal',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './client-detail-modal.component.html',
  styleUrl: './client-detail-modal.component.css',
})
export class ClientDetailModalComponent implements OnInit {
  @Input() client: Client | null = null;

  ngOnInit(): void {}
}
