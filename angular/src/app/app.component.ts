import {Component, OnInit, DoCheck} from '@angular/core';
import {Router, ActivatedRoute, Params} from '@angular/router';
import {UserService} from './services/user.service';
import {PublicationService} from './services/publication.service';
import { ViewportScroller } from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css',
  '../../node_modules/bootstrap/dist/css/bootstrap.min.css'],
  providers: [UserService,PublicationService]

})
export class AppComponent  implements OnInit, DoCheck {
  title : string;
  public CurrentUser;
  public Publications;
  public url: string;

  constructor(
    private viewportScroller: ViewportScroller,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService,
    private publicationservice: PublicationService,
  ) {
    this.title = 'Geever';
    this.url = 'http://localhost:8080/';
  }

  ngOnInit() {

    //this.Publications = this.publicationservice.getPublication();
    this.CurrentUser = this.userService.getCurrentUser();
  }

  ngDoCheck() {
    //this.Publications = this.publicationservice.getPublication();
    this.CurrentUser = this.userService.getCurrentUser();
  }

  logout() {
    localStorage.clear();
    this.CurrentUser = null;
    this.router.navigate(['/']);
  }

 public onClick(elementId: string): void { 
      this.viewportScroller.scrollToAnchor(elementId);
  }
}
