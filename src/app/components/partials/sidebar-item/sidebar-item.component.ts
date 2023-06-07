import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-sidebar-item',
  templateUrl: './sidebar-item.component.html',
  standalone: true,
})
export class SidebarItemComponent {
  @Input()
  title: string = '';
}
