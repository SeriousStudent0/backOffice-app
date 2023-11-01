import { Component, Input } from '@angular/core';
import { Doctor } from '../doctor';
import { BackoffService } from '../backoff.service';

@Component({
  selector: 'app-menu-centers',
  templateUrl: './menu-centers.component.html',
  styleUrls: ['./menu-centers.component.scss']
})
export class MenuCentersComponent {

  @Input() user!: Doctor;

  constructor(private service: BackoffService){}

  deleteUser(user : Doctor){
    this.service.deleteUser(user);
  }
}
