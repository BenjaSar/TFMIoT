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

  getTemperatureListByIdSensor(): Observable<Temperature[]> {
    //let url = `{$this.urlApi}/get`;
    return this.http.get<Temperature[]>(this.urlApi + 'temperatures/').pipe(
      tap((Temperature) => console.log(Temperature)),
      catchError(
        this.handleError<Temperature[]>(
          'Problemas obteniendo lista de mediciones',
          []
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
