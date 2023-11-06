import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Doctor } from '../../model/doctor';
import { BackoffService } from '../../backoff.service';

@Component({
  selector: 'app-menu-centers',
  templateUrl: './menu-centers.component.html',
  styleUrls: ['./menu-centers.component.scss']
})
export class MenuCentersComponent {

  @Input() user!: Doctor;
  @Output() hidden = new EventEmitter<void>();

  constructor(private service: BackoffService){}

  deleteUserAndHide(user: Doctor) {
    this.service.deleteUser(user).subscribe(
      (response) => {
        // Handle the success response here if needed
        // Not needed for now
        this.hidden.emit(); // Emit the "hidden" event after successful deletion.
      },
      (error) => {
        console.log("Doctor not deleted due to an error")
      }
    );
  }

  hide(){
    this.hidden.emit();
  }
}
