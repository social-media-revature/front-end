import { HttpClientModule } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';
import { Post } from '../models/Post.model';
import { GroupPost } from '../models/GroupPost.model';
import { User } from '../models/User.model';
import { GroupService } from '../services/group.service';
import { GroupComponent } from './group.component';
import { HttpClient } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';

fdescribe('GroupComponent', () => {
  let component: GroupComponent;
  let fixture: ComponentFixture<GroupComponent>;

  let mockGroupService: GroupService;
  let fakePosts: GroupPost[];
  let fakeMember: User;


  beforeEach(async () => {

    //mockGroupService = jasmine.createSpyObj('mockGroupService', {'getAllPosts': fakePosts,'addMember': fakeMember});

    await TestBed.configureTestingModule({
      declarations: [GroupComponent],
      providers: [HttpClient, GroupService],
      imports: [HttpClientModule, HttpClientTestingModule, RouterTestingModule]
    })
      .compileComponents();
      const fixture = TestBed.createComponent(GroupComponent);
      component = fixture.componentInstance;
      mockGroupService = TestBed.inject(GroupService);
      


    fakePosts = [
      {
        id: 10,
        groupID: 1,
        text: "string",
        imageUrl: "string",
        author: JSON.parse(sessionStorage.getItem("currentUser")!),
        comments: []
      },
      {
        id: 11,
        groupID: 1,
        text: "test",
        imageUrl: "test.jpeg",
        author: JSON.parse(sessionStorage.getItem("currentUser")!),
        comments: []
      }
    ]

    fakeMember = {
      id: 1,
      email: "string",
      firstName: "string",
      lastName: "string"
    }

  });




    it('should create', () => {
      expect(component).toBeTruthy();
    });


    it('should load all group posts', () => {
      component.group = {
        groupID: 1,
        adminID:1,
        groupName: "asdfa",
        groupDescription: "afdsa",
        groupImageUrl: "",
        groupMembers: []
      }
      spyOn(mockGroupService,'getAllPosts').and.returnValue(of(fakePosts));
      component.loadPosts();
      expect(component.posts.length).toEqual(fakePosts.length);
    });

    it('should add a member to the group', () => {
      component.group = {
        groupID: 1,
        adminID:1,
        groupName: "asdfa",
        groupDescription: "afdsa",
        groupImageUrl: "",
        groupMembers: []
      }
      component.currentUser = fakeMember;
      spyOn(mockGroupService,'addMember').and.returnValue(of(fakeMember));
      component.addMember();
      expect(component.group.groupMembers.length).toEqual(1);
    });






});