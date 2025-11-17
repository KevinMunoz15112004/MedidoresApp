import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-login',
  templateUrl: './login.page.html',
  styleUrls: ['./login.page.scss'],
  standalone: false
})
export class LoginPage {
  loginForm: FormGroup;
  cargando = false;
  mostrarPassword = false;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.loginForm = this.formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]]
    });
  }

  async login() {
    if (this.loginForm.invalid) {
      await this.mostrarToast('Por favor, completa todos los campos correctamente', 'warning');
      return;
    }

    this.cargando = true;
    try {
      const { email, password } = this.loginForm.value;
      await this.firebaseService.login(email, password);
      await this.mostrarToast('Ingreso exitoso', 'success');
      this.router.navigate(['/home']);
    } catch (error: any) {
      await this.mostrarToast(error.message || 'Error al iniciar sesión', 'danger');
    } finally {
      this.cargando = false;
    }
  }

  irARegistro() {
    this.router.navigate(['/register']);
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
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
