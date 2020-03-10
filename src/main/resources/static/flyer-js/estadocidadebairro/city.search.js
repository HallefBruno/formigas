/* global Formiga, CityEdit */

var CitySearch = CitySearch || {};

CitySearch.Pesquisar = (function () {
    
    function Pesquisar() {
        
        this.parametro = $("input[name='nome']");
        this.btnSearch = $(".search");
        this.form = $("form");
        
    }
    
    Pesquisar.prototype.init = function () {
        
        this.form.on('submit', function (event) {
            event.preventDefault();
        });
        this.btnSearch.on("click", search.bind(this));


        eventAbaVisible(function () {

            document.title = eventAbaVisible() ? 'Search City' : 'Registration City';

            if (eventAbaVisible()) {

                Object.keys(sessionStorage).reduce(function (obj, key) {
                    sessionStorage.removeItem(key);
                }, {});

                if ($("input[name='nome']").val()) {

                    $.ajax({

                        url: $("#context-app").val() + "city/list/city?param=" + this.parametro.val(),
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
                        url: $("#context-app").val() + "city/list/city",
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

    };
    
    
    function search() {

        $.ajax({
            
            url: $("#context-app").val()+"city/list/city?param="+this.parametro.val(),
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
                                        "<th>UF</th>"+
                                        "<th>NOME</th>"+
                                        "<th class='text-center' style='width: 100px'>Ação</th>"+
                                    "</tr>");
        
        if(json !== null && json.length > 0) {

            $.each(json, function (index, cidade) {
                
                var cidadeNome = cidade.nome.replace(" ","-");
                var estadoNome = cidade.estado.nome.replace(" ","-");

                body+="<tr style='background-color: white'>"+
                            "<td>"+cidade.id+"</td>"+
                            "<td>"+cidade.estado.uf+"</td>"+
                            "<td>"+cidade.nome+"</td>"+
                            "<td class='text-center'>"+
                                "<a class='btn btn-link btn-xs' onclick='openWindowCidade();' id='btn-teste' data-idcidade="+cidade.id+" data-idestado="+cidade.estado.id+" data-cidade="+cidadeNome+" data-estado="+estadoNome+" data-uf="+cidade.estado.uf+" title='Editar'><i class='glyphicon glyphicon glyphicon-pencil'></i></a>"+
                                "<a class='btn btn-link btn-xs' title='Excluir'><i class='glyphicon glyphicon-remove'></i></a>"+
                            "</td>"+
                        "</tr>";

            });
            
            table.append(body);
            
        } else {
            table.append("<tr class='lista-vazia'><td colspan='7' style='color:green'><b>Nenhuma cidade encontrada</b></td></tr>");
        }
    }

    return Pesquisar;
    
}());

$(function () {
    var search = new CitySearch.Pesquisar();
    search.init();
});