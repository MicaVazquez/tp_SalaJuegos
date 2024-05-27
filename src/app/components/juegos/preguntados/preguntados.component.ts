import { Component } from '@angular/core';
import { ApiService } from '../../../service/api.service';
import { Pregunta } from '../../../interfaces/pregunta';
import { NgClass } from '@angular/common';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { MatCardModule } from '@angular/material/card';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [NgClass, NavBarComponent, MatCardModule],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css',
})
export class PreguntadosComponent {
  constructor(private apiService: ApiService) {}

  questions!: any[];
  preguntaElegida!: Pregunta;
  pregunta!: string;

  opciones!: any[];

  estado!: boolean;
  estadoBtn: boolean = false;
  contadorCorrectas!: number;
  segundos!: number;
  public interval!: any;

  categoriaMapeada: string = '';

  mapeoCategorias: { [key: string]: string } = {
    geography: 'Geografía',
    entertainment: 'Entretenimiento',
    'science&nature': 'Ciencia y Naturaleza',
    'sports&leisure': 'Deportes y Ocio',
    history: 'Historia',
  };

  ngOnInit(): void {
    this.interval = setInterval(() => this.tick(), 1000);
    this.iniciar();
  }

  iniciar() {
    this.estado = true;
    this.elegirAleatoria();
    this.contadorCorrectas = 0;
    this.segundos = 60;
  }

  private tick(): void {
    if (this.estado) {
      if (this.segundos == 0) {
        this.estado = false;
        // this.reinciarSegundos();
      } else {
        --this.segundos;
      }
    }
  }

  elegirAleatoria() {
    this.estadoBtn = false;
    this.apiService.getData().subscribe((data: any) => {
      const questions = data.questions;

      if (questions && questions.length > 0) {
        const index = Math.floor(Math.random() * questions.length);
        this.preguntaElegida = questions[index];

        this.pregunta = this.preguntaElegida.question;
        this.categoriaMapeada =
          this.mapeoCategorias[this.preguntaElegida.category];
        console.log(this.categoriaMapeada);
        this.opciones = [
          ...this.preguntaElegida.incorrectAnswers.map((answer: string) => ({
            texto: answer,
            estado: 'no-seleccionada',
          })),
          {
            texto: this.preguntaElegida.correctAnswers,
            estado: 'no-seleccionada',
          },
        ];

        this.shuffleArray(this.opciones);
      }
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
      } else if (op.texto === this.preguntaElegida.correctAnswers) {
        op.estado = 'success';
      }
      return op;
    });

    if (opcion.texto === this.preguntaElegida.correctAnswers) {
      this.contadorCorrectas++;
    }

    setTimeout(() => {
      this.iniciar();
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
}
