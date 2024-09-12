import { Component, inject, OnInit } from '@angular/core';
import { MasterService } from '../../Services/master.service';
import { APIResponseModel, IDesignation } from '../../Model/Interface/role';

@Component({
  selector: 'app-designation',
  standalone: true,
  imports: [],
  templateUrl: './designation.component.html',
  styleUrl: './designation.component.css',
})
export class DesignationComponent implements OnInit {
  designationList: IDesignation[] = [];
  masterService = inject(MasterService);
  isLoader: boolean = true;
  ngOnInit(): void {
    this.masterService.getDesignations().subscribe(
      (result: APIResponseModel) => {
        this.designationList = result.data;
        this.isLoader = false;
      },
      (error) => {
        alert('API error');
        this.isLoader = false;
      }
    );
  }
}
