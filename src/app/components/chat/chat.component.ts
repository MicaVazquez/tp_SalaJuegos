import { Component, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatIcon } from '@angular/material/icon';
import { FormsModule } from '@angular/forms';
import { NgClass } from '@angular/common';
import { AuthService } from '../../service/auth.service';
import { IMensaje } from '../../clases/mensaje';
import { MensajeService } from '../../service/mensaje.service';

@Component({
  selector: 'app-chat',
  standalone: true,
  imports: [
    MatButtonModule,
    MatCardModule,
    MatButtonToggleModule,
    MatIcon,
    FormsModule,
    NgClass,
  ],
  templateUrl: './chat.component.html',
  styleUrl: './chat.component.css',
})
export class ChatComponent implements OnInit {
  mostrarChat?: boolean;
  usuarioLogueado: any;
  newMessage: string = '';
  messages: any = [];

  sendMsj() {
    if (this.newMessage.trim().length === 0) {
      return;
    }

    const msjInfo: IMensaje = {
      texto: this.newMessage,
      fecha: new Date(),
      uid: this.usuarioLogueado.uid,
      email: this.usuarioLogueado.email,
    };

    this.newMessage = '';
    this.msjSrv.agregarMsj(msjInfo);

    setTimeout(() => {
      this.scrollToTheLastElementByClassName(), 20;
    });
  }

  ngOnInit(): void {
    this.authSrv.obtenerUsuarioLogueado().subscribe((usuario) => {
      this.usuarioLogueado = usuario;
    });
    this.msjSrv.getMensajesOrdenadosPorFecha().subscribe((list) => {
      this.messages = list;
    });
  }

  constructor(private authSrv: AuthService, private msjSrv: MensajeService) {}

  scrollToTheLastElementByClassName() {
    const container = document.getElementById('contenedor-msj');

    if (container) {
      const elements = container.getElementsByClassName('msj');
      let index = elements.length - 1;
      const ultimo: any = elements[index];
      const topPos = ultimo.offsetTop;
      container.scrollTop = topPos;
    }
  }

  formatTimestamp(timestamp: { seconds: number; nanoseconds: number }): string {
    const date = new Date(timestamp.seconds * 1000);
    return `${this.pad(date.getHours())}:${this.pad(date.getMinutes())}`;
  }

  pad(n: number): string {
    return n < 10 ? '0' + n : n.toString();
  }
}
