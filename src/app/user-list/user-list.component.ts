import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctor } from '../doctor';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.scss']
})
export class UserListComponent {
  
  @Input() users!: Doctor[];
  @Input() role! : String;
  @Output() createAndHide = new EventEmitter<void>();

  constructor(){}

  createNewUserAndHide(){
    this.createAndHide.emit()
  }
}
