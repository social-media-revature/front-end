import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Post from 'src/app/models/Post';
import UserWithPassword from 'src/app/models/UserWithPassword';
import { AuthService } from 'src/app/services/auth.service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { LikeService } from 'src/app/services/like.service';
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

  bookmarked = false;

  liked = false;

  bookmarks: Post[] = [];

  likedPosts: Post[] = [];

  likes: number = 0;

  constructor(private postService: PostService, private authService: AuthService, private bookmarkService: BookmarkService,
              private likeService: LikeService, private router: Router, private profileService : ProfileService) { }

  ngOnInit(): void {

    this.bookmarkService.fetchAllBookmarks(this.authService.currentUser).subscribe(
      (response) => {
        this.bookmarks = response
        this.bookmarks.forEach((bPost)=>{
          if(bPost.id == this.post.id){
            this.bookmarked = true;
          }
        });
    
      }
    )

    this.likeService.fetchAllLikedPosts(this.authService.currentUser).subscribe(
      (response) => {
        this.likedPosts = response
        this.likedPosts.forEach((bLikedPost)=>{
          if(bLikedPost.id == this.post.id){
            this.liked = true;
          }
        })
        this.likeService.howManyLikes(this.post, this.authService.currentUser).subscribe((response) => {

          this.likes = response;

        }
      );
      } )
  //   }

  // ngOnInit(): void {
    this.profileService.getOneProfile(new UserWithPassword(this.post.author.id,"","","","")).subscribe((Response)=>{
      if(Response.imageUrl != ""){
        this.profileImageUrl = Response.imageUrl;
        document.getElementById("mouseCursor")?.setAttribute("style", `background-image: url(${Response.imageUrl})`);
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

  bookmarkThisPost(post:Post):void{

    this.bookmarked = true;

    this.bookmarkService.bookmarkThis(post,this.authService.currentUser).subscribe((response) => {});

  }

  unBookmarkThisPost(post:Post):void{

    this.bookmarked = false;

    this.bookmarkService.unBookmarkThis(post, this.authService.currentUser).subscribe((response) =>{

     

    });

  }

  likeThisPost(post:Post):void{

    this.liked = true;

    this.likeService.likeThis(post,this.authService.currentUser).subscribe((response) => {

      this.likes++;

    });

  }

  unLikeThisPost(post:Post):void{

    this.liked = false;

    this.likeService.unLikeThis(post, this.authService.currentUser).subscribe((response) =>{

      this.likes--;

    });

  }

  goToProfile(){
    this.router.navigate([`get-profile/${this.post.author.id}`]);
  }
}
