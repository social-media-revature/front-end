import { ComponentFixture, TestBed } from '@angular/core/testing';
import { of } from 'rxjs';

import { AllGroupsComponent } from './all-groups.component';

import { GroupService } from '../services/group.service';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { RouterTestingModule } from '@angular/router/testing';
import { Group } from '../models/Group.model';
import { User } from '../models/User.model';
import { Router } from '@angular/router';


fdescribe('AllGroupsComponent', () => {
  let component: AllGroupsComponent;
  let fixture: ComponentFixture<AllGroupsComponent>;
  let mockGroupService: GroupService;
  let fakeGroup: Group;
  let fakeUser: User;
  let router: Router;


  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AllGroupsComponent ],
      providers: [ GroupService, HttpClient ],
      imports: [ HttpClientTestingModule, HttpClientModule, RouterTestingModule ]
    })
    .compileComponents();
    mockGroupService = TestBed.inject(GroupService);
    router = TestBed.inject(Router);
    fakeUser = {
      id: 20,
      email: "string",
      firstName: "admin",
      lastName: "test"
  };
    fakeGroup = {
      groupID: 1,
      adminID: 20,
      groupName: "The Flying Oysters",
      groupDescription: "asl;kfjs",
      groupImageUrl: "",
      groupMembers: [fakeUser]
  };


    fixture = TestBed.createComponent(AllGroupsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  }); 

  it('should load all groups', () => {
    spyOn(mockGroupService,'getAllGroups').and.returnValue(of([fakeGroup]));
    component.loadGroups();
    expect(component.groups).toEqual([fakeGroup]);
  })

  it('should navigate to selected group', () => {
    const groupDetails = spyOn(router,"navigate");
    component.viewGroup(fakeGroup);
    expect(groupDetails).toHaveBeenCalledTimes(1);
  })


});



