import { Component, OnInit } from '@angular/core';
import { ProfileService } from 'src/app/services/profile.service';
import { Profile } from 'src/app/models/Profile';
import User from 'src/app/models/User';
import { AuthService } from 'src/app/services/auth.service';
import UserWithPassword from 'src/app/models/UserWithPassword';
import { Router } from '@angular/router';
import { ActivatedRoute } from '@angular/router';
@Component({
  selector: 'get-profile',
  templateUrl: './get-profile.component.html',
  styleUrls: ['./get-profile.component.css']
})
export class GetProfileComponent implements OnInit {

  private canShowProfile : boolean = true;

  profiles: Profile[] = []

  profile: Profile = {
    id: 0,
    text: "",
    imageUrl: "",
    displayEmail: true,
    birthday: "",
    displayBirthday: false,
    displayAge: false,
    user: {
      id: 0,
      email: "",
      firstName: "",
      lastName: ""
    }

  }

  constructor(private profileService: ProfileService, private authService: AuthService,
    private router : Router, private activatedRoute : ActivatedRoute) { }

    public getCanShowProfile() : boolean{
      return this.canShowProfile;
    }

    public getCanShowEmail() : boolean{
      return this.profile.displayEmail;
    }

    public getCanShowBirthday() : boolean{
      return this.profile.displayBirthday;
    }

  ngOnInit(): void {
    this.initializeProfile();

  }



  initializeProfile() {

    let userId : any = this.activatedRoute.snapshot.paramMap.get("pid");
    console.log("userId at the moment is: " + userId);

    let user: UserWithPassword = {
      id: userId,
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    }
    this.profileService.getOneProfile(user).subscribe((Response) => {
      console.log(Response)
      if (Response.id == -1) { //this means there isn't a profile! Will make one or find out if its other user
        if(this.authService.isLoggedIn && this.authService.currentUser.id == userId) //means the person accessing the profile is themself so it will be made!
        this.createProfile();
        else  //it is a different person, so we are showing a different screen, since people can't make profiles for others
        this.canShowProfile = false;
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
    })
  }

  goToEditProfile(){
    this.router.navigate([`profile-edit/${this.authService.currentUser.id}`]);
  }

  isCurrentUser() : boolean{
    return (this.authService.isLoggedIn && this.profile.user.id == this.authService.currentUser.id);
  }

}
