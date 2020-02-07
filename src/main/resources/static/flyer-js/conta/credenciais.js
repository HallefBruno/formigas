/* global Swal */

var context;
var operacao;
var emailDigitado;
var qtdVezesCodErrado;

$(document).ready(function () {
    event.preventDefault();
    context = $("input[name='context-app']").val();
    inputEmailButtonEnviarEmail();
    qtdVezesCodErrado = 1;
});

function inputEmailButtonEnviarEmail() {
    var components = "<input autocomplete required placeholder='Digite seu e-mail aqui' type='email' id='email' name='email' class='form-control'  /><div style='margin: 0 0 0 10px' > <button onclick='sendEmail();' type='button' title='Enviar e-mail' class='btn btn-primary btn-send'><span class='glyphicon glyphicon-send' ></span></button> </div>";
    $("#divInputButtonEnviarEmail").append(components);
}

function sendEmail() {

    emailDigitado = $("input[name='email']").val().trim();
    
    var email = {
        "descricao":emailDigitado,
        "status":false
    };

    if (email && (email.descricao.indexOf("@") !== -1) && (email.descricao.indexOf(".") !== -1)) {

        $(".campo-vazio").removeClass("has-error has-feedback");
        operacao = "email";
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: context + "credenciais/send",
            data: JSON.stringify(email),

            statusCode: {
                409: function (data, textStatus, jqXHR) {
                    var msgErro = data.responseText;
                    if (msgErro) {
                        if (msgErro.indexOf("connect to host") !== -1) {
                            Swal.fire('Erro!', 'Falha de conexão com a internet', 'error');
                        } else {
                            Swal.fire('Erro!', data.responseText, 'error');
                        }
                    }
                },

                200: function (data, textStatus, jqXHR) {

                    if(data.responseText.indexOf("/") === 0) {
                        window.location.href=data.responseText;
                    } else {
                        Swal.fire('Pronto!', data.responseText, 'success');
                        $("#divInputButtonEnviarEmail").html("");
                        visibleInputButtonValidaCod();
                    }
                }
            },

            beforeSend: startRequest,
            complete: finalizeRequest

        });

    } else {
        $(".campo-vazio").addClass("has-error has-feedback");
        $("input[name='email']").focus();
        Swal.fire('Atenção!', 'Email inválido!', 'warning');
    }
}

function visibleInputButtonValidaCod() {
    $("#divInputButtonVerificaCod").html("");
    var components = "<input autocomplete required placeholder='Digite o código aqui...' type='text' id='cod' name='cod' class='form-control'  /><div style='margin: 0 0 0 10px'><button title='Validar código' onclick='verificarCod();' type='button' name='btn-verifica-codigo' class='btn btn-info'><span class='glyphicon glyphicon-user'></span></button></div>";
    $("#divInputButtonVerificaCod").append(components);
}

function verificarCod() {
    
    var cod = $("input[name='cod']").val();
    operacao = "codigo";
    
    var codEmail = {
        "cod":cod,
        "emailDigitado":emailDigitado.toString().trim()
    };
    
    if(codEmail.cod && codEmail.emailDigitado) {
        
        $(".cod-vazio").removeClass("has-error has-feedback");
        
        $.ajax({
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: context + "credenciais/validarcod/"+codEmail.cod+"/"+codEmail.emailDigitado,
            data: codEmail,

            statusCode: {
                404: function (data, textStatus, jqXHR) {
                    Swal.fire("Atenção!",data.responseText,'warning');

                    if(qtdVezesCodErrado === 2) {

                        var tempo = 60;
                        var thread = setInterval(function () {

                            $("button[name='btn-verifica-codigo']").prop("disabled",true);
                            
                            $("#tente-novamante").html("");
                            
                            if (tempo < 10) {
                                $("#tente-novamante").html("<label>Aguarde </label> <span class='badge'>0" + (tempo--) + " s </span> <label>para reenviar o e-mail.</label>");
                            } else {
                                $("#tente-novamante").html("<label>Aguarde </label> <span class='badge'>" + (tempo--) + " s </span> <label>para reenviar o e-mail.</label>");
                            }
                            
                            if (tempo === 0) {
                                $("#tente-novamante").html("");
                                $("#divInputButtonEnviarEmail").html("");
                                inputEmailButtonEnviarEmail();
                                $("#divInputButtonVerificaCod").html("");
                                clearInterval(thread);
                            }
                            
                        }, 1000);
                        
                        qtdVezesCodErrado = 1;
                        
                    } 
                    qtdVezesCodErrado++;
                },
                
                409: function (data, textStatus, jqXHR) {
                    Swal.fire("Erro!",data.responseText,'error');
                },

                200: function (data, textStatus, jqXHR) {
                    $("#divInputButtonVerificaCod").html("");
                    $(".jumbotron").prop("style","display:none;");
                    $("#dadosCadastrais").html(htmlDadosCadastrais());
                    initCheck();
                }
            },

            beforeSend: startRequest,
            complete: finalizeRequest

        });
    } else {
        $(".cod-vazio").addClass("has-error has-feedback");
        $("input[name='cod']").focus();
        Swal.fire("Atenção!","Campo vazio! ",'warning');
    }
}

