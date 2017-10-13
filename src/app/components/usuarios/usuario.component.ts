import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { UsuariosService} from '../../services/usuarios.service';
import { Usuario } from '../../interfaces/usuario.interface';

@Component({
  selector: 'app-usuario',
  templateUrl: './usuario.component.html',
  styles: []
})
export class UsuarioComponent implements OnInit {
  loading: boolean = false;
  errorMensaje;
  usuario:Usuario={
    identificacion:"",
    nombres: "",
    apellidos: "",
    celular:"",
    direccion:"",
    email: "",
    clave:"",
    idRol: ""
  }

  forma: FormGroup;
  id: string;
  actualizar=false;
  constructor(private router: Router,
    private activatedRoute: ActivatedRoute,
    private _usuariosService: UsuariosService) {
    this.activatedRoute.params
      .subscribe(parametros => {
        console.log(parametros);
        this.id = parametros['id'];
        if (this.id !== "nuevo") {
          this.actualizar = true;
          this._usuariosService.consultarUsuarios(this.id)
            .subscribe(respuesta => {
              // console.log(respuesta);
              if (respuesta.exito) {
                this.usuario = respuesta.lstPersonas[0]
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


    this.forma = new FormGroup({
      'identificacion': new FormControl('', [Validators.required, Validators.pattern("[0-9]+")]),
      'nombres': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'apellidos': new FormControl('', [Validators.required, Validators.minLength(3)]),
      'celular': new FormControl('', [Validators.minLength(6)]),
      'direccion': new FormControl(''),
      'email': new FormControl('', [Validators.required, Validators.pattern("[a-z0-9._%+-]+@[a-z0-9.-]+.[a-z]{2,3}$")]),
      'clave': new FormControl('', Validators.required),
      'password2': new FormControl(''),
      'idRol': new FormControl('', [Validators.required])
    });
    this.forma.controls['password2'].setValidators([
      Validators.required,
      this.noIgual.bind(this.forma)//Para decirle a la funcion noIgual que es this es la forma
    ]);
  }

  ngOnInit() {
  }

  noIgual(control: FormControl): { [s: string]: boolean } {
    console.log(this);
    let forma: any = this;
    if (control.value !== forma.controls['clave'].value) {
      return {
        noiguales: true
      }
    }
    return null;
  }

  agregarNuevo() {
    this.router.navigate(['/usuario', 'nuevo']);
    this.forma.reset();
  }

  guardarFormulario(){
    console.log("Usuario",this.usuario);
    console.log("Valor forma",this.forma.value);
    console.log("Forma",this.forma);

    this.loading = true;
    if (this.id == "nuevo") {
      //Insertando usuario
      this._usuariosService.nuevoUsuario(this.usuario)
        .subscribe(respuesta => {
          if (respuesta.exito) {
            alert(respuesta.mensaje);
            this.router.navigate(['/usuario', this.usuario.identificacion])
            this.loading = false;
          }
          else {
            this.errorMensaje = respuesta.mensaje;
          }
        },
        error => console.error(error));
    } else {
      //Actualizando usuario
      this._usuariosService.actualizarUsuario(this.usuario)
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
