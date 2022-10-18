import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FormsModule } from '@angular/forms';
import { RouterTestingModule } from '@angular/router/testing';

import { ProfileEditComponent } from './profile-edit.component';
import { ActivatedRoute, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { Profile } from 'src/app/models/Profile';
import { ProfileService } from 'src/app/services/profile.service';
import { of } from 'rxjs';
describe('ProfileEditComponent', () => {
  let component: ProfileEditComponent;
  let fixture: ComponentFixture<ProfileEditComponent>;
  let httpMock : HttpTestingController;
  let profile: Profile;
  let otherProfile: Profile;
  let profileService : ProfileService;
  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ProfileEditComponent ],
      imports: [HttpClientTestingModule, FormsModule, RouterTestingModule],
      providers: [ProfileService,HttpClient, HttpHandler,{
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
    httpMock = TestBed.inject(HttpTestingController);
    fixture = TestBed.createComponent(ProfileEditComponent);
    component = fixture.componentInstance;
    profileService = TestBed.inject(ProfileService);
    fixture.detectChanges();

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

  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have profile when initializeProfile is called',()=>{
    spyOn(profileService, 'getOneProfile').and.returnValue(of(otherProfile));
    component.initializeProfile();
    expect(component.profile.id).toEqual(otherProfile.id);
  })

  it('should update profile when updateProfile is called',()=>{
    spyOn(profileService, 'updateProfile').and.returnValue(of(otherProfile));
    component.updateProfile();
    expect(component.profile.id).toEqual(otherProfile.id);
  })
});