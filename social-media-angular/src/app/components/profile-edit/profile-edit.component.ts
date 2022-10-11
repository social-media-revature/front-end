import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute } from '@angular/router';
import User from 'src/app/models/User';
import UserWithPassword from 'src/app/models/UserWithPassword';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  profile: Profile = {
    id: 0,
    text: "",
    imageUrl: "",
    user: {
      id: 0,
      email: "",
      firstName: "",
      lastName: ""
    }

  }


  constructor(private profileService : ProfileService, private activatedRoute : ActivatedRoute,
    private router: Router) { }

  ngOnInit(): void {
    this.initializeProfile();
  }

  public initializeProfile(): void{
    let userID : any = this.activatedRoute.snapshot.paramMap.get("pid");

    let user : UserWithPassword = {
      id: userID,
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    }

    this.profileService.getOneProfile(user).subscribe((Response)=>{
      this.profile = Response;
    })
  }

  public updateProfile(): void{
    this.profileService.updateProfile(this.profile).subscribe((Response)=>{
      this.profile = Response;
      console.log(Response);
      this.router.navigate([`get-profile/${this.profile.user.id}`]);
    })
  }
}
