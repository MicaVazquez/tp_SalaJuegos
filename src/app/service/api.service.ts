import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Pregunta } from '../interfaces/pregunta';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);
  private categorias = [
    'geography',
    'entertainment',
    'science%26nature',
    'sports%26leisure',
    'history',
  ];

  getData() {
    const apiKey =
      '$2b$12$dJxQudO/yI4JAlnRrx/VOOjN0GfoiF5Qk6jgWzQAcZwSap6QitJx6';
    const headers = new HttpHeaders().set('Authorization', apiKey);
    const categoriaAleatoria =
      this.categorias[Math.floor(Math.random() * this.categorias.length)];
    const obs = this.http.get(
      `https://api.quiz-contest.xyz/questions?limit=10&page=1&category=${categoriaAleatoria}&format=multiple`,
      { headers }
    );

    return obs;
  }
}
