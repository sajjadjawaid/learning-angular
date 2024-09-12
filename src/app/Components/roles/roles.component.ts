import { HttpClient } from '@angular/common/http';
import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { IRole } from '../../Model/Interface/role';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-roles',
  standalone: true,
  imports: [FormsModule, CommonModule],
  templateUrl: './roles.component.html',
  styleUrl: './roles.component.css',
})
export class RolesComponent implements OnInit {
  // frameWorkName: String = 'Angular';
  // version: number = 18;
  // date: Date = new Date();
  // isActive: boolean = true;
  // type: string = 'radio';
  // selectedProvince: string = '';

  // showMeAlert() {
  //   alert('Message');
  // }

  // showMeMessage(message: string) {
  //   alert(message);
  // }
  roleList: IRole[] = [];
  http = inject(HttpClient);
  ngOnInit(): void {
    alert('role component ');
    this.getAllRole();
  }

  getAllRole() {
    this.http
      .get('https://freeapi.miniprojectideas.com/api/ClientStrive/GetAllRoles')
      .subscribe((res: any) => {
        this.roleList = res.data;
      });
  }
}
