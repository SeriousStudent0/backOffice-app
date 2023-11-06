import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctor } from '../../model/doctor';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  
  @Input() users!: Doctor[];
  @Input() role! : String;
  @Output() createAndHide = new EventEmitter<void>();
  @Output() modifyAndHide = new EventEmitter<Doctor>();
  @Output() deleteAndHide = new EventEmitter<Doctor>();

  constructor(){}

  createNewUserAndHide(){
    this.createAndHide.emit()
  }

  modifyUserAndHide(user : Doctor){
    this.modifyAndHide.emit(user);
  }

  deleteUserAndHide(user : Doctor){
    this.deleteAndHide.emit(user);
  }
  
}
