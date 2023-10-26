import { Component, EventEmitter, Input, Output } from '@angular/core';
import { HealthCenter } from '../healthCenter';
import { UserRole } from '../userRole';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.scss']
})
export class UserDetailComponent {

  @Input() center!: HealthCenter;
  @Input() role!: UserRole;
  @Output() createdAndHide = new EventEmitter<void>();
}
