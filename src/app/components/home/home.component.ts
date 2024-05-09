import { Component, Input, computed } from '@angular/core';
import { Route, Router, RouterLink, RouterOutlet } from '@angular/router';
import { UserDataService } from '../../service/user-data.service';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { ChatComponent } from '../chat/chat.component';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [RouterLink, RouterOutlet, NavBarComponent, ChatComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.css',
})
export class HomeComponent {
  email = computed(() => this.userData.mail());

  constructor(private userData: UserDataService, private route: Router) {
    if (!this.email()) {
      this.route.navigateByUrl('login');
    }
  }
}
