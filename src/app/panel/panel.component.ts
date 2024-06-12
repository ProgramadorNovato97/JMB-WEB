import { Component, OnInit, ElementRef, ViewChild, HostListener } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';
import Swal from 'sweetalert2';
import { FormControl, FormGroup, Validators, } from '@angular/forms';
import { BootstrapOptions } from '@angular/core';



@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit {


  //Validaciones de formulario
  agregarForm: FormGroup;
  constructor(private UsuarioServ: UsuarioService) {
    this.agregarForm = new FormGroup({
      id: new FormControl(null),
      dni: new FormControl("", [Validators.required, Validators.pattern('^[0-9]{8}$')]),
      nombre: new FormControl("", [Validators.required]),
      apellidos: new FormControl("", [Validators.required]),
      clave: new FormControl("", [Validators.required]),
      estado: new FormControl("", [Validators.required]),
    });
  }
  ngOnInit() {
    this.obtenerUsuarios(); // Cuando la pag inicia, carga los datos
  }
  // Obtener todos los usuarios de bd
  usuarios: any[] = [];//Array usuarios
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

  // Agregar nuevo usuario
  agregarNuevo() {
    this.UsuarioServ
      .agregarUsuario(this.agregarForm.value)//
      .then((respuesta) => {
        if (respuesta === true) {
          this.obtenerUsuarios();
          Swal.fire({
            text: "Usuario AGREGADO correctamente!",
            icon: "success",
            confirmButtonColor: "#008000",
            confirmButtonText: "Aceptar"
          });
          this.agregarForm.reset();
        } else {
          Swal.fire({
            text: "No se pudo agregar usuario :(",
            icon: "error",
            confirmButtonColor: "#FF0000",
            confirmButtonText: "Aceptar"
          });
        }
      })
      .catch((err) => {
        Swal.fire({
          text: "Ocurrio un error al procesar :(" + err,
          icon: "error",
          confirmButtonColor: "#FF0000",
          confirmButtonText: "Aceptar"
        });
      });
  }



  // Resetear formularios
  resetForm() {
    this.agregarForm.reset();
  }


  // Guardar para agregar o para editar
  // Guardar() {
  //   if (this.agregarForm.invalid) {
  //     Swal.fire({
  //       text: "Completa todos los campos del formulario!",
  //       icon: "error",
  //       confirmButtonColor: "#FF0000",
  //       confirmButtonText: "Aceptar"
  //     });
  //   }
  //   else {
  //     //Verificar si lo que se hace es agregar o editar 
  //     if (!this.agregarForm.value.id) {
  //       this.agregarNuevo();
  //     } else {
  //       this.editarUsuario();
  //     }
  //   }
  // }


  cerrarModal(){
  
 }




  Guardar() {
    if (this.agregarForm.invalid) {
      alert('Complete toda la información por favor.');
    }

    if (!this.agregarForm.value.id) {
      this.agregarNuevo();
    } else {
      this.editarUsuario();
    }

  }

  editarUsuario() {
    this.UsuarioServ
      .editar(this.agregarForm.value, this.agregarForm.value.id)
      .then((res) => {
        if (res === true) {


          this.obtenerUsuarios();
          Swal.fire({
            text: "Usuario MODIFICADO correctamente!",
            icon: "success",
            confirmButtonColor: "#008000",
            confirmButtonText: "Aceptar"
          });

          //this.agregarForm.reset();
          // this.closeModal.nativeElement.click();

          // Tenemos problemas para cerrar los modal es por eso que anda devolviendo errores.
          // buscar la forma de esconder o cerrar los modal

        } else {
          Swal.fire({
            text: "Ocurrio un error al modificar :(",
            icon: "error",
            confirmButtonColor: "#FF0000",
            confirmButtonText: "Aceptar"
          });
          this.agregarForm.reset();
        }
      })
      .catch((err) => {
        console.log("Ha ocurrido uin error la procesar :( " + err)
        this.obtenerUsuarios();
      });
  }



  //Se completa los campos del formulario para editar
  completarCampos(usuario: any) {
    this.agregarForm.patchValue(usuario.data);
    this.agregarForm.patchValue({ id: usuario.id });
  }

  //Eliminar usuario
  eliminarUsuario(usuario: any) {
    Swal.fire({
      text: "Estas seguro de eliminar?",
      icon: "warning",
      showCancelButton: true,
      confirmButtonColor: "#3085d6",
      confirmButtonText: "Si, eliminar!",
      cancelButtonColor: "#d33",
      cancelButtonText: "Cancelar"
    }).then((result) => {
      if (result.isConfirmed) {
        this.UsuarioServ.Eliminar(usuario.id).then((c: any) => {
          console.log(c);
          if (c === true) {
            this.obtenerUsuarios();
            Swal.fire({
              text: "El usuario se ELIMINO correctamente!",
              icon: "success",
              confirmButtonColor: "#649A6B",
              confirmButtonText: "Aceptar",
              timer: 900
            });
          }
          else {
            Swal.fire({
              text: "Ocurrio un error al eliminar :(",
              icon: "error",
              confirmButtonColor: "#FF0000",
              confirmButtonText: "Aceptar",
            });
          }
        })
      }
    });
  }

}

