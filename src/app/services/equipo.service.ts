import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EquipoRequestDto } from '../dtos/equipoDto/equipo-request.dto';
import { EquipoResponseDto } from '../dtos/equipoDto/equipo-response.dto';

@Injectable({
  providedIn: 'root'
})
export class EquipoService {

  private apiUrl = 'http://localhost:8080/equipo';

  constructor(private http: HttpClient) { }

  listarEquipos(): Observable<EquipoResponseDto[]> {
    return this.http.get<EquipoResponseDto[]>(this.apiUrl);
  }

  crearEquipo(equipo: EquipoRequestDto): Observable<EquipoResponseDto> {
    return this.http.post<EquipoResponseDto>(this.apiUrl, equipo);
  }

  actualizarEquipo(id: number, equipo: EquipoRequestDto): Observable<EquipoResponseDto> {
    return this.http.put<EquipoResponseDto>(`${this.apiUrl}/${id}`, equipo);
  }

  eliminarEquipo(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}