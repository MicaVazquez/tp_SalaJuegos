import { Component } from '@angular/core';
import { RouterOutlet, RouterLink } from '@angular/router';
import { UserDataService } from './service/user-data.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, RouterLink],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'tpSalaJuegos';

  constructor(private userDataSvc: UserDataService) {
    const ls = localStorage.getItem('mail');

    if (ls) {
      this.userDataSvc.mail.set(ls);
    }
  }
}
