import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { MainComponent } from 'src/main';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})
export class NavbarComponent implements OnInit{
  
  colorSymbol = 'light_mode';

  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {
    localStorage.setItem('colorMode', 'light-mode');
  }

  ngOnDestroy() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['login']);
  }

  darkMode(){
    var colorMode = localStorage.getItem('colorMode');
    switch(colorMode) {
      case 'light-mode': 
        document.body.classList.add('dusk-mode');
        localStorage.setItem('colorMode','dusk-mode');
        this.colorSymbol = 'wb_twilight';
        break;
      case 'dusk-mode':
        document.body.classList.replace('dusk-mode', 'dark-mode');        
        localStorage.setItem('colorMode', 'dark-mode');
        this.colorSymbol = 'bedtime';
        break;
      case 'dark-mode':
        document.body.classList.remove('dark-mode');
        localStorage.setItem('colorMode', 'light-mode');
        this.colorSymbol = 'light_mode';
        break;
      default:
        break;
    }
    
  }


}
