import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { Pregunta } from '../../../interfaces/pregunta';
import { NgClass } from '@angular/common';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { MatCardModule } from '@angular/material/card';
import { MatIcon } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [
    NgClass,
    NavBarComponent,
    MatCardModule,
    MatIcon,
    MatProgressSpinnerModule,
  ],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css',
})
export class PreguntadosComponent {
  constructor(private apiService: ApiService) {}

  mostrarIntroduccion: boolean = true;
  questions!: any[];
  preguntaElegida!: Pregunta;
  pregunta!: string;
  opciones!: any[];

  estado!: boolean;
  estadoBtn: boolean = false;

  contadorCorrectas: number = 0;
  segundos = 60;
  interval!: any;
  tiempoFinalizado = false;
  intervalId: any;
  cargando: boolean = false;

  categoriaMapeada: string = '';
  mensajeFinal: string = '';
  icon: string = '';

  mapeoCategorias: { [key: string]: string } = {
    geography: 'Geografía',
    entertainment: 'Entretenimiento',
    'science&nature': 'Ciencia y Naturaleza',
    'sports&leisure': 'Deportes y Ocio',
    history: 'Historia',
  };

  iniciarJuego() {
    this.mostrarIntroduccion = false;
    this.contadorCorrectas = 0;
    this.segundos = 60;
    this.tiempoFinalizado = false;
    this.estadoBtn = false;
    this.iniciarCuentaRegresiva();
    this.elegirAleatoria();
  }

  iniciarCuentaRegresiva() {
    this.intervalId = setInterval(() => {
      if (this.segundos > 0) {
        this.segundos--;
      } else {
        this.finalizarTiempo();
      }
    }, 1000);
  }

  finalizarTiempo() {
    clearInterval(this.intervalId);
    this.tiempoFinalizado = true;
    this.estadoBtn = true;
    this.mostrarMensajeFinal();
  }

  ngOnDestroy() {
    clearInterval(this.intervalId);
  }

  elegirAleatoria() {
    this.cargando = true;
    this.estadoBtn = false;
    this.apiService.getData().subscribe((data: any) => {
      const questions = data.questions;

      if (questions && questions.length > 0) {
        const index = Math.floor(Math.random() * questions.length);
        this.preguntaElegida = questions[index];

        this.pregunta = this.preguntaElegida.question;
        this.categoriaMapeada =
          this.mapeoCategorias[this.preguntaElegida.category];
        this.opciones = [
          ...this.preguntaElegida.incorrectAnswers.map((answer: string) => ({
            texto: answer,
            estado: 'primary',
          })),
          {
            texto: this.preguntaElegida.correctAnswers,
            estado: 'primary',
          },
        ];

        this.shuffleArray(this.opciones);
      }
      this.cargando = false;
    });
  }

  comprobar(opcion: { texto: string; estado: string }): void {
    if (this.estadoBtn) {
      return;
    }

    this.estadoBtn = true;
    this.opciones = this.opciones.map((op) => {
      if (op.texto === opcion.texto) {
        op.estado =
          opcion.texto === this.preguntaElegida.correctAnswers
            ? 'success'
            : 'danger';
      } else {
        op.estado =
          op.texto === this.preguntaElegida.correctAnswers
            ? 'success'
            : 'secondary';
      }
      return op;
    });

    if (opcion.texto === this.preguntaElegida.correctAnswers) {
      this.contadorCorrectas++;
    }

    setTimeout(() => {
      this.elegirAleatoria();
    }, 1000);
  }

  shuffleArray(array: any[]) {
    array.sort(() => Math.random() - 0.5);
  }

  obtenerColorHeader(): string {
    switch (this.categoriaMapeada) {
      case 'Geografía':
        return 'header-geografia';
      case 'Entretenimiento':
        return 'header-entretenimiento';
      case 'Ciencia y Naturaleza':
        return 'header-ciencia';
      case 'Deportes y Ocio':
        return 'header-deportes';
      case 'Historia':
        return 'header-historia';
      default:
        return '';
    }
  }

  volverAJugar() {
    this.mostrarIntroduccion = true;
    this.contadorCorrectas = 0;
    this.segundos = 60;
    this.tiempoFinalizado = false;
    this.estadoBtn = false;
  }

  mostrarMensajeFinal() {
    if (this.contadorCorrectas >= 10) {
      this.mensajeFinal = '¡GANASTE! ¡Felicidades!';
      this.icon = 'mood';
    } else {
      this.mensajeFinal = '¡PERDISTE! Inténtalo de nuevo.';
      this.icon = 'sentiment_dissatisfied';
    }
  }
}
