import { Component, output } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { MatButtonModule } from '@angular/material/button';
import { MatIcon } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
import { MatToolbarModule } from '@angular/material/toolbar';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';

@Component({
  selector: 'app-mayoromenor',
  standalone: true,
  imports: [
    MatButtonModule,
    MatIcon,
    MatToolbarModule,
    MatCardModule,
    NavBarComponent,
  ],
  templateUrl: './mayoromenor.component.html',
  styleUrl: './mayoromenor.component.css',
})
export class MayoromenorComponent {
  constructor() {}

  cartaActual = { src: '', numero: 0 };
  cartaAnterior = { src: '', numero: 0 };
  cartasAux: any[] = [];
  cartas = [
    { src: '../../../../assets/mayor-menor/A_pica.png', numero: 1 },
    { src: '../../../../assets/mayor-menor/A_trebol.png', numero: 1 },
    { src: '../../../../assets/mayor-menor/A_diamante.png', numero: 1 },
    { src: '../../../../assets/mayor-menor/A_corazón.png', numero: 1 },
    { src: '../../../../assets/mayor-menor/2_pica.png', numero: 2 },
    { src: '../../../../assets/mayor-menor/3_corazón.png', numero: 3 },
    { src: '../../../../assets/mayor-menor/4_corazón.png', numero: 4 },
    { src: '../../../../assets/mayor-menor/4_diamante.png', numero: 4 },
    { src: '../../../../assets/mayor-menor/4_pica.png', numero: 4 },
    { src: '../../../../assets/mayor-menor/4_trebol.png', numero: 4 },
    { src: '../../../../assets/mayor-menor/5_corazón.png', numero: 5 },
    { src: '../../../../assets/mayor-menor/5_diamante.png', numero: 5 },
    { src: '../../../../assets/mayor-menor/5_pica.png', numero: 5 },
    { src: '../../../../assets/mayor-menor/6_pica.png', numero: 6 },
    { src: '../../../../assets/mayor-menor/7_diamante.png', numero: 7 },
    { src: '../../../../assets/mayor-menor/8_trebol.png', numero: 8 },
    { src: '../../../../assets/mayor-menor/8_corazón.png', numero: 8 },
    { src: '../../../../assets/mayor-menor/8_diamante.png', numero: 8 },
    { src: '../../../../assets/mayor-menor/8_pica.png', numero: 8 },
    { src: '../../../../assets/mayor-menor/9_pica.png', numero: 9 },
    { src: '../../../../assets/mayor-menor/10_corazón.png', numero: 10 },
    { src: '../../../../assets/mayor-menor/J_diamante.png', numero: 11 },
    { src: '../../../../assets/mayor-menor/J_pica.png', numero: 11 },
    { src: '../../../../assets/mayor-menor/J_trebol.png', numero: 11 },
    { src: '../../../../assets/mayor-menor/J_corazón.png', numero: 11 },
    { src: '../../../../assets/mayor-menor/Q_diamante.png', numero: 12 },
    { src: '../../../../assets/mayor-menor/K_trebol.png', numero: 13 },
    { src: '../../../../assets/mayor-menor/K_pica.png', numero: 13 },
    { src: '../../../../assets/mayor-menor/K_diamante.png', numero: 13 },
    { src: '../../../../assets/mayor-menor/K_corazón.png', numero: 13 },
  ];

  puntos!: number;
  empezado: boolean = false;
  finalizado: boolean = false;
  aciertos!: number;
  fallos!: number;
  intentos!: number;
  mostrarExplicacion: boolean = false;

  empezar() {
    this.cartasAux = this.shuffle(this.cartas.slice());
    const i = Math.floor(Math.random() * this.cartasAux.length);

    this.cartaActual = { ...this.cartasAux[i] };
    this.cartasAux.splice(i, 1);

    this.puntos = 0;
    this.empezado = true;
    this.aciertos = 0;
    this.finalizado = false;
    this.fallos = 0;
    this.intentos = 6;
  }

  proximaCarta() {
    if (this.cartasAux.length > 0) {
      const i = Math.floor(Math.random() * this.cartasAux.length);

      this.cartaAnterior = { ...this.cartaActual };
      this.cartaActual = { ...this.cartasAux[i] };

      this.cartasAux.splice(i, 1);
    }
  }

  cartaMayor() {
    this.proximaCarta();

    if (this.cartaAnterior.numero <= this.cartaActual.numero) {
      this.puntos += 1;
      this.aciertos++;
    } else {
      this.fallos++;
      this.intentos--;
    }

    this.verificarFinal();
  }

  cartaMenor() {
    this.proximaCarta();

    if (this.cartaAnterior.numero >= this.cartaActual.numero) {
      this.puntos += 1;
      this.aciertos++;
    } else {
      this.fallos++;
      this.intentos--;
    }

    this.verificarFinal();
  }

  verificarFinal() {
    if (this.intentos <= 0) {
      this.finalizado = true;
      this.empezado = false;
    }
  }

  shuffle(array: any[]) {
    let currentIndex = array.length,
      temporaryValue,
      randomIndex;

    while (0 !== currentIndex) {
      randomIndex = Math.floor(Math.random() * currentIndex);
      currentIndex -= 1;
      temporaryValue = array[currentIndex];
      array[currentIndex] = array[randomIndex];
      array[randomIndex] = temporaryValue;
    }

    return array;
  }
}
