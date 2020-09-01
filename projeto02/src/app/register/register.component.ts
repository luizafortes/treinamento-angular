import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {

  //atributos
  mensagem: string;

  errosNome = [];
  errosEmail = [];
  errosSenha = [];
  errosSenhaConfirmacao = [];

  constructor(private httpClient: HttpClient) { }

  ngOnInit(): void {
  }

  cadastrarUsuario(formRegister) {

    this.mensagem = "Processando requisição, por favor aguarde.";

    //limpar as mensagens de erro
    this.errosNome = [];
    this.errosEmail = [];
    this.errosSenha = [];
    this.errosSenhaConfirmacao = [];

    //realizando uma chamada POST para a API
    this.httpClient.post(environment.apiUrlUsuario, formRegister.value,
      { responseType: 'text' })
      .subscribe(
        success => { //retorno de sucesso!
          this.mensagem = success; //mensagem de sucesso.
          formRegister.reset(); //limpar os campos do formulário
        },
        e => { //retorno de erro!

          this.mensagem = "";

          //verificar o código do erro
          switch (e.status) {

            case 400: //erros de validação
              this.mensagem = "Ocorreram erros de validação no formulário.";

              //ler o JSON retornado pela API com as mensagens de validação
              var validations = JSON.parse(e.error);

              this.errosNome = validations.errors.Nome;
              this.errosEmail = validations.errors.Email;
              this.errosSenha = validations.errors.Senha;
              this.errosSenhaConfirmacao = validations.errors.SenhaConfirmacao;

              break;

            case 403: //erro de regra de negócio
              this.mensagem = e.error;
              break;

            default: //nenhum dos anteriores
              this.mensagem = "Erro ao cadastrar usuário.";
              break;

          }
        }
      );

  }
}

