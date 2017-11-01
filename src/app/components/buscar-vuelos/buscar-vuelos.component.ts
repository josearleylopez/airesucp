import { Component, OnInit } from '@angular/core';
import { IMyDpOptions } from 'mydatepicker';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { CompleterService, CompleterData } from 'ng2-completer';
import { VuelosService} from '../../services/vuelos.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  public forma: FormGroup;
  private ciudades = [];
  public dataService: CompleterData;
  public errorMensaje;
  public loading = false;
  public resultado = false;
  public resultadoRegreso = false;
  public comprar = false;
  public vueloIda = {};
  public vueloRegreso = {};
  public vuelosIda = [];
  public numPasajeros = 0;
  public vuelosRegreso = [];

  constructor(private _vuelosService: VuelosService,
              private completerService: CompleterService,
              private router:Router) {
    this.forma = new FormGroup({
      'tipoVuelo': new FormControl('1'),
      'ciudadOrigen': new FormControl('', [Validators.required]),
      'ciudadDestino': new FormControl('', [Validators.required]),
      'fechaSalida': new FormControl(null, [Validators.required]),
      'fechaRegreso': new FormControl(null, [Validators.required]),
      'cantSillas': new FormControl('', [Validators.required, Validators.pattern("^[1-9]{1}")]),
    });
    this._vuelosService.consultarCiudades()
      .subscribe(respuesta => {
        this.ciudades = respuesta;
        this.dataService = completerService.local(this.ciudades, 'nombreCiudad', 'nombreCiudad');
      },
      error => {
        this.ciudades = this._vuelosService.getCiudades();
        this.dataService = completerService.local(this.ciudades, 'nombreCiudad', 'nombreCiudad');
        this.errorMensaje = <any>error;
        if (this.errorMensaje != null) {
        }
      });


  }

  ngOnInit() {
    this.resultado = false;
    this.forma.patchValue({fechaSalida: {
    date: {
        year: this.date.getFullYear(),
        month: this.date.getMonth() + 1,
        day: this.date.getDate()}
    }});
    this.forma.patchValue({fechaRegreso: {
    date: {
        year: this.date.getFullYear(),
        month: this.date.getMonth() + 1,
        day: this.date.getDate()}
    }});
  }

  buscarVuelos() {
    // Busca vuelos segun parametros dados en el formulario
    if (this.forma.get('tipoVuelo').value == 1) {
      if (this.fechaMayor(this.forma.get('fechaSalida').value.date,this.forma.get('fechaRegreso').value.date)) {
        alert("La fecha de salida debe ser menor a la fecha de regreso");
        return
      }
    }
    this.vueloIda = {};
    this.vuelosIda = [];
    this.vueloRegreso = {};
    this.vuelosRegreso =[];
    this.loading = true;
    this._vuelosService.buscarVuelos(this.forma.value).subscribe(
      respuesta=>{
        this.loading = false;
        if (respuesta.exito) {
            this.vuelosIda = respuesta.lstVuelos
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
    if (this.forma.get('tipoVuelo').value == 1) {
      this._vuelosService.buscarVuelos(this.forma.value,true).subscribe(
        respuesta=>{
          this.loading = false;
          if (respuesta.exito) {
            this.vuelosRegreso = respuesta.lstVuelos
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
  }

  reservarVuelo(){
    // Verifica valores de usuarios y vuelo y redirige al componente de compras
    if (localStorage.getItem('usuario') == null){
      this.router.navigate(['/login']);
    }
    if (this.objetoVacio(this.vueloIda) && this.vuelosIda.length > 0) {
      alert("Debe seleccionar vuelo de ida");
      return
    }
    if (this.forma.get('tipoVuelo').value == 1 && this.objetoVacio(this.vueloRegreso) && this.vuelosRegreso.length > 0){
      alert("Debe seleccionar vuelo regreso");
      return
    }
    this.numPasajeros = this.forma.get('cantSillas').value;
    this.comprar = true;
  }

  objetoVacio(obj) {
    // Verifica si un objeto esta vacio
      return Object.keys(obj).length === 0;
  }

  regresarBusqueda(event){
    // Funcion para regresar al componente de busqueda de vuelos
    this.comprar = event.estado;
  }

  fechaMayor(fechaIni,fechaFin){
    // Comprueba que la fecha inicial de vuelo sea menor que la de regreso
    let f1 = new Date(fechaIni.year, fechaIni.month,fechaIni.day);
    let f2 = new Date(fechaFin.year, fechaFin.month,fechaFin.day);
    if(f1 > f2){
      return true;
    }
    return false;
  }

  selVueloIda(vuelo){
    // Selecciona vuelo para luego ser cargado en el componente de compra
    this.vueloIda = vuelo;
  }

  selVueloRegreso(vuelo){
    // Selecciona vuelo para luego ser cargado en el componente de compra
    this.vueloRegreso=vuelo;
  }

  setDate(): void {
    // Carga fecha en el formulario
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
    // Borra fecha en formulario
    this.forma.patchValue({ myDate: null });
  }
}
