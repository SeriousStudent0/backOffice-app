import { Component, OnInit } from '@angular/core';
import { Doctor } from '../doctor';
import { ActivatedRoute, Router } from '@angular/router';
import { BackoffService } from '../backoff.service';
import { defaultIfEmpty } from 'rxjs';
import { UserRole } from '../userRole';
import { HealthCenter } from '../healthCenter';
import { RendezVous } from '../rendezVous';

@Component({
  selector: 'app-logged-page',
  templateUrl: './logged-page.component.html',
  styleUrls: ['./logged-page.component.scss']
})
export class LoggedPageComponent implements OnInit{

  user : Doctor | undefined;
  id : number = 0;
  UserRole = UserRole;
  showContainerMonCenter = false;
  showContainerCenters = false;
  showContainerUserDetail = false;
  showContainerNewCenter = false;
  showContainerCenterDetails = false;
  showContainerUserListBox = false;
  showContainerUserCreation = false;
  showContainerUserModification = false;
  showContainerConfirmationUser = false;
  showContainerConfig = false;
  showContainerPlanning = false;
  healthCenterForDetails : HealthCenter | undefined;
  healthCenterForUsers : HealthCenter | undefined;
  roleForUser : UserRole | undefined;
  userToModify : Doctor | undefined;
  userToDelete : Doctor | undefined;
  rendezVousList : RendezVous[] | undefined;

  constructor(private route: ActivatedRoute, private service: BackoffService, private router: Router){}

  ngOnInit() : void{
    const idParam = Number(this.route.snapshot.paramMap.get('id'));
    if (idParam !== null) {
      this.id = idParam;
      this.service.getUser(idParam)
      .pipe(defaultIfEmpty({} as Doctor))
      .subscribe((doctor) =>{
        this.user = doctor;
        this.checkRoleAndHealthCenter();
      });
    }
  }

  //debug
  checkRoleAndHealthCenter() {
    console.log('User Role:', this.user?.role);
    console.log('User HealthCenter:', this.user?.healthCenter?.name);
    console.log('Type of User Role:', typeof this.user?.role);
    console.log('Type of User HealthCenter:', typeof this.user?.healthCenter);
    console.log('RDV List:', this.user?.rdv);

  }

  hideAll(){
    this.showContainerCenters = false;
    this.showContainerMonCenter = false;
    this.showContainerUserDetail = false;
    this.showContainerCenterDetails = false;
    this.showContainerUserListBox = false;
    this.showContainerUserCreation = false;
    this.showContainerUserModification = false;
    this.showContainerConfirmationUser = false;
    this.showContainerNewCenter = false;
    this.showContainerConfig = false;
    this.showContainerPlanning = false;
  }

  toggleContainerMonCentre(healthCenter : HealthCenter) {
    this.healthCenterForUsers = healthCenter;
    this.hideAll();
    this.showContainerMonCenter = !this.showContainerMonCenter;
  }

  toggleContainerCentres() {
    this.hideAll();
    this.showContainerCenters = !this.showContainerCenters;
  }

  toggleContainerNewCentreAndHideSearchBar(){
    this.hideAll();
    this.showContainerNewCenter = !this.showContainerNewCenter;
  }

  toggleContainerCenterDetails(healthCenter : HealthCenter){
    this.healthCenterForDetails = healthCenter;
    this.hideAll();
    this.showContainerCenterDetails = true;
  }

  toggleContainerUserListBox(healthCenter : HealthCenter){
    this.healthCenterForUsers = healthCenter;
    this.hideAll();
    this.showContainerUserListBox = true;
  }

  toggleContainerNewUser(role : UserRole, healthCenter? : HealthCenter){
    this.healthCenterForUsers = healthCenter;
    this.roleForUser = role;
    this.hideAll();
    this.showContainerUserCreation = true;
  }
  hideContainerNewUser(){
    this.hideAll();
    this.showContainerUserListBox = true;
  }
  toggleContainerModifyUser(user : Doctor, healthCenter? : HealthCenter){
    this.healthCenterForUsers = healthCenter;
    this.userToModify = user;
    this.hideAll();
    this.showContainerUserModification = true;
  }

  toggleContainerConfirmationUser(user : Doctor){
    this.userToDelete = user;
    this.hideAll();
    this.showContainerConfirmationUser = true;
  }

  toggleContainerConfig(){
    this.hideAll();
    this.showContainerConfig = true;
  }

  toggleContainerPlanning(rdvList : RendezVous[], healthCenter : HealthCenter){
    this.healthCenterForUsers = healthCenter;
    this.rendezVousList = rdvList;
    this.hideAll();
    this.showContainerPlanning = true;
  }

  loggout(): void {
    this.service.loggout(this.id).subscribe({
      next: () => {
        this.router.navigate([`login`])
      },
      error: (error) => {
        console.error('Logout failed', error);
      },
    });
  }
}
