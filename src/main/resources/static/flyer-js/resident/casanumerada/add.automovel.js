/* global Swal, Formiga */

var AddAutomovel = AddAutomovel || {};

var arrayCarro = [];
var arrayMoto = [];

AddAutomovel.Adicionar = (function () {
    
    var msgToast;
    
    function Adicionar() {
        this.btnAddCarro = $(".add-carro");
        this.tblAddCarro = $(".tbl-add-carro");
        this.btnAddMoto = $(".add-moto");
        this.tblAddMoto = $(".tbl-add-moto");
        this.comboCorMoto = $("#cor-moto");
        this.comboCorCarro = $("#cor");
        this.placa;
    }

    Adicionar.prototype.init = function () {
        eventAddCarro.call(this);
        currentValueComboCorMoto.call(this);
        msgToast = new Formiga.MessageToast();
        
    };
    
    function eventAddCarro() {

        var idFabricante = "";
        var nomeFabricante = "";
        var idModelo = "";
        var nomeModelo = "";
        var placa = "";
        var cor = "";
        
        this.btnAddCarro.on("click", function (e) {
            
            idFabricante = $("#id-fabri-carro").val();
            idModelo = $("#id-modelo-carro").val();
            nomeFabricante = $("#fabri-carro").val();
            nomeModelo = $("#modelo-carro").val();
            placa = $("#placa").val();
            cor = $("#cor-carro-value").val();
            var situacao = true;
            
            if(nomeFabricante && cor && placa && nomeModelo) {
                
                $(".feed-fabricante").removeClass("has-error has-feedback");
                $(".feed-cor").removeClass("has-error has-feedback");
                $(".feed-placa").removeClass("has-error has-feedback");
                $(".feed-modelo").removeClass("has-error has-feedback");
                
                if(arrayCarro.length > 0) {
                    $.each(arrayCarro, function (i) {
                        if(arrayCarro[i].placa === placa) {
                            msgToast.show("Modelo repetido!", "warning");
                            situacao = false;
                            return situacao;
                        }
                    });
                }
                
                if(situacao) {
                    arrayCarro.push(
                        {
                            idfab:idFabricante,
                            idmod:idModelo,
                            fabricante:nomeFabricante,
                            modelo:nomeModelo,
                            placa:placa,
                            cor:cor
                        }
                    );
                }
            
            } else {
                if(idFabricante) {
                    $(".feed-fabricante").removeClass("has-error has-feedback");
                } else {
                    $(".feed-fabricante").addClass("has-error has-feedback");
                }
                if(cor) {
                    $(".feed-cor").removeClass("has-error has-feedback");
                } else {
                    $(".feed-cor").addClass("has-error has-feedback");
                }
                if(placa) {
                    $(".feed-placa").removeClass("has-error has-feedback");
                } else {
                    $(".feed-placa").addClass("has-error has-feedback");
                }
                if(nomeModelo) {
                    $(".feed-modelo").removeClass("has-error has-feedback");
                } else {
                    $(".feed-modelo").addClass("has-error has-feedback");
                }

                msgToast.show("Por favor, preencha todos os campos", "warning");
                return false;
            }

            bodyTable(this.tblAddCarro,arrayCarro,"data-row");

        }.bind(this));
        
        this.btnAddMoto.on("click", function(e) {
            
            if(nomeFabricante && cor && placa && nomeModelo) {
                
                $(".feed-fabricante-moto").removeClass("has-error has-feedback");
                $(".feed-cor-moto").removeClass("has-error has-feedback");
                $(".feed-placa-moto").removeClass("has-error has-feedback");
                $(".fedd-modelo-moto").removeClass("has-error has-feedback");
                
                idFabricante = $("#id-fabri-moto").val();
                idModelo = $("#id-modelo-moto").val();
                nomeFabricante = $("#fabri-moto").val();
                nomeModelo = $("#modelo-moto").val();
                placa = $("#placa-moto").val();
                cor = $("#cor-moto-value").val();
                var situacao = true;
                
                if(arrayMoto.length > 0) {
                    
                    $.each(arrayMoto, function (i) {
                        if(arrayMoto[i].placa === placa) {
                            msgToast.show("Modelo repetido!", "warning");
                            situacao = false;
                            return situacao;
                        }
                    });
                }
                
                if(situacao) {
                    arrayMoto.push(
                        {
                            idfab:idFabricante,
                            idmod:idModelo,
                            fabricante:nomeFabricante,
                            modelo:nomeModelo,
                            placa:placa,
                            cor:cor
                        }
                    );
                }

            } else {
                
                if(idFabricante) {
                    $(".feed-fabricante-moto").removeClass("has-error has-feedback");
                } else {
                    $(".feed-fabricante-moto").addClass("has-error has-feedback");
                }
                if(cor) {
                    $(".feed-cor-moto").removeClass("has-error has-feedback");
                } else {
                    $(".feed-cor-moto").addClass("has-error has-feedback");
                }
                if(placa) {
                    $(".feed-placa-moto").removeClass("has-error has-feedback");
                } else {
                    $(".feed-placa-moto").addClass("has-error has-feedback");
                }
                if(nomeModelo) {
                    $(".feed-modelo-moto").removeClass("has-error has-feedback");
                } else {
                    $(".feed-modelo-moto").addClass("has-error has-feedback");
                }
                
                msgToast.show("Por favor, preencha todos os campos", "warning");
                return false;
            }

            bodyTable(this.tblAddMoto,arrayMoto,"data-rowmto");

        }.bind(this));
    }
    
    function currentValueComboCorMoto() {
        this.comboCorMoto.change(function (event) {
            $("#cor-moto-value").val(event.currentTarget.value);
        });
        
        this.comboCorCarro.change(function (event) {
            $("#cor-carro-value").val(event.currentTarget.value);
        });
    }
    
    return Adicionar;

}());

function bodyTable(tabela, array, key) {
    var tds="";
    $.each(array, function (index, moto) {

        tds+="<tr style='font-size:12px;'>"+
                "<td>"+moto.fabricante+"</td>"+
                "<td>"+moto.modelo+"</td>"+
                "<td>"+moto.placa.toUpperCase()+"</td>"+
                "<td>"+moto.cor+"</td>"+
                "<td class='text-center'>"+
                    "<a onclick='deleteRow();' class='btn btn-link btn-xs btn-remove-row' title='Excluir' " + key + "='" + index + "'>" +
                        "<i class='glyphicon glyphicon-remove'></i>" +
                    "</a>"+
                "</td>"+
            "</tr>";
    });
    
    tabela.find("tbody").html("");
    tabela.find("tbody").append(tds);
    
    return tds;
}

function deleteRow() {

    var row = $(event.currentTarget);

    if (typeof row.data("row") !== "undefined") {
        var posicao = row.data("row");
        arrayCarro.splice(posicao,1);
        bodyTable($(".tbl-add-carro"),arrayCarro, "data-row");
    } else if (typeof row.data("rowmto") !== "undefined") {
        var posicao = row.data("rowmto");
        arrayMoto.splice(posicao,1);
        bodyTable($(".tbl-add-moto"),arrayMoto, "data-rowmto");
    }

}



$(function () {
    var run = new AddAutomovel.Adicionar();
    run.init();
});