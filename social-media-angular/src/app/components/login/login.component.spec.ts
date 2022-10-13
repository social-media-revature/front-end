import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { LoginComponent } from './login.component';

describe('LoginComponent', () => {
  let component: LoginComponent;
  let fixture: ComponentFixture<LoginComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler],
      declarations: [ LoginComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(LoginComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
  
  describe('testing form blank catching', () => {
    it('form should prevent blank entry and update error message display', () => {    
      const fixture = TestBed.createComponent(LoginComponent)
      component = fixture.componentInstance;
      component.loginForm.value.email = "";
      component.loginForm.value.password = "";  
      component.onSubmit(component.loginForm);
      expect(component.errorMessage)
        .withContext('error message will update saying email/password is incorrect')
        .toBe('Email or Password is incorrect');

    });
  
  });

  describe('testing form whitespace catching', () => {
    it('form should prevent whitespace entry and update error message display', () => {    
      const fixture = TestBed.createComponent(LoginComponent)
      component = fixture.componentInstance;
      component.loginForm.value.email = " ";
      component.loginForm.value.password = " ";  
      component.onSubmit(component.loginForm);
      expect(component.errorMessage)
        .withContext('error message will update saying email/password is incorrect')
        .toBe('Email or Password is incorrect');

    });
  
  });


});
