import { Component, Input } from '@angular/core';
import { Observable, catchError, concatMap, map, of, switchMap } from 'rxjs';
import { BackoffService } from 'src/app/backoff.service';
import { Doctor } from 'src/app/model/doctor';
import { HealthCenter } from 'src/app/model/healthCenter';
import { Patient } from 'src/app/model/patient';
import { RendezVous, RendezVousRequest } from 'src/app/model/rendezVous';

@Component({
  selector: 'app-planning-box',
  templateUrl: './planning-box.component.html',
  styleUrls: ['./planning-box.component.scss']
})
export class PlanningBoxComponent {

  @Input() center!: HealthCenter;
  @Input() user!: Doctor;
  @Input() rdvList!: RendezVous[];

  sortedDates: Date[] = [];
  selectedDate: Date | null = null; // Initialize selectedDate to null
  patientsForSelectedDate: Patient[] = []; // Initialize with an empty array
  pendingRDVList: RendezVous[] = [];
  pendingRDV:boolean = false;

  constructor(private service: BackoffService){}

  ngOnInit() {
    this.pendingRDV = false;
    this.service.getAllPendingRDV().subscribe({
      next: (data: RendezVous[]) => {
        // Data has been successfully fetched from the API
        //this.rdvList = this.mergeRendezVousLists(this.rdvList, data);
        this.rdvList = data;
        this.pendingRDVList = this.transformDates(data);
        if (this.pendingRDVList.length > 0) {
          this.pendingRDV = true;
          this.sortDates();
          this.selectDate(this.sortedDates[0]);
        }
      },
      error: (error) => {
        console.error('Failed to fetch rendez-vous list:', error);
      },
    });
  }

  // The dates recieved are string type so this method turns them into Date type
  transformDates(data: RendezVous[]): RendezVous[] {
    return data.map(rdv => ({
        ...rdv,
        date: new Date(rdv.date) // Convert the date property to a Date object
    }));
  }

  sortDates() {
    const uniqueDates = [...new Set(this.pendingRDVList.map(rdv => rdv.date))];
    this.sortedDates = uniqueDates.sort((a, b) => a.getTime() - b.getTime());
  }

  navigate(direction: 'previous' | 'next') {
    if (this.selectedDate) {
      const currentIndex = this.sortedDates.indexOf(this.selectedDate);

      if (direction === 'previous' && currentIndex > 0) {
        this.selectDate(this.sortedDates[currentIndex - 1]);
      } else if (direction === 'next' && currentIndex < this.sortedDates.length - 1) {
        this.selectDate(this.sortedDates[currentIndex + 1]);
      }
    }
  }

  selectDate(date: Date) {
    this.selectedDate = date;
    // Fetch patients for the selected date from your backend service
    this.patientsForSelectedDate = this.pendingRDVList
      .filter(rdv => (rdv.date).getTime() === date.getTime())
      .map(rdv => rdv.patient);
  }

  mergeRendezVousLists(list1: RendezVous[], list2: RendezVous[]): RendezVous[] {
    if(typeof list1 == undefined){
      return list2;
    }else if(typeof list2 == undefined){
      return list1;
    }else if(list1.length == 0){
      return list2;
    }else if (list2.length == 0){
      return list1;
    }else{
      return [...list1, ...list2];
    }
  }

  validatedPushed(patient : Patient){
    //get rdv by patient and this.selectedDate
    const rendezvous: RendezVous | undefined = this.pendingRDVList.find(
      rdv => rdv.patient === patient && rdv.date.getTime() === this.selectedDate!.getTime()
    );

    console.log(typeof rendezvous);
    console.log(rendezvous?.patient);
    
    //set validated and doctor to this rdv and chain it to the patient doctor adding and rdv filling in the doctor rdv list
    this.service
    .validateRDV(rendezvous!.id, this.user.id)
    .pipe(
      concatMap((responseRDV) => {
        // Handle success response for validating by a doctor the rdv
        return this.service.setDoctorToPatient(patient.id!, this.user.id)
          .pipe(
            concatMap((updatedPatient) => {
              // Continue with the validated RDV after setting the doctor
              responseRDV.patient = updatedPatient;
              return this.service.addRDVtoDoctorRDVList(this.user.id, rendezvous!.id);
            })
          );
      }),
      catchError((error) => {
        // Handle the error for validating the rdv or setting the doctor to the patient
        console.error('Error validating the rdv or setting the doctor to the patient', error);
        return of(null); // Returning a fallback value, like null, to continue the observable chain
        // Or rethrow the error: return throwError(error);
      })
    )
    .subscribe({
      next: () => {
        console.log('RDV added to doctor RDV list successfully.');
        // Handle success response for adding the rdv to the doctor rdv list
      },
      error: (error) => {
        // Handle error for updating an existing center
        console.error('Error adding rdv to doctor rdv list', error);
      }
    });
  }
}
