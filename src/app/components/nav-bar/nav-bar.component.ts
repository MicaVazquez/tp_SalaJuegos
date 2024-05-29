import { Component, computed } from '@angular/core';
import { UserDataService } from '../../service/user-data.service';
import { Router, RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { AuthService } from '../../service/auth.service';
import { user } from '@angular/fire/auth';

@Component({
  selector: 'app-nav-bar',
  standalone: true,
  imports: [MatButtonModule, MatIconModule],
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css',
})
export class NavBarComponent {
  userLogueado: any;
  email: any;

  constructor(
    private userDataSvc: UserDataService,
    private router: Router,
    public authSrv: AuthService
  ) {}

  redirigir(path: string) {
    this.router.navigateByUrl(path);
  }

  ngOnInit() {
    this.authSrv.obtenerUsuarioLogueado().subscribe((usuario) => {
      this.userLogueado = usuario;
    });
  }

  onClick() {
    this.authSrv
      .logout()
      .then(() => {
        this.router.navigate(['/login']);
      })
      .catch((error) => console.log(error));
  }
}
