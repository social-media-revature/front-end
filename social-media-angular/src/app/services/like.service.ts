import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { count, Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import Post from '../models/Post';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class LikeService {
  likeUrl: String = `${environment.baseUrl}/like`

  constructor(private http: HttpClient) { }

  fetchAllLikedPosts(user: User){
    
    return this.http.put<Post[]>(`${this.likeUrl}`, user);

  }

  
  likeThis(post:Post, user:User): Observable<void> {

    console.log(post,user);

    const payload = {userId: user.id, postId: post.id, authorId:post.author.id};

    console.log(payload);

    return this.http.post<any>(`${this.likeUrl}`, payload ,{headers: environment.headers, withCredentials: environment.withCredentials});


  }

  unLikeThis(post:Post, user:User): Observable<void>{

    console.log(post,user);

    const payload = {userId: user.id, postId: post.id};

    console.log(payload);

    return this.http.put<any>(`${this.likeUrl}/delete`, payload);
  }

  howManyLikes(post:Post, user:User){

    const payload = {userId: user.id, postId: post.id};

    return this.http.put<number>(`${this.likeUrl}/count`, payload);

  }
}
