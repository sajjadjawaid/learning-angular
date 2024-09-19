import { Component, OnInit, inject, signal } from '@angular/core';
import {
  FormArray,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
} from '@angular/forms';
import { ClientService } from '../../Services/client.service';
import {
  APIResponseModel,
  ClientProject,
  Employee,
} from '../../Model/Interface/role';
import { Client } from '../../Model/class/Client';
import { CommonModule, DatePipe } from '@angular/common';
import { AlertComponent } from "../../reusableComponents/alert/alert.component";

@Component({
  selector: 'app-client-project',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, DatePipe, AlertComponent],
  templateUrl: './client-project.component.html',
  styleUrl: './client-project.component.css',
})
export class ClientProjectComponent implements OnInit {
  projectForm: FormGroup = new FormGroup({
    clientProjectId: new FormControl(0),
    projectName: new FormControl(''),
    startDate: new FormControl(''),
    expectedEndDate: new FormControl(''),
    leadByEmpId: new FormControl(''),
    completeDate: new FormControl(''),
    contactPerson: new FormControl(''),
    contactPersonContactNo: new FormControl(''),
    totalEmpWorking: new FormControl(''),
    projectCost: new FormControl(''),
    projectDetails: new FormControl(''),
    contactPersonEmailId: new FormControl(''),
    clientId: new FormControl(''),
    location: new FormArray([
      new FormGroup({
        country: new FormControl(''),
        city: new FormControl(''),
      }),
    ]),
  });

  employeeList: Employee[] = [];
  clientList: Client[] = [];

  projectList = signal<ClientProject[]>([]);

  clientService = inject(ClientService);

  ngOnInit(): void {
    this.getAllClients();
    this.getAllEmployees();
    this.getAllClientProjects();
  }

  getAllEmployees() {
    this.clientService.getAllEmployees().subscribe((res: APIResponseModel) => {
      this.employeeList = res.data;
      console.log(this.employeeList);
    });
  }
  getAllClients() {
    this.clientService.getAllClients().subscribe((res: APIResponseModel) => {
      console.log('response');
      this.clientList = res.data;
      console.log(this.clientList);
    });
  }

  getAllClientProjects() {
    this.clientService
      .getAllClientProjects()
      .subscribe((res: APIResponseModel) => {
        this.projectList.set(res.data);
      });
  }

  get locations(): FormArray {
    return this.projectForm.get('location') as FormArray;
  }

  addLocation() {
    this.locations.push(
      new FormGroup({
        country: new FormControl(''),
        city: new FormControl(''),
      })
    );
  }

  removeLocation(index: number) {
    this.locations.removeAt(index);
  }

  // addLocation() {
  //   const control = this.projectForm.get('location') as FormArray;
  //   control.push(
  //     new FormGroup({
  //       country: new FormControl(''),
  //       city: new FormControl(''),
  //     })
  //   );
  // }

  // removeLocation(index: number) {
  //   const control = this.projectForm.get('location') as FormArray;
  //   control.removeAt(index);
  // }

  onSaveProject() {
    const formValue = this.projectForm.value;
    this.clientService
      .addUpdateClientProject(formValue)
      .subscribe((res: APIResponseModel) => {
        if (res.result) {
          alert('Project Created Successfully');
        } else {
          alert(res.message);
        }
      });
  }
}
