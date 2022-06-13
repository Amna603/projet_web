import {Component, OnInit, Input} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {Publication} from '../../models/publication';
import {UserService} from '../../services/user.service';
import {PublicationService} from '../../services/publication.service';
import { DomSanitizer } from '@angular/platform-browser';
import { DatePipe } from '@angular/common'
import { first,mergeMap } from 'rxjs';
import {AlertService} from '../../services/alert.service';
import * as $ from 'jquery';
import { map } from 'rxjs/operators';

import { FormBuilder, FormGroup, Validators } from '@angular/forms';
const baseUrl = 'http://127.0.0.1:8080/';


import {HttpClient, HttpHeaders} from '@angular/common/http';

@Component({
  selector: 'app-publication',
  templateUrl: './publication.component.html',
  styleUrls: ['./publication.component.css'],
  providers: [UserService, PublicationService]

})
export class PublicationComponent implements OnInit {

    filterTerm!: string;
    uploadForm= {} as FormGroup;
    updateForm= {} as FormGroup;
    imageURL: string;
    public ID;
    public CurrentUser;
    public usercreatedAt;
    public email;
    public pub;
    public pubId;
    public mypublication;
    public PubUserId;
    public mypublications:any = [];;
    public token;
    file: File; // Variable to store file
    public publish;
    public up;
    public usertest;
    public title: string;
    public publications;
    public formData = new FormData();
    public updateData = new FormData();
   

  constructor(
      private alertService: AlertService,
      public datepipe : DatePipe,
      private route: ActivatedRoute,
      private router: Router,
      private userService: UserService,
      private publicationService: PublicationService,
      public formBuilder: FormBuilder,
      private http: HttpClient
        ) {

        this.title = 'Publication';
        this.CurrentUser = this.userService.getCurrentUser();
        this.token = this.userService.getToken();

   }

  ngOnInit(): void {
    this.mypublication = false
    this.uploadForm = this.formBuilder.group({
      file:[],
      message: ['',Validators.required]
    })
    this.updateForm = this.formBuilder.group({
      message: ['',Validators.required]

    })
    this.getPublications();
    this.CurrentUser = this.userService.getCurrentUser()
    //console.log(this.CurrentUser)
    this.getMyPublications();
     
  }

showPreview(event){
    this.file = event.target.files[0];//
    const reader = new FileReader();
    reader.onload = () => {
      this.imageURL = reader.result as string;
    }
    reader.readAsDataURL(this.file)
    return this.file
  }

submit(){

      this.formData.append('image', this.file,this.file.name);
      this.formData.append('message', this.uploadForm.get('message')!.value);
      this.formData.append('userId', this.CurrentUser.userId);
      this.publicationService.addPublication(this.formData)
      .subscribe(response => {
          console.log(response)
          this.alertService.success('Publication submited !');
          this.getPublications();
          this.publish=false;
    },
        error => {
        this.alertService.error(error);
    });

  }

getPublications()
{
  this.publicationService.getPublications().pipe().subscribe(
    response => {
      let filterTerm!: string;
      this.publications = response.reverse();
      //console.log(this.publications); //to get latest publications
      for(let i=0; i < this.publications.length; i++)
      {          
      this.publications[i].createdAt = this.datepipe.transform(this.publications[i].createdAt, 'dd MMMM  , HH:mm');
      this.publications[i].updatedAt = this.datepipe.transform(this.publications[i].updatedAt, 'dd MMMM  , HH:mm');
      this.publications[i].user.createdAt = this.datepipe.transform(this.publications[i].user.createdAt, 'dd MMMM  , HH:mm');
   
    }
}

    );


}


getMyPublications(){
  
  this.publicationService.getPublications().pipe().subscribe(
    response => {
       this.pub = response.reverse();

       for(let i=0; i < this.pub.length; i++)
       { 
        this.pub[i].updatedAt = this.datepipe.transform(this.pub[i].updatedAt, 'dd MMMM  , HH:mm');
        this.CurrentUser= this.userService.getCurrentUser();
       if(this.CurrentUser.userId==this.pub[i].userId)     
        {  
          
          this.mypublications.push(this.pub[i]);

        } 
      }
    });
}
updateButton()
{
  this.mypublications=false;
  
}



update(publication){
  const message = this.updateForm.get('message')!.value;
  this.publicationService.updatePublication(publication.id,message)
  .pipe(first()).subscribe({ 
    next:() =>  {
      this.up = false;
      this.getPublications();
      this.alertService.success('Publication updated !');

    },
        error:error => {
        this.alertService.error(error);
        console.log(error);
    }})
        this.router.navigate(['publication']);

}
deletePublication(publication)
{
  this.publicationService.deletePublication(publication)
  .subscribe(response => {
    this.alertService.success('Publication deleted !');
    this.router.navigate(['publication']);
    this.getPublications();
    window.location.reload();

  },
    error => {
        this.alertService.error(error);
    });
}



displayPublish(){
    if(this.publish == true)
    {
      this.publish = false
    }
    else {
      this.publish = true;
    }
    
} 

}