function startRequest() {
    if(operacao === "email") {
        $(".glyphicon-send").prop("style","display:none");
        $(".btn-send").append("<img src='"+context+"imagens/mini-loading.gif' />");
        $("input[name='email']").prop("disabled", true);
        $(".btn-send").prop("title","Enviando e-mail...");
        $(".btn-send").prop("disabled", true);
    } else {
        $(".glyphicon-user").prop("style","display:none");
        $("button[name='btn-verifica-codigo']").append("<img src='"+context+"imagens/mini-loading.gif' />");
        $("input[name='cod']").prop("disabled",true);
        $("button[name='btn-verifica-codigo']").prop("title","Validando...");
        $("button[name='btn-verifica-codigo']").prop("disabled",true);
    }
    
}

function finalizeRequest() {
    if(operacao === "email") {
        $(".btn-send").html("");
        $(".btn-send").prop("title","Enviar email");
        $(".btn-send").append("<span class='glyphicon glyphicon-send' ></span>");
        $("input[name='email']").prop("disabled", false);
        $(".btn-send").prop("disabled", false);
    } else {
        $("button[name='btn-verifica-codigo']").html("");
        $("button[name='btn-verifica-codigo']").append("<span class='glyphicon glyphicon-user' ></span>");
        $("input[name='cod']").prop("disabled",false);
        $("button[name='btn-verifica-codigo']").prop("title","Validar código");
        $("button[name='btn-verifica-codigo']").prop("disabled",false);
    }
}


