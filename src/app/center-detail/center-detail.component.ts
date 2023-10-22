import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HealthCenter } from '../healthCenter';
import { Address } from '../address';
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
  @Output() updatedAndHidden = new EventEmitter<HealthCenter>();
  @Output() usersListCenterDetail = new EventEmitter<HealthCenter>();

  updatedCenter: HealthCenter = {} as HealthCenter;

  constructor(private service: BackoffService){}

  ngOnInit() : void{
    this.updatedCenter = JSON.parse(JSON.stringify(this.center));
    this.updatedCenter.address.id = this.center.address.id;
  }

  hide(){
    this.hidden.emit();
  }

  addressModification() : void{
    if(this.updatedCenter.address.city !== this.center.address.city 
      || this.updatedCenter.address.country !== this.center.address.country
      || this.updatedCenter.address.postalCode !== this.center.address.postalCode
      || this.updatedCenter.address.street !== this.center.address.street
      || this.updatedCenter.address.streetNumber !== this.center.address.streetNumber){
      this.updatedCenter.address.id = undefined;
    }
  }

  saveAndHide(healthCenter : HealthCenter){
    this.addressModification();
    // Create a new address and use switchMap to chain the center modification
    this.service
    .createNewAddress(healthCenter.address)
    .pipe(
      switchMap((responseAddress) => {
        // Handle success response for creating a new address
        // Now that we have the address ID from the response, we use it for creating the center
        const addressId = responseAddress?.id || 0;
        healthCenter.address.id = addressId;
        const { doctors, ...healthCenterWithoutDoctorList } = healthCenter;
        // Return an observable for creating the new health center
        return this.service.updateCenter(healthCenterWithoutDoctorList);
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

