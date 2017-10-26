import { Component, OnInit } from '@angular/core';
import {IMyDpOptions} from 'mydatepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompleterService, CompleterData } from 'ng2-completer';
import { VuelosService} from '../../services/vuelos.service';

@Component({
  selector: 'app-buscar-vuelos',
  templateUrl: './buscar-vuelos.component.html',
  styles: []
})
export class BuscarVuelosComponent implements OnInit {
  public date = new Date();
  public myDatePickerOptions: IMyDpOptions = {
    dateFormat: 'dd/mm/yyyy',
    showClearDateBtn: true,
    dayLabels: { su: 'Dom', mo: 'Lun', tu: 'Mar', we: 'Mie', th: 'Jue', fr: 'Vie', sa: 'Sab' },
    monthLabels: { 1: 'Ene', 2: 'Feb', 3: 'Mar', 4: 'Abr', 5: 'May', 6: 'Jun', 7: 'Jul', 8: 'Ago', 9: 'Sep', 10: 'Oct', 11: 'Nov', 12: 'Dic' },
    todayBtnTxt: 'Hoy',
    disableUntil: { year: this.date.getFullYear(), month: this.date.getMonth() + 1, day: this.date.getDate() - 1 }
  };
  // public fechaSalida: any = { date: { year: 2017, month: 10, day: 13 } };
  public forma: FormGroup;
  private ciudades = [];
  public dataService: CompleterData;
  public errorMensaje;
  public loading = false;
  public resultado = false;
  public comprar = false;
  public vueloIda = {
    idVuelo: "0",
    ciudadOrigen: "Pereira",
    ciudadDestino: "Cartagena",
    fecha: "09/10/2017",
    hora: "10:07",
    tiempoEstimado: 1,
    cantSillas: 35,
    estado: "PENDIENTE"
  };
  public vueloRegreso = {
        idVuelo: "1",
        ciudadOrigen: "Cartagena",
        ciudadDestino: "Pereira",
        fecha: "15/10/2017",
        hora: "23:00",
        tiempoEstimado: 1,
        cantSillas: 35,
        estado: "ACTIVO"
      };
  public vuelosIda = [];
  public vuelosRegreso = [];

  constructor(private _vuelosService: VuelosService,
    private completerService: CompleterService) {
    this.forma = new FormGroup({
      'ciudadOrigen': new FormControl('', [Validators.required]),
      'ciudadDestino': new FormControl('', [Validators.required]),
      'fechaSalida': new FormControl(null, [Validators.required]),
      'fechaRegreso': new FormControl(null, [Validators.required]),
      'cantSillas': new FormControl('', [Validators.required, Validators.pattern("^[1-9]{1}")]),
    });
    this._vuelosService.consultarCiudades()
      .subscribe(respuesta => {
        console.log("Respuesta", respuesta)
        this.ciudades = respuesta;
        this.dataService = completerService.local(this.ciudades, 'nombreCiudad', 'nombreCiudad');
      },
      error => {
        this.ciudades = this._vuelosService.getCiudades();
        this.dataService = completerService.local(this.ciudades, 'nombreCiudad', 'nombreCiudad');
        this.errorMensaje = <any>error;
        if (this.errorMensaje != null) {
          console.log(this.errorMensaje);
          // alert("Lista de ciudades no leída");
        }
      });


  }

  ngOnInit() {
  }

  buscarVuelos() {
    this.resultado = false;
    this.loading = true;
    this._vuelosService.buscarVuelos(this.forma.value).subscribe(
      respuesta=>{
        // console.log(respuesta);
        if (respuesta.exito) {
            this.vuelosIda = respuesta.lstVuelos
            this.loading = false;
            this.resultado = true;
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
    );
    this._vuelosService.buscarVuelos(this.forma.value,true).subscribe(
      respuesta=>{
        // console.log(respuesta);
        if (respuesta.exito) {
            this.vuelosRegreso = respuesta.lstVuelos
            this.loading = false;
            this.resultado = true;
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

  reservarVuelo(){
    this.comprar = true;
  }

  setDate(): void {
    // Set today date using the patchValue function
    let date = new Date();
    this.forma.patchValue({
      fecha: {
        date: {
          year: date.getFullYear(),
          month: date.getMonth() + 1,
          day: date.getDate()
        }
      }
    });
  }
  clearDate(): void {
    // Clear the date using the patchValue function
    this.forma.patchValue({ myDate: null });
  }
}
