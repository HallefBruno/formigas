var telefones;
var eventSelect;
var qtdVezesBtnDeleteTelefoneClick;

var tabela;
var numeroLinhas;
var linha;
var celula0;
var celula1;


$(document).ready(function () {
    event.preventDefault();
    telefones = [];
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


//Funcao adiciona uma nova linha na tabela
function addNewPhone(idTabela) {
    var number = $("#lista_telefone").val();
    tabela = document.getElementById(idTabela);
    numeroLinhas;
    linha;
    celula0;
    celula1;

    if(number && (number.length === 14 || number.length === 15)) {

        if(telefones.indexOf(number) === -1) {
            numeroLinhas = tabela.rows.length;
            linha = tabela.insertRow(numeroLinhas);
            celula0 = linha.insertCell(0);
            celula1 = linha.insertCell(1);
            telefones.push(number);
            celula0.innerHTML = document.getElementById("lista_telefone").value;
            celula1.innerHTML = "<button class='btn btn-danger btn-sm' onclick='removeLinha(this)'><span class='glyphicon glyphicon-trash' ></span></button>";
            celula1.style = "text-align: center;";
        } else {
            $(".tel-adicionado").prop('style','display: block;').fadeOut(3000);
        }
        
    } else {
        $("#lista_telefone").focus();
    }
}

function refreshTable(idTable) {
    
    table = document.getElementById(idTable);

    for(var remove = table.rows.length - 1; remove > 0; remove--) {
        table.deleteRow(remove);
    }

    tabela = document.getElementById("tbl");

    for(var i=0; i<telefones.length; i++) {

        numeroLinhas = tabela.rows.length;
        linha = tabela.insertRow(numeroLinhas);
        celula0 = linha.insertCell(0);
        celula1 = linha.insertCell(1);
        celula0.innerHTML = telefones[i];
        celula1.innerHTML = "<button class='btn btn-danger btn-sm' onclick='removeLinha(this)'><span class='glyphicon glyphicon-trash' ></span></button>";
        celula1.style = "text-align: center;";
    }
}

// funcao remove uma linha da tabela
function removeLinha(linha) {
    var i = linha.parentNode.parentNode.rowIndex;
    document.getElementById("tbl").deleteRow(i);
    telefones.splice(i-1, 1);  
}

function verTodos() {
    
    if(telefones.length > 1) {
        
        $(".select-telefones").prop("style","display:block");
        $("input[name='telefone']").prop("style","display:none");
        $(".select-telefones").html("");
        $(".select-telefones").append("<option value=''>Lista de telefone</option>");
        
        var addIdAndTextInSelect = [];
        
        for(var i=0; i<telefones.length; i++) {
            addIdAndTextInSelect.push({
                "id": i, 
                "text":  telefones[i]
            });
        }

        eventSelect = $(".select-telefones").select2({
            data: addIdAndTextInSelect,
            allowClear: true,
            language: 'pt-BR'
        });
        
    } else {
        
        $("input[name='telefone']").prop("style","display:block");
        $("input[name='telefone']").val(telefones[0]);
        if($(".select-telefones").select2()) {
            $(".select-telefones").select2("destroy");
        }
        $(".select-telefones").prop("style","display:none");
    }

    $("#lista_telefone").val("");
    
    var posicaoRemover;
    
    if(eventSelect) {
        eventSelect.on("select2:select", function (e) {
            posicaoRemover = e.params.data.id;
            $(".btn-open-modal").prop("style","display:none");
            $(".btn-remove-tel").prop("style","display:block");
            qtdVezesBtnDeleteTelefoneClick = 0;
        });
    }
    
    $(".btn-remove-tel").on("click", function () {
        
        if(posicaoRemover && qtdVezesBtnDeleteTelefoneClick === 0) {

            telefones.splice(posicaoRemover, 1);

            addIdAndTextInSelect = [];

            for(var i=0; i<telefones.length; i++) {
                addIdAndTextInSelect.push({
                    "id": i, 
                    "text":  telefones[i]
                });
            }
            
            $(".select-telefones").html("");
            $(".select-telefones").append("<option value=''>Lista de telefone</option>");
            
            $(".select-telefones").select2({
                data: addIdAndTextInSelect,
                allowClear: true,
                language: 'pt-BR'
            });
            
            if(telefones.length === 1) {
                $(".select-telefones").select2('destroy');
                $(".select-telefones").prop("style","display:none");
                $("input[name='telefone']").prop("style","display:block");
                $("input[name='telefone']").val(telefones[0]);
                $(".btn-remove-tel").prop("style","display:none");
                $(".btn-open-modal").prop("style","display:block");
            }
            
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
