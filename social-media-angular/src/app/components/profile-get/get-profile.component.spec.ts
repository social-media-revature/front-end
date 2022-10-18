import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';
import { ActivatedRoute, Router } from '@angular/router';
import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { GetProfileComponent } from './get-profile.component';
import { AuthService } from 'src/app/services/auth.service';
import User from 'src/app/models/User';
import { RouterTestingModule } from '@angular/router/testing';
import { of } from 'rxjs';


describe('GetProfileComponent', () => {
  let component: GetProfileComponent;
  let fixture: ComponentFixture<GetProfileComponent>;
  let authService : AuthService;
  let service: ProfileService;
  let httpMock : HttpTestingController;
  let router : Router;
  let profile: Profile;
  let otherProfile: Profile;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ GetProfileComponent ],
      imports: [HttpClientTestingModule, RouterTestingModule],
      providers: [AuthService,ProfileService,HttpClient, HttpHandler  {
        provide: ActivatedRoute,
        useValue: {
            snapshot: {
                paramMap: {
                    get(): number {
                        return 1;
                    },
                },
            },
        },
    },]
    })
    .compileComponents();


    fixture = TestBed.createComponent(GetProfileComponent);
    httpMock = TestBed.inject(HttpTestingController);
    authService = TestBed.inject(AuthService);
    service = TestBed.inject(ProfileService);
    router = TestBed.inject(Router);
    authService.currentUser = {
      id : 1,
      email: "",
      firstName: "",
      lastName: ""
    }


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


    component = fixture.componentInstance;
    // fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should navigate when going to goToEditProfile',()=>{
    const pro = spyOn(router,"navigate");
    component.goToEditProfile();
    expect(pro).toHaveBeenCalledTimes(1);

  });

  it('should have isCurrentUser return true', ()=>{
    component.profile.user.id = 1;
    expect(component.isCurrentUser()).toBe(true);

  })

  it('should call createprofile if user doesnt have a profile but tries to load one',()=>{
    spyOn(service, 'getOneProfile').and.returnValue(of(otherProfile));
    otherProfile.id = -1;
    const check = spyOn(component,"createProfile");
    console.log("TESTING CALLING INITIALIZE")
    component.initializeProfile();
    
    expect(check).toHaveBeenCalledTimes(1);
  })

  it('should should have profile set since profile id wont be negative',()=>{
    spyOn(service, 'getOneProfile').and.returnValue(of(otherProfile));
    const check = spyOn(component,"createProfile");
    component.initializeProfile();
    
    expect(component.profile.id).toEqual(otherProfile.id);
  })
});
