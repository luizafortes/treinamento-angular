import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from '../../environments/environment';

@Component({
  selector: 'app-consulta-cliente',
  templateUrl: './consulta-cliente.component.html',
  styleUrls: ['./consulta-cliente.component.css']
})
export class ConsultaClienteComponent implements OnInit {

  //atributos
  listagemDeClientes = []; //Array vazio..
  mensagemSucessoExclusao: string;
  mensagemSucessoEdicao: string;
  mensagemErroEdicao: string;

  errosNome = [];
  errosEmail = [];
  errosCpf = [];

  //objeto para armazenar os dados do cliente que será atualizado
  clienteEdicao = {
    idCliente: 0,
    nome: '',
    email: '',
    cpf: ''
  }

  //inicializando o objeto HttpClient
  constructor(private httpClient: HttpClient) { }

  //função executada quando o componente é carregado
  ngOnInit(): void {
    this.consultarClientes();
  }

  //função para executar a consulta de clientes na API
  consultarClientes() {
    //requisição GET para a API
    this.httpClient.get(environment.apiUrlCliente)
      .subscribe(
        (success: any[]) => {
          this.listagemDeClientes = success;
        },
        e => {
          console.log(e);
        }
      )
  }

  //função para realizar a exclusão do cliente
  excluirCliente(id) {
    if (window.confirm('Deseja realmente excluir o registro?')) {
      //executando uma requisição DELETE para a API
      this.httpClient.delete(environment.apiUrlCliente + "/" + id,
        { responseType: 'text' })
        .subscribe(
          success => {
            this.mensagemSucessoExclusao = success;
            this.consultarClientes();
          },
          e => {
            console.log(e);
          }
        )
    }
  }

  //função para obter os dados do cliente selecionado para a edição
  exibirCliente(item) {
    this.clienteEdicao = item;

    this.mensagemSucessoEdicao = "";
    this.mensagemErroEdicao = "";

    this.errosNome = [];
    this.errosEmail = [];
    this.errosCpf = [];
  }

  //função para exxecutar a edição do cliente (SUBMIT)
  atualizarCliente(formEdicao) {

    this.mensagemSucessoEdicao = "";
    this.mensagemErroEdicao = "";

    this.errosNome = [];
    this.errosEmail = [];
    this.errosCpf = [];

    //realizando a requisição para a API
    this.httpClient.put(environment.apiUrlCliente, formEdicao.value,
      { responseType: 'text' })
      .subscribe( //recebe o RESPONSE da requisição
        success => {
          this.mensagemSucessoEdicao = success;
          this.consultarClientes();
        },
        e => {

          this.consultarClientes();

          //verificar o código do erro
          switch (e.status) {
            case 400: //erros de validação
              this.mensagemErroEdicao = "Ocorreram erros de validação no formulário.";

              //ler o JSON retornado pela API com as mensagens de validação
              var validations = JSON.parse(e.error);

              this.errosNome = validations.errors.Nome;
              this.errosEmail = validations.errors.Email;
              this.errosCpf = validations.errors.Cpf;

              break;

            case 403: //erro de regra de negócio
              this.mensagemErroEdicao = e.error;
              break;

            default: //nenhum dos anteriores
              this.mensagemErroEdicao = "Erro ao cadastrar cliente.";
              break;
          }
        }
      );
  }

  //função para limpar a mensagem de exclusão
  limparMensagemSucessoExclusao() {
    this.mensagemSucessoExclusao = "";
  }

  //função para limpar a mensagem de sucesso de edição
  limparMensagemSucessoEdicao() {
    this.mensagemSucessoEdicao = "";
  }

  //função para limpar a mensagem de erro de edição
  limparMensagemErroEdicao() {
    this.mensagemErroEdicao = "";
  }

}
