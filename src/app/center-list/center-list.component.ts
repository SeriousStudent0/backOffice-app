import { Component, Input } from '@angular/core';
import { HealthCenter } from '../healthCenter';
import { RendezVous } from '../rendezVous';
import { BackoffService } from '../backoff.service';

@Component({
  selector: 'app-center-list',
  templateUrl: './center-list.component.html',
  styleUrls: ['./center-list.component.scss']
})
export class CenterListComponent {

  @Input() center!: HealthCenter;
  @Input() rdvList!: RendezVous[];

  constructor(private service: BackoffService){}

}
