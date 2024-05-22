import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) { }

  obtenerTodosUsuarios() {
    return this.afs.collection("usuario").get();
  }

}
