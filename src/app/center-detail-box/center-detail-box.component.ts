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

  @Input() center?: HealthCenter;
  @Input() clientRole!: UserRole;
  @Output() createdUserAndHide = new EventEmitter<UserRole>();
  @Output() modifyAndHide = new EventEmitter<Doctor>();
  @Output() deleteAndHide = new EventEmitter<Doctor>();

  doctors: Doctor[] = [];
  superAdmins: Doctor[] = [];
  admins: Doctor[] = [];
  users: Doctor[] = [];
  showContainer: Boolean = false;
  superAdminRole: Boolean = false;
  adminRole: Boolean = false;
  doctorRole: Boolean = false;
  SUPER_ADMIN : UserRole = UserRole.SUPER_ADMIN; //can't make it static readonly because to after use it in the html file
  ADMIN : UserRole = UserRole.ADMIN;
  DOCTOR : UserRole = UserRole.USER;

  constructor(private service: BackoffService){}

  ngOnInit(): void {
    this.getUsers().then(() => {
      this.sortAdminsAndUsers(); // This will execute once getUsers() is done
      this.showContainer = true;
    });
  }

  getUsers(): Promise<void> {
    if(this.center){
      return new Promise<void>((resolve, reject) => {
        this.service.getAllDoctorsFromCenter(this.center!.id!).subscribe({
          next: (data: Doctor[]) => {
            this.doctors = data;
            resolve(); // Resolve the promise when data is fetched
          },
          error: (error) => {
            console.error('Error fetching users', error);
            reject(error); // Reject the promise if there's an error
          }
        });
      });
    }else if(this.clientRole == UserRole.SUPER_ADMIN){
      return new Promise<void>((resolve, reject) => {
        this.service.getAllSuperAdmins().subscribe({
          next: (data: Doctor[]) => {
            this.superAdmins = data;
            resolve(); // Resolve the promise when data is fetched
          },
          error: (error) => {
            console.error('Error fetching super admins', error);
            reject(error); // Reject the promise if there's an error
          }
        });
      });
    } else{
      return Promise.reject("Unauthorized");
    }
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

  roleJob(){
    if(this.clientRole == UserRole.SUPER_ADMIN){
      this.superAdminRole = true;
      this.adminRole = false;
      this.doctorRole = false;
    }else if(this.clientRole == UserRole.ADMIN){
      this.superAdminRole = false;
      this.adminRole = true;
      this.doctorRole = false;
    }else{
      this.superAdminRole = false;
      this.adminRole = false;
      this.doctorRole = true;
    }
  }

  createNewUserAndHide(role : UserRole){
      this.createdUserAndHide.emit(role);
  }

  modifyUserAndHide(user : Doctor){
    this.modifyAndHide.emit(user);
  }

  deleteUserAndHide(user : Doctor){
    this.deleteAndHide.emit(user);
  }
}
