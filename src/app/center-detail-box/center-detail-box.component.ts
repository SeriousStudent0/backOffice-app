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
  @Output() modifyAndHide = new EventEmitter<Doctor>();
  @Output() deleteAndHide = new EventEmitter<Doctor>();

  doctors: Doctor[] = [];
  admins: Doctor[] = [];
  users: Doctor[] = [];
  showContainer: Boolean = false;

  constructor(private service: BackoffService){}

  ngOnInit(): void {
    this.getUsers().then(() => {
      this.sortAdminsAndUsers(); // This will execute once getUsers() is done
      this.showContainer = true;
    });
  }

  getUsers(): Promise<void> {
    return new Promise<void>((resolve, reject) => {
      this.service.getAllDoctorsFromCenter(this.center.id!).subscribe({
        next: (data: Doctor[]) => {
          this.doctors = data;
          resolve(); // Resolve the promise when data is fetched
        },
        error: (error) => {
          console.error('Error fetching centers', error);
          reject(error); // Reject the promise if there's an error
        }
      });
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

  modifyUserAndHide(user : Doctor){
    this.modifyAndHide.emit(user);
  }

  deleteUserAndHide(user : Doctor){
    this.deleteAndHide.emit(user);
  }
}
