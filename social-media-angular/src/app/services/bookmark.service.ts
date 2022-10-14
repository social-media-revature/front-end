import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Post from '../models/Post';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class BookmarkService {

  bookmarkUrl: String = `${environment.baseUrl}/bookmark`

  constructor(private http: HttpClient) { }

  fetchAllBookmarks(user: User){
    
    return this.http.put<Post[]>(`${this.bookmarkUrl}`, user);

  }

  
  bookmarkThis(post:Post, user:User): Observable<void> {

    console.log(post,user);

    const payload = {userId: user.id, postId: post.id};

    console.log(payload);

    return this.http.post<any>(`${this.bookmarkUrl}`, payload ,{headers: environment.headers, withCredentials: environment.withCredentials});


  }

  unBookmarkThis(post:Post, user:User): Observable<void>{

    console.log(post,user);

    const payload = {userId: user.id, postId: post.id};

    console.log(payload);

    return this.http.put<any>(`${this.bookmarkUrl}/delete`, payload);
  }

}
