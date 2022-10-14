import { ChangeDetectorRef, Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import Post from 'src/app/models/Post';
import User from 'src/app/models/User';
import GroupPost from 'src/app/models/GroupPost';
import { AuthService } from 'src/app/services/auth.service';
import { PostService } from 'src/app/services/post.service';
import { GroupService } from '../services/group.service';
import { Group } from '../models/Group.model';
import { Observable } from 'rxjs';
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

  posts: Post[] = [];
  createPost:boolean = false;

  JSONgroup: any;
  group: any;

  JSONuser: any;
  currentUser: any;

  constructor(private postService: PostService, private groupService: GroupService, private authService: AuthService) { }

  ngOnInit(): void {
    this.JSONgroup = sessionStorage.getItem("clickedGroup");
    this.group = JSON.parse(this.JSONgroup);

    this.JSONuser = sessionStorage.getItem("currentUser");
    this.currentUser = JSON.parse(this.JSONuser);

    this.loadPosts();
  }

  loadGroup(): void{
    this.groupService.getAGroup(this.group.groupID).subscribe(
      (response) => {
        this.group = response
      }
    )
  }

  toggleCreatePost = () => {
    this.createPost = !this.createPost
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
  }



}
