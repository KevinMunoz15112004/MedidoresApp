import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators, AbstractControl, ValidationErrors } from '@angular/forms';
import { FirebaseService } from '../../services/firebase.service';
import { Router } from '@angular/router';
import { ToastController } from '@ionic/angular';

@Component({
  selector: 'app-register',
  templateUrl: './register.page.html',
  styleUrls: ['./register.page.scss'],
  standalone: false
})
export class RegisterPage {
  registerForm: FormGroup;
  cargando = false;
  mostrarPassword = false;
  mostrarConfirmarPassword = false;
  tipoUsuario: 'medidor' | 'admin' = 'medidor';
  mostrarClaveSuperior = false;

  constructor(
    private formBuilder: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router,
    private toastController: ToastController
  ) {
    this.registerForm = this.formBuilder.group({
      nombre: ['', [Validators.required, Validators.minLength(3)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(6)]],
      confirmarPassword: ['', Validators.required],
      claveSuperior: ['']
    }, {
      validators: this.passwordMatchValidator()
    });
  }

  passwordMatchValidator() {
    return (control: AbstractControl): ValidationErrors | null => {
      const password = control.get('password')?.value;
      const confirmarPassword = control.get('confirmarPassword')?.value;
      
      if (password && confirmarPassword && password !== confirmarPassword) {
        control.get('confirmarPassword')?.setErrors({ 'passwordMismatch': true });
        return { passwordMismatch: true };
      }
      return null;
    };
  }

  async registro() {
    if (this.registerForm.invalid) {
      await this.mostrarToast('Por favor, completa todos los campos correctamente', 'warning');
      return;
    }

    if (this.tipoUsuario === 'admin' && this.registerForm.get('claveSuperior')?.value !== 'AdminABC123_') {
      await this.mostrarToast('Clave de administrador incorrecta', 'danger');
      return;
    }

    this.cargando = true;
    try {
      const { nombre, email, password, claveSuperior } = this.registerForm.value;
      const adminKey = this.tipoUsuario === 'admin' ? claveSuperior : undefined;
      
      await this.firebaseService.registro(email, password, nombre, adminKey);
      await this.firebaseService.logout();
      await this.mostrarToast('Registro exitoso', 'success');
      this.router.navigate(['/login']);
    } catch (error: any) {
      await this.mostrarToast(error.message || 'Error al registrarse', 'danger');
    } finally {
      this.cargando = false;
    }
  }

  irALogin() {
    this.router.navigate(['/login']);
  }

  togglePassword() {
    this.mostrarPassword = !this.mostrarPassword;
  }

  toggleConfirmarPassword() {
    this.mostrarConfirmarPassword = !this.mostrarConfirmarPassword;
  }

  toggleClaveSuperior() {
    this.mostrarClaveSuperior = !this.mostrarClaveSuperior;
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
