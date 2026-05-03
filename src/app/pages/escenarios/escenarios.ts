import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { EscenarioService } from '../../services/escenario.service';
import { EscenarioResponseDto } from '../../dtos/escenarioDto/escenario-response.dto';
import { EscenarioRequestDto } from '../../dtos/escenarioDto/escenario-request.dto';

@Component({
  selector: 'app-stages',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './escenarios.html',
  styleUrls: ['./escenarios.css']
})
export class StagesComponent implements OnInit {
  
  escenarios: EscenarioResponseDto[] = [];
  mostrarFormulario: boolean = false;
  escenarioSeleccionado: EscenarioResponseDto | null = null;
  formulario: EscenarioRequestDto = { nombre: '', capacidad: 0 };
  editando: boolean = false;

  totalEscenarios: number = 0;
  capacidadTotal: number = 0;

  constructor(private escenarioService: EscenarioService) {}

  ngOnInit(): void {
    this.cargarEscenarios();
  }

  cargarEscenarios(): void {
    this.escenarioService.listarEscenarios().subscribe({
      next: (data) => {
        this.escenarios = data;
        this.calcularEstadisticas();
      },
      error: (err) => console.error('Error:', err)
    });
  }

  calcularEstadisticas(): void {
    this.totalEscenarios = this.escenarios.length;
    this.capacidadTotal = this.escenarios.reduce((sum, e) => sum + (e.capacidad || 0), 0);
  }

  abrirFormulario(): void {
    this.mostrarFormulario = true;
    this.editando = false;
    this.formulario = { nombre: '', capacidad: 0 };
  }

  cerrarFormulario(): void {
    this.mostrarFormulario = false;
    this.escenarioSeleccionado = null;
    this.editando = false;
  }

  guardarEscenario(): void {
    // === VALIDACIONES ===
    if (!this.formulario.nombre || this.formulario.nombre.trim() === '') {
        alert('El nombre del escenario es obligatorio');
        return;
    }
    
    if (!this.formulario.capacidad || this.formulario.capacidad <= 0) {
        alert('La capacidad debe ser mayor a 0');
        return;
    }

    // Guardar información de edición antes de cualquier operación
    const esEdicion = this.editando && this.escenarioSeleccionado;
    const id = this.escenarioSeleccionado?.idEscenario;

    // CERRAR FORMULARIO INMEDIATAMENTE
    this.cerrarFormulario();

    if (esEdicion) {
        // EDITAR
        this.escenarioService.actualizarEscenario(id!, this.formulario).subscribe({
            next: () => {
                this.cargarEscenarios();
            },
            error: (err) => {
                console.error('Error al actualizar:', err);
                alert('Error al actualizar el escenario');
            }
        });
    } else {
        // CREAR
        this.escenarioService.crearEscenario(this.formulario).subscribe({
            next: () => {
                this.cargarEscenarios();
            },
            error: (err) => {
                console.error('Error al crear:', err);
                alert('Error al crear el escenario');
            }
        });
    }
}

  editarEscenario(escenario: EscenarioResponseDto): void {
    this.editando = true;
    this.escenarioSeleccionado = escenario;
    this.formulario = {
      nombre: escenario.nombre,
      capacidad: escenario.capacidad
    };
    this.mostrarFormulario = true;
  }

  eliminarEscenario(id: number): void {
    if (confirm('¿Eliminar este escenario?')) {
      this.escenarioService.eliminarEscenario(id).subscribe({
        next: () => {
          this.cargarEscenarios();
        },
        error: (err) => {
          console.error('Error al eliminar:', err);
          alert('Error al eliminar el escenario');
        }
      });
    }
  }
}