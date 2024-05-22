import { Component, OnInit } from '@angular/core';
import { UsuarioService } from '../services/usuario.service';


@Component({
  selector: 'app-panel',
  templateUrl: './panel.component.html',
  styleUrl: './panel.component.css'
})
export class PanelComponent implements OnInit{
    
  constructor(private UsuarioServ: UsuarioService) {}
    
  ngOnInit(){
    this.obtenerUsuarios();
  }
  
  usuarios: any[] = [];  
  
  obtenerUsuarios(){
    this.usuarios = [];
    this.UsuarioServ.obtenerTodosUsuarios().subscribe(c=>{
      c.docs.map(doc=>{
        this.usuarios.push({ id : doc.id , data : doc.data()  })
      })
    })
  }


  ver() {
    alert("Ver info");
  }
  editar() {
    alert("Editar info");
  }

}

