import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule, HttpTestingController } from '@angular/common/http/testing';
import { FileStorageService } from './file-storage.service';
import FileInfo from '../models/FileInfo';

describe('FileStorageService', () => {
  let service: FileStorageService;
  let httpMock : HttpTestingController;
  let fileInfo : FileInfo;
  let otherInfo: FileInfo;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
    });
    service = TestBed.inject(FileStorageService);
    httpMock = TestBed.inject(HttpTestingController);
    fileInfo = new FileInfo("test","test.com");
    otherInfo = new FileInfo("other","other.com");
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should return the right fileInfo on upload', () => {
     //const pro = jasmine.createSpyObj('ProfileService',["getAllProfile()"]);
     const pro = jasmine.createSpyObj('FileStorageService',["uploadFile"]);
    
     let blob : any = new Blob([""], { type: 'text/html' });
     blob["lastModifiedDate"] = "";
     blob["name"] = "filename";
     
     let fakeF = <File>blob;

     pro.uploadFile.and.returnValue(otherInfo);
     service.uploadFile(fakeF).subscribe((Response)=>{
       expect(Response.name).toBe(otherInfo.name);
     })
  });

});


