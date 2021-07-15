import { HttpClient } from '@angular/common/http';
import { environment } from './../../environments/environment';
import { Injectable } from '@angular/core';
import { User } from '../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AdminService {
  baseUrl = environment.apiUrl;

  constructor(private httpClient: HttpClient) { }

  getUsersWithRoles() {
    //Partial<User[]> we are only getting part of the user properties
    return this.httpClient.get<Partial<User[]>>(this.baseUrl + 'admin/users-with-roles');
  }

  updateUserRoles(username: string, roles: string[]) {
    return this.httpClient.post(this.baseUrl + 'admin/edit-roles/' + username + '?roles=' + roles, {});
  }
}
