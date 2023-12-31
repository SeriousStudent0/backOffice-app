import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, Subject, catchError, map, of, tap } from 'rxjs';
import { Doctor, DoctorRequest } from './model/doctor';
import { HealthCenter, HealthCenterRequest } from './model/healthCenter';
import { Address, AddressRequest } from './model/address';
import { RendezVous, RendezVousRequest } from './model/rendezVous';
import { Patient } from './model/patient';

@Injectable({
  providedIn: 'root'
})
export class BackoffService {

  private isLoggedSubject: Subject<boolean> = new BehaviorSubject(false);

  private password?: string;
  private login?: string;

  constructor(private httpClient: HttpClient) { }

  loginAttempt(login : string, password : string): Observable<number | null>{
    let header = this.createAuth(login, password);
    const httpOptions = {
      headers: new HttpHeaders({
        'Authorization': header
      })
    };
    return this.httpClient.post<number>('http://localhost:8080/doctor/public/logging', null, httpOptions)
    .pipe(
      map((userId: number) => {
        this.isLoggedSubject.next(true);
        this.password = password;
        this.login = login;
        console.log("Connected")
        return userId;
      }),
      catchError((error: any) => {
        // Authentication failed
        return of(null);
      })
    );
  }

  isLogged(): Observable<boolean> {
    return this.isLoggedSubject.asObservable();
  }

  getBasicAuthHeaderValue(): string {
    return this.createAuth(this.login!, this.password!)
  }

  loggout(id: number): Observable<boolean> {
    return this.httpClient.put<boolean>('http://localhost:8080/doctor/private/logging', id)
      .pipe(
        tap(() => {
          this.isLoggedSubject.next(false);
        })
      );
  }

  private createAuth(login: string, password: string): string {
    const authString = `${login}:${password}`;
    const base64Hash = btoa(authString); // Use btoa to encode in Base64
    const authHeader = `Digest base64(${base64Hash})`;
    return authHeader;
  }

  authHasBasic(): boolean {
    return !!this.password && !!this.login;
  }

  getUser(id: number): Observable<Doctor>{
    return this.httpClient.get<Doctor>('http://localhost:8080/doctor/private?id=' + id)
      .pipe(
        map((response: any) => response as Doctor) // Map the response to Doctor
      );
  }

  getAllvaccinationCenter() : Observable<HealthCenter[]>{
    return this.httpClient.get<HealthCenter[]>('http://localhost:8080/healthcenter/public');
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
    return this.httpClient.post<HealthCenter>('http://localhost:8080/healthcenter/private/create', healthCenter);
  }

  createNewAddress(address : AddressRequest): Observable<Address>{
    return this.httpClient.post<Address>('http://localhost:8080/address/private/create', address);
  }

  createNewUser(user : DoctorRequest) : Observable<Doctor>{
    return this.httpClient.post<Doctor>('http://localhost:8080/doctor/private/create', user);
  }

  updateUser(user : DoctorRequest) : Observable<Doctor>{
    return this.httpClient.put<Doctor>('http://localhost:8080/doctor/private/create', user);
  }

  deleteUser(user: Doctor): Observable<ArrayBuffer> {
    const options = {
        body: user, // This sets the request body to the user object
    };

    return this.httpClient.delete<ArrayBuffer>('http://localhost:8080/doctor/private/delete', options);
  }

  updateCenter(healthCenter : HealthCenterRequest): Observable<HealthCenter>{
    return this.httpClient.put<HealthCenter>('http://localhost:8080/healthcenter/private/create', healthCenter);
  }

  getAllDoctorsFromCenter(id : number) : Observable<Doctor[]>{
    return this.httpClient.get<Doctor[]>(`http://localhost:8080/healthcenter/private/${id}/doctors`);
  }

  getAllSuperAdmins() : Observable<Doctor[]>{
    return this.httpClient.get<Doctor[]>(`http://localhost:8080/doctor/private/superadmins`);
  }

  getAllPendingRDV(): Observable<RendezVous[]>{
    return this.httpClient.get<RendezVous[]>(`http://localhost:8080/rendezvous/private/pending`);
  }

  validateRDV(rdvId : number, doctorId : number): Observable<RendezVous>{
    return this.httpClient.put<RendezVous>(`http://localhost:8080/rendezvous/private/create`, {rdvId, doctorId});
  }

  setDoctorToPatient(patientId : number, doctorId : number){
    return this.httpClient.put<Patient>(`http://localhost:8080/patient/private/addDoctor`, {patientId, doctorId});
  }

  addRDVtoDoctorRDVList(doctorId : number, rdvId : number): Observable<Doctor>{
    return this.httpClient.post<Doctor>('http://localhost:8080/doctor/private/addRDV', {doctorId, rdvId});
  }
}
