import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-cadastro-cliente',
  templateUrl: './cadastro-cliente.component.html',
  styleUrls: ['./cadastro-cliente.component.css']
})
export class CadastroClienteComponent implements OnInit {

  //atributos
  mensagemProcessamento:string;
  mensagemSucesso:string;
  mensagemErro:string;

  errosNome = []; //array vazio
  errosEmail = []; //array vazio
  errosCpf = []; //array vazio

  //método construtor
  constructor(private httpClient:HttpClient) { }

  //função executada quando o componente é carregado
  ngOnInit(): void {
  }

  //função executada no SUBMIT do formulário
  cadastrarCliente(formCadastro){
    
      this.mensagemProcessamento = "Processando requisição, por favor aguarde...";
      this.mensagemSucesso = "";
      this.mensagemErro = "";

      this.errosNome = [];
      this.errosEmail = [];
      this.errosCpf = [];

      //realizando a requisição para a API
      this.httpClient.post(environment.apiUrlCliente, formCadastro.value, 
        { responseType : 'text' })
        .subscribe( //recebe o RESPONSE da requisição
          success => {
            this.mensagemProcessamento = "";
            this.mensagemSucesso = success;
            formCadastro.reset();
          },
          e => {
            
            this.mensagemProcessamento = "";

            //verificar o código do erro
            switch(e.status){
              case 400: //erros de validação
                this.mensagemErro = "Ocorreram erros de validação no formulário.";

                //ler o JSON retornado pela API com as mensagens de validação
                var validations = JSON.parse(e.error);
                
                this.errosNome = validations.errors.Nome;
                this.errosEmail = validations.errors.Email;
                this.errosCpf = validations.errors.Cpf;

                break;

              case 403: //erro de regra de negócio
                this.mensagemErro = e.error;
                break;

              default: //nenhum dos anteriores
                this.mensagemErro = "Erro ao cadastrar cliente.";
                break;
            }            
          }
        );
  }

  //função para limpar a mensagem de sucesso
  limparMensagemSucesso(){
    this.mensagemSucesso = "";
  }

  limparMensagemErro(){
    this.mensagemErro = "";
  }

}