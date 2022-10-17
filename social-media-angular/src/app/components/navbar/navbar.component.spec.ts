import { HttpClient, HttpHandler } from '@angular/common/http';
import { ComponentFixture, TestBed } from '@angular/core/testing';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { By } from '@angular/platform-browser';
import { RouterTestingModule } from '@angular/router/testing';
import { AuthService } from 'src/app/services/auth.service';

import { NavbarComponent } from './navbar.component';

describe('NavbarComponent', () => {
  let component: NavbarComponent;
  let fixture: ComponentFixture<NavbarComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ RouterTestingModule ],
      providers: [ HttpClient, HttpHandler ],
      declarations: [ NavbarComponent ],
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NavbarComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  describe('testing Dark Mode switch assignment in localStorage', () => {
    it('#darkMode() should switch through #light-mode, #dusk-mode, #dark-mode', () => {    
      const fixture = TestBed.createComponent(NavbarComponent)
      component = fixture.componentInstance;  
      expect(localStorage.getItem('colorMode'))
        .withContext('light-mode onInit')
        .toBe('light-mode');
      component.darkMode();
      expect(localStorage.getItem('colorMode'))
        .withContext('dusk-mode at first click')
        .toBe('dusk-mode');
      component.darkMode();
      expect(localStorage.getItem('colorMode'))
        .withContext('dark-mode at second click')
        .toBe('dark-mode');
      component.darkMode();
      expect(localStorage.getItem('colorMode'))
        .withContext('light-mode at third click')
        .toBe('light-mode');
    });
  
  });



describe('testing Dark Mode switch add/remove selectors', () => {
  it('#darkMode() should switch #add(dusk-mode), #replace(dusk-mode, dark-mode), #remove(dark-mode)' , () => {    
    const fixture = TestBed.createComponent(NavbarComponent)
    component = fixture.componentInstance;
    component.darkMode();  
    expect(document.body.classList.contains('dusk-mode'))
      .withContext('add dusk-mode selector to classList at first click')
      .toBeTruthy();
    component.darkMode();
    expect(document.body.classList.contains('dark-mode'))
      .withContext('replace dusk-mode with dark-mode at second click')
      .toBeTruthy();
    component.darkMode();
    expect(document.body.classList.contains('dark-mode'))
      .withContext('remove dark-mode at third click')
      .toBe(false);
  });

});

});