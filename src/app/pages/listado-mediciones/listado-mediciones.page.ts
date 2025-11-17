import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { Usuario } from '../../models/usuario.model';
import { Medicion } from '../../models/medicion.model';
import { Router } from '@angular/router';
import { ToastController, RefresherCustomEvent } from '@ionic/angular';

@Component({
  selector: 'app-listado-mediciones',
  templateUrl: './listado-mediciones.page.html',
  styleUrls: ['./listado-mediciones.page.scss'],
  standalone: false
})
export class ListadoMedicionesPage implements OnInit {
  mediciones: Medicion[] = [];
  cargando = false;
  usuario: Usuario | null = null;
  filtro: 'todas' | 'mias' = 'mias';

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.usuario = this.firebaseService.getCurrentUser();
  }

  ngOnInit() {
    if (this.usuario?.rol === 'admin') {
      this.filtro = 'todas';
    } else {
      this.filtro = 'mias';
    }
    this.cargarMediciones();
  }

  ionViewWillEnter() {
    this.cargarMediciones();
  }

  async cargarMediciones() {
    this.cargando = true;
    try {
      if (this.usuario?.rol === 'admin' && this.filtro === 'todas') {
        this.mediciones = await this.firebaseService.obtenerTodasLasMediciones();
      } else {
        this.mediciones = await this.firebaseService.obtenerMismediciones(this.usuario?.uid || '');
      }
      this.mediciones.sort((a, b) => {
        const dateA = this.convertirTimestamp(a.timestamp).getTime();
        const dateB = this.convertirTimestamp(b.timestamp).getTime();
        return dateB - dateA;
      });
    } catch (error: any) {
      await this.mostrarToast(error.message || 'Error al cargar mediciones', 'danger');
    } finally {
      this.cargando = false;
    }
  }

  async refrescar(event: any) {
    await this.cargarMediciones();
    event.target.complete();
  }

  verDetalle(medicion: Medicion) {
    this.router.navigate(['/detalle-medicion', medicion.id]);
  }

  nuevaMedicion() {
    this.router.navigate(['/nueva-medicion']);
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

  cambiarFiltro(evento: any) {
    this.filtro = evento.detail.value;
    this.cargarMediciones();
  }

  convertirTimestamp(timestamp: any): Date {
    if (timestamp?.toDate) {
      return timestamp.toDate();
    } else if (timestamp instanceof Date) {
      return timestamp;
    } else if (typeof timestamp === 'number') {
      return new Date(timestamp);
    } else if (typeof timestamp === 'string') {
      return new Date(timestamp);
    }
    return new Date();
  }
}
