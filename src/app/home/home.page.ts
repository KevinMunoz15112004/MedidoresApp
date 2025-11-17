import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { FirebaseService } from '../services/firebase.service';
import { Usuario } from '../models/usuario.model';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
  standalone: false,
})
export class HomePage implements OnInit {
  usuario: Usuario | null = null;

  constructor(
    private firebaseService: FirebaseService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.usuario = this.firebaseService.getCurrentUser();
  }

  ngOnInit() {
    this.firebaseService.currentUser$.subscribe(user => {
      this.usuario = user;
    });
  }

  irANuevaMedicion() {
    this.router.navigate(['/nueva-medicion']);
  }

  irAListado() {
    this.router.navigate(['/listado-mediciones']);
  }

  async logout() {
    try {
      await this.firebaseService.logout();
      await this.mostrarToast('Sesión cerrada correctamente', 'success');
      this.router.navigate(['/login']);
    } catch (error: any) {
      await this.mostrarToast(error.message || 'Error al cerrar sesión', 'danger');
    }
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
