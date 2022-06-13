import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';
import { first } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from "@angular/forms";
const baseUrl = 'http://127.0.0.1:8080/';
import { ViewportScroller } from '@angular/common';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common'
@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: []
})
export class UserComponent implements OnInit {
  public CurrentUser;
  public user = this.userservice.getCurrentUser();
  public up:boolean=false;
  updateForm= {} as FormGroup;
  public updateData = new FormData();


  constructor( 
        public datepipe : DatePipe,
        private viewportScroller: ViewportScroller,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,      
        private userservice: UserService,
        private alertService: AlertService
) {
   }

  ngOnInit() {
    this.CurrentUser = this.userservice.getCurrentUser();
    this.CurrentUser.createdAt = this.datepipe.transform(this.CurrentUser.createdAt, 'dd MMMM  , HH:mm');
    this.CurrentUser.updatedAt = this.datepipe.transform(this.CurrentUser.updatedAt, 'dd MMMM  , HH:mm');
    
    this.updateForm = this.formBuilder.group({
      username: [''],
      email: ['']});


  }



  updateUser(user){
    const time = new Date();
    const email = this.updateForm.get('email')!.value;
    const username = this.updateForm.get('username')!.value;
    //console.log(user.userId,email,username);
    this.CurrentUser.email = email;
    this.CurrentUser.username = username;
    this.CurrentUser.updatedAt = this.datepipe.transform(time, 'dd MMMM  , HH:mm');
    this.userservice.userUpdate(user.userId,email,username)
    .subscribe(
     response =>  {
        localStorage.setItem('CurrentUser', JSON.stringify(this.CurrentUser));
        console.log(this.CurrentUser);
        this.alertService.success('Profil updated !');
        this.up=false;
        this.router.navigate(['user']);

    },
        error => {
        this.alertService.error(error);
        console.log(error);
    })
        

    
  }

  deleteUser(){
    this.userservice.delete(this.CurrentUser.userId)
    .subscribe(response => {
      this.userservice.logout();
      this.userservice.getCurrentUser();
      localStorage.removeItem('CurrentUser');
      this.alertService.success('User deleted !');
      this.router.navigate(['/']);
       window.location.reload();

    },
     error => {
        this.alertService.error(error);
        console.log(error);
    });
  }

}
