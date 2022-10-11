import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/Profile';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import UserWithPassword from 'src/app/models/UserWithPassword';
import { Router } from '@angular/router';
@Component({
  selector: 'get-profile',
  templateUrl: './get-profile.component.html',
  styleUrls: ['./get-profile.component.css']
})
export class GetProfileComponent implements OnInit {

  profiles: Profile[] = []

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

  constructor(private profileService: ProfileService, private authService: AuthService,
    private router : Router) { }

  ngOnInit(): void {
    this.initializeProfile();

  }



  initializeProfile() {
    let user: UserWithPassword = {
      id: this.authService.currentUser.id,
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    }
    this.profileService.getOneProfile(user).subscribe((Response) => {
      console.log(Response)
      if (Response.id == -1) { //this means there isn't a profile! Will make one
        this.profile.user.id = this.authService.currentUser.id;
        this.profile.user.email = this.authService.currentUser.email;
        this.profile.user.firstName = this.authService.currentUser.firstName;
        this.profile.user.lastName = this.authService.currentUser.lastName;
        this.profileService.createProfile(this.profile).subscribe((Response) => {
          console.log(Response);
          this.profile = Response;
        })
      }
      else{
        this.profile = Response;
      }
    })
  }

  createProfile(): void {
    this.profile.user = this.authService.currentUser;
    this.profileService.createProfile(this.profile).subscribe((Response) => {
      console.log(Response);
      this.profile = Response;
      this.profile.text = "WOW I PUT IN A CHANGE AND IT WORKS";
      this.profileService.updateProfile(this.profile).subscribe((Response) => {
        console.log(Response);
      })
    })
  }

  goToEditProfile(){
    this.router.navigate([`profile-edit/${this.authService.currentUser.id}`]);
  }

}
