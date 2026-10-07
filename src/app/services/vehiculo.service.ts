import { Injectable, signal, computed } from '@angular/core';
import { Vehiculo, Promocion, Resena } from '../models/vehiculo.model';

@Injectable({
  providedIn: 'root'
})
export class VehiculoService {
  private vehiculosSignal = signal<Vehiculo[]>([
    {
      id: 1,
      nombre: 'AutoMax Sedan Pro',
      marca: 'Toyota',
      modelo: 'Corolla',
      anio: 2024,
      precio: 22000,
      categoria: 'sedanes',
      imagen: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=600&q=80',
      caracteristicas: ['Motor 2.0L', 'Transmisión Automática', 'Pantalla Táctil 9"']
    },
    {
      id: 2,
      nombre: 'AutoMax SUV Master',
      marca: 'Honda',
      modelo: 'CR-V',
      anio: 2024,
      precio: 35000,
      categoria: 'suv',
      imagen: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=600&q=80',
      caracteristicas: ['Tracción AWD', 'Asientos de Cuero', 'Sunroof Panorámico']
    },
    {
      id: 3,
      nombre: 'AutoMax Beast 4x4',
      marca: 'Ford',
      modelo: 'Ranger',
      anio: 2023,
      precio: 42000,
      categoria: 'camionetas',
      imagen: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=600&q=80',
      caracteristicas: ['Motor Diesel 3.2L', 'Capacidad 1 Tonelada', 'Control de Descenso']
    },
    {
      id: 4,
      nombre: 'AutoMax GT Speed',
      marca: 'Porsche',
      modelo: '911 Carrera',
      anio: 2024,
      precio: 110000,
      categoria: 'deportivos',
      imagen: 'https://images.unsplash.com/photo-1614162692292-7ac56d7f7f1e?auto=format&fit=crop&w=600&q=80',
      caracteristicas: ['0-100 km/h en 3.5s', '450 HP', 'Frenos Cerámicos']
    }
  ]);

  private promocionesSignal = signal<Promocion[]>([
    { titulo: 'Bono de Descuento Verano', descripcion: 'Llévate $2,000 de descuento en la compra de tu SUV.', descuento: '-$2,000' },
    { titulo: 'Mantenimiento Gratis', descripcion: 'Primeros 2 años de mantenimiento 100% cubiertos.', descuento: '100% OFF' }
  ]);

  private resenasSignal = signal<Resena[]>([
    { cliente: 'Carlos Mendoza', comentario: 'Excelente atención y los vehículos son de primera calidad.', calificacion: 5 },
    { cliente: 'María Fernández', comentario: 'Compré mi camioneta aquí y el trámite fue rápido y transparente.', calificacion: 5 }
  ]);

  categoriaSeleccionada = signal<string>('todas');

  vehiculosFiltrados = computed(() => {
    const cat = this.categoriaSeleccionada();
    if (cat === 'todas') return this.vehiculosSignal();
    return this.vehiculosSignal().filter(v => v.categoria === cat);
  });

  getPromociones() {
    return this.promocionesSignal.asReadonly();
  }

  getResenas() {
    return this.resenasSignal.asReadonly();
  }

  agregarVehiculo(vehiculo: Omit<Vehiculo, 'id'>) {
    const nuevo: Vehiculo = {
      ...vehiculo,
      id: this.vehiculosSignal().length + 1
    };
    this.vehiculosSignal.update(lista => [...lista, nuevo]);
  }
}
