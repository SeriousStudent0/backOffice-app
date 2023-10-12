import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BackoffService {

  constructor(private httpClient: HttpClient) { }

  loginAttempt(login : String, password : String): Observable<number>{
    return this.httpClient.post<number>('http://localhost:8080/doctor/logging', { login, password});
  }
}
