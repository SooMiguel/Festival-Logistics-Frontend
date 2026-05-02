import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { EscenarioRequestDto } from '../dtos/escenarioDto/escenario-request.dto';
import { EscenarioResponseDto } from '../dtos/escenarioDto/escenario-response.dto';

@Injectable({
  providedIn: 'root'
})
export class EscenarioService {

  private apiUrl = 'http://localhost:8080/api/escenario';

  constructor(private http: HttpClient) { }

  listarEscenarios(): Observable<EscenarioResponseDto[]> {
    return this.http.get<EscenarioResponseDto[]>(this.apiUrl);
  }

  crearEscenario(escenario: EscenarioRequestDto): Observable<EscenarioResponseDto> {
    return this.http.post<EscenarioResponseDto>(this.apiUrl, escenario);
  }

  actualizarEscenario(id: number, escenario: EscenarioRequestDto): Observable<EscenarioResponseDto> {
    return this.http.put<EscenarioResponseDto>(`${this.apiUrl}/${id}`, escenario);
  }

  eliminarEscenario(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}