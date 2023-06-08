import { Component } from '@angular/core';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  imports: [PaginationComponent],
  selector: 'app-employee-show',
  templateUrl: './employee-show.component.html',
  standalone: true,
})
export class EmployeeShowComponent {}
