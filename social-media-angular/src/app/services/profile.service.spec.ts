import { HttpClientModule } from '@angular/common/http';
import { TestBed } from '@angular/core/testing';
import { ProfileService } from './profile.service';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { Profile } from '../models/Profile';
import UserWithPassword from '../models/UserWithPassword';

describe('ProfileService', () => {
  let service: ProfileService;
  let httpMock : HttpTestingController;
  let profile: Profile;
  let otherProfile: Profile;
  let profiles: Profile[];

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule,HttpClientModule],
      providers: [ProfileService]
    });
    service = TestBed.inject(ProfileService);
    httpMock = TestBed.inject(HttpTestingController);


    profile = {
      id: 1,
      text: "profile",
      imageUrl: "profile",
      displayEmail: true,
      birthday: "",
      displayBirthday: true,
      displayAge: true,
      user: {
        id: 1,
        email: "profile@aol.com",
        firstName: "profile",
        lastName: "profile"
      }
    }
  
    otherProfile = {
      id: 2,
      text: "otherProfile",
      imageUrl: "otherProfile",
      displayEmail: true,
      birthday: "",
      displayBirthday: true,
      displayAge: true,
      user: {
        id: 2,
        email: "otherProfile@aol.com",
        firstName: "otherProfile",
        lastName: "otherProfile"
      }
    }
  
    profiles = [profile,otherProfile];
  });

 


  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return 2 on getAllProfile', ()=>{
    //const pro = jasmine.createSpyObj('ProfileService',["getAllProfile()"]);
    const pro = jasmine.createSpyObj('ProfileService',["getAllProfile"]);
    
    pro.getAllProfile.and.returnValue(profiles);
    const result : number = 2;
    service.getAllProfile().subscribe((Response)=>{
      expect(Response.length).toBe(result);
    })
  });


  it('should return otherProfiles id', ()=>{
    //const pro = jasmine.createSpyObj('ProfileService',["getAllProfile()"]);
    let user: UserWithPassword = {
      id: 1,
      email: "",
      password: "",
      firstName: "",
      lastName: ""
    }

    const pro = jasmine.createSpyObj('ProfileService',["getOneProfile"]);
    
    pro.getOneProfile.and.returnValue(otherProfile);
    service.getOneProfile(user).subscribe((Response)=>{
      expect(Response.user.id).toBe(otherProfile.user.id);
    })
  });


  it('should return createProfile correctly', ()=>{
    //const pro = jasmine.createSpyObj('ProfileService',["getAllProfile()"]);
    const pro = jasmine.createSpyObj('ProfileService',["createProfile"]);
    
    pro.createProfile.and.returnValue(otherProfile);
    service.createProfile(profile).subscribe((Response)=>{
      expect(Response.id).toBe(otherProfile.id);
    })
  });

  it('should return updateProfile correctly', ()=>{
    //const pro = jasmine.createSpyObj('ProfileService',["getAllProfile()"]);
    const pro = jasmine.createSpyObj('ProfileService',["updateProfile"]);
    
    pro.updateProfile.and.returnValue(otherProfile);
    service.createProfile(profile).subscribe((Response)=>{
      expect(Response.id).toBe(otherProfile.id);
    })
  });

});
