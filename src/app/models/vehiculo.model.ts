export interface Vehiculo {
  id: number;
  nombre: string;
  marca: string;
  modelo: string;
  anio: number;
  precio: number;
  categoria: 'sedanes' | 'suv' | 'camionetas' | 'deportivos';
  imagen: string;
  caracteristicas: string[];
}

export interface Promocion {
  titulo: string;
  descripcion: string;
  descuento: string;
}

export interface Resena {
  cliente: string;
  comentario: string;
  calificacion: number;
}