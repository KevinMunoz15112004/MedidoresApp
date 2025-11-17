import { Injectable } from '@angular/core';
import { Auth, createUserWithEmailAndPassword, signInWithEmailAndPassword, signOut, authState, User } from '@angular/fire/auth';
import { Firestore, collection, addDoc, query, where, getDocs, serverTimestamp, setDoc, doc, getDoc, DocumentSnapshot } from '@angular/fire/firestore';
import { Usuario } from '../models/usuario.model';
import { Medicion } from '../models/medicion.model';
import { Observable, from, BehaviorSubject } from 'rxjs';
import { switchMap, map, catchError } from 'rxjs/operators';
import { of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private currentUser = new BehaviorSubject<Usuario | null>(null);
  public currentUser$ = this.currentUser.asObservable();

  constructor(
    private auth: Auth,
    private firestore: Firestore
  ) {
    this.initializeAuth();
  }

  private initializeAuth() {
    authState(this.auth).subscribe((user: User | null) => {
      if (user) {
        this.getUserData(user.uid).then((userData: Usuario | null) => {
          this.currentUser.next(userData || null);
        });
      } else {
        this.currentUser.next(null);
      }
    });
  }

  async registro(email: string, password: string, nombre: string, adminKey?: string): Promise<Usuario> {
    try {
      const resultado = await createUserWithEmailAndPassword(this.auth, email, password);
      const rol = adminKey === 'AdminABC123_' ? 'admin' : 'medidor';

      const nuevoUsuario: Usuario = {
        uid: resultado.user.uid,
        email: email,
        nombre: nombre,
        rol: rol,
        createdAt: new Date()
      };

      const usersRef = collection(this.firestore, 'usuarios');
      await setDoc(doc(this.firestore, 'usuarios', resultado.user.uid), {
        ...nuevoUsuario,
        createdAt: serverTimestamp()
      });

      this.currentUser.next(nuevoUsuario);
      return nuevoUsuario;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async login(email: string, password: string): Promise<Usuario> {
    try {
      const resultado = await signInWithEmailAndPassword(this.auth, email, password);
      const userData = await this.getUserData(resultado.user.uid);
      if (userData) {
        this.currentUser.next(userData);
        return userData;
      }
      throw new Error('Usuario no encontrado');
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  private getUserData(uid: string): Promise<Usuario | null> {
    return getDoc(doc(this.firestore, 'usuarios', uid))
      .then((docSnap: DocumentSnapshot) => {
        if (docSnap.exists()) {
          return docSnap.data() as Usuario;
        }
        return null;
      });
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.currentUser.next(null);
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async guardarMedicion(medicion: Medicion): Promise<string> {
    try {
      const medicionesRef = collection(this.firestore, 'mediciones');
      const docRef = await addDoc(medicionesRef, {
        ...medicion,
        timestamp: serverTimestamp()
      });
      return docRef.id;
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async obtenerTodasLasMediciones(): Promise<Medicion[]> {
    try {
      const medicionesRef = collection(this.firestore, 'mediciones');
      const querySnapshot = await getDocs(medicionesRef);
      return querySnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      } as Medicion));
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  async obtenerMismediciones(userId: string): Promise<Medicion[]> {
    try {
      const medicionesRef = collection(this.firestore, 'mediciones');
      const q = query(medicionesRef, where('userId', '==', userId));
      const querySnapshot = await getDocs(q);
      return querySnapshot.docs.map((doc: any) => ({
        id: doc.id,
        ...doc.data()
      } as Medicion));
    } catch (error: any) {
      throw this.handleError(error);
    }
  }

  getCurrentUser(): Usuario | null {
    return this.currentUser.value;
  }

  isAdmin(): boolean {
    return this.currentUser.value?.rol === 'admin';
  }

  private handleError(error: any): Error {
    let errorMessage = 'Error desconocido';
    
    if (error.code) {
      switch (error.code) {
        case 'auth/invalid-email':
          errorMessage = 'Correo electrónico inválido';
          break;
        case 'auth/user-disabled':
          errorMessage = 'Usuario deshabilitado';
          break;
        case 'auth/user-not-found':
          errorMessage = 'Usuario no encontrado';
          break;
        case 'auth/wrong-password':
          errorMessage = 'Contraseña incorrecta';
          break;
        case 'auth/email-already-in-use':
          errorMessage = 'El correo ya está en uso';
          break;
        case 'auth/weak-password':
          errorMessage = 'La contraseña es muy débil';
          break;
        default:
          errorMessage = error.message || 'Error en autenticación';
      }
    }
    
    return new Error(errorMessage);
  }
}
