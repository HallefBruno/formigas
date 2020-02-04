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
                nome:"Administrador",
                permissoes: [
                    {
                        id:1,
                        nome: "CADASTRAR"
                    }
                ]
            }
        ],
        tipoDeVersoes: "CASA_NUMERADA"
    };
    
    $.ajax({
        
        
        type: "POST",
        contentType: "application/json",
        dataType: "json",
        url: contextApp.val()+"criarconta/save",
        data: JSON.stringify(usuario),
        
        success: function (data, textStatus, jqXHR) {
            console.log(data);
        },
        
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR);
        }
        
    });
    
}

function initCheck() {
    
    $("#checkcn").bootstrapToggle({
        on: "Meu modelo",
        off: "Não",
        offstyle: "danger",
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