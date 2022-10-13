import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from '../../services/reset-password.service'

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  verifed:boolean = false;
  changeComplete: boolean = false;
  errorMessage: string = '';

  

  changePasswordForm = new FormGroup ({

    email: new FormControl('', Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')),
    password: new FormControl('', Validators.required),
    passwordConf: new FormControl('', Validators.required)

  })

  constructor(private resetService: ResetPasswordService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmitted(){

    if(this.changePasswordForm.value.password == "") {

    } else if(this.changePasswordForm.value.password?.indexOf(' ')! >= 0) {

      this.errorMessage = "Password cannot contain spaces";

    } else {

    this.errorMessage = "";
    this.resetService.changePassword(this.changePasswordForm.value.password || "").subscribe((response) =>
     {
      this.changeComplete=true;

     });
    }

  }

  verifyEmail(){

    if(this.changePasswordForm.value.email == "") {

    } else if(this.changePasswordForm.value.email?.indexOf(' ')! >= 0) {

      this.errorMessage = "Email cannot contain spaces";
      
    } else {

    this.resetService.checkEmail(this.changePasswordForm.value.email || "").subscribe((response) => 
    {
      this.resetService.user = response;
      this.verifed = true;

    })
  }
   
  }


}