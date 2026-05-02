import { Component, OnInit, ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ArtistaService } from '../../services/artista.service';
import { ArtistaResponseDto } from '../../dtos/artistaDto/artista-response.dto';
import { ArtistaRequestDto } from '../../dtos/artistaDto/artista-request.dto';

@Component({
  selector: 'app-artists',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './artists.html',
  styleUrls: ['./artists.css']
})
export class ArtistsComponent implements OnInit {
  
  artistas: ArtistaResponseDto[] = [];
  generosUnicos: string[] = [];
  stagesCount: number = 0;
  
  mostrarFormulario: boolean = false;
  artistaSeleccionado: ArtistaResponseDto | null = null;
  formulario: ArtistaRequestDto = { nombre: '', generoMusical: '', riderTecnico: '' };
  editando: boolean = false;

  constructor(
    private artistaService: ArtistaService,
    private cdr: ChangeDetectorRef 
  ) {}

  ngOnInit(): void {
    this.cargarArtistas();
  }

  cargarArtistas(): void {
  this.artistaService.listarArtistas().subscribe({
    next: (data) => {
      this.artistas = data;
      this.calcularGenerosUnicos();
      this.contarStages();
      console.log('Lista recargada:', this.artistas.length, 'artistas');
    },
    error: (err) => console.error('Error:', err)
  });
}

  calcularGenerosUnicos(): void {
    const generos = this.artistas.map(a => a.generoMusical);
    this.generosUnicos = [...new Set(generos)];
  }

  contarStages(): void {
    // Si el backend no devuelve stage, esto es temporal
    this.stagesCount = 12; // Fijo según la imagen
  }

  getArtistasPorGenero(genero: string): ArtistaResponseDto[] {
    return this.artistas.filter(a => a.generoMusical === genero);
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.editando = false;
    this.formulario = { nombre: '', generoMusical: '', riderTecnico: '' };
  }

  cerrarFormulario(): void {
  this.mostrarFormulario = false;
  this.artistaSeleccionado = null;
  this.editando = false;
  this.formulario = { nombre: '', generoMusical: '', riderTecnico: '' };
  console.log('Formulario cerrado');
}

  guardarArtista(): void {

      // VALIDACIONES
  if (!this.formulario.nombre || this.formulario.nombre.trim() === '') {
    alert('El nombre del artista es obligatorio');
    return;
  }
  
  if (!this.formulario.generoMusical || this.formulario.generoMusical.trim() === '') {
    alert('Debe seleccionar un género musical');
    return;
  }
  
  if (!this.formulario.riderTecnico || this.formulario.riderTecnico.trim() === '') {
    alert('El rider técnico es obligatorio');
    return;
  }

  if (this.editando && this.artistaSeleccionado) {
    this.artistaService.actualizarArtista(this.artistaSeleccionado.idArtista, this.formulario).subscribe({
      next: () => {
        this.cerrarFormulario();
        window.location.reload(); // ← Recarga forzada
      },
      error: (err) => console.error('Error:', err)
    });
  } else {
    this.artistaService.crearArtista(this.formulario).subscribe({
      next: () => {
        this.cerrarFormulario();
        window.location.reload(); // ← Recarga forzada
      },
      error: (err) => console.error('Error:', err)
    });
  }
}

  editarArtista(artista: ArtistaResponseDto): void {
    this.editando = true;
    this.artistaSeleccionado = artista;
    this.formulario = {
      nombre: artista.nombre,
      generoMusical: artista.generoMusical,
      riderTecnico: artista.riderTecnico
    };
    this.mostrarFormulario = true;
  }

 eliminarArtista(id: number): void {
  if (confirm('¿Eliminar este artista?')) {
    this.artistaService.eliminarArtista(id).subscribe({
      next: () => {
        window.location.reload(); // ← Recarga forzada
      },
      error: (err) => console.error('Error:', err)
    });
  }
}
}