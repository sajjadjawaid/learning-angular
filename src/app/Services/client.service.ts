import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Client } from '../Model/class/Client';
import { environment } from '../../environments/environment.development';
import { APIResponseModel } from '../Model/Interface/role';

@Injectable({
  providedIn: 'root',
})
export class ClientService {
  constructor(private http: HttpClient) {}
  getAllClients(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(
      environment.API_URL + 'GetAllClients'
    );
  }
  addUpdate(obj: Client): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(
      environment.API_URL + 'AddUpdateClient',
      obj
    );
  }
  deleteClientById(id: number): Observable<APIResponseModel> {
    return this.http.delete<APIResponseModel>(
      environment.API_URL + 'DeleteClientByClientId?clientId=' + id
    );
  }
  getAllEmployees(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(
      environment.API_URL + 'GetAllEmployee'
    );
  }

  addUpdateClientProject(obj: Client): Observable<APIResponseModel> {
    return this.http.post<APIResponseModel>(
      environment.API_URL + 'AddUpdateClientProject',
      obj
    );
  }

  getAllClientProjects(): Observable<APIResponseModel> {
    return this.http.get<APIResponseModel>(
      environment.API_URL + 'GetAllClientProjects'
    );
  }
}
