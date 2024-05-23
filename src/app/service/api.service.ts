import { Injectable, inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class ApiService {
  private http = inject(HttpClient);

  getData() {
    const obs = this.http.get(
      'https://www.preguntapi.dev/api/categories/javascript?level=facil&limit=5'
    );

    return obs;
  }
  constructor() {}
}
