import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators, } from '@angular/forms';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {

  // Validaciones de formulario
  agregarForm: FormGroup;
  constructor(private UsuarioServ: UsuarioService) {
    this.agregarForm = new FormGroup({
//    id: new FormControl(null),
      dni: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{8}$')]),
      nombre: new FormControl("", [Validators.required]),
      apellidos: new FormControl("", [Validators.required]),
      clave: new FormControl("", [Validators.required]),
      estado: new FormControl("", [Validators.required]),
    });
  }

  //==================
  ngOnInit() {
    this.obtenerUsuarios(); // Cuando la pag inicia, carga los datos
  }


  usuarios: any[] = [];//Array para obtener usuarios
  // Obtener todos los usuarios de bd
  obtenerUsuarios() {
    Swal.fire({
      position: "center",
      icon: "info",
      title: "Actualizando datos",
      //text:"Importando datos",
      showConfirmButton: false,
      timer: 900
    });
    this.usuarios = [];
    this.UsuarioServ.obtenerTodosUsuarios().subscribe(c => {
      c.docs.map(doc => {
        this.usuarios.push({ id: doc.id, data: doc.data() })
      })
    })

  }

  // editarTesoro( ){
  //   this.UsuarioServ
  //   .editar(this.frmTesoro.value,this.frmTesoro.value.id)
  //   .then((res) => {
  //     if (res === true) {
  //       alert('Se guardo con exito!');
  //       this.closeModal.nativeElement.click();
  //       this.obtenerTesoros();
  //       this.frmTesoro.reset();
  //     } else {
  //       alert('Ocurrio un error al almacenar :(');
  //       this.frmTesoro.reset();
  //     }
  //   })
  //   .catch((err) => {
  //     alert('Lo sentimos no se pudo procesar la petición :(');
  //   });
  // }


  // Agregar nuevo usuario
  agregarNuevo() {
    this.UsuarioServ
      .agregarUsuario(this.agregarForm.value)//
      .then((respuesta) => {
        if (respuesta === true) {
          Swal.fire({
            text: "Usuario agregado correctamente!",
            icon: "success",
            confirmButtonColor: "#008000",
            confirmButtonText: "Aceptar"
          });
          this.obtenerUsuarios();
          this.agregarForm.reset();
        } else {
          Swal.fire({
            text: "Ocurrio un error al agregar :(",
            icon: "error",
            confirmButtonColor: "#FF0000",
            confirmButtonText: "Aceptar"
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          text: "Ocurrio un error al agregar :(",
          icon: "error",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "Aceptar"
        });
      });
  }




  // agregarNuevo2() {
  //   this.UsuarioServ
  //     .agregarUsuario2(this.agregarForm.value.dni ,this.agregarForm.value)//
  //     .then((respuesta) => {
  //       if (respuesta === true) {
  //         Swal.fire({
  //           text: "Usuario agregado correctamente!",
  //           icon: "success",
  //           confirmButtonColor: "#008000",
  //           confirmButtonText: "Aceptar"
  //         });
  //         this.obtenerUsuarios();
  //         this.agregarForm.reset();
  //       } else {
  //         Swal.fire({
  //           text: "Ocurrio un error al agregar :(",
  //           icon: "error",
  //           confirmButtonColor: "#FF0000",
  //           confirmButtonText: "Aceptar"
  //         });
  //       }
  //     })
  //     .catch((err) => {
  //       Swal.fire({
  //         text: "Ocurrio un error al agregar :(",
  //         icon: "error",
  //         confirmButtonColor: "#FF0000",
  //         confirmButtonText: "Aceptar"
  //       });
  //     });
  // }






  resetForm(){
    this.agregarForm.reset();
  }



  Guardar() {
    if (this.agregarForm.invalid) {
      Swal.fire({
        text: "Completa todos los campos del formulario!",
        icon: "error",
        confirmButtonColor: "#FF0000",
        confirmButtonText: "Aceptar"
      });
    }

else {
  this.agregarNuevo();
  Swal.fire({
    text: "Usuario agregado correctamente!",
    icon: "success",
    confirmButtonColor: "#649A6B",
    confirmButtonText: "Aceptar"
  });




}

    // if(!this.frmTesoro.value.id){
    //   this.agregarTesoro();
    // }else{
    //   this.editarTesoro();
    // }
  
  }

  editarUsuario( ){
    // this.tesorosServ
    // .editar(this.frmTesoro.value,this.frmTesoro.value.id)
    // .then((res) => {
    //   if (res === true) {
    //     alert('Se guardo con exito!');
    //     this.closeModal.nativeElement.click();
    //     this.obtenerTesoros();
    //     this.frmTesoro.reset();
    //   } else {
    //     alert('Ocurrio un error al almacenar :(');
    //     this.frmTesoro.reset();
    //   }
    // })
    // .catch((err) => {
    //   alert('Lo sentimos no se pudo procesar la petición :(');
    // });
  }

  ver() {
    alert("Ver info");
  }
 

}

