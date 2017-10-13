import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Usuario } from '../interfaces/usuario.interface';
import 'rxjs/Rx'

@Injectable()
export class UsuariosService {
  apiURL:string = "http://ucpaires.whelastic.net/AdminPersona/rest/mspersonadmin";

  constructor(private http:Http) { }

  nuevoUsuario(usuario:Usuario){
    let body = JSON.stringify( usuario);
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    let url = `${ this.apiURL }/registrar`;

    return this.http.post(url,body,{headers:headers})
        .map(res=>{
          console.log(res.json());
          return res.json();
        })
  }

  actualizarUsuario(usuario:Usuario){
    let body = JSON.stringify( usuario);
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    let url = `${ this.apiURL }/actualizar`;

    return this.http.post(url,body,{headers:headers})
        .map(res=>{
          console.log(res.json());
          return res.json();
        })
  }

  consultarUsuarios(id:string=null){
    let usuario = {}
    if (id) {
        usuario = {
          identificacion:id
        }
    }
    let body = JSON.stringify( usuario);
    let headers = new Headers({
      'Content-Type':'application/json'
    });
    let url = `${ this.apiURL }/consultar`;

    return this.http.post(url,body,{headers:headers})
        .map(res=>{
          console.log(res.json());
          return res.json();
        })
  }

}
