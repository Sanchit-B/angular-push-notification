import { Component, OnInit } from '@angular/core';
import { SwPush, SwUpdate } from '@angular/service-worker';
import { PushNotificationService } from './push-notification.service';

const VAPID_PUBLIC = 'BO1KZMFibF9lx_rhdZSQBKIln9biXtJXiBKUHu0h8_5tLacsfy1ZgQhm-uWs6BUm_1biXLWW3yqazI26ulBPScI';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'angular-push-notifications';

  constructor(
    private swPush: SwPush,
    private swUpdate: SwUpdate,
    private psService: PushNotificationService
  ) {}

  ngOnInit() {
    if (this.swUpdate.isEnabled) {

      this.swUpdate.available.subscribe(() => {

          if(confirm("New version available. Load New Version?")) {

              window.location.reload();
          }
      });
    }

    if(this.swPush.isEnabled) {
      this.swPush.requestSubscription({
        serverPublicKey: VAPID_PUBLIC
      })
      .then((subscription: any) => {
        this.psService.sendSubscriptionToTheServer(subscription)
        .subscribe(
          (res) => {
            console.log('subscription succesful.');
          },
          (err) => {
            console.log('Response line: 39', err);
          }
        );
      })
      .catch(error => {
        console.log('Response line: 44', error);
      })
    }
  }

  sendNotification() {
    this.psService.sendNotification()
      .subscribe(
        (response) => {
          console.log('Response line: 46', response);
        },
        (error) => {
          console.log('Response line: 49', error);
        }
      );
  }

}
