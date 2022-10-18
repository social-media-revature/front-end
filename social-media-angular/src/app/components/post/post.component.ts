import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Post from 'src/app/models/Post';
import UserWithPassword from 'src/app/models/UserWithPassword';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  commentForm = new FormGroup({
    text: new FormControl(''),
  })

  profileImageUrl : any = ""

  @Input('post') post: Post
  replyToPost: boolean = false

  constructor(private postService: PostService, private authService: AuthService, private router: Router, private profileService : ProfileService) { }

  ngOnInit(): void {
    console.log("author is: " + this.post.author.id);
    this.profileService.getOneProfile(new UserWithPassword(this.post.author.id,"","","","")).subscribe((Response)=>{
      console.log("this is after getone profile, id is: " + Response.user.id);
      if(Response.imageUrl != ""){
        this.profileImageUrl = Response.imageUrl;
        document.getElementById("mouseCursor")?.setAttribute("style", `background-image: url(${Response.imageUrl})`);
        console.log("Actually called the init in post!");
      }
      else{
        this.profileImageUrl = "./assets/images/favicon.png";
        document.getElementById("mouseCursor")?.setAttribute("style", `background-image: url(./assets/images/favicon.png)`);
        
        
      }
    });

    
  }

  toggleReplyToPost = () => {
    this.replyToPost = !this.replyToPost
  }

  submitReply = (e: any) => {
    e.preventDefault()
    let newComment = new Post(0, this.commentForm.value.text || "", "", this.authService.currentUser, [])
    this.postService.upsertPost({...this.post, comments: [...this.post.comments, newComment]})
      .subscribe(
        (response) => {
          this.post = response
          this.toggleReplyToPost()
        }
      )
  }

  goToProfile(){
    this.router.navigate([`get-profile/${this.post.author.id}`]);
  }
}
