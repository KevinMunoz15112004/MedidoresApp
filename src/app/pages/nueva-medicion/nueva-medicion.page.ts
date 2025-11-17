import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { GeolocationService } from '../../services/geolocation.service';
import { CameraService } from '../../services/camera.service';
import { Router } from '@angular/router';
import { ToastController, LoadingController } from '@ionic/angular';
import { Medicion } from '../../models/medicion.model';
import { Usuario } from '../../models/usuario.model';

@Component({
  selector: 'app-nueva-medicion',
  templateUrl: './nueva-medicion.page.html',
  styleUrls: ['./nueva-medicion.page.scss'],
  standalone: false
})
export class NuevaMedicionPage {
  medicionForm: FormGroup;
  cargando = false;
  fotoMedidor: string | null = null;
  fotoFachada: string | null = null;
  latitude: number | null = null;
  longitude: number | null = null;
  usuario: Usuario | null = null;
  obteniendoUbicacion = false;
  tomandoFoto = false;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private geolocationService: GeolocationService,
    private cameraService: CameraService,
    private router: Router,
    private toastController: ToastController,
    private loadingController: LoadingController
  ) {
    this.medicionForm = this.formBuilder.group({
      valor: ['', [Validators.required, Validators.min(0)]],
      observaciones: [''],
      direccion: ['']
    });

    this.usuario = this.firebaseService.getCurrentUser();
  }

  async obtenerUbicacion() {
    if (this.obteniendoUbicacion) return;

    this.obteniendoUbicacion = true;
    try {
      const loading = await this.loadingController.create({
        message: 'Obteniendo ubicación...',
        spinner: 'crescent'
      });
      await loading.present();

      const coords = await this.geolocationService.obtenerLocalizacion();
      this.latitude = coords.latitude;
      this.longitude = coords.longitude;
      
      await loading.dismiss();
      await this.mostrarToast('Ubicación obtenida correctamente', 'success');
    } catch (error: any) {
      await this.mostrarToast(error.message || 'Error al obtener ubicación', 'danger');
    } finally {
      this.obteniendoUbicacion = false;
    }
  }

  async tomarFotoMedidor() {
    if (this.tomandoFoto) return;

    this.tomandoFoto = true;
    try {
      this.fotoMedidor = await this.cameraService.tomarFoto();
      await this.mostrarToast('Foto del medidor capturada', 'success');
    } catch (error: any) {
      await this.mostrarToast(error.message || 'Error al capturar foto', 'danger');
    } finally {
      this.tomandoFoto = false;
    }
  }

  async tomarFotoFachada() {
    if (this.tomandoFoto) return;

    this.tomandoFoto = true;
    try {
      this.fotoFachada = await this.cameraService.tomarFoto();
      await this.mostrarToast('Foto de la fachada capturada', 'success');
    } catch (error: any) {
      await this.mostrarToast(error.message || 'Error al capturar foto', 'danger');
    } finally {
      this.tomandoFoto = false;
    }
  }

  async guardarMedicion() {
    if (this.medicionForm.invalid) {
      await this.mostrarToast('Por favor, completa los campos requeridos', 'warning');
      return;
    }

    if (!this.fotoMedidor) {
      await this.mostrarToast('Por favor, captura foto del medidor', 'warning');
      return;
    }

    if (!this.fotoFachada) {
      await this.mostrarToast('Por favor, captura foto de la fachada', 'warning');
      return;
    }

    if (this.latitude === null || this.longitude === null) {
      await this.mostrarToast('Por favor, obtén la ubicación GPS', 'warning');
      return;
    }

    if (!this.usuario) {
      await this.mostrarToast('Error: Usuario no autenticado', 'danger');
      return;
    }

    this.cargando = true;
    try {
      const loading = await this.loadingController.create({
        message: 'Guardando medición...',
        spinner: 'crescent'
      });
      await loading.present();

      const mapsLink = this.geolocationService.generarEnlaceMaps(this.latitude!, this.longitude!);

      const medicion: Medicion = {
        ...this.medicionForm.value,
        userId: this.usuario.uid,
        userEmail: this.usuario.email,
        userName: this.usuario.nombre,
        fotoMedidor: this.fotoMedidor,
        fotoFachada: this.fotoFachada,
        latitude: this.latitude,
        longitude: this.longitude,
        mapsLink: mapsLink,
        timestamp: new Date()
      };

      await this.firebaseService.guardarMedicion(medicion);
      
      await loading.dismiss();
      await this.mostrarToast('Medición guardada exitosamente', 'success');
      
      // Resetear formulario
      this.medicionForm.reset();
      this.fotoMedidor = null;
      this.fotoFachada = null;
      this.latitude = null;
      this.longitude = null;

      this.router.navigate(['/listado-mediciones']);
    } catch (error: any) {
      await this.mostrarToast(error.message || 'Error al guardar medición', 'danger');
    } finally {
      this.cargando = false;
    }
  }

  eliminarFotoMedidor() {
    this.fotoMedidor = null;
  }

  eliminarFotoFachada() {
    this.fotoFachada = null;
  }

  private async mostrarToast(mensaje: string, color: string) {
    const toast = await this.toastController.create({
      message: mensaje,
      duration: 3000,
      color: color,
      position: 'bottom'
    });
    await toast.present();
  }
}
