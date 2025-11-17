import { Injectable } from '@angular/core';
import { Geolocation } from '@capacitor/geolocation';

export interface Coordenadas {
  latitude: number;
  longitude: number;
}

@Injectable({
  providedIn: 'root'
})
export class GeolocationService {

  constructor() { }

  async obtenerLocalizacion(): Promise<Coordenadas> {
    try {
      const permission = await Geolocation.requestPermissions();
      if (permission.location !== 'granted') {
        throw new Error('Permiso de ubicación denegado');
      }

      // Obtener posición con opciones: timeout y alta precisión
      const coordinates = await Geolocation.getCurrentPosition({
        enableHighAccuracy: true,
        timeout: 15000  // 15 segundos de timeout
      });

      return {
        latitude: coordinates.coords.latitude,
        longitude: coordinates.coords.longitude
      };
    } catch (error: any) {
      throw new Error('No se pudo obtener la ubicación: ' + error.message);
    }
  }

  generarEnlaceMaps(latitude: number, longitude: number): string {
    return `https://maps.google.com/?q=${latitude},${longitude}`;
  }
}
