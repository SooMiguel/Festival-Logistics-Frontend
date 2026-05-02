import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ArtistaRequestDto } from '../dtos/artistaDto/artista-request.dto';
import { ArtistaResponseDto } from '../dtos/artistaDto/artista-response.dto';

@Injectable({
  providedIn: 'root'
})
export class ArtistaService {

  private apiUrl = 'http://localhost:8080/api/artista';

  constructor(private http: HttpClient) { }

  listarArtistas(): Observable<ArtistaResponseDto[]> {
    return this.http.get<ArtistaResponseDto[]>(this.apiUrl);
  }

  crearArtista(artista: ArtistaRequestDto): Observable<ArtistaResponseDto> {
    return this.http.post<ArtistaResponseDto>(this.apiUrl, artista);
  }

  actualizarArtista(id: number, artista: ArtistaRequestDto): Observable<ArtistaResponseDto> {
  return this.http.put<ArtistaResponseDto>(`${this.apiUrl}/${id}`, artista);
  }

  eliminarArtista(id: number): Observable<void> {
    return this.http.delete<void>(`${this.apiUrl}/${id}`);
  }
}