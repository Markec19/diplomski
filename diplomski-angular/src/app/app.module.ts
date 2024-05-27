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
import { TimepickerModule } from 'ngx-bootstrap/timepicker';
import { SaleTabelaComponent } from './sale-tabela/sale-tabela.component';
import { MeniComponent } from './meni/meni.component';

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    KalendarComponent,
    RezervacijaFormComponent,
    RezervacijeListaComponent,
    SaleTabelaComponent,
    MeniComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    ReactiveFormsModule,

    BrowserAnimationsModule,
    TimepickerModule.forRoot(),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {
}
