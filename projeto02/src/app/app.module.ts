import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

//mapeamento das rotas (URLs) para acessar cada componente
import { RouterModule, Routes } from '@angular/router';

//biblioteca para desenvolvimento de formulários
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

//biblioteca para realizar as chamadas para a API
import { HttpClientModule } from '@angular/common/http';

//mapeamento das rotas
const appRoutes : Routes = [
  { path : 'login', component : LoginComponent },
  { path : 'register', component : RegisterComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    RegisterComponent
  ],
  imports: [
    BrowserModule,
    FormsModule, //registrando
    ReactiveFormsModule, //registrando
    HttpClientModule, //registrando
    RouterModule.forRoot(appRoutes) //registrando
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }