import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, map } from 'rxjs';
import { Doctor, DoctorRequest } from './doctor';
import { HealthCenter, HealthCenterRequest } from './healthCenter';
import { Address, AddressRequest } from './address';

@Injectable({
  providedIn: 'root'
})
export class BackoffService {

  constructor(private httpClient: HttpClient) { }

  loginAttempt(login : String, password : String): Observable<number>{
    return this.httpClient.post<number>('http://localhost:8080/doctor/logging', { login, password});
  }

  getUser(id: number): Observable<Doctor>{
    return this.httpClient.get<Doctor>('http://localhost:8080/doctor?id=' + id)
      .pipe(
        map((response: any) => response as Doctor) // Map the response to Doctor
      );
  }

  getAllvaccinationCenter() : Observable<HealthCenter[]>{
    return this.httpClient.get<HealthCenter[]>('http://localhost:8080/public/healthcenter');
  }

  getAllvaccinationCenterSearchByCity(letters : string) : Observable<HealthCenter[]>{
    const searchLetters = letters.toLowerCase();

    return this.getAllvaccinationCenter().pipe(
      map((vaccinationCenters) =>
        vaccinationCenters.filter((center) =>
          center.address.city.toLowerCase().startsWith(searchLetters)
        )
      )
    );
  }

  getSpecificCenter(id : number) : Observable<HealthCenter | undefined>{
    return this.getAllvaccinationCenter().pipe(
      map((vaccinationCenters) =>
        vaccinationCenters.find((center) => 
          center.id === id)
      )
    );
  }

  createNewCenter(healthCenter : HealthCenterRequest): Observable<HealthCenter>{
    return this.httpClient.post<HealthCenter>('http://localhost:8080/public/healthcenter/create', healthCenter);
  }

  createNewAddress(address : AddressRequest): Observable<Address>{
    return this.httpClient.post<Address>('http://localhost:8080/address/create', address);
  }

  createNewUser(user : DoctorRequest) : Observable<Doctor>{
    return this.httpClient.post<Doctor>('http://localhost:8080/doctor/create', user);
  }

  updateUser(user : DoctorRequest) : Observable<Doctor>{
    return this.httpClient.put<Doctor>('http://localhost:8080/doctor/create', user);
  }

  deleteUser(user: Doctor): Observable<ArrayBuffer> {
    const options = {
        body: user, // This sets the request body to the user object
    };

    return this.httpClient.delete<ArrayBuffer>('http://localhost:8080/doctor/delete', options);
  }

  updateCenter(healthCenter : HealthCenterRequest): Observable<HealthCenter>{
    return this.httpClient.put<HealthCenter>('http://localhost:8080/public/healthcenter/create', healthCenter);
  }

  getAllDoctorsFromCenter(id : number) : Observable<Doctor[]>{
    return this.httpClient.get<Doctor[]>(`http://localhost:8080/public/healthcenter/${id}/doctors`);
  }

  getAllSuperAdmins() : Observable<Doctor[]>{
    return this.httpClient.get<Doctor[]>(`http://localhost:8080/doctor/superadmins`);
  }

  loggout(id : number) : Observable<boolean>{
    return this.httpClient.put<boolean>('http://localhost:8080/doctor/logging', id);
  }

}
