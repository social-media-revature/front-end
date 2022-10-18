import { Component, OnInit } from '@angular/core';
import { Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute, ResolveEnd } from '@angular/router';
import User from 'src/app/models/User';
import UserWithPassword from 'src/app/models/UserWithPassword';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { FileStorageService } from 'src/app/services/file-storage.service';
import { environment } from 'src/environments/environment';
import FileInfo from 'src/app/models/FileInfo';
@Component({
  selector: 'app-profile-edit',
  templateUrl: './profile-edit.component.html',
  styleUrls: ['./profile-edit.component.css']
})
export class ProfileEditComponent implements OnInit {

  baseurl : string = environment.baseUrl;

  val : any;

  private showOtherImage: boolean = false;

  private isFileTooLarge: boolean = false;

  tempFileInfo : FileInfo = {
    name: "",
    url: ""
  };

  selectedFile : any;
  file : File;
  profile: Profile = {
    id: 0,
    text: "",
    imageUrl: "",
    displayEmail: true,
    birthday: "",
    displayBirthday: true,
    displayAge: true,
    user: {
      id: 0,
      email: "",
      firstName: "",
      lastName: ""
    }

  }


  constructor(private profileService : ProfileService, private activatedRoute : ActivatedRoute,
    private router: Router, private fileStorageService : FileStorageService) { }

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

  getDisplayBirthday() : boolean{return this.profile.displayBirthday;}

public getDisplayEmail() : boolean{
  return this.profile.displayEmail;
}

  getShowOtherImage() : boolean{
    return this.showOtherImage;
  }

  getIsFileTooLarge() : boolean{
    return this.isFileTooLarge;
  }

  

  public updateProfile(): void{
    this.profileService.updateProfile(this.profile).subscribe((Response)=>{
      this.profile = Response;
      console.log(Response);
      this.router.navigate([`get-profile/${this.profile.user.id}`]);
    })
  }

  goToProfile(): void{
    this.router.navigate([`get-profile/${this.profile.user.id}`]);
  }

  public updateProfileImage(): void{
    this.val = document.getElementById("image_url");
    //let testdata : FormData = new FormData();
    console.log(this.val.value);
    //testdata.append("file",this.val.value);
    if(this.val instanceof (File)){
      console.log("IT IS A FILE");
    }
    else{
      console.log("NONO NOT A FILE");
    }
    //testdata.append()
    //this.fileStorageService.uploadFile(this.val.value).subscribe((Response)=>{
      //console.log(Response);
    //});
    
  }

  public onFileSelected(event : Event){
    
    this.selectedFile = (<HTMLInputElement>event.target).files;
    console.log(this.selectedFile[0].size);
    if(this.selectedFile[0].size>500000){
      this.isFileTooLarge = true;
      this.selectedFile = null;
      (<HTMLInputElement>event.target).value = "";
      
      return;
    }
    this.isFileTooLarge = false;
    this.file = this.selectedFile[0];
    //console.log(this.selectedFile);
   
    this.fileStorageService.uploadFile(this.file).subscribe((Response)=>{
      console.log(Response);
      this.tempFileInfo.url = this.baseurl +"/files/" + Response.url;
      this.tempFileInfo.name = Response.name;
      this.showOtherImage = true;
    })
  }

  public onUpload() : void{
    this.fileStorageService.uploadFile(this.file).subscribe((Response)=>{
      console.log(Response);
      this.profile.imageUrl = this.baseurl +"/files/" + Response.url;
      this.profileService.updateProfile(this.profile).subscribe((Response)=>{
        console.log(Response);
        this.showOtherImage = false;
      });
    });
    
  }

  public onBirthdayChanged(): void{
    this.profileService.updateProfile(this.profile).subscribe((Response)=>{
      this.profile = Response;
    });
  }

  public toggleShowEmail() : void{
    this.profile.displayEmail = !this.profile.displayEmail;
    this.profileService.updateProfile(this.profile).subscribe((Response)=>{
      this.profile = Response;
    });
  }

  public toggleShowBirthday(): void{
    this.profile.displayBirthday = !this.profile.displayBirthday;
    this.profileService.updateProfile(this.profile).subscribe((Response)=>{
      this.profile = Response;
    });
  }

  /*public getFile() : void{
    this.fileStorageService.getFile(this.file.name).subscribe((Response)=>{
      console.log(Response);
    });
  }*/
}
