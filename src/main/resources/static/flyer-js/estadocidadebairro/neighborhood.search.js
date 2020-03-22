/* global Swal */

var Bairro = Bairro || {};

Bairro.Search = (function () {

    function Search() {
        this.parametro = $("input[name='nome']");
        this.btnSearch = $(".search");
        this.form = $("form");
    }

    Search.prototype.init = function () {
        this.form.on('submit', function (event) {
            event.preventDefault();
        });
        this.btnSearch.on("click",search.bind(this));
        vis.call(this);
    };
    
    function vis() {
        
        eventAbaVisible(function () {

            document.title = eventAbaVisible() ? 'Search Neighborhood' : 'Registration Neighborhood';

            if (eventAbaVisible()) {

                Object.keys(sessionStorage).reduce(function (obj, key) {
                    sessionStorage.removeItem(key);
                }, {});

                if ($("input[name='nome']").val()) {

                    $.ajax({

                        url: $("#context-app").val() + "neighborhood/search?param=" + this.parametro.val(),
                        dataType: "json",
                        type: "GET",
                        contentType: "application/json",

                        success: function (data, textStatus, jqXHR) {
                            assembleDataTable(data);
                        }

                    });

                } else {

                    $.ajax({

                        type: "GET",
                        contentType: "application/json",
                        dataType: "json",
                        url: $("#context-app").val() + "neighborhood/search",
                        statusCode: {
                            200: function (data, textStatus, jqXHR) {
                                assembleDataTable(data);
                            },
                            500: function (jqXHR, textStatus, errorThrown) {
                                Swal.fire('Atenção!', jqXHR.responseText, 'error');
                            }
                        }
                    });

                }

            }

        }.bind(this));


    }
    
    function search() {

        $.ajax({
            
            url: $("#context-app").val()+"neighborhood/search?param=" + this.parametro.val(),
            dataType: "json",
            type: "GET",
            contentType: "application/json",

            success: function (data, textStatus, jqXHR) {
                assembleDataTable(data);
            }
        });

    }
    
    function assembleDataTable(json) {
        
        var table = $("table");
        var body;
        table.find("tr").remove();
        table.find("thead").append("<tr>"+
                                        "<th>ID</th>"+
                                        "<th>Bairro</th>"+
                                        "<th>Cidade</th>"+
                                        "<th>Estado</th>"+
                                        "<th class='text-center' style='width: 100px'>Ação</th>"+
                                    "</tr>");
        
        if(json !== null && json.length > 0) {

            $.each(json, function (index, bairro) {
                
                var bairroNome = bairro.nome.split(" ").join("-");
                var cidadeNome = bairro.cidade.nome.split(" ").join("-");
                var estadoNome = bairro.cidade.estado.nome.split(" ").join("-");

                body+="<tr style='background-color: white'>"+
                            "<td>"+bairro.id+"</td>"+
                            "<td>"+bairro.nome+"</td>"+
                            "<td>"+bairro.cidade.nome+"</td>"+
                            "<td>"+bairro.cidade.estado.nome+"</td>"+
                            "<td class='text-center'>"+
                                "<a class='btn btn-link btn-xs' onclick='openWindowBairro();' id='btn-edit' data-idbairro="+bairro.id+" data-idcidade="+bairro.cidade.id+" data-idestado="+bairro.cidade.estado.id+" data-bairro="+bairroNome+" data-cidade="+cidadeNome+" data-estado="+estadoNome+" title='Editar'><i class='glyphicon glyphicon glyphicon-pencil'></i></a>"+
                                "<a class='btn btn-link btn-xs' title='Excluir'><i class='glyphicon glyphicon-remove'></i></a>"+
                            "</td>"+
                        "</tr>";

            });
            
            table.append(body);
            
        } else {
            table.append("<tr class='lista-vazia'><td colspan='7' style='color:green'><b>Nenhuma bairro encontrado</b></td></tr>");
        }
    }
    

    return Search;

}());

$(function () {
    var run = new Bairro.Search();
    run.init();
});
