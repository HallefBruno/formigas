/* global Swal */

var btnEdit;
var context;

$(function () {
    
    context = $("#context-app");
    btnEdit = $("#btn-edit");
    
    vis(function () {
        
        document.title = vis() ? 'Visible' : 'Not visible';
        
        if (vis()) {
            
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("uf");
            sessionStorage.removeItem("nome");
            
            $.ajax({

                type: "GET",
                contentType: "application/json",
                dataType: "json",
                url: $("#context-app").val() + "estado/list",
                statusCode: {

                    200: function (data, textStatus, jqXHR) {
                        table(data);
                    },
                    500: function (jqXHR, textStatus, errorThrown) {
                        Swal.fire('Atenção!', jqXHR.responseText, 'error');
                    }

                }
            });
        }
        
    });
    

    
});


var vis = (function () {
    var stateKey, eventKey, keys = {
        hidden: "visibilitychange",
        webkitHidden: "webkitvisibilitychange",
        mozHidden: "mozvisibilitychange",
        msHidden: "msvisibilitychange"
    };
    for (stateKey in keys) {
        if (stateKey in document) {
            eventKey = keys[stateKey];
            break;
        }
    }
    return function (c) {
        if (c)
            document.addEventListener(eventKey, c);
        return !document[stateKey];
    };
})();

function openWindowEstado() {
   
    var es = $(event.currentTarget);
    sessionStorage.setItem("id",es.data("id"));
    sessionStorage.setItem("uf",es.data("uf"));
    sessionStorage.setItem("nome",es.data("nome"));

    window.open(context.val()+"estado");
}

function table(data) {
    
    var table = $('table');
    table.find("tr").remove();
    var body;
    
    var cabecalho = "<tr>"+
                        "<th class='text-center'>Id</th>"+
                        "<th class='text-center'>UF</th>"+
                        "<th class='text-left'>Nome</th>"+
                        "<th class='text-center' style='width: 100px;'>Ação</th>"+
                    "</tr>";
            
    var listaVazia = "<tr class='lista-vazia'>"+
                        "<td colspan='7' style='color:green'>"+
                            "<b>Nenhum estado encontrado</b>"+
                        "</td>"+
                    "</tr>";
    
    table.find("thead").append(cabecalho);
    
    if(typeof data === 'undefined' && data.length === 0) {
        table.find("tbody").append(listaVazia);
    }
    
    $.each(data, function (index, estado) {
        body += "<tr style='background-color: white'>"+

                    "<td class='text-center' >"+estado.id+"</td>"+
                    "<td class='text-center' >"+estado.uf+"</td>"+
                    "<td>"+estado.nome+"</td>"+

                    "<td class='text-center'>"+
                        "<a class='btn btn-link btn-xs' id='btn-edit' onclick='openWindowEstado();' data-id='"+estado.id+"' data-uf='"+estado.uf+"' data-nome='"+estado.nome+"' title='Editar'> "+
                            "<i class='glyphicon glyphicon-pencil'></i>"+
                        "</a>"+
                        "<a class='btn btn-link btn-xs' title='Excluir'>"+
                            "<i class='glyphicon glyphicon-remove'></i>"+
                        "</a>"+
                    "</td>"+

                "</tr>";
    });
    
    table.find("tbody").append(body);
}