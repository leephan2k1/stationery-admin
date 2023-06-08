import { Component } from '@angular/core';
import { CategoryEditComponent } from '../category-edit/category-edit.component';
import { CategoryShowComponent } from '../category-show/category-show.component';

@Component({
  imports: [CategoryEditComponent, CategoryShowComponent],
  selector: 'app-category-container',
  templateUrl: './category-container.component.html',
  standalone: true,
})
export class CategoryContainerComponent {}
