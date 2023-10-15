import { Component, Input } from '@angular/core';
import { HealthCenter } from '../healthCenter';

@Component({
  selector: 'app-center-box',
  templateUrl: './center-box.component.html',
  styleUrls: ['./center-box.component.scss']
})
export class CenterBoxComponent {

  @Input() centers!: HealthCenter[];

  constructor(){}

}
