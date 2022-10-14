import { Component, OnInit } from '@angular/core';
import { GroupService } from '../services/group.service';
import { Group } from '../models/Group.model';
import { User } from '../models/User.model';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-all-groups',
  templateUrl: './all-groups.component.html',
  styleUrls: ['./all-groups.component.css']
})
export class AllGroupsComponent implements OnInit {

  baseUrl: string = "/groups/";
  showCreateGroupForm: boolean = false;
  groups: Group[] = [];

  currentUserJSON: any;
  currentUser: User;
  newGroup: Group;

  constructor(private groupService: GroupService,
              private authService: AuthService,
              private router: Router,          
    ) { }

  ngOnInit(): void {
    this.currentUserJSON = sessionStorage.getItem("currentUser");
    this.currentUser = JSON.parse(this.currentUserJSON);
    this.loadGroups();
    this.newGroup = {
      groupID: 0,
      adminID: null,
      groupName: "",
      groupDescription: "",
      groupMembers: []
  }
  }

  loadGroups(): void{
    this.groupService.getAllGroups().subscribe((response) => {
      this.groups = response;
    })
  }

  toggleGroupForm(): void{
    this.showCreateGroupForm = !this.showCreateGroupForm;
  }

  createGroup(): void{
    this.newGroup.adminID = this.currentUser.id;
    this.newGroup.groupMembers = [this.currentUser];
    this.groupService.createGroup(this.newGroup).subscribe((response) =>{
      console.log(response);
    })
    this.loadGroups();
    this.showCreateGroupForm = false;
}

viewGroup(clickedGroup: Group): void{
  sessionStorage.setItem("clickedGroup", JSON.stringify(clickedGroup));
  this.router.navigate(['app-group']);
}



}
