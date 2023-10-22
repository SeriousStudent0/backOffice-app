import { Component, Input } from '@angular/core';
import { HealthCenter } from '../healthCenter';

@Component({
  selector: 'app-center-detail-box',
  templateUrl: './center-detail-box.component.html',
  styleUrls: ['./center-detail-box.component.scss']
})
export class CenterDetailBoxComponent {

  @Input() center!: HealthCenter;

  constructor(){}

}
