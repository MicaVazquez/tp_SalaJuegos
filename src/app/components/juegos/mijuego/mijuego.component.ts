import { Component, HostListener } from '@angular/core';

import { NavBarComponent } from '../../nav-bar/nav-bar.component';
import { MatIcon } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatCard } from '@angular/material/card';

interface Enemigo {
  x: number;
  y: number;
  direccion: 'abajo' | 'izquierda';
  velocidad: number;
}
@Component({
  selector: 'app-mijuego',
  standalone: true,
  imports: [NavBarComponent, MatIcon, MatButtonModule, MatCard],
  templateUrl: './mijuego.component.html',
  styleUrl: './mijuego.component.css',
})
export class MijuegoComponent {
  jugadorX = 180;
  jugadorY = 180;
  puntuacion = 0;
  enemigos: Enemigo[] = [];
  intervaloJuego: any;
  intervaloEnemigos: any;
  juegoTerminado = false;
  juegoGanado = false;
  tiempoInicio!: number;
  mostrarExplicacion: boolean = false;
  mostrarBotonJugar = true;

  iniciarJuego(): void {
    this.tiempoInicio = Date.now();
    this.enemigos = [];
    this.puntuacion = 0;
    this.juegoTerminado = false;
    this.juegoGanado = false;
    this.mostrarBotonJugar = false;

    for (let i = 0; i < 4; i++) {
      this.agregarEnemigo();
    }

    this.intervaloJuego = setInterval(() => {
      this.actualizarEnemigos();
      this.verificarColisiones();
      this.actualizarPuntuacion();
      this.verificarCondicionVictoria();
    }, 50);

    this.intervaloEnemigos = setInterval(() => {
      if (this.enemigos.length < 5) {
        this.agregarEnemigo();
      }
    }, this.obtenerIntervaloEnemigos());
  }

  mover(direccion: string): void {
    if (this.juegoTerminado || this.juegoGanado) return;
    const paso = 20;
    switch (direccion) {
      case 'arriba':
        this.jugadorY = Math.max(0, this.jugadorY - paso);
        break;
      case 'abajo':
        this.jugadorY = Math.min(360, this.jugadorY + paso);
        break;
      case 'izquierda':
        this.jugadorX = Math.max(0, this.jugadorX - paso);
        break;
      case 'derecha':
        this.jugadorX = Math.min(360, this.jugadorX + paso);
        break;
    }
  }

  agregarEnemigo(): void {
    const direccion = Math.random() > 0.5 ? 'abajo' : 'izquierda';
    let x, y;
    if (direccion === 'abajo') {
      x = Math.floor(Math.random() * 380);
      y = 0;
    } else {
      x = 400;
      y = Math.floor(Math.random() * 380);
    }
    const velocidad = this.calcularVelocidadEnemigo();
    this.enemigos.push({ x, y, direccion, velocidad });
  }

  actualizarEnemigos(): void {
    this.enemigos = this.enemigos.map((enemigo) => {
      if (enemigo.direccion === 'abajo') {
        enemigo.y += enemigo.velocidad;
        if (enemigo.y > 400) {
          enemigo.y = 0;
          enemigo.x = Math.floor(Math.random() * 380);
        }
      } else {
        enemigo.x -= enemigo.velocidad;
        if (enemigo.x < 0) {
          enemigo.x = 400;
          enemigo.y = Math.floor(Math.random() * 380);
        }
      }
      return enemigo;
    });
  }

  verificarColisiones(): void {
    for (let enemigo of this.enemigos) {
      if (
        this.jugadorX < enemigo.x + 20 &&
        this.jugadorX + 40 > enemigo.x &&
        this.jugadorY < enemigo.y + 20 &&
        this.jugadorY + 40 > enemigo.y
      ) {
        this.terminarJuego(false);
      }
    }
  }

  actualizarPuntuacion(): void {
    this.puntuacion = Math.floor((Date.now() - this.tiempoInicio) / 1000);
  }

  verificarCondicionVictoria(): void {
    if (this.puntuacion >= 60) {
      this.terminarJuego(true);
    }
  }

  terminarJuego(ganado: boolean): void {
    clearInterval(this.intervaloJuego);
    clearInterval(this.intervaloEnemigos);
    this.juegoTerminado = !ganado;
    this.juegoGanado = ganado;
    this.mostrarBotonJugar = true;
  }

  calcularVelocidadEnemigo(): number {
    return 5;
  }

  obtenerIntervaloEnemigos(): number {
    return 1000 + Math.random() * 500;
  }

  @HostListener('document:keydown', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    switch (event.key) {
      case 'ArrowUp':
        this.mover('arriba');
        break;
      case 'ArrowDown':
        this.mover('abajo');
        break;
      case 'ArrowLeft':
        this.mover('izquierda');
        break;
      case 'ArrowRight':
        this.mover('derecha');
        break;
    }
  }

  moverConBoton(direccion: string): void {
    this.mover(direccion);
  }
}
