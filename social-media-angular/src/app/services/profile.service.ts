import { Injectable, ɵgetUnknownElementStrictMode } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Observable } from 'rxjs';
import { Profile } from '../models/Profile';
import User from '../models/User';
import UserWithPassword from '../models/UserWithPassword';
@Injectable({
  providedIn: 'root'
})
export class ProfileService {

  baseUrl:string = `${environment.baseUrl}/profiles`;

  constructor(private httpClient: HttpClient) { }

  getAllProfile() : Observable<Profile[]>{
    return this.httpClient.get<Profile[]>(this.baseUrl, {headers: environment.headers, withCredentials: environment.withCredentials} );
  }

 getOneProfile(user : UserWithPassword) : Observable<Profile>{
  //return this.httpClient.get<Profile>(this.baseUrl + "/page", {params:{userId: user.id}});
  return this.httpClient.post<Profile>(this.baseUrl + "/page", user,  {headers: environment.headers, withCredentials: environment.withCredentials});
 }

  updateProfile(profile : Profile) : Observable<Profile>{
    return this.httpClient.put<Profile>(this.baseUrl,profile);
  }

  createProfile(profile: Profile) : Observable<Profile>{
    return this.httpClient.post<Profile>(this.baseUrl,profile);
  }
  
}

