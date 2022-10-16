import { HttpClient } from "@angular/common/http";
import { Observable } from "rxjs";
import { Group } from "../models/Group.model";
import { Post } from "../models/Post.model";
import { PostService } from "./post.service";
import { Injectable } from '@angular/core';
import { environment } from "src/environments/environment";
import GroupPost from "../models/GroupPost";
import { User } from "../models/User.model";

@Injectable({
    providedIn: 'root'
  })
export class GroupService{

    groupUrl: string = `${environment.baseUrl}/groups/`;
    postsUrl: string = `${environment.baseUrl}/group-posts/`;
    groups: Group[] = [];

    constructor(private httpClient: HttpClient){}

    createGroup(newGroup: Group): Observable<Group>{
        return this.httpClient.post<Group>(this.groupUrl, newGroup);
    }

    getAllGroups(): Observable<Group[]>{
        return this.httpClient.get<Group[]>(this.groupUrl)
    }

    getAGroup(groupID: number): Observable<Group> {
        return this.httpClient.get<Group>(this.groupUrl + "group/" + groupID)
    }

    getAllPosts(groupID: number): Observable<GroupPost[]>{
        return this.httpClient.get<GroupPost[]>(this.postsUrl + "?groupID=" + groupID);
    }
    
    upsertPost(post: GroupPost): Observable<GroupPost> {
        return this.httpClient.post<GroupPost>(this.postsUrl, post, {headers: environment.headers, withCredentials: environment.withCredentials})
    }

    addMember(user: User, groupID: number): Observable<User> {
        return this.httpClient.post<User>(this.groupUrl+"member/"+groupID, user);
    }

    deleteMember(userID: number, groupID: number): void {
        this.httpClient.delete(this.groupUrl+groupID+"/"+userID);
    }


    editGroup(groupID: number): void{
        this.httpClient.put<Group>(this.groupUrl, groupID);
    }

}