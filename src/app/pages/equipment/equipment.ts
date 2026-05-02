import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EquipoService } from '../../services/equipo.service';
import { EquipoResponseDto } from '../../dtos/equipoDto/equipo-response.dto';
import { EquipoRequestDto } from '../../dtos/equipoDto/equipo-request.dto';

@Component({
  selector: 'app-equipment',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './equipment.html',
  styleUrls: ['./equipment.css']
})
export class EquipmentComponent implements OnInit {
  
  equipos: EquipoResponseDto[] = [];
  mostrarFormulario: boolean = false;
  equipoSeleccionado: EquipoResponseDto | null = null;
  formulario: EquipoRequestDto = { tipo: '', descripcion: '', cantidadDisponible: 0 };
  editando: boolean = false;

  totalEquipos: number = 0;
  totalUnidades: number = 0;
  bajoStock: number = 0;

  constructor(private equipoService: EquipoService) {}

  ngOnInit(): void {
    this.cargarEquipos();
  }

  cargarEquipos(): void {
    this.equipoService.listarEquipos().subscribe({
      next: (data) => {
        this.equipos = data;
        this.calcularEstadisticas();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  calcularEstadisticas(): void {
    this.totalEquipos = this.equipos.length;
    this.totalUnidades = this.equipos.reduce((sum, e) => sum + (e.cantidadDisponible || 0), 0);
    this.bajoStock = this.equipos.filter(e => (e.cantidadDisponible || 0) < 5).length;
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.editando = false;
    this.formulario = { tipo: '', descripcion: '', cantidadDisponible: 0 };
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.equipoSeleccionado = null;
    this.editando = false;
  }

  guardarEquipo(): void {

    // Validaciones
    if (!this.formulario.tipo || this.formulario.tipo.trim() === '') {
      alert('El tipo de equipo es obligatorio');
      return;
    }
    
    if (!this.formulario.descripcion || this.formulario.descripcion.trim() === '') {
      alert('La descripción es obligatoria');
      return;
    }
    
    if (!this.formulario.cantidadDisponible || this.formulario.cantidadDisponible <= 0) {
      alert('La cantidad disponible debe ser mayor a 0');
      return;
    }



    if (this.editando && this.equipoSeleccionado) {
      this.equipoService.actualizarEquipo(this.equipoSeleccionado.idEquipo, this.formulario).subscribe({
        next: () => {
          this.cerrarFormulario();
          window.location.reload(); // ← Recargar
        },
        error: (err) => console.error('Error:', err)
      });
    } else {
      this.equipoService.crearEquipo(this.formulario).subscribe({
        next: () => {
          this.cerrarFormulario();
          window.location.reload(); // ← Recargar
        },
        error: (err) => console.error('Error:', err)
      });
    }
  }

  editarEquipo(equipo: EquipoResponseDto): void {
    this.editando = true;
    this.equipoSeleccionado = equipo;
    this.formulario = {
      tipo: equipo.tipo,
      descripcion: equipo.descripcion,
      cantidadDisponible: equipo.cantidadDisponible
    };
    this.mostrarFormulario = true;
  }

  eliminarEquipo(id: number): void {
    if (confirm('¿Eliminar este equipo?')) {
      this.equipoService.eliminarEquipo(id).subscribe({
        next: () => {
          window.location.reload(); // ← Recargar
        },
        error: (err) => console.error('Error:', err)
      });
    }
  }
}