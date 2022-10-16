import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from 'src/app/models/Group.model';
import { GroupService } from 'src/app/services/group.service';

@Component({
  selector: 'app-edit-group',
  templateUrl: './edit-group.component.html',
  styleUrls: ['./edit-group.component.css']
})
export class EditGroupComponent implements OnInit {


  JSONgroup: string;
  group: Group;
  

  constructor(private router: Router,
              private groupService: GroupService
  ) { }

  ngOnInit(): void {
    this.JSONgroup = sessionStorage.getItem("clickedGroup")!;
    this.group = JSON.parse(this.JSONgroup);
  }

  editGroup(): void{
    this.groupService.editGroup(this.group.groupID);
  }





}
