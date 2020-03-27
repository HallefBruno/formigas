/* global Swal, Formiga */

var AddCarro = AddCarro || {};

var msgToast;
var carro = [];
var moto = [];
var contadorCarro = 0;
var contadorMoto = 0;

AddCarro.Adicionar = (function () {

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
                    if(carro[contadorCarro-1].modelo === nomeModelo) {
                        msgToast.show("Esse ja foi adicionado!", "info");
                        return false;
                    }
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

            tds="<tr>"+
                    "<td>"+carro[contadorCarro].fabricante+"</td>"+
                    "<td>"+carro[contadorCarro].modelo+"</td>"+
                    "<td class='text-center'>"+
                        "<a onclick='deleteRow();' class='btn btn-link btn-xs btn-remove-row' title='Excluir' data-row='"+contadorCarro+"'>"+
                            "<i class='glyphicon glyphicon-remove'></i>"+
                        "</a>"+
                    "</td>"+
                "</tr>";
                   
            this.tblAddCarro.find("tbody").append(tds);
            
            contadorCarro++;

        }.bind(this));
        
        this.btnAddMoto.on("click", function(e) {
            
            if($("#fabri-moto").val()) {
                
                idFabricante = $("#id-fabri-moto").val();
                idModelo = $("#id-modelo-moto").val();
                nomeFabricante = $("#fabri-moto").val();
                nomeModelo = $("#modelo-moto").val();
                
                if(contadorMoto > 0) {
                    if(moto[contadorMoto-1].modelo === nomeModelo) {
                        msgToast.show("Esse ja foi adicionado!", "info");
                        return false;
                    }
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
   
            //this.tblAddMoto.find("tbody").append(bodyTable(moto,contadorMoto,"data-rowmto"));
            bodyTable(this.tblAddMoto,moto,contadorMoto,"data-rowmto");
            contadorMoto++;
 
        }.bind(this));
    }

    return Adicionar;

}());

function bodyTable(tabela, array, contador, key) {
    var tds="<tr>"+
                "<td>"+array[contador].fabricante+"</td>"+
                "<td>"+array[contador].modelo+"</td>"+
                "<td class='text-center'>"+
                    "<a onclick='deleteRow();' class='btn btn-link btn-xs btn-remove-row' title='Excluir' " + key + "='" + contador + "'>" +
                        "<i class='glyphicon glyphicon-remove'></i>" +
                    "</a>"+
                "</td>"+
            "</tr>";
    tabela.find("tbody").append(tds);

    return tds;
}

function deleteRow() {

    var row = $(event.currentTarget);

    if (typeof row.data("row") !== "undefined") {
        alert(row.data("row"));
    } else if (typeof row.data("rowmto") !== "undefined") {
        
        console.log(moto);
        
        moto.slice(row.data("rowmto"),1);
        
        console.log(moto);
        
        bodyTable($(".tbl-add-moto"),moto, contadorMoto, "rowmto");
    }

}



$(function () {
    var run = new AddCarro.Adicionar();
    run.init();
});