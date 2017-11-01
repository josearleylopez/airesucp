import { Component, OnInit } from '@angular/core';
import { UsuariosService} from '../../services/usuarios.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-usuarios',
  templateUrl: './usuarios.component.html',
  styles: []
})
export class UsuariosComponent implements OnInit {
  errorMensaje=null;
  loading = false;
  usuarios = []
  constructor(private _usuariosService:UsuariosService,
              private router:Router) { }

  ngOnInit() {
    this.loading = true;
    this._usuariosService.consultarUsuarios().subscribe(
      respuesta=>{
        // console.log(respuesta);
        if (respuesta.exito) {
            this.usuarios = respuesta.lstPersonas;
            this.loading = false;
        }
        else{
          this.errorMensaje = respuesta.mensaje;
          this.loading = false;
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
    this.router.navigate(['/usuario', 'nuevo']);
  }

}
