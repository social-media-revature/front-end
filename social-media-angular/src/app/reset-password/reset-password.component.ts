import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { ResetPasswordService } from '../services/reset-password.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {

  verifed:boolean = false;
  changeComplete: boolean = false;
  

  changePasswordForm = new FormGroup ({

    email: new FormControl('', Validators.pattern('[a-z0-9]+@[a-z]+\.[a-z]{2,3}')),
    password: new FormControl('', Validators.required),
    passwordConf: new FormControl('', Validators.required)

  },
  // {
  //   validators:this.mustMatch('password', 'passwordConf');
  // }
  )

  constructor(private resetService: ResetPasswordService, private router: Router) { }

  ngOnInit(): void {
  }

  formSubmitted(){

    this.resetService.changePassword(this.changePasswordForm.value.password || "").subscribe((response) =>
     {
      console.log(response);
      this.changeComplete=true;

     });

  }

  verifyEmail(){

    this.resetService.checkEmail(this.changePasswordForm.value.email || "").subscribe((response) => 
    {
      console.log(response);
      this.resetService.user = response;
      this.verifed = true;

    })

    

  }

}
