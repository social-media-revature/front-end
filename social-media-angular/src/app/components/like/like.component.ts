import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { LikeService } from 'src/app/services/like.service';

@Component({
  selector: 'app-like',
  templateUrl: './like.component.html',
  styleUrls: ['./like.component.css']
})
export class LikeComponent implements OnInit {

  postForm = new FormGroup({
    text: new FormControl(''),
    imageUrl: new FormControl('')
  })

  likedPosts: Post[] = [];
  likes: number = 0;

  constructor(private likeService: LikeService, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

     
    this.likeService.fetchAllLikedPosts(this.authService.currentUser).subscribe(
      (response) => {
        this.likedPosts = response
      }
  
      
    )
  }

  unLikeThisPost(post:Post):void{

    this.likeService.unLikeThis(post, this.authService.currentUser).subscribe((response) =>{

      this.likeService.fetchAllLikedPosts(this.authService.currentUser).subscribe(
        (response) => {
          this.likedPosts = response;
          this.router.navigate(['like']);
        }
      )

    });

  }

  countTotalLikes(post:Post):void{

    console.log("Hello");

    this.likeService.howManyLikes(post, this.authService.currentUser).subscribe((response) => {

      console.log("Man");
      this.likes = response;
      console.log(response);



    })
    
    

  }

  

}
