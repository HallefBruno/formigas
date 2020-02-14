/* global Swal */

var nomeCompleto;
var criarContaEmail;
var senha;
var confirmaSenha;
var dataNascimento;
var contextApp;

$(function () {
    initCheck();
});

function criarConta() {
    
    nomeCompleto = $("input[name='nome']");
    criarContaEmail = $("input[name='criarContaEmail']");
    senha = $("input[name='senha']");
    confirmaSenha = $("input[name='confirmaSenha']");
    dataNascimento = $("input[name='dataNascimento']");
    contextApp = $("input[name='context-app']");
    
    var usuario = {
        
        nome: nomeCompleto.val(),
        email: criarContaEmail.val(),
        senha: senha.val(),
        confirmacaoSenha: confirmaSenha.val(),
        ativo: true,
        dataNascimento:dataNascimento.val(),
        grupos: [
            {
                id:1,
                permissoes: [
                    {
                        id:1
                    }
                ]
            }
        ],
        tipoDeVersoes: "CASA_NUMERADA",
        tipoUsuario: 0
    };
        
    if(validacaoSalvar(usuario)) {

        $.ajax({

            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: contextApp.val()+"criarconta/save",
            data: JSON.stringify(usuario),

            success: function (data, textStatus, jqXHR) {
                Swal.fire("Atenção!","Versão gerada com sucesso",'success');
                window.location.href=contextApp.val()+"login";
            },

            error: function (jqXHR, textStatus, errorThrown) {
                Swal.fire("Atenção!",jqXHR.responseText,'error');
            }

        });
    }
}

function validacaoSalvar(usuario) {
    
    var dataAtual = new Date().toJSON().slice(0,10);
    var tipoVersao = $("#checkcn").prop("checked");

    if(usuario.nome && usuario.email && 
       usuario.senha && usuario.confirmacaoSenha && 
       usuario.ativo && usuario.dataNascimento && usuario.grupos.length > 0 && usuario.tipoDeVersoes) {
        
        if(dataAtual === usuario.dataNascimento || usuario.dataNascimento > dataAtual) {
            Swal.fire("Atenção!","Data nascimento inválida",'warning');
            return false;
        } else if(usuario.senha !== usuario.confirmacaoSenha) {
            Swal.fire("Atenção!","Senha e confirmação de senha precisa ser iguais",'warning');
            return false;
        } else if (tipoVersao === false){
            Swal.fire("Atenção!","Selecione a versão disponível",'warning');
            return false;
        }
        
        return true;
        
    } else {
        if(usuario.nome === "") {
            nomeCompleto.focus();
        } else if(usuario.email === "") {
            criarContaEmail.focus();
        } else if(usuario.senha === "") {
            senha.focus();
        } else if(usuario.confirmacaoSenha === "") {
            confirmaSenha.focus();
        } else if(usuario.dataNascimento === "") {
            dataNascimento.focus();
        }
        Swal.fire("Atenção!","Preencha todos os campos",'warning');
        return false;
    }
    
}

function initCheck() {
    
    $("#checkcn").bootstrapToggle({
        on: "Meu modelo",
        off: "Disponível",
        offstyle: "info",
        onstyle: "primary"
    });
    
    $("#checkcqdlt").bootstrapToggle({
        on: "Meu modelo",
        off: "Não",
        offstyle: "danger",
        onstyle: "primary"
    });
    
    $("#checkceb").bootstrapToggle({
        on: "Meu modelo",
        off: "Não",
        offstyle: "danger",
        onstyle: "primary"
    });
    
    $("#checkmeb").bootstrapToggle({
        on: "Meu modelo",
        off: "Não",
        offstyle: "danger",
        onstyle: "primary"
    });
    
    $("#ativo").bootstrapToggle({
        on: "SIM",
        off: "NÃO",
        offstyle: "danger",
        onstyle: "primary"
    });
    
    $("#perfil").bootstrapToggle({
        on: "ADMIN",
        off: "ATEND",
        offstyle: "danger",
        onstyle: "primary"
    });
}

function recarregarPaginaSair() {
    function onMouseLeave(e){
        var pageX = e.pageX || e.clientX;
        var pageY = e.pageY || e.clientY;
        if (pageX < 0 || pageY < 0 || pageY < $.top) {
            if (confirm('Caso recarregar a página, será necessário confirmar seu E-mail novamente.')) {
                window.location.href=contextApp+"login";
            }
        }
    }
    var body = document.body;
    body.addEventListener('mouseleave',onMouseLeave);
}