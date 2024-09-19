import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../Model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../Services/client.service';
import { APIResponseModel } from '../../Model/Interface/role';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../reusableComponents/alert/alert.component';
import { MyButtonComponent } from "../../reusableComponents/my-button/my-button.component";

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [FormsModule, CommonModule, AlertComponent, MyButtonComponent],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  clientObj: Client = new Client();
  clientList: Client[] = [];

  clientService = inject(ClientService);

  ngOnInit(): void {
    this.loadClient();
  }

  loadClient() {
    this.clientService.getAllClients().subscribe((res: APIResponseModel) => {
      console.log('response data', res.data);
      this.clientList = res.data;
      console.log(this.clientList);
    });
  }
  onSaveClient() {
    this.clientService
      .addUpdate(this.clientObj)
      .subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert('Client created successfully');
          this.loadClient();
          this.clientObj = new Client();
        } else {
          alert(res.message);
        }
      });
  }

  onEditClient(data: Client) {
    this.clientObj = data;
  }

  onDeleteClient(id: number) {
    const confirmDel = confirm('are you sure you want to delete?');
    if (confirmDel) {
      this.clientService
        .deleteClientById(id)
        .subscribe((res: APIResponseModel) => {
          if (res.result) {
            alert('Client Deleted successfully');
            this.loadClient();
          } else {
            alert(res.message);
          }
        });
    }
  }
}
