import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import { AuthService } from 'src/app/services/auth.service';
import { BookmarkService } from 'src/app/services/bookmark.service';
import { PostService } from 'src/app/services/post.service';

@Component({
  selector: 'app-bookmark',
  templateUrl: './bookmark.component.html',
  styleUrls: ['./bookmark.component.css']
})
export class BookmarkComponent implements OnInit {

  postForm = new FormGroup({
    text: new FormControl(''),
    imageUrl: new FormControl('')
  })

  bookmarks: Post[] = [];

  constructor(private bookmarkService: BookmarkService, private authService: AuthService) { }

  ngOnInit(): void { 
    
    this.bookmarkService.fetchAllBookmarks(this.authService.currentUser).subscribe(
    (response) => {
      this.bookmarks = response
    }

    
  )
  }

}
