export interface Medicion {
  id?: string;
  userId: string;
  userEmail: string;
  userName: string;
  valor: number;
  observaciones: string;
  fotoMedidor: string;
  fotoFachada: string;
  latitude: number;
  longitude: number;
  timestamp: Date;
  mapsLink?: string;
  direccion?: string;
}
