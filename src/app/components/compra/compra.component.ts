import { Component, OnInit, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-compra',
  templateUrl: './compra.component.html',
  styles: []
})
export class CompraComponent implements OnInit {
  // Valor que viene de el componente padre
@Input('vueloIda') vueloIda;
@Input('vueloRegreso') vueloRegreso;
public forma: FormGroup;


  constructor() {
    this.forma = new FormGroup({
      'nombres': new FormControl('', [Validators.required]),
      'apellidos': new FormControl('', [Validators.required]),
      'tipoDocumento': new FormControl(null, [Validators.required]),
      'documento': new FormControl(null, [Validators.required]),
      'numMaletas': new FormControl(''),
    });
  }

  ngOnInit() {
  }

}
