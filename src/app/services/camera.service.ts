import { Injectable } from '@angular/core';
import { Camera, CameraResultType, CameraSource } from '@capacitor/camera';

@Injectable({
  providedIn: 'root'
})
export class CameraService {

  constructor() { }

  async tomarFoto(): Promise<string> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Camera
      });

      return 'data:image/jpeg;base64,' + image.base64String;
    } catch (error: any) {
      throw new Error('Error al capturar foto: ' + error.message);
    }
  }

  async seleccionarFotoDeLaGaleria(): Promise<string> {
    try {
      const image = await Camera.getPhoto({
        quality: 90,
        allowEditing: false,
        resultType: CameraResultType.Base64,
        source: CameraSource.Photos
      });

      return 'data:image/jpeg;base64,' + image.base64String;
    } catch (error: any) {
      throw new Error('Error al seleccionar foto: ' + error.message);
    }
  }
}
