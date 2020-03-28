/* global Swal, Formiga */

var AddAutomovel = AddAutomovel || {};

var carro = [];
var moto = [];
var contadorCarro = 0;
var contadorMoto = 0;

AddAutomovel.Adicionar = (function () {
    
    var msgToast;
    
    function Adicionar() {
        this.btnAddCarro = $(".add-carro");
        this.tblAddCarro = $(".tbl-add-carro");
        this.btnAddMoto = $(".add-moto");
        this.tblAddMoto = $(".tbl-add-moto");
    }

    Adicionar.prototype.init = function () {
        eventAddCarro.call(this);
        msgToast = new Formiga.MessageToast();
        
    };
    
    function eventAddCarro() {

        var tds = "";
        var idFabricante = "";
        var nomeFabricante = "";
        var idModelo = "";
        var nomeModelo = "";

        this.btnAddCarro.on("click", function (e) {
            
            if($("#fabri-carro").val()) {
                
                idFabricante = $("#id-fabri-carro").val();
                idModelo = $("#id-modelo-carro").val();
                nomeFabricante = $("#fabri-carro").val();
                nomeModelo = $("#modelo-carro").val();

                if(contadorCarro > 0) {
                    $.each(carro, function (index, obj) {
                        if(obj.modelo === nomeModelo) {
                            carro.splice(index,1);
                            msgToast.show("Esse já foi adicionado!", "info");
                            return false;
                        }
                    });
                }
                
                carro.push(
                    {
                        idfab:idFabricante,
                        idmod:idModelo,
                        fabricante:nomeFabricante,
                        modelo:nomeModelo
                    }
                );
                
            } else {
                msgToast.show("Por favor, selecione o fabricante", "info");
                return false;
            }

            bodyTable(this.tblAddCarro,carro,contadorMoto,"data-row");
            
            contadorCarro++;

        }.bind(this));
        
        this.btnAddMoto.on("click", function(e) {
            
            if($("#fabri-moto").val()) {
                
                idFabricante = $("#id-fabri-moto").val();
                idModelo = $("#id-modelo-moto").val();
                nomeFabricante = $("#fabri-moto").val();
                nomeModelo = $("#modelo-moto").val();
                
                if(contadorMoto > 0) {
                    $.each(moto, function (index, obj) {
                        if(obj.modelo === nomeModelo) {
                            moto.splice(index,1);
                            msgToast.show("Esse já foi adicionado!", "info");
                            return false;
                        }
                    });
                }
                
                moto.push(
                    {
                        idfab:idFabricante,
                        idmod:idModelo,
                        fabricante:nomeFabricante,
                        modelo:nomeModelo
                    }
                );
                
            } else {
                msgToast.show("Por favor, selecione o fabricante", "info");
                return false;
            }

            bodyTable(this.tblAddMoto,moto,contadorMoto,"data-rowmto");
            contadorMoto++;
 
        }.bind(this));
    }

    return Adicionar;

}());

function bodyTable(tabela, array, contador, key) {
    var tds="";
    $.each(array, function (index, moto) {
        tds+="<tr>"+
            "<td><label class='label label-info' style='background-color: #563d7c; color: white;'>"+moto.fabricante+"</label></td>"+
            "<td><label class='label label-info' style='background-color: #563d7c; color: white;'>"+moto.modelo+"</label></td>"+
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
        bodyTable($(".tbl-add-carro"),carro, contadorMoto, "data-row");
    } else if (typeof row.data("rowmto") !== "undefined") {
        var posicao = row.data("rowmto");
        moto.splice(posicao,1);
        bodyTable($(".tbl-add-moto"),moto, contadorMoto, "data-rowmto");
    }

}



$(function () {
    var run = new AddAutomovel.Adicionar();
    run.init();
});