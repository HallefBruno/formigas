$(document).ready(function () {
    
});

function searchFlyer(value) {

    $.ajax({
        type: 'GET',
        url: '/formigas/flyer/offline',
        data: {
            flyer: value
        },
        success: function (data, textStatus, jqXHR) {
            dataTableHtmlFlyerOff(data);
        },
        error: function (jqXHR, textStatus, errorThrown) {
            console.log(jqXHR + " " + textStatus + " " + errorThrown);
        }
    });
}

function dataTableHtmlFlyerOff(data) {
    
    var table = $('table').find('tbody');

    $('table tr').remove();
    
    table.append("<tr>"+
                    "<th>Id</th>"+
                    "<th>Condominio</th>"+
                    "<th>Portaria</th>"+
                    "<th>N° Flyer</th>"+
                    "<th style='width: 140px' class='text-center'>Status flyer</th>"+
                    "<th class='text-center' style='width: 100px'>Ação</th>"+
                "</tr>");
        
    table.append("<tr class='lista-vazia'><td colspan='7' style='color:green'><b>Nenhum flyer encontrado</b></td></tr>");
    
        
    
    
    if(typeof data !== 'undefined' && data.length > 0) {
        
        $('.lista-vazia').remove();
        
        $.each(data, function (index, status) {//"<div class='panel panel-primary'>"+
            table.append("<tr style='background-color: white'>"+
                            "<td>"+status.id+"</td>"+
                            "<td>"+status.filipeta.condominio+"</td>"+
                            "<td>"+status.filipeta.portaria+"</td>"+
                            "<td style='font-weight: bold;' >"+status.filipeta.filipeta+"</td>"+
                            "<td class='text-center' title='Status do flyer'>"+
                                "<label class='label label-danger'>"+status.status+"</label>"+
                            "</td>"+
                            "<td id='tdEvent' style='text-align: center;' title='Enviar'>"+
                                "<a>"+
                                    "<i class='glyphicon glyphicon-send'></i>"+
                                "</a>"+
                            "</td>"+
                        "</tr>");
        });

    }
}
