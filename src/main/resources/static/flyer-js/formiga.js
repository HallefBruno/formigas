/* global Formiga */

var Formiga = Formiga || {};

function remove_class_swal2() {
    $('.swal2-icon-content').remove();
}

Formiga.Usuario = (function() {
    
    function Usuario() {
        this.nome = $("input[name='usuarioNome']");
        this.ativo = $("input[name='ativoUsuario']");
        this.navAtivo = $("#navUsuarioAtivo");
        this.navUsuario = $("#navUsuarioNome");
    }
    
    Usuario.prototype.enable = function() {
        
        this.navUsuario.html(this.nome.val()+"   "+" <span class='glyphicon glyphicon-user pull-right'> </span>");

        if(this.ativo.val() === "true") {
            this.navAtivo.html("<label class='label label-success '>Online</label>"+" <span class='glyphicon glyphicon-signal pull-right' > </span>");
        } else {
            this.navAtivo.html("<label class='label label-success' >OFF</label>"+" <span class='glyphicon glyphicon-signal pull-right' > </span>");
        }
    };
    
    return Usuario;
    
}());

Formiga.InternalError = (function() {
    
    function InternalError() {}
    
    InternalError.prototype.enable = function () {
        $(document).ajaxError(function (event, jqxhr, settings) {
            if(jqxhr.status === 500) {
                var erro = new Array();
                erro.push(jqxhr.responseText);
                sessionStorage.setItem("erro", erro);
                window.open("500");
            }
        }.bind(this));
    };
    
    return InternalError;
    
}());


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


Formiga.LoadGif = (function () {
    
    function LoadGif() {}
    
    LoadGif.prototype.enable = function () {
        $(document).ajaxSend(function (event, jqxhr, settings) {
            $("#divLoading").addClass("show");
        }.bind(this));
        
        $(document).ajaxComplete(function (event, jqxhr, settings) {
            $("#divLoading").removeClass("show");
        }.bind(this));
    };
    
    return LoadGif;
    
}());

$(function () {
    
    var security = new Formiga.Security();
    var internalError = new Formiga.InternalError();
    var usuario = new Formiga.Usuario();
    var loadGif = new Formiga.LoadGif();
    
    security.enable();
    internalError.enable();
    usuario.enable();
    loadGif.enable();
    
});
