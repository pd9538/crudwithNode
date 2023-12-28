import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class SocketService {

  apiUrl="http://localhost:8000/";

  constructor(private http:HttpClient) { }

  getData(data:any,url:any){
    return this.http.post(this.apiUrl+url,data);
  }

}
