import { ChangeDetectorRef, Component, ElementRef, Injectable, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import GroupPost from 'src/app/models/GroupPost';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { GroupService } from '../services/group.service';
import { Group } from '../models/Group.model';
import { Observable } from 'rxjs';
import { Router } from '@angular/router';
//import { GroupPost } from '../models/GroupPost.model';

@Component({
  selector: 'app-group',
  templateUrl: './group.component.html',
  styleUrls: ['./group.component.css']
})


export class GroupComponent implements OnInit {

  postForm = new FormGroup({
    text: new FormControl(''),
    imageUrl: new FormControl('')
  })

  posts: GroupPost[] = [];
  createPost:boolean = false;

  JSONgroup: any;
  group: Group;

  JSONuser: any;
  currentUser: any;
  memberStatus: boolean;

  constructor(private postService: PostService, private groupService: GroupService, private authService: AuthService,
              private router: Router
              ) { }

  ngOnInit(): void {
    this.JSONgroup = sessionStorage.getItem("clickedGroup");
    this.group = JSON.parse(this.JSONgroup);

    if(!this.JSONuser){
      this.JSONuser = sessionStorage.getItem("currentUser");
      this.currentUser = JSON.parse(this.JSONuser);
      this.memberStatus = this.isMember();
      this.loadPosts();
    }
  }

  loadGroup(): void{
    this.groupService.getAGroup(this.group.groupID).subscribe(
      (response) => {
        this.group = response
      }
    )
  }

  toggleCreatePost = () => {
    if(!this.JSONuser){
      this.router.navigate(['login']);
    }else if(!this.memberStatus){
      console.log("must be member");
    }else{
      this.createPost = !this.createPost
    }
  }

  toggleJoin = () => {
    this.memberStatus = !this.memberStatus;
  }

  loadPosts(): void {
    this.groupService.getAllPosts(this.group.groupID).subscribe((response) => {
      this.posts = response;}
    )
  }

  submitPost = (e: any) => {
    e.preventDefault();
    this.groupService.upsertPost(new GroupPost(0, this.group.groupID, this.postForm.value.text ||
                "", this.postForm.value.imageUrl || "", this.authService.currentUser, [])).subscribe(
        (response) => {
          this.posts = [response, ...this.posts]
          this.toggleCreatePost()
        }
      )
  }

  addMember(): void {
    this.groupService.addMember(this.currentUser, this.group.groupID).subscribe((response) => {
      this.group.groupMembers = [...this.group.groupMembers, response];
    })
    this.toggleJoin();
  }

  go2login(): void{
    this.router.navigate(['login']);
  }

  editGroup(): void{
    this.router.navigate(['edit-group']);
  }

  isAdmin(): boolean{
    return this.currentUser.id === this.group.adminID;
  }

  isMember(): boolean{
    for(let i=0; i<this.group.groupMembers.length; i++){
      if(this.currentUser.id === this.group.groupMembers[i].id){
        return true;
      }
    }return false;
  }

  deleteMember(): void{
    this.groupService.deleteMember(this.currentUser.id, this.group.groupID);
    this.toggleJoin();
  }


  
}
