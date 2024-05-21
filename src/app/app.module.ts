import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';
import { IngresarComponent } from './ingresar/ingresar.component';
import { PanelComponent } from './panel/panel.component';
import { AgregarComponent } from './panel/agregar.component';
import { EditarComponent } from './panel/editar.component';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Ruta vacía redirige al home
  { path: 'home', component: HomeComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'ingresar', component: IngresarComponent },
  { path: 'panel', component: PanelComponent },
  { path: 'agregar', component: AgregarComponent },
  { path: 'editar', component: EditarComponent },
  { path: '**', redirectTo: 'home' } // Cualquier otra ruta redirige al home
];

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    HeaderComponent,
    HomeComponent,
    ContactoComponent,
    IngresarComponent,
    PanelComponent,
    AgregarComponent,
    EditarComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes)

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
