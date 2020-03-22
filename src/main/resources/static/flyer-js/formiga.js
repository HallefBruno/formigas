/* global Formiga */

var Formiga = Formiga || {};

function remove_class_swal2() {
    $('.swal2-icon-content').remove();
}

var eventAbaVisible = (function () {
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function (c) {
        if (c)
            document.addEventListener(eventKey, c);
        return !document[stateKey];
    };
})();

Formiga.InitMessage = (function() {
    
    function InitMessage() {
        this.componentMsgSuccess = $(".msg-success");
        this.conponentMsgWarning = $(".msg-warning");
        this.btn = $(".btn-save");
        this.emitter = $({});
	this.on = this.emitter.on.bind(this.emitter);
    }
    
    InitMessage.prototype.enable = function() {
        this.conponentMsgWarning.html("");
        this.conponentMsgWarning.attr("style","display:block;");
        this.conponentMsgWarning.html("<div class='alert-dismissible alert alert-danger' role='alert'>"+"<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'>"+"</span><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"+"<span class='msg-text-warning'> Todos os campos são obrigatórios </span>"+"</div>");
        this.btn.on("click",tipoMessageMostrar.bind(this));
    };

    function tipoMessageMostrar() {
        $(document).ajaxComplete(function (event, jqxhr, settings) {

            if((!settings.url.includes("term")) && (!settings.processResults)) {
            
                if(jqxhr.status === 200) {
                    this.conponentMsgWarning.attr("style","display:none;");
                    this.componentMsgSuccess.html("");
                    this.componentMsgSuccess.attr("style","display:block;");
                    this.componentMsgSuccess.html("<div class='alert-dismissible alert alert-success' role='alert'>"+"<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>"+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+ "<span aria-hidden='true'>&times;</span></button><span class='msg-text-info'> Registro salvo com sucesso </span> </div>");
                } else {
                    this.componentMsgSuccess.attr("style","display:none;");
                    this.conponentMsgWarning.attr("style","display:block;");
                    this.conponentMsgWarning.html("");
                    this.conponentMsgWarning.html("<div class='alert-dismissible alert alert-danger' role='alert'>"+"<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'>"+"</span><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button><span class='msg-text-warning'>  "+jqxhr.responseText+" </span> </div>");
                }
            }
            
        }.bind(this));
    }
    
    return InitMessage;
    
}());

Formiga.Usuario = (function() {
    
    function Usuario() {
        this.nome = $("input[name='usuarioNome']");
        this.ativo = $("input[name='ativoUsuario']");
        this.navAtivo = $("#navUsuarioAtivo");
        this.navUsuario = $("#navUsuarioNome");
    }
    
    Usuario.prototype.enable = function() {
        
        //this.navUsuario.html("");
        
        //this.navUsuario.html("<label class='label' style='background-color: #705a91;'>"+this.nome.val()+" </span>"+"</label>");//+"   "+" <span style='color:black;' class='glyphicon glyphicon-user pull-right'>

        if(this.ativo.val() === "true") {
            this.navAtivo.html("<label class='label label-success '>Ativo</label>"+" <span class='glyphicon glyphicon-signal pull-right' > </span>");
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
                window.open("/formiga/500");
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
    
    LoadGif.prototype.enable = function (event, jqxhr, settings) {

        $(document).ajaxSend(function (event, jqxhr, settings) {

            if((!settings.url.includes("term")) && (!settings.processResults)) {
                $("#divLoading").addClass("show");
            }

        }.bind(this));
        
        $(document).ajaxComplete(function (event, jqxhr, settings) {
            
            if((!settings.url.includes("term")) && (!settings.processResults)) {
                $("#divLoading").removeClass("show");
            }
            
        }.bind(this));
    };
    
    return LoadGif;
    
}());

Formiga.AssembleDataTable = (function () {
    
    function AssembleDataTable() {
        
    }
    
    /**
     * @param {String} messageIsEmpty
     * @param {JSON} jsonData
     * @param {Boolean} action -> edit && delete
     * @returns {void}
     */
    AssembleDataTable.prototype.enable = function (messageIsEmpty,jsonData,action) {
        assembleDataTable(messageIsEmpty,jsonData,action);
    };
    
    /**
     * @param {String} messageIsEmpty
     * @param {JSON} jsonData
     * @param {Boolean} action -> edit && delete
     * @returns {undefined}
     */
    function assembleDataTable(messageIsEmpty, jsonData, action) {

        var table = $("table");
        table.find("tr").remove();
        var body;
        var cabecalho = "<tr>";
        var footer;
        var keyColumnName;
        
        if(jsonData !== null && jsonData.length > 0) {
            
            keyColumnName = Object.keys(jsonData[0]);
            
            for(var i in keyColumnName) {
                cabecalho+="<th class='' style=''>"+keyColumnName[i].toUpperCase()+"</th>";
            };
            
            if(action) {
                cabecalho+="<th class='text-center' style='width: 100px;'>Ação</th>";
            }
            
            footer = "<tr><th colspan='"+keyColumnName.length+1+"' >"+"Total: "+jsonData.length+"</th></tr>";
            table.find("tfoot").append(footer);
            
        } else {
            cabecalho+="<th class=''>formiga</th>";
        }

        cabecalho+="</tr>";

        table.find("thead").append(cabecalho);

        if (typeof jsonData === "undefined" || jsonData.length === 0) {
            var listaVazia = "<tr class='lista-vazia'>" +"<td colspan='5' style='color:green'>" +"<b>"+messageIsEmpty+"</b>" + "</td>" + "</tr>";
            table.find("tbody").append(listaVazia);
        }
        
        var array = [];
        
        jsonData.forEach(obj => {
            
            body += "<tr style='background-color: white'>";

            Object.entries(obj).forEach(([key, value]) => {
               
                body+="<td class='' >" + value + "</td>";

                array.push("data-"+key+"='"+value+"'");
                
            });

            body+=  "<td class='text-center'>"+
                        "<a class='btn btn-link btn-xs' id='btn-edit' style='width:30px;' onclick='openWindowEstado();' "+array.join(" ")+" title='Editar'> "+
                            "<i class='glyphicon glyphicon-pencil'></i>"+
                        "</a>"+
                        "<a class='btn btn-link btn-xs' title='Excluir'>"+
                            "<i class='glyphicon glyphicon-remove'></i>"+
                        "</a>"+
                    "</td>";
            
            body+="</tr>";
            
            array = [];
            
        });
        
        table.find("tbody").append(body);
    }
    
    return AssembleDataTable;

    
}());

$(function () {
    
    var security = new Formiga.Security();
    var internalError = new Formiga.InternalError();
    var usuario = new Formiga.Usuario();
    var loadGif = new Formiga.LoadGif();
    var initMsg = new Formiga.InitMessage();
    
    security.enable();
    internalError.enable();
    usuario.enable();
    loadGif.enable();
    initMsg.enable();
    
});
