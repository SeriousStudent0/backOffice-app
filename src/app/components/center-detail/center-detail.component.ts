import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HealthCenter, HealthCenterRequest } from '../../model/healthCenter';
import { Address, AddressRequest } from '../../model/address';
import { BackoffService } from '../../backoff.service';
import { catchError, of, switchMap } from 'rxjs';
import { HAMMER_LOADER } from '@angular/platform-browser';

@Component({
  selector: 'app-center-detail',
  templateUrl: './center-detail.component.html',
  styleUrls: ['./center-detail.component.scss']
})
export class CenterDetailComponent implements OnInit{

  @Input() center!: HealthCenter;
  @Output() hidden = new EventEmitter<void>();
  @Output() updatedAndHidden = new EventEmitter<HealthCenterRequest>();
  @Output() usersListCenterDetail = new EventEmitter<HealthCenter>();

  updatedCenter: HealthCenterRequest = {
    name: "",
    address:{
      id:0
    }
  };
  newAddress: AddressRequest = {} as AddressRequest;

  constructor(private service: BackoffService){}

  ngOnInit() : void{
    this.updatedCenter.id = this.center.id;
    this.updatedCenter.name = this.center.name;
    this.updatedCenter.address.id = this.center.address.id;
    this.newAddress.city = this.center.address.city;
    this.newAddress.country = this.center.address.city;
    this.newAddress.postalCode = this.center.address.postalCode;
    this.newAddress.street = this.center.address.street;
    this.newAddress.streetNumber = this.center.address.streetNumber;
    console.log(this.center.address.id);
  }

  hide(){
    this.hidden.emit();
  }

  addressModification(address : AddressRequest) : AddressRequest{
    if(address.city == this.center.address.city 
      && address.country == this.center.address.country
      && address.postalCode == this.center.address.postalCode
      && address.street == this.center.address.street
      && address.streetNumber == this.center.address.streetNumber){
        address.id = this.center.address.id;
    }
    return address
  }

  saveAndHide(healthCenter : HealthCenterRequest, address: AddressRequest){
    address = this.addressModification(address);
    // Create a new address and use switchMap to chain the center modification
    this.service
    .createNewAddress(address)
    .pipe(
      switchMap((responseAddress) => {
        // Handle success response for creating a new address
        // Now that we have the address ID from the response, we use it for creating the center
        const addressId = responseAddress?.id || this.center.address.id;
        healthCenter.address.id = addressId;
        // Return an observable for creating the new health center
        return this.service.updateCenter(healthCenter);
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
        // Handle success response for updating an existing center
        this.updatedAndHidden.emit(healthCenter);
      },
      error: (error) => {
        // Handle error for updating an existing center
        console.error('Error creating new center', error);
      }
    });
  }

  users(center : HealthCenter){
    this.usersListCenterDetail.emit(center);
  }
}

