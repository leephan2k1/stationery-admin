import { Component } from '@angular/core';
import { BrandShowComponent } from '../brand-show/brand-show.component';
import { BrandEditComponent } from '../brand-edit/brand-edit.component';

@Component({
  imports: [BrandShowComponent, BrandEditComponent],
  selector: 'app-brand-container',
  templateUrl: './brand-container.component.html',
  standalone: true,
})
export class BrandContainerComponent {}
