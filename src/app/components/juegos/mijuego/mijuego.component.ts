import { Component } from '@angular/core';
import { Toast } from 'ngx-toastr';
import { NavBarComponent } from '../../nav-bar/nav-bar.component';

@Component({
  selector: 'app-mijuego',
  standalone: true,
  imports: [NavBarComponent],
  templateUrl: './mijuego.component.html',
  styleUrl: './mijuego.component.css',
})
export class MijuegoComponent {
  private context: CanvasRenderingContext2D | null = null;

  ngAfterViewInit(): void {
    this.initCanvas();
    this.animaciones();
  }

  private initCanvas(): void {
    const canvas = document.querySelector('#canvas') as HTMLCanvasElement;
    this.context = canvas.getContext('2d');
    if (!this.context) {
      console.error('Error al obtener el contexto del canvas');
    }
  }

  private animaciones(): void {
    window.requestAnimationFrame(this.animacion.bind(this));
  }

  private animacion(): void {
    if (this.context) {
      // Tu código de animación aquí
      this.context.clearRect(0, 0, 500, 500); // Limpiar el canvas
      this.context.fillStyle = 'red';
      this.context.fillRect(50, 50, 100, 100); // Dibujar un rectángulo rojo como ejemplo
    }
    // Llama a requestAnimationFrame nuevamente para continuar el bucle de animación
    window.requestAnimationFrame(this.animacion.bind(this));
  }

  // public mostrar: string = '';
  // public secuenciaComparar: string = '';
  // public puntos: number = 0;
  // public secuenciaOculta: string = '';
  // public bloqueoPanel: boolean;
  // public seleccionJugador: string = '';
  // public claseBtnIniciar = 'btn btn-success btn-block';
  // public btnIniciar = 'Iniciar';
  // constructor() {
  //   this.bloqueoPanel = true;
  // }
  // ngOnInit(): void {}
  // Iniciar() {
  //   this.btnIniciar = 'Reiniciar';
  //   this.claseBtnIniciar = 'btn btn-danger btn-block';
  //   this.bloqueoPanel = false;
  //   this.ReiniciarValores();
  //   this.GenerarNuevaSecuencia();
  // }
  // public ReiniciarValores() {
  //   this.mostrar = '';
  //   this.secuenciaComparar = '';
  //   this.puntos = 0;
  //   this.secuenciaOculta = '';
  //   this.seleccionJugador = '';
  // }
  // public GenerarNuevaSecuencia() {
  //   this.mostrar = this.secuenciaOculta;
  //   let recibo = Math.floor(Math.random() * (9 - 1)) + 1;
  //   this.secuenciaComparar += '' + recibo;
  //   this.mostrar += recibo + ' - ';
  //   setTimeout(() => {
  //     this.secuenciaOculta = this.mostrar;
  //     this.mostrar = '';
  //   }, this.secuenciaComparar.length * 1000);
  // }
  // public ElegirNumero(numero: number) {
  //   if (!this.bloqueoPanel) {
  //     let error = false;
  //     this.seleccionJugador += numero.toString();
  //     for (let i = 0; i < this.seleccionJugador.length; i++) {
  //       if (!(this.seleccionJugador[i] == this.secuenciaComparar[i])) {
  //         error = true;
  //         break;
  //       }
  //     }
  //     if (error) {
  //       this.Error();
  //     } else {
  //       if (this.seleccionJugador.length == this.secuenciaComparar.length) {
  //         this.EsCorrecto();
  //       }
  //     }
  //   }
  // }
  // public EsCorrecto() {
  //   this.seleccionJugador = '';
  //   this.puntos++;
  //   alert('Muy bien ya vas: ' + this.puntos); // Mostrar alerta convencional de JavaScript
  //   setTimeout(() => {
  //     this.GenerarNuevaSecuencia();
  //   }, 1000);
  // }
  // public Error() {
  //   alert('Te has equivocado, número de aciertos: ' + this.puntos); // Mostrar alerta convencional de JavaScript
  //   this.bloqueoPanel = true;
  // }
}
