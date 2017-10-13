import { Injectable } from '@angular/core';
import { Http, Headers } from '@angular/http';
import 'rxjs/Rx'

@Injectable()
export class VuelosService {
  private apiURL: string = "http://ucpaires.whelastic.net/adminvuelos/rest/msvuelosadmin";
  private ciudades=[ {
      idCiudad: 1,
      nombreCiudad: "Armenia"
   },
      {
      idCiudad: 2,
      nombreCiudad: "Pereira"
   },
      {
      idCiudad: 3,
      nombreCiudad: "Manizales"
   },
      {
      idCiudad: 4,
      nombreCiudad: "Cali"
   },
      {
      idCiudad: 5,
      nombreCiudad: "Bogota¡"
   },
      {
      idCiudad: 6,
      nombreCiudad: "Medellin"
   },
      {
      idCiudad: 7,
      nombreCiudad: "Barranquilla"
   },
      {
      idCiudad: 8,
      nombreCiudad: "Cartagena"
   },
      {
      idCiudad: 9,
      nombreCiudad: "Santa Marta"
   }];

  constructor(private http: Http) { }

  nuevoVuelo(vuelo: any) {
    let aux = {
      ciudadOrigen: vuelo.ciudadOrigen,
      ciudadDestino: vuelo.ciudadDestino,
      fecha: vuelo.fecha,
      hora: vuelo.hora,
      tiempoEstimado: vuelo.tiempoEstimado,
      cantSillas: vuelo.cantSillas
    }
    let body = JSON.stringify(aux);
    console.log("Objeto a enviar",body)
    // {"ciudadOrigen":"Pereira",
        // "ciudadDestino":"Santa Marta",
        // "fecha":"13/10/2017",
        // "hora":"10:00",
        // "tiempoEstimado":55,"cantSillas":105}
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let url = `${this.apiURL}/registrar`;

    return this.http.post(url, body, { headers: headers })
      .map(res => {
        console.log(res.json());
        return res.json();
      })
  }

  actualizarVuelo(vuelo: any) {
    let body = JSON.stringify(vuelo);
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

  consultarVuelos(id: string = null) {
    let vuelo = {}
    if (id) {
      vuelo = {
        idVuelo: id
      }
    }
    let body = JSON.stringify(vuelo);
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

  consultarCiudades() {
    let headers = new Headers({
      'Content-Type': 'application/json'
    });
    let url = `${this.apiURL}/ciudades`;

    return this.http.post(url, { headers: headers })
      .map(res => {
        console.log(res.json());
        return res.json();
      })
  }

  getCiudades(){
    return this.ciudades;
  }

}
