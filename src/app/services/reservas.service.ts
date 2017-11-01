import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx'

@Injectable()
export class ReservasService {
  private apiURL: string = "http://ucpaires.jl.serv.net.mx/ventas/rest/msventasadmin";
  constructor(private http: Http) { }

  nuevaReserva(reserva: any, vuelo: any) {
    let personas = [];
    for (let p of reserva.pasajeros) {
      let persona = {
        tipoIdentificacion : p.tipoDocumento,
        identificacion : p.documento,
        nombreCompleto : p.nombres + ' ' + p.apellidos,
        cantMaletas : p.numMaletas
      }
        personas.push(persona);
    }
    let aux = {
      idVuelo: vuelo.idVuelo,
      idPersona: reserva.identificacionUsuario,
      pasaporte: reserva.pasaporteUsuario,
      telefono: reserva.telefonoUsuario,
      direccion: reserva.direccionUsuario,
      cantMaletas: reserva.cantidadMaletas,
      lstPersonas: personas
    }
    let body = JSON.stringify(aux);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let url = `${this.apiURL}/reservar`;

    return this.http.post(url, body, { headers: headers })
      .map(res => {
        return res.json();
      })
  }

  actualizarReserva(reserva: any) {
    let body = JSON.stringify(reserva);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let url = `${this.apiURL}/actualizar`;

    return this.http.post(url, body, { headers: headers })
      .map(res => {
        console.log(res.json());
        return res.json();
      })
  }

  consultarReservas() {
    let reserva = {}
    let persona = JSON.parse(localStorage.getItem('persona'));
    console.log("Persona",persona.identificacion);
    if (persona) {
      reserva = {
        idPersona: persona.identificacion
      }
    }
    let body = JSON.stringify(reserva);
    console.log("Consulta a enviar",reserva);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let url = `${this.apiURL}/consultar`;

    return this.http.post(url, body, { headers: headers })
      .map(res => {
        console.log(res.json());
        return res.json();
      })
  }

  confirmarReserva(id: string) {
    let reserva = {}
    if (id) {
      reserva = {
        idReserva: id
      }
    }
    let body = JSON.stringify(reserva);
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let url = `${this.apiURL}/confirmar`;

    return this.http.post(url, body, { headers: headers })
      .map(res => {
        console.log(res.json());
        return res.json();
      })
  }
}
