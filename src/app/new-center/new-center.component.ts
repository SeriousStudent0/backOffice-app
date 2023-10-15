import { Component, EventEmitter, Output } from '@angular/core';
import { BackoffService } from '../backoff.service';
import { HealthCenter } from '../healthCenter';
import { HAMMER_LOADER } from '@angular/platform-browser';
import { Address } from '../address';

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
  
  newCenter : HealthCenter = {
    name:this.name,
    address: this.newAddress,
    doctors :[],
  };

  constructor(private service: BackoffService){}

  create() : void{
    this.service.createNewAddress(this.newAddress);
    this.service.createNewCenter(this.newCenter);
    //this.newCenterCreated.emit();
  }
}
