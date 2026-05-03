import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { PresentacionService } from '../../services/presentacion.service';
import { ArtistaService } from '../../services/artista.service';
import { EscenarioService } from '../../services/escenario.service';
import { ArtistaResponseDto } from '../../dtos/artistaDto/artista-response.dto';
import { EscenarioResponseDto } from '../../dtos/escenarioDto/escenario-response.dto';
import { Router } from '@angular/router';

@Component({
  selector: 'app-presentaciones',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './presentaciones.html',
  styleUrls: ['./presentaciones.css']
})
export class LineupComponent implements OnInit {
  
  presentaciones: any[] = [];
  artistas: ArtistaResponseDto[] = [];
  escenarios: EscenarioResponseDto[] = [];
  
  mostrarFormulario: boolean = false;
  editando: boolean = false;
  presentacionSeleccionada: any = null;
  
  formulario: any = {
    artistaId: 0,
    escenarioId: 0,
    fechaPresentacion: '',
    horaInicio: '',
    horaFin: ''
  };

  constructor(
    private presentacionService: PresentacionService,
    private artistaService: ArtistaService,
    private escenarioService: EscenarioService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.cargarDatos();
  }

  cargarDatos(): void {
    this.cargarPresentaciones();
    this.cargarArtistas();
    this.cargarEscenarios();
  }

  cargarPresentaciones(): void {
    this.presentacionService.listarPresentaciones().subscribe({
      next: (data: any[]) => {
        this.presentaciones = data.map(p => ({
          idPresentacion: p.idPresentacion,
          artistaId: p.artista?.idArtista,
          artistaNombre: p.artista?.nombre,
          artistaGenero: p.artista?.generoMusical,
          escenarioId: p.escenario?.idEscenario,
          escenarioNombre: p.escenario?.nombre,
          fechaPresentacion: p.fechaPresentacion,
          horaInicio: p.horaInicio,
          horaFin: p.horaFin
        }));
      },
      error: (err) => console.error('Error al cargar presentaciones:', err)
    });
  }

  cargarArtistas(): void {
    this.artistaService.listarArtistas().subscribe({
      next: (data) => {
        this.artistas = data;
      },
      error: (err) => console.error('Error al cargar artistas:', err)
    });
  }

  cargarEscenarios(): void {
    this.escenarioService.listarEscenarios().subscribe({
      next: (data) => {
        this.escenarios = data;
      },
      error: (err) => console.error('Error al cargar escenarios:', err)
    });
  }

  abrirFormulario(): void {
    this.cargarArtistas();
    this.cargarEscenarios();
    
    this.mostrarFormulario = true;
    this.editando = false;
    this.presentacionSeleccionada = null;
    this.formulario = {
      artistaId: 0,
      escenarioId: 0,
      fechaPresentacion: '',
      horaInicio: '',
      horaFin: ''
    };
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.presentacionSeleccionada = null;
    this.editando = false;
  }

  guardarPresentacion(): void {
  // 1. Validaciones iniciales
  if (!this.formulario.artistaId || !this.formulario.escenarioId) {
    alert('Debe seleccionar artista y escenario');
    return;
  }

  if (!this.formulario.fechaPresentacion || !this.formulario.horaInicio || !this.formulario.horaFin) {
    alert('Debe completar fecha, hora inicio y hora fin');
    return;
  }

  const artistaSeleccionado = this.artistas.find(a => a.idArtista === Number(this.formulario.artistaId));
  const escenarioSeleccionado = this.escenarios.find(e => e.idEscenario === Number(this.formulario.escenarioId));

  if (!artistaSeleccionado || !escenarioSeleccionado) {
    alert('Error: Artista o Escenario no encontrado');
    return;
  }

  // 2. Construcción del payload
  const payload = {
    artista: {
      idArtista: artistaSeleccionado.idArtista,
      nombre: artistaSeleccionado.nombre,
      generoMusical: artistaSeleccionado.generoMusical,
      riderTecnico: artistaSeleccionado.riderTecnico
    },
    escenario: {
      idEscenario: escenarioSeleccionado.idEscenario,
      nombre: escenarioSeleccionado.nombre,
      capacidad: escenarioSeleccionado.capacidad
    },
    fechaPresentacion: this.formulario.fechaPresentacion,
    horaInicio: this.formulario.horaInicio,
    horaFin: this.formulario.horaFin
  };

  // 3. Ejecución (Crear o Editar)
  if (this.editando && this.presentacionSeleccionada) {
    // MODO EDICIÓN
    this.presentacionService.actualizarPresentacion(this.presentacionSeleccionada.idPresentacion, payload).subscribe({
      next: () => {
        console.log('Actualización exitosa');
        this.cargarPresentaciones(); // Refresca la lista
        this.cerrarFormulario();     // Cierra el formulario
      },
      error: (err) => {
        console.error('Error al actualizar:', err);
        alert('Error al actualizar la presentación');
      }
    });
  } else {
    // MODO CREACIÓN
    this.presentacionService.crearPresentacion(payload).subscribe({
      next: () => {
        console.log('Creación exitosa');
        this.cargarPresentaciones(); // Refresca la lista
        this.cerrarFormulario();     // Cierra el formulario
      },
      error: (err) => {
        console.error('Error al crear:', err);
        alert('Error al crear la presentación');
      }
    });
  }
}

  editarPresentacion(presentacion: any): void {
    this.editando = true;
    this.presentacionSeleccionada = presentacion;
    this.formulario = {
      artistaId: presentacion.artistaId,
      escenarioId: presentacion.escenarioId,
      fechaPresentacion: presentacion.fechaPresentacion,
      horaInicio: presentacion.horaInicio,
      horaFin: presentacion.horaFin
    };
    this.mostrarFormulario = true;
  }

  eliminarPresentacion(id: number): void {
    if (confirm('¿Eliminar esta presentación?')) {
      this.presentacionService.eliminarPresentacion(id).subscribe({
        next: () => {
          this.cargarPresentaciones();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar la presentación');
        }
      });
    }
  }

  getNombreArtista(id: number): string {
    const artista = this.artistas.find(a => a.idArtista === id);
    return artista ? artista.nombre : 'Desconocido';
  }

  getGeneroArtista(id: number): string {
    const artista = this.artistas.find(a => a.idArtista === id);
    return artista ? artista.generoMusical : 'Desconocido';
  }

  getNombreEscenario(id: number): string {
    const escenario = this.escenarios.find(e => e.idEscenario === id);
    return escenario ? escenario.nombre : 'Desconocido';
  }
}