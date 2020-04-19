/* global idAtualRes, Swal */

var telefone = [];
var eventSelect;
var qtdVezesBtnDeleteTelefoneClick;

var tabela;
var numeroLinhas;
var linha;
var celula0;
var celula1;


$(document).ready(function () {
    event.preventDefault();
    $("#modaltelefoneResident").on('hidden.bs.modal', function () {
        verTodos();
    });
});

$(window).on('shown.bs.modal', function() { 
    $('#modaltelefoneResident').modal('show');
    $("#lista_telefone").focus();
    refreshTable("tbl");
    qtdVezesBtnDeleteTelefoneClick = 0;
});


function refreshTable(idTable) {
    
    table = document.getElementById(idTable);

    for(var remove = table.rows.length - 1; remove > 0; remove--) {
        table.deleteRow(remove);
    }

    tabela = document.getElementById("tbl");

    for(var i=0; i<telefone.length; i++) {
        numeroLinhas = tabela.rows.length;
        linha = tabela.insertRow(numeroLinhas);
        celula0 = linha.insertCell(0);
        celula1 = linha.insertCell(1);
        celula0.innerHTML = telefone[i].numero;
        celula1.innerHTML = "<button class='btn btn-danger btn-sm' data-id='"+telefone[i].id+"' onclick='onExcluirClicado()'><span class='glyphicon glyphicon-trash' ></span></button>";
        celula1.style = "text-align: center;";
    }
}

function verTodos() {

    if(telefone.length > 0) {
        $(".select-telefones").html("");
        $(".select-telefones").append("<option value=''>Lista de telefone</option>");
        
        var addIdAndTextInSelect = [];
        
        for(var i=0; i<telefone.length; i++) {
            addIdAndTextInSelect.push({
                "id": telefone[i].id, 
                "text": telefone[i].numero
            });
        }

        eventSelect = $(".select-telefones").select2({
            data: addIdAndTextInSelect,
            allowClear: true,
            language: "pt-BR"
        });
        
    } 

    $("#lista_telefone").val("");
    
    var idTelRemove;
    
    if(eventSelect) {
        eventSelect.on("select2:select", function (e) {
            idTelRemove = e.params.data.id;
            $(".btn-open-modal").prop("style","display:none");
            $(".btn-remove-tel").prop("style","display:block");
            qtdVezesBtnDeleteTelefoneClick = 0;
        });
    }
    
    $(".btn-remove-tel").on("click", function () {
        
        if(idTelRemove && qtdVezesBtnDeleteTelefoneClick === 0) {

            addIdAndTextInSelect = [];

            telefone = telefone.filter(function (item) {
                return item.id !== Number(idTelRemove);
            });
            
            deletePhone(idTelRemove);
            
            for(var i=0; i<telefone.length; i++) {
                addIdAndTextInSelect.push({
                    "id": telefone[i].id, 
                    "text":  telefone[i].numero
                });
            }
            
            $(".select-telefones").html("");
            $(".select-telefones").append("<option value=''>Lista de telefone</option>");
            
            $(".select-telefones").select2({
                data: addIdAndTextInSelect,
                allowClear: true,
                language: 'pt-BR'
            });

            $(".btn-remove-tel").prop("style","display:none");
            $(".btn-open-modal").prop("style","display:block");
            
            qtdVezesBtnDeleteTelefoneClick = 0;

        }
        qtdVezesBtnDeleteTelefoneClick ++;
    });
    
    if(eventSelect) {
        eventSelect.on("select2:unselect",function () {
            $(".btn-remove-tel").prop("style","display:none");
            $(".btn-open-modal").prop("style","display:block");
            
        });
    }
    
    
}

function savePhone() {
    
    var num = $("#lista_telefone");
    
    if (num.val().trim() && (num.val().length === 14 || num.val().length === 15)) {

        var object = {
            id: null,
            numero: num.val(),
            resident: {
                id: idAtualRes
            }
        };
        $.ajax({
            url: $("#context-app").val() + "telefone/save",
            data: JSON.stringify(object),
            type: "POST",
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                telefone.push(data);
                tabela = document.getElementById("tbl");
                numeroLinhas;
                linha;
                celula0;
                celula1;
                numeroLinhas = tabela.rows.length;
                linha = tabela.insertRow(numeroLinhas);
                celula0 = linha.insertCell(0);
                celula1 = linha.insertCell(1);
                celula0.innerHTML = document.getElementById("lista_telefone").value;
                celula1.innerHTML = "<button class='btn btn-danger btn-sm' data-id='" + data.id + "' onclick='onExcluirClicado()'><span class='glyphicon glyphicon-trash' ></span></button>";
                celula1.style = "text-align: center;";
                //$(".tel-adicionado").prop('style','display: block;').fadeOut(3000);
                Swal.fire("Pronto!","Salvo com sucesso!", "success");

            },

            error: function (jqXHR, textStatus, errorThrown) {
                Swal.fire("Atenção!", jqXHR.responseText, "warning");
            }
        });
    } else {
        num.focus();
    }

}

function deletePhone(idPhone) {
    $.ajax({
        url: $("#context-app").val()+"telefone/delete/"+idPhone,
        type: "DELETE",
        
        success: function (data, textStatus, jqXHR) {
            Swal.fire("Pronto!","Telefone deletado", "success");
        },
        
        error: function (jqXHR, textStatus, errorThrown) {
            Swal.fire("Atenção!",jqXHR.responseText, "warning");
        }
    });
}

function onExcluirClicado() {
    event.preventDefault();
    var botaoClicado = $(event.currentTarget);
    var id = botaoClicado.data("id");
    deletePhone(id);
    telefone = telefone.filter(function (item) {
        return item.id !== Number(id);
    });
    
    refreshTable("tbl");
    verTodos();
}