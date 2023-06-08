import { Component } from '@angular/core';
import { PaginationComponent } from '../../shared/pagination/pagination.component';

@Component({
  imports: [PaginationComponent],
  selector: 'app-category-show',
  templateUrl: './category-show.component.html',
  standalone: true,
})
export class CategoryShowComponent {

}
