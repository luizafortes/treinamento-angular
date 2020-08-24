import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { CadastroClienteComponent } from './cadastro-cliente/cadastro-cliente.component';
import { ConsultaClienteComponent } from './consulta-cliente/consulta-cliente.component';

//importando as bibliotecas necessárias do angular/router
import { RouterModule, Routes } from '@angular/router';

//mapeamento das rotas do projeto (navegações)
const appRoutes : Routes = [
  { path : 'cadastrar-clientes', component : CadastroClienteComponent },
  { path : 'consultar-clientes', component : ConsultaClienteComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    CadastroClienteComponent,
    ConsultaClienteComponent
  ],
  imports: [
    BrowserModule,
    RouterModule.forRoot(appRoutes) //registrando a configuração
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }