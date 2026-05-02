import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PresentacionRequestDto } from '../dtos/presentacionDto/presentacion-request.dto';
import { PresentacionResponseDto } from '../dtos/presentacionDto/presentacion-response.dto';

@Injectable({
  providedIn: 'root'
})
export class PresentacionService {

  private apiUrl = 'http://localhost:8080/api/presentacion';

  constructor(private http: HttpClient) { }

  listarPresentaciones(): Observable<PresentacionResponseDto[]> {
    return this.http.get<PresentacionResponseDto[]>(this.apiUrl);
  }

  crearPresentacion(presentacion: any): Observable<any> {
  console.log('Enviando POST a:', this.apiUrl);
  console.log('Payload:', presentacion);
  return this.http.post<any>(this.apiUrl, presentacion);
}

  actualizarPresentacion(id: number, presentacion: any): Observable<any> {
    return this.http.put<any>(`${this.apiUrl}/${id}`, presentacion);
  }
  eliminarPresentacion(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}