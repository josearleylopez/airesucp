import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import { Router } from '@angular/router';
import 'rxjs/Rx'

@Injectable()
export class LoginService {
  usuario;
  persona;
  apiURL: string = "http://ucpaires.jl.serv.net.mx/sso/rest/msssoadmin";

  constructor(private http: Http, private router: Router) { }

  autenticar(usuario: any) {
    let aux = {
      login: usuario.email,
      clave: usuario.password
    }
    let body = JSON.stringify(aux);
    console.log("Objeto a enviar", body);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let url = `${this.apiURL}/autenticar`;

    return this.http.post(url, body, { headers: headers })
      .map(res => {
        console.log("Respuesta servidor",res.json());
        return res.json();
      })
  }

  getUsuario(codigo: string) {
    let url = `${this.apiURL}/usuario/${codigo}`;
    return this.http.get(url)
      .map(res => res.json());
  }

  public getUsuarioStorage() {
    return JSON.parse(localStorage.getItem('usuario'));
  }

  public getPersonaStorage() {
    return JSON.parse(localStorage.getItem('persona'));
  }


  public autenticado() {
    if (localStorage.getItem('usuario') != null) {
      this.usuario = this.getUsuarioStorage();
      this.persona = this.getPersonaStorage();
      return true;
    }
    return false;
  }

  public permiso(ruta) {
    let usuario = this.getUsuarioStorage();
    if (usuario) {
      if (usuario.idRol == 1) {
        return true;
      } else {
        switch (ruta) {
          case 'usuarios': {
            return false;
          }
          case 'vuelos': {
            return false;
          }
          case 'reservas': {
            return true;
          }
          default: {
            return true;
          }
        }
      }
    }
    return false;
  }

  public logout() {
    this.router.navigate(['home']);
    localStorage.removeItem('usuario');
    localStorage.removeItem('persona');
  }
}
