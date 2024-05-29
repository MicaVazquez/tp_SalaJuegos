import { Component, ElementRef, ViewChild } from '@angular/core';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatCard, MatCardModule } from '@angular/material/card';
@Component({
  selector: 'app-ahorcado',
  standalone: true,
  imports: [NavBarComponent, MatButtonModule, MatIconModule, MatCardModule],
  templateUrl: './ahorcado.component.html',
  styleUrl: './ahorcado.component.css',
})
export class AhorcadoComponent {
  mostrarExplicacion: boolean = false;
  palabraSecreta!: string;
  pista!: string;
  btnVisible: boolean = true;
  cant_aciertos = 0;
  cant_errores = 0;
  img: string = '../../../../assets/ahorcado/0.jpg';
  pistas = [
    'Fruta roja o verde',
    'Prenda de vestir',
    'Dulce pequeño',
    'Plato de pasta',
    'Persona que transmite en vivo',
    'Plataforma de streaming',
    'Dispositivo para amplificar la voz',
    'Lo que usas para vestirte',
    'Objeto para mejorar la visión',
    'Lugar para hacer ejercicio',
  ];
  palabras = [
    'manzana',
    'camiseta',
    'caramelo',
    'ñoquis',
    'streamer',
    'twitch',
    'microfono',
    'ropa',
    'anteojo',
    'gymnasio',
  ];

  iniciar() {
    this.limpiarPalabraAdivinar();
    this.cargarResultado('');
    this.cant_aciertos = 0;
    this.cant_errores = 0;
    const cant_palabras = this.palabras.length;
    const valor_mas_bajo = 0;
    const valor_al_azar = this.obtenerRamdom(valor_mas_bajo, cant_palabras);
    this.palabraSecreta = this.palabras[valor_al_azar];
    this.pista = this.pistas[valor_al_azar];
    this.img = '../../../../assets/ahorcado/0.jpg';
    this.btnVisible = false;

    this.toggleButtons(false);
    this.btnVisible = false;
  }

  obtenerRamdom(num_min: number, num_max: number) {
    const amplitud_valores = num_max - num_min;
    const valor_al_azar =
      Math.floor(Math.random() * amplitud_valores) + num_min;
    return valor_al_azar;
  }

  ngAfterViewInit(): void {
    const btn_letras = document.querySelectorAll('#letras button');
    for (let i = 0; i < btn_letras.length; i++) {
      btn_letras[i].addEventListener('click', (event) =>
        this.clickLetras(event)
      );
    }
    this.finalizarJuego();
  }

  clickLetras(event: MouseEvent | Event) {
    const button = event.target as HTMLButtonElement;
    button.disabled = true;
    const letra = button.innerHTML.toLowerCase();
    const palabra = this.palabraSecreta.toLowerCase();

    let acerto = false;
    for (let i = 0; i < palabra.length; i++) {
      if (letra === palabra[i]) {
        const spans = document.querySelectorAll('#palabra_a_adivinar span');
        if (spans && spans[i]) {
          spans[i].innerHTML = letra;
        }
        acerto = true;
        this.cant_aciertos++;
      }
    }

    if (!acerto) {
      this.cant_errores++;
      const source = `../../../../assets/ahorcado/${this.cant_errores}.jpg`;
      this.img = source;
    }

    if (this.cant_errores >= 7) {
      this.img = `../../../../assets/ahorcado/8.jpg`;
      this.finalizarJuego();
      this.cargarResultado(`La palabra era ${palabra}`);
    } else if (this.cant_aciertos == palabra.length) {
      this.img = `../../../../assets/ahorcado/9.jpg`;
      this.finalizarJuego();
    }
  }

  finalizarJuego() {
    this.toggleButtons(true);
    this.btnVisible = true;
    this.cargarResultado('');
  }

  toggleButtons(disable: boolean) {
    const btn_letras =
      document.querySelectorAll<HTMLButtonElement>('#letras button');
    for (let i = 0; i < btn_letras.length; i++) {
      btn_letras[i].disabled = disable;
    }
  }

  limpiarPalabraAdivinar() {
    const spans = document.querySelectorAll('#palabra_a_adivinar span');
    spans.forEach((span) => {
      span.innerHTML = '';
    });
  }

  cargarResultado(content: string) {
    const resultadoElement = document.getElementById('resultado');
    if (resultadoElement) {
      resultadoElement.innerHTML = content;
    }
  }
}
