import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { Medicion } from '../../models/medicion.model';
import { ToastController } from '@ionic/angular';
import { Timestamp } from 'firebase/firestore';

@Component({
  selector: 'app-detalle-medicion',
  templateUrl: './detalle-medicion.page.html',
  styleUrls: ['./detalle-medicion.page.scss'],
  standalone: false
})
export class DetalleMedicionPage implements OnInit {
  medicion: Medicion | null = null;
  cargando = false;

  constructor(
    private route: ActivatedRoute,
    private firebaseService: FirebaseService,
    private toastController: ToastController
  ) { }

  ngOnInit() {
    this.cargarMedicion();
  }

  async cargarMedicion() {
    const medicionId = this.route.snapshot.paramMap.get('id');

    if (!medicionId) {
      await this.mostrarToast('ID de medición no encontrado', 'danger');
      return;
    }

    this.cargando = true;
    try {
      const usuario = this.firebaseService.getCurrentUser();
      if (!usuario) {
        await this.mostrarToast('Usuario no autenticado', 'danger');
        return;
      }

      let mediciones: Medicion[] = [];

      if (usuario.rol === 'admin') {
        mediciones = await this.firebaseService.obtenerTodasLasMediciones();
      } else {
        mediciones = await this.firebaseService.obtenerMismediciones(usuario.uid);
      }

      this.medicion = mediciones.find(m => m.id === medicionId) || null;


      this.medicion = mediciones.find(m => m.id === medicionId) || null;

      if (this.medicion) {
        if (this.medicion.timestamp && (this.medicion.timestamp as any).toDate) {
          this.medicion.timestamp = (this.medicion.timestamp as any).toDate();
        }
      } else {
        await this.mostrarToast('Medición no encontrada', 'danger');
      }

      if (!this.medicion) {
        await this.mostrarToast('Medición no encontrada', 'danger');
      }
    } catch (error: any) {
      await this.mostrarToast(error.message || 'Error al cargar medición', 'danger');
    } finally {
      this.cargando = false;
    }
  }

  abrirMaps() {
    if (this.medicion?.mapsLink) {
      window.open(this.medicion.mapsLink, '_blank');
    }
  }

  descargarFoto(foto: string, nombre: string) {
    const link = document.createElement('a');
    link.href = foto;
    link.download = nombre + '.jpg';
    link.click();
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
