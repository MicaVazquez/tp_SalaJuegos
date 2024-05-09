import { Component, computed } from '@angular/core';
import { UserDataService } from '../../service/user-data.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  userMail = computed(() => this.userDataSvc.mail());

  constructor(private userDataSvc: UserDataService, private router: Router) {}

  redirigir(path: string) {
    this.router.navigateByUrl(path);
  }
}
