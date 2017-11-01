import { Component, OnInit } from '@angular/core';
import { ReservasService} from '../../services/reservas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-reservas',
  templateUrl: './reservas.component.html',
  styles: []
})
export class ReservasComponent implements OnInit {
    errorMensaje = null;
    loading = false;
    reservando = false;
    reservas = []
    constructor(private _reservasService:ReservasService,
                private router:Router) { }

    ngOnInit() {
      this.loading = true;
      this._reservasService.consultarReservas().subscribe(
        respuesta=>{
          this.loading = false;
          if (respuesta.exito) {
              this.reservas = respuesta.lstDatosReservas
          }
          else{
            this.errorMensaje = respuesta.mensaje;
          }
        },
        error => {
          this.errorMensaje  = <any>error;
          if (this.errorMensaje!=null) {
            console.log("Error",this.errorMensaje);
          }
        }
      )
    }

    confirmarReserva(reservaId){
      this.reservando = true;
      this._reservasService.confirmarReserva(reservaId).subscribe(
        respuesta=>{
          this.reservando = false;
          if (respuesta.exito) {
              alert(respuesta.mensaje);
          }
          else{
            this.errorMensaje = respuesta.mensaje;
            alert(respuesta.mensaje);
          }
        },
        error => {
          this.errorMensaje  = <any>error;
          if (this.errorMensaje!=null) {
            console.log("Error",this.errorMensaje);
          }
        }
      )
    }

}
