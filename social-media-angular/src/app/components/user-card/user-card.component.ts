import { Component, OnInit } from '@angular/core';
import User from 'src/app/models/User';
import UserWithPassword from 'src/app/models/UserWithPassword';
import { AuthService } from 'src/app/services/auth.service';
import { ProfileService } from 'src/app/services/profile.service';

@Component({
  selector: 'app-user-card',
  templateUrl: './user-card.component.html',
  styleUrls: ['./user-card.component.css']
})
export class UserCardComponent implements OnInit {

  user: User = {} as User;

  profileImageUrl : any = ""

  constructor(private authService: AuthService, private profileService : ProfileService) { }

  ngOnInit(): void {
    this.user = this.authService.currentUser

    this.profileService.getOneProfile(new UserWithPassword(this.authService.currentUser.id,"","","","")).subscribe((Response)=>{
      if(Response.imageUrl != ""){
        this.profileImageUrl = Response.imageUrl;
        document.getElementById("userCursor")?.setAttribute("style", `background-image: url(${Response.imageUrl})`);
      }
      else{
        this.profileImageUrl = "./assets/images/favicon.png";
        document.getElementById("userCursor")?.setAttribute("style", `background-image: url(./assets/images/favicon.png)`);
      }
    });
  }

}
