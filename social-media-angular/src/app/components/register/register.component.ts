import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  errorMessage: string = '';

  registerForm = new FormGroup({
    firstName: new FormControl(''),
    lastName: new FormControl(''),
    email: new FormControl(''),
    password: new FormControl('')
  })
  

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }
  
  onSubmit(e: any): void {

    if(this.registerForm.value.email == "" || this.registerForm.value.password == "" || this.registerForm.value.firstName == "" || this.registerForm.value.lastName == "") {
      
    } else if(this.registerForm.value.email?.indexOf(' ')! >= 0 || this.registerForm.value.password?.indexOf(' ')! >= 0) {
      
      this.errorMessage = "Email and Password cannot contain spaces";

    } else if(this.registerForm.value.firstName?.startsWith(" ") || this.registerForm.value.lastName?.startsWith(" ")) {
      this.errorMessage = "Names cannot begin with a space";
    }
    
    else {

    e.preventDefault()
    this.authService.register(this.registerForm.value.firstName || "", this.registerForm.value.lastName || "", this.registerForm.value.email || "", this.registerForm.value.password || "")
      .subscribe(
        (response) => {
          this.router.navigate(['login'])
        }
      )
  }
}

}
