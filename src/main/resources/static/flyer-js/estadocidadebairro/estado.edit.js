/* global Swal, Formiga, comboUF */

var btnEdit;
var context;

$(function () {
    
    context = $("#context-app");
    btnEdit = $("#btn-edit");
    
    vis(function () {
        
        document.title = vis() ? 'Search State' : 'Registration State';
        
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
                        var datatb = new Formiga.AssembleDataTable();
                        datatb.enable("Nenhum registro encontrado", data,true);
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