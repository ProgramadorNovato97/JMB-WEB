import { Component } from '@angular/core';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-agregar',
  templateUrl: './agregar.component.html',
  
})

export class AgregarComponent {

    agregarNuevo(){
      Swal.fire({
        title: "Usuario agregado!",
        text: "Texto del sweetalert!",
        icon: "success",
        showCancelButton: true,
        cancelButtonColor:"#FF0000",
        cancelButtonText: "No aceptar",
        confirmButtonColor: "#00FF2E",
        confirmButtonText: "Aceptar"
      });

    }
}