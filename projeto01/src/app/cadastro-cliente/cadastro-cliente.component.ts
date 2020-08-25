import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  //atributo
  mensagem:string;

  //método construtor
  constructor(private httpClient:HttpClient) { }

  //função executada quando o componente é carregado
  ngOnInit(): void {
  }

  //função executada no SUBMIT do formulário
  cadastrarCliente(formCadastro){

    this.mensagem = "Processando requisção, por favor aguarde...";

    //realizando a requisição para API
    this.httpClient.post("http://localhost:53747/api/Cliente", formCadastro.value)
      .subscribe(
        success => {
          this.mensagem = "Cliente cadastrado com sucesso.";

        },
        error => {
          this.mensagem = "Erro ao cadastrar cliente.";
        }
      );      
  }

}