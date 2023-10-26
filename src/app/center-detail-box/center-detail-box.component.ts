import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { HealthCenter } from '../healthCenter';
import { BackoffService } from '../backoff.service';
import { Doctor } from '../doctor';
import { UserRole } from '../userRole';

@Component({
  selector: 'app-center-detail-box',
  templateUrl: './center-detail-box.component.html',
  styleUrls: ['./center-detail-box.component.scss']
})
export class CenterDetailBoxComponent implements OnInit{

  @Input() center!: HealthCenter;
  @Output() createdUserAndHide = new EventEmitter<UserRole>();

  doctors: Doctor[] = [];
  admins: Doctor[] = [];
  users: Doctor[] = [];

  constructor(private service: BackoffService){}

  ngOnInit() : void{
    this.getUsers();
    this.sortAdminsAndUsers();
  }

  getUsers() : void{
    this.service.getAllDoctorsFromCenter(this.center.id!).subscribe({
      next: (data: Doctor[]) => {
        this.doctors = data;
      },
      error: (error) => {
        console.error('Error fetching centers', error);
      }
    });
  }

  sortAdminsAndUsers(){
    this.admins = [];
    this.users = [];

    for(const doctor of this.doctors){
      if(doctor.role == UserRole.ADMIN){
        this.admins.push(doctor);
      }else if(doctor.role == UserRole.USER){
        this.users.push(doctor);
      }
    }
  }

  createNewUserAndHide(role : Boolean){
    if (role){
      this.createdUserAndHide.emit(UserRole.ADMIN);
    } else{
      this.createdUserAndHide.emit(UserRole.USER);
    }
  }
}
