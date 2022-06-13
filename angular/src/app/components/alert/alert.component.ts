import { Component, OnInit , OnDestroy} from '@angular/core';
import { Subscription } from 'rxjs';
import {AlertService} from '../../services/alert.service';
import {timer} from 'rxjs';
import * as $ from 'jquery';
declare var angular: any;
@Component({ selector: 'app-alert', templateUrl: 'alert.component.html' ,
    styleUrls: ['alert.component.css']})
export class AlertComponent implements OnInit, OnDestroy {
    public isVisible: boolean = false;
    private subscription: Subscription;
    message: any;

    constructor(private alertService: AlertService) { }

    ngOnInit() {
        this.subscription = this.alertService.getAlert()
            .subscribe(message => {

                switch (message && message.type) {
                    case 'success':
                        this.isVisible = true;
                        setTimeout(()=> this.isVisible = false,50000)
                        console.log(message.text);
                        message.cssClass = 'alert alert-success';
                        break;
                    case 'error':
                        message.cssClass = 'alert alert-danger';
                        break;
                }

                this.message = message;
            });
    }
    /*
  showAlert() : void {
    if (this.isVisible) { 
      return;
    } 
    this.isVisible = true;
    setTimeout(()=> this.isVisible = false,2500)
  }*/

    ngOnDestroy() {
        this.alertService.clear();
        this.message=null;
        this.subscription.unsubscribe();
    }
}
