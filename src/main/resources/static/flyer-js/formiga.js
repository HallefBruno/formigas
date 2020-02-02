/* global Formiga */

var Formiga = Formiga || {};

function remove_class_swal2() {
    $('.swal2-icon-content').remove();
}

function getUsuarioNomeAtivo() {
    var nome = $("input[name='usuarioNome']").val();
    var ativo = $("input[name='ativoUsuario']").val();
    
    $("#navUsuarioNome").html(nome+"   "+" <span class='glyphicon glyphicon-user pull-right'> </span>");
    if(ativo) {
        $("#navUsuarioAtivo").html("<label class='label label-success '>Online</label>"+" <span class='glyphicon glyphicon-signal pull-right' > </span>");
    } else {
        $("#navUsuarioAtivo").html("<label class='label label-success' >OFF</label>"+" <span class='glyphicon glyphicon-signal pull-right' > </span>");
    }
}

function internalError() {
    
    $(document).ajaxError(function (event, jqxhr, settings) {
        
        if(jqxhr.status === 500) {
            var erro = new Array();
            erro.push(jqxhr.responseText);
            sessionStorage.setItem("erro", erro);
            window.open("500");
        }
    });
}


Formiga.Security = (function () {

    function Security() {
        this.token = $("input[name=_csrf]").val();
        this.header = $("input[name=_csrf_header]").val();
    }

    Security.prototype.enable = function () {
        $(document).ajaxSend(function (event, jqxhr, settings) {
            jqxhr.setRequestHeader(this.header, this.token);
        }.bind(this));
    };

    return Security;

}());

$(function () {
    var security = new Formiga.Security();
    security.enable();
    getUsuarioNomeAtivo();
    internalError();
});