import { Component, Input, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { LikeService } from 'src/app/services/like.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-post',
  templateUrl: './post.component.html',
  styleUrls: ['./post.component.css']
})
export class PostComponent implements OnInit {

  commentForm = new FormGroup({
    text: new FormControl(''),
  })

  @Input('post') post: Post
  replyToPost: boolean = false

  bookmarked = false;
  liked = false;
  bookmarks: Post[] = JSON.parse(localStorage.getItem("bookmarks") || "");

  constructor(private postService: PostService, private authService: AuthService, private bookmarkService: BookmarkService, private likeService: LikeService) { }

  ngOnInit(): void {
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

    this.likeService.likeThis(post,this.authService.currentUser).subscribe((response) => {});

  }

  unLikeThisPost(post:Post):void{

    this.liked = false;

    this.likeService.unLikeThis(post, this.authService.currentUser).subscribe((response) =>{

     

    });

  }

  
  isItBookmarked(post:Post):boolean{

    console.log(this.bookmarks);
    console.log(post);

    if(this.bookmarks.findIndex(x => x == post) !== -1){
     
      this.bookmarked = true;

       }

   return this.bookmarks.findIndex(x => x == post) !== -1;
  
 }
}
