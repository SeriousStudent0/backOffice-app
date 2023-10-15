import { Component, Input } from '@angular/core';
import { HealthCenter } from '../healthCenter';

@Component({
  selector: 'app-center-list',
  templateUrl: './center-list.component.html',
  styleUrls: ['./center-list.component.scss']
})
export class CenterListComponent {

  @Input() centers!: HealthCenter[];

  constructor(){}

}
