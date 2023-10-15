import { Component, OnInit } from '@angular/core';
import { Doctor } from '../doctor';
import { ActivatedRoute } from '@angular/router';
import { BackoffService } from '../backoff.service';
import { defaultIfEmpty } from 'rxjs';
import { UserRole } from '../userRole';

@Component({
  selector: 'app-logged-page',
  templateUrl: './logged-page.component.html',
  styleUrls: ['./logged-page.component.scss']
})
export class LoggedPageComponent implements OnInit{

  user : Doctor | undefined;
  id : Number = 0;
  UserRole = UserRole;
  showContainerMonCentre = false;
  showContainerCentres = false;
  showContainerUserDetail = false;
  showContainerNewCentre = false;

  constructor(private route: ActivatedRoute, private service: BackoffService){}

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
    console.log('User HealthCenter:', this.user?.healthCenter);
    console.log('Type of User Role:', typeof this.user?.role);
    console.log('Type of User HealthCenter:', typeof this.user?.healthCenter);
  }

  toggleContainerMonCentre() {
    this.showContainerMonCentre = !this.showContainerMonCentre;
  }

  toggleContainerCentres() {
    this.showContainerCentres = !this.showContainerCentres;
    this.showContainerMonCentre = false;
    this.showContainerUserDetail = false;
    this.showContainerNewCentre = false;

  }

  toggleContainerNewCenter() {
    this.showContainerNewCentre = !this.showContainerNewCentre;
  }

  toggleContainerNewCentreAndHideSearchBar(){
    this.showContainerCentres = false;
    this.showContainerMonCentre = false;
    this.showContainerUserDetail = false;
    this.toggleContainerNewCenter();
  }

  newCenterCreation(){
    this.toggleContainerCentres();
  }
}
