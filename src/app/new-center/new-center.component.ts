import { Component, EventEmitter, Output } from '@angular/core';
import { BackoffService } from '../backoff.service';
import { HealthCenter } from '../healthCenter';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { Address } from '../address';
import { catchError, of, switchMap } from 'rxjs';

@Component({
  selector: 'app-new-center',
  templateUrl: './new-center.component.html',
  styleUrls: ['./new-center.component.scss']
})
export class NewCenterComponent {

  @Output() newCenterCreated = new EventEmitter<void>();

  name : string = "";
  city : string = "";
  country : string = "";
  street : string = "";
  streetNumber : number = 0;
  postalCode : number = 0;

  newAddress : Address = {
    city:this.city,
    country:this.country,
    street:this.street,
    streetNumber:this.streetNumber,
    postalCode:this.postalCode
  }

  constructor(private service: BackoffService){}

  updateAddress() : void{
    this.newAddress.city = this.city;
    this.newAddress.country = this.country;
    this.newAddress.street = this.street;
    this.newAddress.streetNumber = this.streetNumber;
    this.newAddress.postalCode = this.postalCode;
  }

  create() : void{
    this.updateAddress();

    console.log(this.name);
    console.log(this.newAddress.city);
    console.log(this.newAddress.country);
    console.log(this.newAddress.street);
    console.log(this.newAddress.streetNumber);
    console.log(this.newAddress.postalCode);

    // Create a new address and use switchMap to chain the center creation
  this.service
  .createNewAddress(this.newAddress)
  .pipe(
    switchMap((responseAddress) => {
      // Handle success response for creating a new address
      // Now that we have the address ID from the response, we use it for creating the center
      const addressId = responseAddress?.id || 0;

      // Return an observable for creating the new health center
      return this.service.createNewCenter(this.name, addressId);
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
      this.newCenterCreated.emit();
    },
    error: (error) => {
      // Handle error for creating a new center
      console.error('Error creating new center', error);
    }
  });
  }
}
