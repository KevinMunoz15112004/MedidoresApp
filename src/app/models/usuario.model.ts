export interface Usuario {
  uid: string;
  email: string;
  nombre: string;
  rol: 'admin' | 'medidor';
  createdAt: Date;
  photoURL?: string;
}
