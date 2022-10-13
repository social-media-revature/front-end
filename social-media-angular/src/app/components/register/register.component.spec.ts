import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RouterTestingModule } from '@angular/router/testing';

import { RegisterComponent } from './register.component';

describe('RegisterComponent', () => {
  let component: RegisterComponent;
  let fixture: ComponentFixture<RegisterComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [RouterTestingModule],
      providers: [HttpClient, HttpHandler],
      declarations: [ RegisterComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(RegisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });


  describe('testing password whitespace error catching', () => {
    it('form should prevent whitespace entry and display error message', () => {    
      const fixture = TestBed.createComponent(RegisterComponent)
      component = fixture.componentInstance;
      component.registerForm.value.email = " ";  
      component.registerForm.value.password = " ";  
      component.registerForm.value.firstName = "John";  
      component.registerForm.value.lastName = "Smith";  
      component.onSubmit(component.registerForm);
      expect(component.errorMessage)
        .withContext('whitespace error')
        .toBe('Email and Password cannot contain spaces');

    });
  
  });

  describe('testing form blank catching', () => {
    it('form should prevent blank entry but not update error message display', () => {    
      const fixture = TestBed.createComponent(RegisterComponent)
      component = fixture.componentInstance;
      component.registerForm.value.password = "";  
      component.onSubmit(component.registerForm);
      expect(component.errorMessage)
        .withContext('blank error')
        .toBe('');

    });
  
  });

  describe('testing name start with blank catching', () => {
    it('form should prevent name submission starting with blank and display error message', () => {    
      const fixture = TestBed.createComponent(RegisterComponent)
      component = fixture.componentInstance;
      component = fixture.componentInstance;
      component.registerForm.value.email = "example@example.com";  
      component.registerForm.value.password = "example";  
      component.registerForm.value.firstName = " John";  
      component.registerForm.value.lastName = " Smith";
      component.onSubmit(component.registerForm);
      expect(component.errorMessage)
        .withContext('names " John" and " Smith" begin with white space')
        .toBe('Names cannot begin with a space');

    });
  
  });
});
