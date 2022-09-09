/*
Author:FS
# Date: 2022
# Embedded Systems Laboratory FIUBA
# License: MIT
#################################################################################
*/

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Temperature } from '../model/temperature';

@Injectable({
  providedIn: 'root',
})
export class TemperaturesService {
  urlApi: string = 'http://localhost:5000/api/v1/';
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}

  getTemperatureListByIdSensor(id): Observable<Temperature[]> {
    return this.http
      .get<Temperature[]>(this.urlApi + 'temperatures/' + id + '/todas')
      .pipe(
        tap((Temperature) =>
          console.log('Devolucion del servicio', Temperature)
        ),
        catchError(
          this.handleError<Temperature[]>(
            'Problemas obteniendo lista de mediciones'
          )
        )
      );
  }

  getTemperatureByIdSensor(id): Observable<Temperature> {
    return this.http.get<Temperature>(this.urlApi + 'temperatures/' + id).pipe(
      tap((Temperature) => console.log(Temperature)),
      catchError(
        this.handleError<Temperature>(
          'Problemas obteniendo el valor de temperatura'
        )
      )
    );
  }

  private handleError<T>(operation = 'operation', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed: ${error.message}`);
      return of(result as T);
    };
  }
}
