import { Component, OnInit } from '@angular/core';
import { CompleterService, CompleterData } from 'ng2-completer';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { VuelosService} from '../../services/vuelos.service';
import {IMyDpOptions} from 'mydatepicker';

@Component({
  selector: 'app-vuelo',
  templateUrl: './vuelo.component.html',
  styles: []
})
export class VueloComponent implements OnInit {
  public myDatePickerOptions: IMyDpOptions = {
        dateFormat: 'dd/mm/yyyy',
        showClearDateBtn: true,
        dayLabels:{su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab'},
        monthLabels:{ 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
        todayBtnTxt:'Hoy'
    };
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
  fecha: any = { date: { year: 2018, month: 10, day: 9 } };

  constructor(private router: Router,
              private activatedRoute: ActivatedRoute,
              private _vuelosService:VuelosService,
              private completerService: CompleterService){
    // private completerService: CompleterService

    this.forma = new FormGroup({
        'idVuelo': new FormControl(''),
        'ciudadOrigen': new FormControl('',[Validators.required]),
        'ciudadDestino': new FormControl('', [Validators.required]),
        'fecha': new FormControl(null, [Validators.required]),
        'hora': new FormControl('', [Validators.required,Validators.pattern("^([0-9]|0[0-9]|1[0-9]|2[0-3]):[0-5][0-9]$")]),
        'tiempoEstimado': new FormControl('', [Validators.required, Validators.pattern("^[1-9]{1}[0-9]*$")]),
        'cantSillas': new FormControl('', [Validators.required,Validators.pattern("^[1-9]{1}[0-9]*$")]),
        'estado': new FormControl('')
      });

    this._vuelosService.consultarCiudades()
      .subscribe(respuesta => {
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
        this.id = parametros['id'];
        if (this.id !== "nuevo") {
          this.actualizar = true;
          this._vuelosService.consultarVuelos(this.id)
            .subscribe(respuesta => {
              // console.log(respuesta);
              if (respuesta.exito) {
                this.vuelo = respuesta.lstVuelos[0];
                this.forma.setValue(this.vuelo);
                this.setDate(this.vuelo.fecha);
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

  setDate(fecha = null): void {
        let date = new Date();
        if (fecha) {
          date = this.toDate(fecha) ;
        }
        this.forma.patchValue({fecha: {
        date: {
            year: date.getFullYear(),
            month: date.getMonth() + 1,
            day: date.getDate()}
        }});
    }

  toDate(dateStr) {
      let [day, month, year] = dateStr.split("/")
      return new Date(year, month - 1, day)
  }

  clearDate(): void {
        this.forma.patchValue({fecha: null});
    }
}
