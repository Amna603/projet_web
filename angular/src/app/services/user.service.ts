import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {User} from '../models/user';
import { map } from 'rxjs/operators';
import {BehaviorSubject} from 'rxjs';

const baseUrl = 'http://127.0.0.1:8080/';


@Injectable()

export class UserService {
      public url: string;
      public CurrentUser;
      public token;
      

      private currentUserSubject = new BehaviorSubject<any>(null);
  constructor(public http: HttpClient) {
  this.url = baseUrl;
   }


  register(user): Observable<any> {
      let params = JSON.stringify(user);
      let headers = new HttpHeaders().set('Content-Type', 'application/json');

      return this.http.post(this.url + 'register', params, {headers: headers});
  }

    login(username, password) {
    console.log(username)
    let headers = new HttpHeaders().set('Content-Type', 'application/json');
    return this.http.post<any>(baseUrl+'login', { username, password}, {headers:headers})
            .pipe(map(user => {
                // login successful if there's a jwt token in the response
                if (user && user.token) {
                    // store user details and jwt token in local storage to keep user logged in between page refreshes
                    localStorage.setItem('CurrentUser', JSON.stringify(user));
                    this.currentUserSubject.next(user);
                }

                return user;
            }));
            
    }

    getCurrentUser() {
        let CurrentUser = JSON.parse(localStorage.getItem('CurrentUser') || '{}');
        if (CurrentUser.username != null) {
            this.CurrentUser = CurrentUser;
        } else {
            this.CurrentUser = null;
        }

        return this.CurrentUser;
    }

    getToken() {
        let token = localStorage.getItem('token');

        if (token != "undefined") {
            this.token = token;
        } else {
            this.token = null;
        }

        return this.token;
    }


    userUpdate(userId,email,username): Observable<any> {
        let params = {userId,email,username}
        console.log(params);


        return this.http.put(this.url + 'users' + userId, params);
    }

    getAll() {
        return this.http.get<User[]>(`/users`);
    }

    getUser(userId){
        let headers = new HttpHeaders()
            .set('Content-Type', 'application/json')
            //.set('Authorization', this.getToken());

        return this.http.get(baseUrl + 'users' + userId);
    }
    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('CurrentUser');
        this.currentUserSubject.next(null);
    }
    
    delete(userId) {
        return this.http.delete(baseUrl+'users'+ userId);
    }
}
