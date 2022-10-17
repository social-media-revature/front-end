import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-post-feed-page',
  templateUrl: './post-feed-page.component.html',
  styleUrls: ['./post-feed-page.component.css']
})

export class PostFeedPageComponent implements OnInit {

  postForm = new FormGroup({
    text: new FormControl(''),
    imageUrl: new FormControl('')
  })

  posts: Post[] = [];
  createPost:boolean = false;

  constructor(private postService: PostService, private authService: AuthService,
    private router : Router) { }

  ngOnInit(): void {
    this.postService.getAllPosts().subscribe(
      (response) => {
        this.posts = response
      }
    )
  }

  toggleCreatePost = () => {
    this.createPost = !this.createPost
  }

  submitPost = (e: any) => {
    e.preventDefault();
    this.postService.upsertPost(new Post(0, this.postForm.value.text || "", this.postForm.value.imageUrl || "", this.authService.currentUser, []))
      .subscribe(
        (response) => {
          this.posts = [response, ...this.posts]
          this.toggleCreatePost();
          
        }
          
      )
  }

  /*goToProfile(user: User): void{
    let userId : any = user.id;
    sessionStorage.setItem("profileSelectUserID",userId);
    sessionStorage.setItem("profileSelectFirstName",user.firstName);
    sessionStorage.setItem("profileSelectLastName",user.lastName);
    this.router.navigate([`get-profile/${user.id}`]);
  }

  getUser(): User{
    return this.authService.currentUser;
  }
  
  Commented this out for code merge. in the html file to check to access a profile it looks like this:
  <div>
    <button mat-raised-button color="primary" (click)="goToProfile(getUser())">GO TO PROFILE</button>
  </div>
  */

  
}
