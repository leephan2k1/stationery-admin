import { Component } from '@angular/core';
import { EmployeePermissionsComponent } from '../employee-permissions/employee-permissions.component';
import { EmployeeShowComponent } from '../employee-show/employee-show.component';

@Component({
  imports: [EmployeePermissionsComponent, EmployeeShowComponent],
  selector: 'app-hr-container',
  templateUrl: './hr-container.component.html',
  standalone: true,
})
export class HrContainerComponent {}
