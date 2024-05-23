import { Component, inject } from '@angular/core';
import { ApiService } from '../../../service/api.service';

@Component({
  selector: 'app-preguntados',
  standalone: true,
  imports: [],
  templateUrl: './preguntados.component.html',
  styleUrl: './preguntados.component.css',
})
export class PreguntadosComponent {
  preguntas: any[] = [];
  currentQuestionIndex = 0;
  currentQuestion: any;
  puntaje: number = 0;

  constructor(private apiSrv: ApiService) {}

  // ngOnInit(): void {
  //   this.apiSrv.getData().subscribe((data) => {
  //     this.preguntas = data.results;
  //     this.setCurrentQuestion();
  //   });
  // }

  setCurrentQuestion() {
    if (this.preguntas.length > 0) {
      this.currentQuestion = this.preguntas[this.currentQuestionIndex];
      // Mezclar respuestas
      this.currentQuestion.answers = [
        ...this.currentQuestion.incorrect_answers,
        this.currentQuestion.correct_answer,
      ];
      this.shuffle(this.currentQuestion.answers);
    }
  }

  selectAnswer(answer: string) {
    if (answer === this.currentQuestion.correct_answer) {
      this.puntaje++;
    }
    this.currentQuestionIndex++;
    if (this.currentQuestionIndex < this.preguntas.length) {
      this.setCurrentQuestion();
    } else {
      // Lógica para cuando se terminan las preguntas, por ejemplo, mostrar resultados
      alert(`Juego Terminado! Tu puntuación es: ${this.puntaje}`);
    }
  }

  onBtn() {
    // Aquí podrías resetear el juego, por ejemplo
    this.currentQuestionIndex = 0;
    this.puntaje = 0;
    this.setCurrentQuestion();
  }

  shuffle(array: any[]) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
  }
}
