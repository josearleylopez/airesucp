import { Component, OnInit } from '@angular/core';
import { VuelosService} from '../../services/vuelos.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-vuelos',
  templateUrl: './vuelos.component.html',
  styles: []
})
export class VuelosComponent implements OnInit {
  errorMensaje = null;
  loading = false;
  vuelos = [
    // {
    //   id:"1",
    //   origen: "Pereira",
    //   destino: "Cartagena",
    //   fecha: "04/10/2017",
    //   hora:"10:00",
    //   pasajeros:"150",
    //   estado:"A",
    // },
    // {
    //   id:"2",
    //   origen: "Bogota",
    //   destino: "Pereira",
    //   fecha: "04/10/2017",
    //   hora:"15:00",
    //   pasajeros:"98",
    //   estado:"A",
    // }
  ]
  constructor(private _vuelosService:VuelosService,
              private router:Router) { }

  ngOnInit() {
    this.loading = true;
    this._vuelosService.consultarVuelos().subscribe(
      respuesta=>{
        this.loading = false;
        if (respuesta.exito) {
            this.vuelos = respuesta.lstVuelos;
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

  agregarNuevo() {
    this.router.navigate(['/vuelo', 'nuevo']);
  }


}
