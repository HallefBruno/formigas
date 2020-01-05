$(document).ready(function () {
    
    event.preventDefault();
    
    $(".btn-search").on("click", function () {
        searching_flyer(); 
    });
    
});

function deletar(id) {
    
    var context = $("#context-app").val();
    
    $.ajax({
        
        url: context+"flyer/delete/"+id,
        type: "DELETE",
        dataType: "json",
        contentType: "application/json",
        data: id,
        success: function (data, textStatus, jqXHR) {
            table(data);
        },
        error: function (data, textStatus, jqXHR) {
            console.log(data);
        },

        beforeSend: start_request,
        complete: finalize_request
    });
    
}

function searching_flyer() {
    
    if($("#codFlyer").val()) {
        
        $(".feed").removeClass("has-error has-feedback");
        $(".feed").removeProp("placeholder");
        
        var context = $("#context-app").val();
        
        $.ajax({

            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: context+"flyer/searching/"+$("#codFlyer").val(),
            data: JSON.stringify({filipetaCod:$("#codFlyer").val()}),

            error: function (data, textStatus, jqXHR) {
                console.log(data);
            },
            success: function (data, textStatus, jqXHR) {
                table(data);
            },

            beforeSend: start_request,
            complete: finalize_request

        });
    } else {
        $(".feed").addClass("has-error has-feedback");
        $("#codFlyer").focus();
        $("#codFlyer").prop("placeholder","Flyer cod...");
    }
    
}

function table(data) {
    
    var table = $('table').find('tbody');

    $('table tr').remove();
    table.append("<tr>"+
                    "<th>Id</th>"+
                    "<th>Condominio</th>"+
                    "<th>Portaria</th>"+
                    "<th>N° Flyer</th>"+
                    "<th class='text-center' style='width: 100px'>Ação</th>"+
                "</tr>");

    table.append("<tr class='lista-vazia'><td colspan='7' style='color:green'><b>Nenhum flyer encontrado</b></td></tr>");
    
    if(typeof data !== 'undefined' && data.length > 0) {
        
        $('.lista-vazia').remove();
        
        
        //$('.table-responsive').prop('style','padding-top: 20px;');
        
        $.each(data, function (index, flyer) {
            
            var acaoDelete = "<a class='btn  btn-link  btn-xs' title='Excluir'>"+ "<i class='glyphicon glyphicon-remove'></i>"+"</a>";

            if(flyer.status === "ONLINE") {
                acaoDelete = "";
            }

            table.append("<tr style='background-color: white'>"+
                            "<td>"+flyer.id+"</td>"+
                            "<td>"+flyer.condominio+"</td>"+
                            "<td>"+flyer.portaria+"</td>"+
                            "<td style='font-weight: bold;' >"+flyer.codFlyer+"</td>"+
                            "<td class='text-center'>"+
                                "<a class='btn  btn-link  btn-xs' title='Editar'>"+ 
                                    "<i class='glyphicon glyphicon-pencil'></i>"+
                                "</a>"+
                                acaoDelete+
                            "</td>"+
                        "</tr>");
        });
    }
}

function start_request() {
    $("#divLoading").addClass("show");
}

function finalize_request() {
    $("#divLoading").removeClass("show");
}