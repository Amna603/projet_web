import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {Publication} from '../models/publication';
import { map } from 'rxjs/operators';


const baseUrl = 'http://127.0.0.1:8080/';

@Injectable()
export class PublicationService {


    constructor(private http: HttpClient) {

    }

    addPublication(formData): Observable<any> {
        return this.http.post(baseUrl + 'posts',formData)
        
    }

    updatePublication(postId,message): Observable<any> {
        return this.http.put<any>(baseUrl + 'posts'+ postId,{postId,message})
        
    }


    getPublications(): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       
        return this.http.get(baseUrl + 'posts',{headers:headers});

    }

    getPublicationPost(token, postId): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')
                                       .set('Authorization', token);

        return this.http.get(baseUrl + 'posts' + postId + '/', {headers: headers});
    }

    deletePublication(id): Observable<any> {
        let headers = new HttpHeaders().set('Content-Type', 'application/json')

        return this.http.delete(baseUrl + 'posts' + id, {headers: headers});
    }
}
