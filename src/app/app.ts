import { Component, inject, signal } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { VehiculoService } from './services/vehiculo.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  private vehiculoService = inject(VehiculoService);

  vehiculosFiltrados = this.vehiculoService.vehiculosFiltrados;
  promociones = this.vehiculoService.getPromociones();
  resenas = this.vehiculoService.getResenas();
  categoriaSeleccionada = this.vehiculoService.categoriaSeleccionada;

  infoInstitucional = {
    historia: 'Fundada en 2010, AutoMax ha crecido hasta convertirse en la red concesionaria líder en el país.',
    mision: 'Brindar soluciones de movilidad de alta calidad, confiabilidad y con la mejor atención integral.',
    vision: 'Ser la empresa automotriz referente e innovadora en tecnología y servicio al cliente.'
  };

  nuevoNombre = signal('');
  nuevaMarca = signal('');
  nuevoModelo = signal('');
  nuevoAnio = signal(2024);
  nuevoPrecio = signal(0);
  nuevaCategoria = signal<'sedanes' | 'suv' | 'camionetas' | 'deportivos'>('sedanes');
  nuevaImagen = signal('');
  nuevasCaracteristicas = signal('');

  mensajeExito = signal<string | null>(null);

  filtrarPorCategoria(cat: string) {
    this.vehiculoService.categoriaSeleccionada.set(cat);
  }

  guardarVehiculo() {
    if (!this.nuevoNombre() || !this.nuevaMarca() || this.nuevoPrecio() <= 0) {
      alert('Por favor complete todos los campos obligatorios.');
      return;
    }

    this.vehiculoService.agregarVehiculo({
      nombre: this.nuevoNombre(),
      marca: this.nuevaMarca(),
      modelo: this.nuevoModelo(),
      anio: this.nuevoAnio(),
      precio: this.nuevoPrecio(),
      categoria: this.nuevaCategoria(),
      imagen: this.nuevaImagen() || 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=600&q=80',
      caracteristicas: this.nuevasCaracteristicas().split(',').map(c => c.trim()).filter(c => c !== '')
    });

    this.nuevoNombre.set('');
    this.nuevaMarca.set('');
    this.nuevoModelo.set('');
    this.nuevoAnio.set(2024);
    this.nuevoPrecio.set(0);
    this.nuevaImagen.set('');
    this.nuevasCaracteristicas.set('');

    this.mensajeExito.set('¡Vehículo registrado con éxito!');
    setTimeout(() => this.mensajeExito.set(null), 4000);
  }
}
