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
  usuarios = [
    // {
    //   id:"1",
    //   nombres: "Pedro",
    //   apellidos: "Lotero",
    //   email: "pedro.lotero@ucp.edu.co",
    //   role:"Admin"
    // },
    // {
    //   id:"2",
    //   nombres: "Jose",
    //   apellidos: "Lopez",
    //   email: "jose.lopez@ucp.edu.co",
    //   role:"User"
    // }

  ]
  constructor(private _usuariosService:UsuariosService,
              private router:Router) { }

  ngOnInit() {
    this._usuariosService.consultarUsuarios().subscribe(
      respuesta=>{
        // console.log(respuesta);
        if (respuesta.exito) {
            this.usuarios = respuesta.lstPersonas
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
    this.router.navigate(['/usuario', 'nuevo']);
  }

}
