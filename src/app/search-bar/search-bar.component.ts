import { Component, EventEmitter, Output } from '@angular/core';
import { BackoffService } from '../backoff.service';
import { HealthCenter } from '../healthCenter';
import { defaultIfEmpty } from 'rxjs';

@Component({
  selector: 'app-search-bar',
  templateUrl: './search-bar.component.html',
  styleUrls: ['./search-bar.component.scss']
})
export class SearchBarComponent {

  @Output() hidden = new EventEmitter<boolean>();
  @Output() hiddenCreate = new EventEmitter<HealthCenter>();

  centers: HealthCenter[] = [];
  searchQuery : string = "";

  constructor(private service: BackoffService){}

  ngOnInit() : void{
    this.service.getAllvaccinationCenter().subscribe({
      next: (data: HealthCenter[]) => {
        this.centers = data;
      },
      error: (error) => {
        console.error('Error fetching centers', error);
      }
    });
  }

  hide(){
    this.hidden.emit(false);
  }

  hideAndModify(healthCenter : HealthCenter){
    this.hiddenCreate.emit(healthCenter);
  }

  search() : void{
    this.service.getAllvaccinationCenterSearchByCity(this.searchQuery)
    .pipe(defaultIfEmpty({} as HealthCenter[]))
    .subscribe((vaccinationCenterList) =>{
      this.centers = vaccinationCenterList;
    });
  }

  searchEmpty() : void{
    this.searchQuery = "";
    this.service.getAllvaccinationCenterSearchByCity(this.searchQuery)
    .pipe(defaultIfEmpty({} as HealthCenter[]))
    .subscribe((vaccinationCenterList) =>{
      this.centers = vaccinationCenterList;
    });
  }
}
