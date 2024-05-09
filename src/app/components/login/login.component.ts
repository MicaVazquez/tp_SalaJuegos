import { Component, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { RouterLink, RouterOutlet, Router } from '@angular/router';
import { AuthService } from '../../service/auth.service';
import { UserDataService } from '../../service/user-data.service';
import { concat } from 'rxjs';
import { HomeComponent } from '../home/home.component';
import { Log } from '../../interfaces/log';
import { User } from '../../clases/user';
import { ToastrService } from 'ngx-toastr';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [RouterOutlet, FormsModule, NavBarComponent],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  // router2 = inject(Router);

  loginObj: any = {
    email: '',
    password: '',
  };

  constructor(
    private authS: AuthService,
    private router: Router,
    private userData: UserDataService
  ) {}

  submit() {
    this.authS
      .login(this.loginObj.email, this.loginObj.password)

      .then((response) => {
        const user = new User(this.loginObj.email, this.loginObj.password);

        const log: Log = {
          user: { email: `${user.email}`, pass: `${user.password}` },
          fecha: new Date(),
        };

        this.userData.agregarLog(log);
        this.userData.mail.set(this.loginObj.email);

        this.router.navigateByUrl('home');
      })
      .catch((error) => console.log(error));
  }

  llenarCampos(email: string, password: string) {
    this.loginObj.email = email;
    this.loginObj.password = password;
  }
}
