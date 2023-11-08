import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HealthCenter } from '../../model/healthCenter';
import { RendezVous } from '../../model/rendezVous';
import { BackoffService } from '../../backoff.service';
import { Patient } from 'src/app/model/patient';

@Component({
  selector: 'app-center-list',
  templateUrl: './center-list.component.html',
  styleUrls: ['./center-list.component.scss']
})
export class CenterListComponent {

  @Input() patientList!: Patient[];
  @Output() validated = new EventEmitter<Patient>();

  constructor(private service: BackoffService){}

  //set validated to the rdv
  //add doctor to the rdv
  //add the rdv to the doctor rdv list

  validate(patient : Patient){
    this.validated.emit(patient)
  }
}
