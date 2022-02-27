import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { Injectable } from '@angular/core';
import { Sensor } from '../model/sensor';

@Injectable({
  providedIn: 'root',
})
export class SensorsService {
  urlApi = 'http://localhost:5000/api/v1/';
  httpHeader = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' }),
  };
  constructor(private http: HttpClient) {}
  getSensorList(): Observable<Sensor[]> {
    return this.http.get<Sensor[]>(this.urlApi + 'sensors/').pipe(
      tap((Sensor) => console.log(Sensor)),
      catchError(
        this.handleError<Sensor[]>('Problemas obteniendo lista de sensores', [])
      )
    );
  }

  getSensorById(id): Observable<Sensor> {
    return this.http.get<Sensor>(this.urlApi + 'sensors/' + id).pipe(
      tap((Sensor) => console.log(Sensor)),
      catchError(
        this.handleError<Sensor>('Problemas obteniendo el dispositivo', id)
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
