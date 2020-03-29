/* global Swal, Formiga */

var AddAutomovel = AddAutomovel || {};

var carro = [];
var moto = [];

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
                
                
                if(carro.length > 0) {
                    $.each(carro, function (i) {
                        if(carro[i].placa === placa) {
                            msgToast.show("Modelo repetido!", "info");
                            situacao = false;
                            return situacao;
                        }
                    });
                }
                
                if(situacao) {
                    carro.push(
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
                msgToast.show("Por favor, preencha todos os campos", "info");
                return false;
            }

            bodyTable(this.tblAddCarro,carro,"data-row");

        }.bind(this));
        
        this.btnAddMoto.on("click", function(e) {
            
            if($("#fabri-moto").val()) {
                
                idFabricante = $("#id-fabri-moto").val();
                idModelo = $("#id-modelo-moto").val();
                nomeFabricante = $("#fabri-moto").val();
                nomeModelo = $("#modelo-moto").val();
                placa = $("#placa-moto").val();
                cor = $("#cor-moto-value").val();
                var situacao = true;
                
                if(moto.length > 0) {
                    
                    $.each(moto, function (i) {
                        if(moto[i].placa === placa) {
                            msgToast.show("Modelo repetido!", "info");
                            situacao = false;
                            return situacao;
                        }
                    });
                }
                
                if(situacao) {
                    moto.push(
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
                msgToast.show("Por favor, selecione o fabricante", "info");
                return false;
            }

            bodyTable(this.tblAddMoto,moto,"data-rowmto");

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
        carro.splice(posicao,1);
        bodyTable($(".tbl-add-carro"),carro, "data-row");
    } else if (typeof row.data("rowmto") !== "undefined") {
        var posicao = row.data("rowmto");
        moto.splice(posicao,1);
        bodyTable($(".tbl-add-moto"),moto, "data-rowmto");
    }

}



$(function () {
    var run = new AddAutomovel.Adicionar();
    run.init();
});