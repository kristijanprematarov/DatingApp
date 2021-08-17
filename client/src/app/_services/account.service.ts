import { PresenceService } from './presence.service';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ReplaySubject } from 'rxjs';
import { map } from 'rxjs/operators';
import { environment } from 'src/environments/environment';

import { User } from './../_models/user';

@Injectable({
  providedIn: 'root'
})
export class AccountService {
  baseUrl = environment.apiUrl;
  private currentUserSource = new ReplaySubject<User>(1);
  //1 => how many users .. either null or the current user object a.k.a => 1
  currentUser$ = this.currentUserSource.asObservable();

  constructor(private httpClient: HttpClient, private presenceService: PresenceService) { }

  login(model: any) {
    return this.httpClient.post(this.baseUrl + 'account/login', model)
      .pipe(
        map((response: User) => {
          const user = response;
          if (user) {
            this.setCurrentUser(user);
            this.presenceService.createHubConnection(user);
          }
        })
      );
  }

  register(model: any) {
    return this.httpClient.post(this.baseUrl + 'account/register', model)
      .pipe(
        map((user: User) => {
          if (user) {
            this.setCurrentUser(user);
            this.presenceService.createHubConnection(user);
          }
        })
      )
  }

  setCurrentUser(user: User) {
    user.roles = [];
    //inside the payload part of the token we have the "role" property
    const roles = this.getDecodedToken(user.token).role;
    //user can have one role => string .... or multiple => []
    Array.isArray(roles) ? user.roles = roles : user.roles.push(roles);
    localStorage.setItem('user', JSON.stringify(user));
    this.currentUserSource.next(user);
    //with next we set the next value inside the observable
  }

  logout() {
    localStorage.removeItem('user');
    this.currentUserSource.next(null);
    this.presenceService.stopHubConnection();
  }

  getDecodedToken(token) {
    //token === string
    //0 - Header, 1 - Payload(this is what we want), 2 - Signature 
    return JSON.parse(atob(token.split('.')[1]));
  }
}
