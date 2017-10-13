import { Component, OnInit } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VuelosService} from '../../services/vuelos.service';
import {Observable} from 'rxjs/Observable';
import 'rxjs/Rx';

@Component({
  selector: 'app-vuelo',
  templateUrl: './vuelo.component.html',
  styles: []
})
export class VueloComponent implements OnInit {
  loading:boolean = false;
  errorMensaje;
  vuelo = {
    idVuelo: "",
    ciudadOrigen: "",
    ciudadDestino: "",
    fecha: "",
    hora: "",
    tiempoEstimado:"",
    cantSillas:"",
    estado:""
  }

  forma: FormGroup;
  id:string;
  actualizar:boolean=false;
  ciudades =[];
  dataService: CompleterData;
  ciudad: string;
  ciudadesLeidas=false;

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _vuelosService:VuelosService,
              private completerService: CompleterService){
    // private completerService: CompleterService

    this.forma = new FormGroup({
        'idVuelo': new FormControl(''),
        'ciudadOrigen': new FormControl('',[Validators.required]),
        'ciudadDestino': new FormControl('', [Validators.required]),
        'fecha': new FormControl('', [Validators.required]),
        'hora': new FormControl('', [Validators.required]),
        'tiempoEstimado': new FormControl('', [Validators.required]),
        'cantSillas': new FormControl('', [Validators.required]),
        'estado': new FormControl('')
      });

    this._vuelosService.consultarCiudades()
      .subscribe(respuesta => {
        console.log("Respuesta",respuesta)
        this.ciudades = respuesta;
        this.dataService = completerService.local(this.ciudades, 'nombreCiudad', 'nombreCiudad');
      },
      error => {
        this.ciudades = this._vuelosService.getCiudades();
        this.dataService = completerService.local(this.ciudades, 'nombreCiudad', 'nombreCiudad');
        this.errorMensaje  = <any>error;
        if (this.errorMensaje!=null) {
          console.log(this.errorMensaje);
          // alert("Lista de ciudades no leída");
        }
      })

    this.activatedRoute.params
      .subscribe(parametros => {
        console.log(parametros);
        this.id = parametros['id'];
        if (this.id !== "nuevo") {
          this.actualizar = true;
          this._vuelosService.consultarVuelos(this.id)
            .subscribe(respuesta => {
              // console.log(respuesta);
              if (respuesta.exito) {
                this.vuelo = respuesta.lstVuelos[0];
                this.forma.setValue(this.vuelo);
              }
              else {
                this.errorMensaje = respuesta.mensaje;
              }
            },
            error => {
              this.errorMensaje = <any>error;
              if (this.errorMensaje != null) {
                console.log("Error", this.errorMensaje);
              }
            })
        }
      })
  }

  ngOnInit() {
  }

  agregarNuevo() {
    this.router.navigate(['/vuelo', 'nuevo']);
    this.forma.reset();
  }

  guardarFormulario(){
    console.log("vuelo",this.vuelo);
    console.log("Valor forma",this.forma.value);

    this.loading = true;
    if (this.id == "nuevo") {
      //Insertando vuelo
      this._vuelosService.nuevoVuelo(this.forma.value)
        .subscribe(respuesta => {
          if (respuesta.exito) {
            alert(respuesta.mensaje);
            this.router.navigate(['/vuelos'])
            this.loading = false;
          }
          else {
            this.errorMensaje = respuesta.mensaje;
          }
        },
        error => console.error(error));
    } else {
      //Actualizando vuelo
      this._vuelosService.actualizarVuelo(this.forma.value)
        .subscribe(respuesta => {
          if (respuesta.exito) {
            alert(respuesta.mensaje);
            this.loading = false;
          }
          else {
            this.errorMensaje = respuesta.mensaje;
          }
        },
        error => console.error(error));
    }
  }
}
