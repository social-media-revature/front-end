import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import FileInfo from '../models/FileInfo';

@Injectable({
  providedIn: 'root'
})
export class FileStorageService {

  baseUrl : string = environment.baseUrl;

  constructor(private httpClient: HttpClient) { }

  uploadFile(file : File) : Observable<FileInfo>{
    const fd = new FormData();
    fd.append("file",file);
    
    return this.httpClient.post<FileInfo>(this.baseUrl + "/upload",fd);
  }

  
}
