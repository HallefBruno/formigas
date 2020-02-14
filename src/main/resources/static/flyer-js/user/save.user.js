/* global Swal */

var nomeCompleto;
var email;
var ativo;
var senha;
var confirmaSenha;
var dataNascimento;

$(function () {
    
    event.preventDefault();
    
    nomeCompleto = $("input[name='nome']");
    email = $("input[name='email']");
    ativo = $("input[name='ativo']");
    senha = $("input[name='senha']");
    confirmaSenha = $("input[name='confirmaSenha']");
    dataNascimento = $("input[name='dataNascimento']");

    $(".btn-save").on("click", save);
});

function save() {

    var grupos = [];
    
    $(".div-grupos").find("input").each(function (index, val) {
        
        if($(this).prop("checked")) {
            grupos.push({
                id: Number($(this).val()),
                permissao:[
                    {
                        id: Number($(this).val())
                    }
                ]
            });
        }

    });

    if(grupos.length > 0) {
    
        var usuario = {

            nome: nomeCompleto.val().trim(),
            email: email.val().trim(),
            senha: senha.val().trim(),
            confirmacaoSenha: confirmaSenha.val().trim(),
            ativo: true,
            dataNascimento:dataNascimento.val().trim(),
            grupos:grupos,
            tipoDeVersoes: $("input[name='tipoV']").val(),
            tipoUsuario: tipoSu()
        };
        if(validacaoSalvar(usuario)) {
            $.ajax({
                type: "POST",
                contentType: "application/json",
                dataType: "json",
                url: $("#context-app").val() + "newuser/save",
                data: JSON.stringify(usuario),
                success: function (data, textStatus, jqXHR) {
                    Swal.fire('Atenção!', 'Usuário cadastrado com sucesso', 'success');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Swal.fire('Atenção!', jqXHR.responseText, 'error');
                }
            });
        }
        
    } else {
        Swal.fire('Atenção!', 'É necessário selecionar um grupo', 'warning');
    }

}


function validacaoSalvar(usuario) {
    
    var dataAtual = new Date().toJSON().slice(0,10);

    if(usuario.nome && usuario.email && 
       usuario.senha && usuario.confirmacaoSenha && 
       usuario.ativo && usuario.dataNascimento && usuario.grupos.length > 0 && usuario.tipoDeVersoes) {
        
        if(dataAtual === usuario.dataNascimento || usuario.dataNascimento > dataAtual) {
            Swal.fire("Atenção!","Data nascimento inválida",'warning');
            return false;
        } else if(usuario.senha !== usuario.confirmacaoSenha) {
            Swal.fire("Atenção!","Senha e confirmação de senha precisa ser iguais",'warning');
            return false;
        }
        
        return true;
        
    } else {
        if(usuario.nome === "") {
            nomeCompleto.focus();
        } else if(usuario.email === "") {
            email.focus();
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

function tipoSu() {
    
    var su = $("input[name='su']");
    var tipo = $("input[name='tipo']");
    
    if(Number(tipo.val())  === 0) {
        return Number(su.val());
    } else {
        return Number(tipo.val());
    }
}
