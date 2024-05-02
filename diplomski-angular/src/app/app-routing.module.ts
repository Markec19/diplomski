import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { KalendarComponent } from './kalendar/kalendar.component';
import { AuthGuard } from './service/authguard';
import { RezervacijeListaComponent } from './rezervacije-lista/rezervacije-lista.component';

const routes: Routes = [
  {path: '', redirectTo: '/login', pathMatch: 'full'},
  {path: 'login', component: LoginComponent},
  {path: 'kalendar', component: KalendarComponent, canActivate: [AuthGuard] },
  {path: 'lista', component: RezervacijeListaComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
