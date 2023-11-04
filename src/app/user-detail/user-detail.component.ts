import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HealthCenter } from '../healthCenter';
import { UserRole } from '../userRole';
import { BackoffService } from '../backoff.service';
import { Doctor, DoctorRequest } from '../doctor';
import { Address, AddressRequest } from '../address';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  @Input() center?: HealthCenter;
  @Input() role? : UserRole;
  @Input() user? : Doctor;
  @Output() createdAndHide = new EventEmitter<void>();
  @Output() hidden = new EventEmitter<void>();

  creationNotModification : boolean = false;

  userSentence : string = "nouveau Docteur";
  fisrtName : string = "";
  lastName : string = "";

  newAddress : AddressRequest = {
    city: "",
    country: "",
    street: "",
    streetNumber: 0,
    postalCode: 0,
  }

  newUser : DoctorRequest = {
    name: "",
    login : "",
    password : "",
    isLogged : false,
    healthCenter : {
      id : 0,
    },
    address : {
      id : 0,
    },
    role : UserRole.USER,
  }

  constructor(private service: BackoffService){}

  ngOnInit() : void{
    if(this.role){
      if(this.role == UserRole.SUPER_ADMIN){
        this.userSentence = "nouveau Super Administrateur";
        this.newUser.role = this.role;
      } else if(this.role == UserRole.ADMIN){
        this.userSentence = "nouvel Administrateur";
        this.newUser.role = this.role;
      } else if(this.role == UserRole.USER){
        this.userSentence = "nouveau Docteur";
      }
    }
    
    if(this.user){
      this.creationNotModification = false;
      this.newUser.id = this.user.id;
      this.newUser.name = this.user.name;
      this.newUser.login = this.user.login;
      this.newUser.password = this.user.password;
      this.newUser.role = this.user.role;
      this.newUser.isLogged = this.user.isLogged;
      this.newAddress = this.user.address;
      if(this.user.healthCenter){this.newUser.healthCenter.id = this.user.healthCenter.id;}
      this.center = this.user.healthCenter;   
    } else{
      this.creationNotModification = true;
      if(this.center){this.newUser.healthCenter.id = this.center.id;}
    }
  }

  updateUser(){
    if(!this.user){
      this.newUser.name = this.fisrtName + " " + this.lastName;
    }
    if(this.role){
      this.newUser.role = this.role;
    }
    
  }

  createAndHide(){
    this.updateUser();

    // Create a new address and use switchMap to chain the center creation
    this.service
    .createNewAddress(this.newAddress)
    .pipe(
      switchMap((responseAddress) => {
        // Handle success response for creating a new address
        // Now that we have the address ID from the response, we use it for creating the center
        const addressId = responseAddress?.id || 0;
        this.newUser.address.id = addressId;
        // Return an observable for creating the new health center
        return this.service.createNewUser(this.newUser);
      }),
      catchError((error) => {
        // Handle the error for creating a new address
        console.error('Error creating new address', error);
        return of(null); // Returning a fallback value, like null, to continue the observable chain
        // Or rethrow the error: return throwError(error);
      })
    )
    .subscribe({
      next: () => {
        // Handle success response for creating a new center
        this.createdAndHide.emit();
      },
      error: (error) => {
        // Handle error for creating a new center
        console.error('Error creating new user', error);
      }
    });
  }

  modifyAndHide(){
    this.updateUser();

    // Create a new address and use switchMap to chain the center creation
    this.service
    .createNewAddress(this.newAddress)
    .pipe(
      switchMap((responseAddress) => {
        // Handle success response for creating a new address
        // Now that we have the address ID from the response, we use it for creating the center
        const addressId = responseAddress?.id || 0;
        this.newUser.address.id = addressId;
        // Return an observable for creating the new health center
        return this.service.updateUser(this.newUser);
      }),
      catchError((error) => {
        // Handle the error for creating a new address
        console.error('Error creating new address', error);
        return of(null); // Returning a fallback value, like null, to continue the observable chain
        // Or rethrow the error: return throwError(error);
      })
    )
    .subscribe({
      next: () => {
        // Handle success response for creating a new center
        this.createdAndHide.emit();
      },
      error: (error) => {
        // Handle error for creating a new center
        console.error('Error creating new user', error);
      }
    });
  }

  hide(){
    this.hidden.emit();
  }
}
