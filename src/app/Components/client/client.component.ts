import { Component, inject, OnInit } from '@angular/core';
import { Client } from '../../Model/class/Client';
import { FormsModule } from '@angular/forms';
import { ClientService } from '../../Services/client.service';
import { APIResponseModel } from '../../Model/Interface/role';
import { CommonModule } from '@angular/common';
import { AlertComponent } from '../../reusableComponents/alert/alert.component';
import { MyButtonComponent } from '../../reusableComponents/my-button/my-button.component';
import { ClientDetailModalComponent } from '../client-detail-modal/client-detail-modal.component';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { storage } from '../../../environments/firebase-config';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    FormsModule,
    CommonModule,
    AlertComponent,
    MyButtonComponent,
    ClientDetailModalComponent,
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.css',
})
export class ClientComponent implements OnInit {
  clientObj: Client = new Client();
  clientList: Client[] = [];

  selectedFile: File | null = null;
  previewImageUrl: string | ArrayBuffer | null = null;
  previewImages: string[] = [];

  selectedClient: Client | null = null;

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

  // onFileSelected(event: any) {
  //   const file = event.target.files[0];

  //   // Ensure file is selected and not null
  //   if (file) {
  //     this.selectedFile = file;

  //     this.clientObj.imagePath = URL.createObjectURL(file);

  //     // Generate a preview of the selected image
  //     const reader = new FileReader();

  //     reader.onload = (e: ProgressEvent<FileReader>) => {
  //       // Ensure result is not undefined
  //       if (e.target?.result !== undefined) {
  //         this.previewImageUrl = e.target.result as string | ArrayBuffer;
  //       }
  //     };

  //     reader.readAsDataURL(this.selectedFile as Blob);
  //   }
  // }

  onFileSelected(event: Event): void {
    const input = event.target as HTMLInputElement;
    if (input.files && input.files[0]) {
      const file = input.files[0];
      const storageRef = ref(storage, `client-images/${file.name}`);
      uploadBytes(storageRef, file)
        .then((snapshot) => {
          console.log('Uploaded a blob or file!');
          getDownloadURL(snapshot.ref).then((downloadURL) => {
            this.clientObj.imagePath = downloadURL;
            console.log('File available at', downloadURL);
            console.log('image Path: ', this.clientObj.imagePath);
          });
        })
        .catch((error) => {
          console.error('Upload failed', error);
        });
    }
  }

  onSaveClient() {
    console.log('Saving client:', this.clientObj);
    console.log('Preview image URL:', this.previewImageUrl);
    this.clientService
      .addUpdate(this.clientObj)
      .subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert('Client created successfully');
          this.loadClient();
          this.clientObj = new Client();
          this.previewImageUrl = null;
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

  openModal(data: Client) {
    this.selectedClient = data;
  }

  closeModal() {
    this.selectedClient = null;
  }
}
