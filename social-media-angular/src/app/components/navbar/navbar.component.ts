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
     
  constructor(private authService: AuthService, private router: Router) { }
  
  ngOnInit(): void {

    var initMode = localStorage.getItem('colorMode');
    if (initMode == null) {localStorage.setItem('colorMode', 'light-mode')};
    switch(initMode) {
      case 'light-mode': 
        document.body.classList.remove('dusk-mode');
        document.body.classList.remove('dark-mode');
        break;
      case 'dusk-mode':
        document.body.classList.remove('dark-mode');
        document.body.classList.add('dusk-mode');
        break;
      case 'dark-mode':
        document.body.classList.remove('dusk-mode');
        document.body.classList.add('dark-mode');
        break;
      default:
        break;
  }
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
        break;
      case 'dusk-mode':
        document.body.classList.replace('dusk-mode', 'dark-mode');        
        localStorage.setItem('colorMode', 'dark-mode');
        break;
      case 'dark-mode':
        document.body.classList.remove('dark-mode');
        localStorage.setItem('colorMode', 'light-mode');
        break;
      default:
        break;
    }
    
  }

  isLoggedIn() : boolean{
    return (this.authService.isLoggedIn);
  }

  goToProfile() : void{
    this.router.navigate([`get-profile/${this.authService.currentUser.id}`]);
  }
}