function htmlEscolhaDoCondominio() {
    return "<h3 class='head text-center' style='color: #b3b3b3'>Vamos começar nossa personalização, escolha abaixo </h3>"+

    "<h3 class='text-center' style='color: #337ab7; margin-top: 50px;'>Condomínio horizontal</h3>"+

    "<div class='container-fluid'>"+
        "<div class='portfolio-grid'>"+
           " <div class='row '>"+
                "<div class='col-sm-6'>"+

                    "<div class='panel panel-primary'>"+
                        "<div class='panel-heading text-center'>Casa numerada</div>"+
                        "<div class='panel-body'>"+
                            "<ul class='list-group'>"+
                                "<li class='list-group-item'><b>Descrição: </b>Esse tipo de condominio, as casa não tem quadra e lote, apenas o numero que a identifica.</li>"+
                                "<li class='list-group-item'><input type='checkbox' id='checkcn' /></li>"+
                            "</ul>"+
                        "</div>"+
                    "</div>"+

                "</div>"+

                "<div class='col-sm-6'>"+
                    "<div class='card card-block'>"+
                        "<div class='panel panel-primary '>"+
                            "<div class='panel-heading text-center'>Casa com rua nomeada com quadra e lote</div>"+
                            "<div class='panel-body'>"+
                                "<ul class='list-group'>"+
                                    "<li class='list-group-item'><b>Descrição: </b>Condomios de casas com extesão maior, no geral as casas são identificadas por quadra e lote.</li>"+
                                    "<li class='list-group-item'><input type='checkbox' id='checkcqdlt'/></li>"+
                                "</ul>"+
                            "</div>"+
                        "</div>"+

                        "<div class='portfolio-over'>"+
                            "<div>"+
                                "<h3 class='card-title'>"+
                                    "# Off... '"+
                                "</h3>"+

                                "<p class='card-text'>"+
                                    "Está em fase de construção."+
                                "</p>"+
                            "</div>"+
                        "</div>"+

                    "</div>"+
                "</div>"+
                
            "</div>"+
        "</div>"+
    "</div>"+

    "<h3 class='text-center' style='color: #2e97be'>Condomínio vertical</h3>"+

    "<div class='container-fluid'>"+
        "<div class='portfolio-grid'>"+
            "<div class='row' >"+
                "<div class='col-sm-6'>"+
                    "<div class='card card-block'>"+
                        "<div class='panel panel-success' style='height: 210px;'>"+
                            "<div class='panel-heading text-center' style='background-color: #2e97be; color: white'>Apenas um edifício ou bloco</div>"+
                            "<div class='panel-body'>"+
                                "<ul class='list-group'>"+
                                    "<li class='list-group-item'><b>Descrição: </b>No geral os aptos são identificados por número.</li>"+
                                    "<li class='list-group-item'><input type='checkbox' id='checkceb'/></li>"+
                                "</ul>"+
                            "</div>"+
                        "</div>"+
                        "<div class='portfolio-over'>"+
                            "<div>"+
                                "<h3 class='card-title'>"+
                                    "# Off... '"+
                                "</h3>"+

                                "<p class='card-text'>"+
                                    "Está em fase de construção."+
                                "</p>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
                "</div>"+

                "<div class='col-sm-6'>"+
                    "<div class='card card-block'>"+
                        "<div class='panel panel-success'>"+
                            "<div class='panel-heading text-center' style='background-color: #2e97be; color: white'>Mais de um edifício ou bloco</div>"+
                            "<div class='panel-body'>"+
                                "<ul class='list-group'>"+
                                    "<li class='list-group-item'><b>Descrição: </b>Quando há mais de um edifício ou bloco, os apto, são identificados pela letra o bloco + Nº apto.</li>"+
                                    "<li class='list-group-item'><input type='checkbox' id='checkmeb'/></li>"+
                                "</ul>"+
                            "</div>"+
                        "</div>"+
                        "<div class='portfolio-over'>"+
                            "<div>"+
                                "<h3 class='card-title'>"+
                                    "# Off... '"+
                                "</h3>"+

                                "<p class='card-text'>"+
                                    "Está em fase de construção."+
                                "</p>"+
                            "</div>"+
                        "</div>"+
                    "</div>"+
               " </div>"+
            "</div>"+
        "</div>"+
    "</div>";
}

