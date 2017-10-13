import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Ng2CompleterModule } from "ng2-completer";
import { MyDatePickerModule } from 'mydatepicker';


//Rutas
import { APP_ROUTING } from './app.routes';

//Servicios
import { LoginService } from './services/login.service';
import { AuthGuardService } from './services/auth-guard.service';
import { UsuariosService } from './services/usuarios.service';
import { VuelosService } from './services/vuelos.service';

//Componentes
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/shared/navbar/navbar.component';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { LoginComponent } from './components/login/login.component';
import { VuelosComponent } from './components/vuelos/vuelos.component';
import { VueloComponent } from './components/vuelos/vuelo.component';
import { UsuarioComponent } from './components/usuarios/usuario.component';
import { BuscarVuelosComponent } from './components/buscar-vuelos/buscar-vuelos.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    HomeComponent,
    UsuariosComponent,
    LoginComponent,
    VuelosComponent,
    VueloComponent,
    UsuarioComponent,
    BuscarVuelosComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    Ng2CompleterModule,
    MyDatePickerModule,
    APP_ROUTING
  ],
  providers: [
    LoginService,
    AuthGuardService,
    UsuariosService,
    VuelosService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
