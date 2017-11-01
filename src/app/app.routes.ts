import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { UsuarioComponent } from './components/usuarios/usuario.component';
import { VuelosComponent } from './components/vuelos/vuelos.component';
import { ReservasComponent } from './components/reservas/reservas.component';
import { VueloComponent } from './components/vuelos/vuelo.component';
import { LoginComponent } from './components/login/login.component';
import { CompraComponent } from './components/compra/compra.component';

const APP_ROUTES: Routes = [
  { path: 'home', component: HomeComponent },
  { path: 'usuarios', component: UsuariosComponent },
  { path: 'usuario/:id',component: UsuarioComponent},
  { path: 'vuelos', component: VuelosComponent },
  { path: 'vuelo/:id', component: VueloComponent },
  { path: 'reservas', component: ReservasComponent },
  // { path: 'vuelo/:id', component: VueloComponent },
  { path: 'login', component: LoginComponent },
  { path: 'compra', component: CompraComponent },
  { path: '**', pathMatch: 'full', redirectTo: 'home' }
];


export const APP_ROUTING = RouterModule.forRoot(APP_ROUTES, {useHash:true});
