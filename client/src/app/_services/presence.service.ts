import { Router } from '@angular/router';
import { User } from './../_models/user';
import { ToastrService } from 'ngx-toastr';
import { environment } from 'src/environments/environment';
import { Injectable } from '@angular/core';
import { HubConnection, HubConnectionBuilder } from '@microsoft/signalr';
import { BehaviorSubject } from 'rxjs';
import { take } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class PresenceService {
  hubUrl = environment.hubUrl;

  private hubConnection: HubConnection;

  //a subject is a generic observable
  private onlineUsersSource = new BehaviorSubject<string[]>([]);
  onlineUsers$ = this.onlineUsersSource.asObservable();

  constructor(private toastr: ToastrService, private router: Router) { }

  //create Hub connection with authenticated user
  //we want to call this method when the application first starts if the user is logged in
  //or when a user logs in/registers
  createHubConnection(user: User) {
    this.hubConnection = new HubConnectionBuilder()
      .withUrl(this.hubUrl + 'presence', {
        //return access token
        accessTokenFactory: () => user.token
      })
      .withAutomaticReconnect() //if there is a network problem our client will automaticaly try to recconect to our hub
      .build()

    this.hubConnection
      .start()
      .catch(error => console.log(error));

    //we listen with the "on" method and clients are connected we are going to display the toast
    this.hubConnection.on('UserIsOnline', username => {
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
        this.onlineUsersSource.next([...usernames, username]);
      })
    })

    this.hubConnection.on('UserIsOffline', username => {
      this.onlineUsers$.pipe(take(1)).subscribe(usernames => {
        this.onlineUsersSource.next([...usernames.filter(x => x != username)]);
      })
    })

    this.hubConnection.on('GetOnlineUsers', (usernames: string[]) => {
      this.onlineUsersSource.next(usernames);
    })

    this.hubConnection.on('NewMessageReceived', ({ username, knownAs }) => {
      this.toastr.info(knownAs + ' has sent you a new message!')
        .onTap
        .pipe(take(1))
        //about me = 0, interests = 1, photos = 2, messages = 3
        .subscribe(() => this.router.navigateByUrl('/members/' + username + '?tab=3'));
    })
  }

  //we want to stop the connection when the user logs out
  stopHubConnection() {
    this.hubConnection.stop()
      .catch(error => console.log(error));
  }

}
