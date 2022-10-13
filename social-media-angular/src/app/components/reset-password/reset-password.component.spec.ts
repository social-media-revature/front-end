import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { ResetPasswordComponent } from './reset-password.component';

describe('ResetPasswordComponent', () => {
  let component: ResetPasswordComponent;
  let fixture: ComponentFixture<ResetPasswordComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler],
      declarations: [ ResetPasswordComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(ResetPasswordComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('testing password whitespace error catching', () => {
    it('form should prevent whitespace entry and display error message', () => {    
      const fixture = TestBed.createComponent(ResetPasswordComponent)
      component = fixture.componentInstance;
      component.changePasswordForm.value.password = " ";  
      component.formSubmitted();
      expect(component.errorMessage)
        .withContext('whitespace error')
        .toBe('Password cannot contain spaces');

    });
  
  });

  describe('testing password blank catching', () => {
    it('form should prevent blank entry but not update errormessage display', () => {    
      const fixture = TestBed.createComponent(ResetPasswordComponent)
      component = fixture.componentInstance;
      component.changePasswordForm.value.password = "";  
      component.formSubmitted();
      expect(component.errorMessage)
        .withContext('blank error')
        .toBe('');

    });
  
  });


  describe('testing email blank catching', () => {
    it('form should prevent blank entry but not update errormessage display', () => {    
      const fixture = TestBed.createComponent(ResetPasswordComponent)
      component = fixture.componentInstance;
      component.changePasswordForm.value.email = "";  
      component.verifyEmail();
      expect(component.errorMessage)
        .withContext('blank error')
        .toBe('');

    });
  
  });

  describe('testing email whitespace error catching', () => {
    it('form should prevent whitespace entry and display error message', () => {    
      const fixture = TestBed.createComponent(ResetPasswordComponent)
      component = fixture.componentInstance;
      component.changePasswordForm.value.email = " ";  
      component.verifyEmail();
      expect(component.errorMessage)
        .withContext('whitespace error')
        .toBe('Email cannot contain spaces');

    });
  
  });

});
