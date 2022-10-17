import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  errorMessage: string = '';

  loginForm = new FormGroup({
    email: new FormControl(''),
    password: new FormControl('')
  })
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {

  }
  
  onSubmit(e: any): void {

    if(this.loginForm.value.email == "" || this.loginForm.value.password == "") {
      
      this.errorMessage = "Email or Password is incorrect";
      
    } else if(this.loginForm.value.email?.indexOf(' ')! >= 0 || this.loginForm.value.password?.indexOf(' ')! >= 0) {
      this.errorMessage = "Email or Password is incorrect";
    }
    
    else {
    e.preventDefault()
    this.authService.login(this.loginForm.value.email || "", this.loginForm.value.password || "")
      .subscribe(
        (response) => {
          this.authService.currentUser = response
          this.router.navigate(['post-feed'])
        }
      )
  }
}

  register(): void {
    this.router.navigate(['register']);
  }

}
