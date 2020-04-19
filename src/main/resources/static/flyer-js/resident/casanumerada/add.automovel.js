/* global Swal, Formiga,  , idAtualRes*/

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
                    var carro = {
                        modeloCarro: {
                            id: idModelo,
                            marcaCarro: {
                                id: idFabricante
                            }
                        },
                        resident: {
                            id: idAtualRes
                        },
                        placa: placa,
                        cor: cor
                    };
                    save(this.tblAddCarro,carro,"carro/save","data-row");

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

            //bodyTable(this.tblAddCarro,arrayCarro,"data-row");

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

            //bodyTable(this.tblAddMoto,arrayMoto,"data-rowmto");

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
    
    function save(tabela,object, url, dataKey) {
        
        $.ajax({
            url: $("#context-app").val() + url,
            data: JSON.stringify(object),
            type: "POST",
            contentType: "application/json",
            success: function (data, textStatus, jqXHR) {
                
                let car = data.toString().split(",");

                var object = {
                    id:car[0],
                    modelo: {
                        id:car[1],
                        nome:car[2],
                        marca: {
                            id:car[3],
                            nome:car[4]
                        }
                    },
                    placa:car[5],
                    cor:car[6]
                };
                arrayCarro.push(object);
                bodyTable(tabela,arrayCarro,dataKey);
                
                Swal.fire("Pronto!","Salvo com sucesso!", "success");
                
            },
            error: function (jqXHR, textStatus, errorThrown) {
                Swal.fire("Atenção!",jqXHR.responseText, "error");
            }
        });

    }
    
    return Adicionar;

}());

function bodyTable(tabela, array, key) {
    
    var tds="";
    
    $.each(array, function (index, object) {
        
        tds+="<tr style='font-size:12px;'>"+
                "<td>"+object.modelo.marca.nome+"</td>"+
                "<td>"+object.modelo.nome+"</td>"+
                "<td>"+object.placa.toUpperCase()+"</td>"+
                "<td>"+object.cor+"</td>"+
                "<td class='text-center'>"+
                    "<a onclick='deletar();' class='btn btn-link btn-xs btn-remove-row' title='Excluir' " + key + "='" + object.id + "' data-index='"+index+"'>" +
                        "<i class='glyphicon glyphicon-remove'></i>" +
                    "</a>"+
                "</td>"+
            "</tr>";
    });
    
    if(array.length === 0) {
        tabela.find("tbody").append("<tr><td colspan='7'>Nenhuma adicionada</td></tr>");
    }
    
    tabela.find("tbody").html("");
    tabela.find("tbody").append(tds);
    
    return tds;
}

function deletar() {

    var row = $(event.currentTarget);

    if (typeof row.data("row") !== "undefined") {
        var posicao = row.data("row");
        ajaxDel(posicao);
        arrayCarro = arrayCarro.filter(function (item) {
            return item.id !== posicao.toString();
        });
        bodyTable($(".tbl-add-carro"),arrayCarro, "data-row");
    } else if (typeof row.data("rowmto") !== "undefined") {
        var posicao = row.data("rowmto");
        arrayMoto.splice(posicao,1);
        bodyTable($(".tbl-add-moto"),arrayMoto, "data-rowmto");
    }

}

function ajaxDel(id) {
    $.ajax({
        
        url: $("#context-app").val()+"carro/delete/"+id,
        type: 'DELETE',
        
        success: function (data, textStatus, jqXHR) {
            Swal.fire("Pronto!","Registro apagado com sucesso!", "success");
        },
        error: function (jqXHR, textStatus, errorThrown) {
            
        }
        
    });
}



$(function () {
    var run = new AddAutomovel.Adicionar();
    run.init();
});