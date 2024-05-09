import { Component } from '@angular/core';
import { NavBarComponent } from '../nav-bar/nav-bar.component';

@Component({
  selector: 'app-presentacion',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './presentacion.component.html',
  styleUrl: './presentacion.component.css',
})
export class PresentacionComponent {}
