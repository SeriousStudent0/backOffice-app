import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HealthCenter, HealthCenterRequest } from '../healthCenter';
import { Address, AddressRequest } from '../address';
import { BackoffService } from '../backoff.service';
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

  updatedCenter: HealthCenterRequest = {} as HealthCenterRequest;
  newAddress: AddressRequest = {} as AddressRequest;

  constructor(private service: BackoffService){}

  ngOnInit() : void{
    this.updatedCenter.id = this.center.id;
    this.updatedCenter.name = this.center.name;
    this.updatedCenter.address.id = this.center.address.id;
    this.newAddress.id = this.center.address.id;
    this.newAddress.city = this.center.address.city;
    this.newAddress.country = this.center.address.city;
    this.newAddress.postalCode = this.center.address.postalCode;
    this.newAddress.street = this.center.address.street;
    this.newAddress.streetNumber = this.center.address.streetNumber;
  }

  hide(){
    this.hidden.emit();
  }

  addressModification() : void{
    if(this.newAddress.city !== this.center.address.city 
      || this.newAddress.country !== this.center.address.country
      || this.newAddress.postalCode !== this.center.address.postalCode
      || this.newAddress.street !== this.center.address.street
      || this.newAddress.streetNumber !== this.center.address.streetNumber){
      this.newAddress.id = undefined;
    }
  }

  saveAndHide(healthCenter : HealthCenterRequest, address: AddressRequest){
    this.addressModification();
    // Create a new address and use switchMap to chain the center modification
    this.service
    .createNewAddress(address)
    .pipe(
      switchMap((responseAddress) => {
        // Handle success response for creating a new address
        // Now that we have the address ID from the response, we use it for creating the center
        const addressId = responseAddress?.id || 0;
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

