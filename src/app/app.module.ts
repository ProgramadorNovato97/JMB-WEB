import { NgModule } from '@angular/core';
import { BrowserModule, provideClientHydration } from '@angular/platform-browser';
import { RouterModule, Routes } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms'; //

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { FooterComponent } from './footer/footer.component';
import { HeaderComponent } from './header/header.component';
import { HomeComponent } from './home/home.component';
import { ContactoComponent } from './contacto/contacto.component';
import { IngresarComponent } from './ingresar/ingresar.component';
import { PanelComponent } from './panel/panel.component';
;

//====== Firebase ======
import { AngularFireModule } from '@angular/fire/compat';
import { environment } from './core/environment/environment';

const routes: Routes = [
  { path: '', redirectTo: 'home', pathMatch: 'full' }, // Ruta vacía redirige al home
  { path: 'home', component: HomeComponent },
  { path: 'contacto', component: ContactoComponent },
  { path: 'ingresar', component: IngresarComponent },
  { path: 'panel', component: PanelComponent },

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
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    RouterModule.forRoot(routes),
    ReactiveFormsModule, 
    AngularFireModule.initializeApp(environment.firebaseConfig),// Inicializamos firebase

  ],
  providers: [
    provideClientHydration()
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