function htmlDadosCadastrais() {
return"<h3 class='head text-center' style='color: #b3b3b3'>Vamos começar nossa personalização, escolha abaixo </h3>"+ 
"<div class='container-fluid'>"+ 
    "<div class='row'>"+
        "<div class='col-sm-6' style='margin-top: 50px;'>"+
            "<div class='panel panel-default'>"+
                "<div class='panel-heading' style='color:white ;background-color: #e36293;'>Dados cadastrais</div>"+
                "<div class='panel-body'>"+
                    "<form th:action='@{/criarconta/save}' method='post'>"+


                        "<div class='form-group has-feedback'>"+
                            "<label for='nome' >Nome completo</label>"+
                            "<input class='form-control' name='nome' id='nome' type='text' required/>"+
                            "<span class='glyphicon glyphicon-user form-control-feedback'></span>"+
                        "</div>"+

                        "<div class='form-group has-feedback'>"+
                            "<label for='criarContaEmail' >Email</label>"+
                            "<input class='form-control' name='criarContaEmail' value='"+emailDigitado+"' id='criarContaEmail' type='email' required/>"+
                            "<span class='glyphicon glyphicon-envelope form-control-feedback' ></span>"+
                        "</div>"+

                        "<div class='form-group  has-feedback'>"+
                            "<label for='senha' >Senha</label>"+
                            "<input class='form-control' name='senha' id='senha' type='password' required/>"+
                            "<span class='glyphicon glyphicon-lock form-control-feedback'></span>"+
                        "</div>"+

                        "<div class='form-group  has-feedback'>"+
                            "<label for='confirmaSenha' >Confirma senha</label>"+
                            "<input class='form-control' name='confirmaSenha' id='confirmaSenha' type='password' required/>"+
                            "<span class='glyphicon glyphicon-lock form-control-feedback'></span>"+
                        "</div>"+

                        "<div class='form-group has-feedback'>"+
                            "<label for='dataNascimento' >Data nascimento</label>"+
                            "<input class='form-control' name='dataNascimento' id='dataNascimento' type='date' required/>"+
                            "<span class='glyphicon glyphicon-calendar form-control-feedback'></span>"+
                        "</div>"+

                        "<div class='row'>"+
                            "<div class='form-group col-sm-3'>"+
                                "<label class='control-label' for='ativo' >Ativo</label>"+
                                "<div>"+
                                    "<input checked name='ativo' id='ativo' disabled type='checkbox' />"+
                                "</div>"+
                            "</div>"+

                            "<div class='form-group col-sm-6'>"+
                                "<label class='control-label' for='perfil' >Perfil</label>"+
                                "<div>"+
                                    "<input checked name='perfil' id='perfil' disabled type='checkbox' />"+
                                "</div>"+
                            "</div>"+
                        "</div>"+

                        "<div class='form-group' style='text-align: right;'>"+
                            "<input type='button' onclick='criarConta();' class='btn btn-lg' value='Criar conta'/>"+
                        "</div>"+

                    "</form>"+
                "</div>"+
            "</div>"+
        "</div>"+
        
        "<div class='col-sm-6' style='margin-top: 50px; height:560px;overflow-y:scroll;'>"+

            "<div class='panel panel-default'>"+
                "<div class='panel-heading text-center' style='background-color:#1C1C1C; color:white'>Casa numerada</div>"+
                "<div class='panel-body'>"+
                    "<ul class='list-group'>"+
                        "<li class='list-group-item'><b>Descrição: </b>Esse tipo de condominio, as casa não tem quadra e lote, apenas o numero que a identifica.</li>"+
                        "<li class='list-group-item'><input type='checkbox' id='checkcn' /></li>"+
                    "</ul>"+
                "</div>"+
            "</div>"+

            "<div class='panel panel-default '>"+
                "<div class='panel-heading text-center'style='background-color:#DC143C; color: white'>Casa com rua nomeada com quadra e lote</div>"+
                "<div class='panel-body'>"+
                    "<ul class='list-group'>"+
                        "<li class='list-group-item'><b>Descrição: </b>Condomios de casas com extesão maior, no geral as casas são identificadas por quadra e lote.</li>"+
                        "<li class='list-group-item'><label class='label label-info' style='background-color: #FFFF00; color: black;'>Indisponível</label></li>"+
                    "</ul>"+
                "</div>"+
            "</div>"+
            
            
            "<div class='panel panel-success' style='height: 210px;'>"+
                "<div class='panel-heading text-center' style='background-color:#DC143C; color: white'>Apenas um edifício ou bloco</div>"+
                "<div class='panel-body'>"+
                    "<ul class='list-group'>"+
                        "<li class='list-group-item'><b>Descrição: </b>No geral os aptos são identificados por número.</li>"+
                        "<li class='list-group-item'><label class='label label-info' style='background-color: #FFFF00; color: black;'>Indisponível</label></li>"+
                    "</ul>"+
                "</div>"+
            "</div>"+
            
            
            "<div class='panel panel-success'>"+
                "<div class='panel-heading text-center' style='background-color: #DC143C; color: white'>Mais de um edifício ou bloco</div>"+
                "<div class='panel-body'>"+
                    "<ul class='list-group'>"+
                        "<li class='list-group-item'><b>Descrição: </b>Quando há mais de um edifício ou bloco, os apto, são identificados pela letra o bloco + Nº apto.</li>"+
                        "<li class='list-group-item'><label class='label label-info' style='background-color: #FFFF00; color: black;'>Indisponível</label></li>"+
                    "</ul>"+
                "</div>"+
            "</div>"+
                            
        "</div>"+
        
    "</div>"+
"</div>";
}