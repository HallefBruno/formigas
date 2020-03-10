/* global Swal, Formiga, comboUF */

var btnEdit;
var context;

$(function () {
    
    event.preventDefault();
    
    context = $("#context-app");
    btnEdit = $("#btn-edit");
    
    eventAbaVisible(function () {
        
        document.title = eventAbaVisible() ? 'Search State' : 'Registration State';
        
        if (eventAbaVisible()) {
            
            sessionStorage.removeItem("id");
            sessionStorage.removeItem("uf");
            sessionStorage.removeItem("nome");
            
            if($("input[name='nome']").val()) {

                $.ajax({

                    url: $("#context-app").val() + "estado/search?param=" + $("input[name='nome']").val(),
                    dataType: "json",
                    type: "GET",
                    contentType: "application/json",

                    success: function (data, textStatus, jqXHR) {
                        var datatb = new Formiga.AssembleDataTable();
                        datatb.enable("Nenhum registro encontrado", data, true);
                    }
            
                });
                
            } else {
            
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
            
        }
        
    });

});

function openWindowEstado() {
   
    var es = $(event.currentTarget);
    sessionStorage.setItem("id",es.data("id"));
    sessionStorage.setItem("uf",es.data("uf"));
    sessionStorage.setItem("nome",es.data("nome"));
    window.open(context.val()+"estado");
}