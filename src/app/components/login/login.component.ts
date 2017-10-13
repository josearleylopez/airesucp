import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { LoginService } from '../../services/login.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styles: []
})
export class LoginComponent implements OnInit {
  errorMensaje=null;
  usuario = {
    email:"",
    password:"",
    gethash:false
  }

  constructor(private _loginService: LoginService, private router:Router){

  }

  ngOnInit() {
    // localStorage.removeItem('usuario');
    console.log("Usuario local storage",localStorage.getItem('usuario'));
  }

  onLogin(loginForma:NgForm){
    // console.log("Usuario",this.usuario);
    // console.log("Forma",loginForma);
    this._loginService.autenticar(this.usuario).subscribe(
      respuesta => {
        // console.log(respuesta);
        if (respuesta.exito) {
            localStorage.setItem('usuario',JSON.stringify(respuesta.usuario));
            // console.log(localStorage.getItem('usuario'));
            this.router.navigate(['home']);
        }
        else{
          this.errorMensaje = respuesta.mensaje;
        }
      },
      error => {
        this.errorMensaje  = <any>error;
        if (this.errorMensaje!=null) {
          console.log(this.errorMensaje);
        }
      }
    )
}
}

// localStorage.setItem('usuario',JSON.stringify({
//       "idUsuario": "0",
//       "login": "admin",
//       "clave": "admin",
//       "idRol": "1"
//    }))
