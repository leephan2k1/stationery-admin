import { Component } from '@angular/core';
import { SidebarComponent } from 'src/app/components/partials/sidebar/sidebar.component';

@Component({
  selector: 'app-home',
  imports: [SidebarComponent],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss'],
  standalone: true
})
export class HomeComponent {

}
