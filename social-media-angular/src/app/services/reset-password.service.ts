import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import User from '../models/User';

@Injectable({
  providedIn: 'root'
})
export class ResetPasswordService {

  authUrl: string = `${environment.baseUrl}/auth/reset-password`;
  user: User;


  constructor(private http: HttpClient) { }

  checkEmail(email: String): Observable<any>{

    const somthing = this.http.post<any>(this.authUrl, email)
    
    somthing.subscribe((response)=>{

      this.user = response;

    })
    
    return somthing;


  }

  changePassword(newPassword: String){

    const userWithNewPass = {
      email:this.user.email,
      password:newPassword
    }

    return this.http.put<any>(this.authUrl,userWithNewPass);

  }

}
