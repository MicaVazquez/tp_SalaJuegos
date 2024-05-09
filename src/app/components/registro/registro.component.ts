import { Component, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { AuthService } from '../../service/auth.service';
import { User } from '../../clases/user';
import { Route, Router } from '@angular/router';
import { FormsModule } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../service/user.service';
import { IUser } from '../../interfaces/user';
import { NavBarComponent } from '../nav-bar/nav-bar.component';
import { UserDataService } from '../../service/user-data.service';

@Component({
  selector: 'app-registro',
  standalone: true,
  imports: [FormsModule, NavBarComponent],
  templateUrl: './registro.component.html',
  styleUrl: './registro.component.css',
})
export class RegistroComponent {
  signupObj: any = {
    email: '',
    password: '',
  };

  toastScv = inject(ToastrService);

  users: User[] = [];

  constructor(
    private authS: AuthService,
    private router: Router,
    private user: UserService,
    private userDataSvc: UserDataService
  ) {}

  onSignUp() {
    if (!this.signupObj.email || !this.signupObj.password) {
      this.toastScv.error('Por favor, complete todos los campos');
      return;
    }

    this.authS
      .register(this.signupObj.email, this.signupObj.password)
      .then((response) => {
        // const user = new User(this.signupObj.email, this.signupObj.pass);

        // this.user.agregarUser(user);
        this.userDataSvc.mail.set(this.signupObj.email);
        this.toastScv.success('Logeo con exito!');
        this.router.navigateByUrl('home');
      })
      .catch((error) => {
        this.toastScv.error('Este email ya esta registrado');
      });
  }
}
