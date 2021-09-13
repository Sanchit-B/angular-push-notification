import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PushNotificationService {

  serverUrl = 'http://localhost:3000';

  constructor(
    private http: HttpClient
  ) { }

  sendSubscriptionToTheServer(subcription: Subscription) {
    return this.http.post(this.serverUrl + '/subscription', subcription);
  }

  sendNotification() {
    return this.http.post(this.serverUrl + '/sendNotification', null);
  }
}
