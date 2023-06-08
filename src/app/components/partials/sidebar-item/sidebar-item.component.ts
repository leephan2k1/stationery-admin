import { Component, Input } from '@angular/core';
import { RouterModule } from '@angular/router';

@Component({
  imports: [RouterModule],
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  standalone: true,
})
export class SidebarItemComponent {
  @Input()
  title: string = '';

  @Input()
  isActiveMenu: boolean = false;

  @Input()
  link: string = '';
}
