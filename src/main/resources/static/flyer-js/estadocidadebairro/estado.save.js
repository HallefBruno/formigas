/* global Swal */

var sigla;
var inputNome;
var $comboUF;
var dadosEstadoUpdate = new Array();
var idEstado;
var dados = [];

$(function () {
    
    event.preventDefault();
    $.fn.select2.defaults.set("theme", "bootstrap");
    $comboUF = $("#uf").select2();
    inputNome = $("input[name='nome']");

    initCombo();
    
    dadosEstadoUpdate = updateEstado();
    sigla = dadosEstadoUpdate.uf;
    
    $(".btn-save").on("click",save);
    
});

function save() {
    
    var unidadeFederativa = null;
    
    if (sigla === null) {
        unidadeFederativa = $("#uf").find("option")[0].label;
    } else {
        unidadeFederativa = sigla;
    }
    
    if(dadosEstadoUpdate !== null && dadosEstadoUpdate.id !== null) {
        
        if(unidadeFederativa !== null) {
            
            dados.push({
                id:dadosEstadoUpdate.id,
                uf:unidadeFederativa,
                nome:inputNome.val().trim()
            });
            
        } 
        
    } else if(idEstado !== null && typeof idEstado !== "undefined") {

        dados.push({
            id:idEstado,
            uf:unidadeFederativa,
            nome:inputNome.val().trim()
        });
        
    } else {
        
        dados.push({
            uf:unidadeFederativa,
            nome:inputNome.val().trim()
        });
        
    }
    
    var estado = {
        id:dados[0].id,
        uf:dados[0].uf,
        nome:dados[0].nome
    };
    
    dados = [];
    
    if(estado.uf && estado.nome) {
        
        $(".uf").removeClass("has-error has-feedback");
        $(".nome").removeClass("has-error");
        
        $.ajax({
            
            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: $("#context-app").val() + "estado/save",
            data: JSON.stringify(estado),
            statusCode: {
                
                200: function (data, textStatus, jqXHR) {
                    idEstado = data.id;
                },
                500: function (jqXHR, textStatus, errorThrown) {
                    Swal.fire('Atenção!', jqXHR.responseText, 'error');
                }
                
            }
        });

    } else {
        $(".uf").addClass("has-error has-feedback");
        $(".nome").addClass("has-error has-feedback");
    }
    
}

function updateEstado() {
    
    var id = sessionStorage.getItem("id");
    var uf = sessionStorage.getItem("uf");
    var nome = sessionStorage.getItem("nome");
    
    var estado = {
        id:id,
        uf:uf,
        nome:nome
    };
    if(estado.id && estado.uf && estado.nome) {

        $comboUF.select2({
            initSelection : function (element, callback) {
                var data = {id: estado.id, text: estado.uf};
                callback(data);
            }
        });
        inputNome.val(estado.nome);
    }

    return estado;
}

function initCombo() {
    
    var addIdAndTextInSelect = [];
    var estadosUF = ["AC","AL","AP","AM","BA","CE","DF","ES","GO","MA","MT","MS","MG"
                    ,"PA","PB","PR","PE","PI","RJ","RN","RS","RO","RR","SC","SP","SE","TO"];

    for (var i = 0; i < estadosUF.length; i++) {
        addIdAndTextInSelect.push({
            "id": i,
            "text": estadosUF[i]
        });
    }
    
    $comboUF.select2({
        data: addIdAndTextInSelect,
        allowClear: true,
        language: 'pt-BR',
        placeholder: "Lista de UF"
    });

    sigla = addIdAndTextInSelect[0].text;
    
    if($comboUF) {
        
        $comboUF.on("select2:select", function (e) {
            inputNome.select();
            inputNome.focus();
            sigla = e.params.data.text;
        });
        
        $comboUF.on("select2:open", function (e) {
            $.each(this.options, function (i, item) {
                if (item.text === sigla) {
                    $(item).prop("selected", true);
                }
            });
        });

    }
}

function clearForRegisterNew() {
    dadosEstadoUpdate = null;
    idEstado = null;
}