import { Component, OnInit } from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {User} from '../../models/user';
import {UserService} from '../../services/user.service';
import {AlertService} from '../../services/alert.service';
import { first } from 'rxjs/operators';
import { FormControl, Validators } from '@angular/forms';
import { FormBuilder, FormGroup } from "@angular/forms";
const baseUrl = 'http://localhost:8080/';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./style.css'],
  providers: [UserService]
})
export class LoginComponent implements OnInit {
    loading = false;
    submitted = false;
    loginForm = {} as FormGroup;
    public title: string;
    public username : string;
    public password:string;
    public user: User;
    public status: string;
    public CurrentUser;
    public token;
  constructor(
        private viewportScroller: ViewportScroller,
        private formBuilder: FormBuilder,
        private route: ActivatedRoute,
        private router: Router,
        private userservice: UserService,
        private alertService: AlertService

    ) {
        this.title = 'Login';
        this.user = new User("", "", "", "");
        this.status = "";
        this.username = "";
        this.password= "";

    }
  ngOnInit() {
        this.loginForm = this.formBuilder.group({
            username: ['', Validators.required],
            password: ['', Validators.required]
        });
  }

      get f() { return this.loginForm.controls; }


    onSubmit() {
        this.submitted = true;

        // stop here if form is invalid
        if (this.loginForm.invalid) {
            return;
        }

        this.loading = true;
        this.username = this.f['username'].value;
        this.password= this.f['password'].value;
        return this.userservice.login(this.f['username'].value, this.f['password'].value)
            .subscribe(
                response => {
                this.router.navigate(['/']);
                this.alertService.success('Login successful !');
                this.CurrentUser = response.username;
                if (!this.CurrentUser || !this.CurrentUser.userId) {
                } else {
                    localStorage.setItem('CurrentUser', JSON.stringify(this.CurrentUser));
                    this.getToken();
                }},
        error => {
        this.alertService.error("Auth failed ! Either the account doesn't exist or you entered a wrong account");
        this.loading=false;
      })
    }

      getToken() {
        this.userservice.login(this.username, this.password).subscribe(
            response => {

                this.token = response.token;
                if (this.token.length <= 0) {
                    this.status = 'error';
                } else {
                    localStorage.setItem('token', JSON.stringify(this.token));
                }
            },
            error => {
                console.log(<any> error);
                var errorMessage = <any> error;
                if (errorMessage != null) {
                    this.status = 'error';
                }
            }
        );
    }

     public onClick(elementId: string): void { 
      this.viewportScroller.scrollToAnchor(elementId);
  }



    }




