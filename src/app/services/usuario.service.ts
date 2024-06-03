import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore } from '@angular/fire/compat/firestore';

@Injectable({
  providedIn: 'root'
})
export class UsuarioService {

  constructor(public afs: AngularFirestore, public afAuth: AngularFireAuth) { }

  //========Obtener toda la tabla de usuarios =====
  obtenerTodosUsuarios() {
    return this.afs.collection("usuario").get();
  }

  //========Agregar usuarios ========
  async agregarUsuario(data: any) {
    return await this.afs.collection("usuario").add({ ...data }).then(c => {
      return true;
    }).catch(err => err)
  }




  

  // async agregarUsuario2(id: string, data: any) {
  //   return await this.afs.collection("usuario").doc(id).set({ ...data }).then(() => {
  //     return true;
  //   }).catch(err => err);
  // }





  //========Editar usuarios ========
  async editar(data: any, id: any) {
    return await this.afs.collection("usuario").doc(id).set({ ...data }).then(c => {
      return true;
    }).catch(err => err)
  }

  //========Eliminar usuarios ========  ????????????útil????????????????
  async Eliminar(id: any) {
    return await this.afs.collection("usuario").doc(id).delete().then(c => {
      return true;
    })
      .catch(err => {
        return err
      })
  }

}
