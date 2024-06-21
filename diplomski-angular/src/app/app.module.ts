import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { KalendarComponent } from './kalendar/kalendar.component';
import { RezervacijaFormComponent } from './rezervacija-forma/rezervacija-form.component';
import { RezervacijeListaComponent } from './rezervacije-lista/rezervacije-lista.component';

import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { SaleTabelaComponent } from './sale-tabela/sale-tabela.component';
import { MeniComponent } from './meni/meni.component';
import { ObavestenjaComponent } from './obavestenja/obavestenja.component';
import { MojeRezervacijeComponent } from './moje-rezervacije/moje-rezervacije.component';
import { NgSelectModule } from '@ng-select/ng-select';
import { ToastrModule } from 'ngx-toastr';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KalendarComponent,
    RezervacijaFormComponent,
    RezervacijeListaComponent,
    SaleTabelaComponent,
    MeniComponent,
    ObavestenjaComponent,
    MojeRezervacijeComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,
    NgSelectModule,

    BrowserAnimationsModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot({
      timeOut: 3000,
      positionClass: 'toast-top-right', 
      preventDuplicates: true,
    }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
