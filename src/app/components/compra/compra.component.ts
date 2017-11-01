import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';
import { FormGroup, FormControl, Validators, FormArray, FormBuilder } from '@angular/forms';
import { ReservasService} from '../../services/reservas.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styles: []
})
export class CompraComponent implements OnInit {
@Input('vueloIda') vueloIda;
@Input('vueloRegreso') vueloRegreso;
@Input('numPasajeros') numPasajeros;
@Output() regresaBusqueda = new EventEmitter<any>();

public pasajeros = Array;
public forma: FormGroup;
public formaP: FormGroup;
public pasajerosForm: FormGroup;
public errorMensaje;

  constructor(private formBuilder: FormBuilder,
              private _reservasService: ReservasService,
              private router:Router) {
  }

  ngOnInit() {
    let persona = JSON.parse(localStorage.getItem('persona'));
    this.pasajerosForm = this.formBuilder.group({
    nombresUsuario: new FormControl(persona.nombres, [Validators.required]),
    apellidosUsuario: new FormControl(persona.apellidos, [Validators.required]),
    identificacionUsuario: new FormControl(persona.identificacion, [Validators.required]),
    pasaporteUsuario: new FormControl('', [Validators.required]),
    telefonoUsuario: new FormControl('', [Validators.required]),
    direccionUsuario: new FormControl('', [Validators.required]),
    pasajeros: this.formBuilder.array([])
  });

  for (let i = 0; i < this.numPasajeros; i++){
    this.addPasajero();
  }
}

  regresarBusqueda(event){
    this.regresaBusqueda.emit({estado: false});
  }

  objetoVacio(obj) {
      return Object.keys(obj).length === 0;
  }

  crearPasajero(): FormGroup {
    return this.formBuilder.group({
      nombres: new FormControl('', [Validators.required]),
      apellidos: new FormControl('', [Validators.required]),
      tipoDocumento: new FormControl('', [Validators.required]),
      documento: new FormControl('', [Validators.required]),
      numMaletas: new FormControl(''),
    });
  }

  addPasajero(): void {
  (<FormArray>this.pasajerosForm.get('pasajeros')).push(this.crearPasajero());
}

reservarVuelo(){
  if (!this.objetoVacio(this.vueloIda)) {
    this._reservasService.nuevaReserva(this.pasajerosForm.value, this.vueloIda)
    .subscribe(respuesta => {
      if (respuesta.exito) {
        alert(respuesta.mensaje);
        this.router.navigate(['/reservas']);
      }
      else {
        this.errorMensaje = respuesta.mensaje;
      }
    },
    error => console.error(error));
  }
  if (!this.objetoVacio(this.vueloRegreso)) {
    this._reservasService.nuevaReserva(this.pasajerosForm.value, this.vueloRegreso)
    .subscribe(respuesta => {
      if (respuesta.exito) {
        alert(respuesta.mensaje);
        this.router.navigate(['/reservas']);
      }
      else {
        this.errorMensaje = respuesta.mensaje;
      }
    },
    error => console.error(error));
  }

}

}
