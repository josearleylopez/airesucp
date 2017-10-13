import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { LoginService } from '../../../services/login.service';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styles: []
})
export class NavbarComponent implements OnInit {
  usuario:any;
  constructor(private login:LoginService) { }

  ngOnInit() {
    // if (this.login.autenticado()) {
    //   this.usuario = this.login.getUsuarioStorage();
    //   console.log("Local Storage",this.usuario);
    // }
  }

  salir(){
    this.login.logout();
  }

}
