import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HealthCenter } from '../../model/healthCenter';

@Component({
  selector: 'app-center-box',
  templateUrl: './center-box.component.html',
  styleUrls: ['./center-box.component.scss'],
})
export class CenterBoxComponent {

  @Input() centers!: HealthCenter[];
  @Output() startModifyCenter = new EventEmitter<HealthCenter>();
  @Output() usersListCenter = new EventEmitter<HealthCenter>();

  constructor(){}

  modifyCenter(healthCenter : HealthCenter){
    this.startModifyCenter.emit(healthCenter);
  }

  showUsers(center : HealthCenter){
    this.usersListCenter.emit(center);
  }
}
