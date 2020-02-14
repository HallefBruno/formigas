/* global Swal */

var sigla;
var inputNome;
var $comboUf;
var dadosEstadoUpdate = new Array();
var idEstado;

$(function () {
    
    event.preventDefault();
    $.fn.select2.defaults.set("theme", "bootstrap");
    $comboUf = $("#uf").select2();
    inputNome = $("input[name='nome']");

    initCombo();

    $(".btn-save").on("click",save);
    
    dadosEstadoUpdate = updateEstado();
});

function save() {
    
    var dados = [];

    if(typeof sigla === 'undefined') {
        if(dadosEstadoUpdate) {
            sigla = dadosEstadoUpdate.uf;
        }
    }
    
    if(dadosEstadoUpdate && dadosEstadoUpdate.id > 0) {

        dados.push({
            id: dadosEstadoUpdate.id,
            uf: sigla,
            nome: inputNome.val().trim()
        });

    } else if(dadosEstadoUpdate === null || typeof dadosEstadoUpdate === 'undefined' && typeof idEstado === 'undefined') {

        dados.push({
            uf: sigla,
            nome: inputNome.val().trim()
        });

    } else {
        dados.push({
            id:idEstado,
            uf: sigla,
            nome: inputNome.val().trim()
        });
    }
    
    var estado = {
        id:dados[0].id,
        uf:dados[0].uf,
        nome:dados[0].nome
    };

    if(dados[0].uf && dados[0].nome) {
        
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

        $comboUf.select2({
            initSelection : function (element, callback) {
                var data = {id: estado.id, text: estado.uf};
                callback(data);
            }
        });
        inputNome.val(estado.nome);
    }
    
    
//    if(estado.id && estado.uf && estado.nome) {
//        $comboUf.val(estado.uf).trigger("change");
//    }
    return estado;
}

function initCombo() {
    
    var addIdAndTextInSelect = [];
    var estadosUF = ["GO","DF","TO","MG","SP"];

    for (var i = 0; i < estadosUF.length; i++) {
        addIdAndTextInSelect.push({
            "id": i,
            "text": estadosUF[i]
        });
    }
    
    $comboUf.select2({
        data: addIdAndTextInSelect,
        allowClear: true,
        language: 'pt-BR',
        placeholder: "Lista de UF"
    });
    
    sigla = addIdAndTextInSelect[0].text;
    
    if($comboUf) {
        $comboUf.on("select2:select", function (e) {
            inputNome.select();
            inputNome.focus();
            sigla = e.params.data.text;
        });
    }
}