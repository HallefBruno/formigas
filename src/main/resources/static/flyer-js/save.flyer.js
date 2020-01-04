$(document).ready(function () {
    
    event.preventDefault();

    $('.btn-save').on('click', function () {
       save();
    });
    
    $('.btn-search').on('click', function () {
        searching_filipeta(); 
    });

});

function save() {
    
    var filipeta = {
        
        "condominio":$('#condominio').val(),
        "portaria":$('#portaria').val(),
        "filipeta":$('#filipeta').val()
    };
    
    if(filipeta.condominio && filipeta.portaria && filipeta.filipeta) {
        
        $(".condominio").removeClass("has-error has-feedback");
        $(".portaria").removeClass("has-error has-feedback");
        $(".filipeta").removeClass("has-error has-feedback");
        
        $.ajax({

            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            url: '/formigas/flyer/save',
            data: JSON.stringify(filipeta),

            error: function (data, textStatus, jqXHR) {
                $('.alert-danger').prop('style','display: block;');
                $('.alert-success').prop('style','display: none;');
                $('.response-error').text(data.responseText);
            },
            success: function (data, textStatus, jqXHR) {
                $('.alert-danger').prop('style','display: none;');
                $('.alert-success').prop('style','display: block;');
            },
            beforeSend: start_request,
            complete: finalize_request

    //        error: on_error_response.bind(this),
    //        beforeSend: start_request,
    //        complete: finalize_request

        });
    } else {//alert-warning
        //$('.response-error').removeClass('alert-danger');
        //$('.response-error').addClass('alert-warning');
        
        var msg = "Todos os campos são obrigatórios!";
        
        
        
        if($("#condominio").val() === "") {
            $(".condominio").addClass("has-error has-feedback");
        } else {
            msg = "Falta apenas alguns!";
            $(".condominio").removeClass("has-error has-feedback");
        }
        
        if($("#portaria").val() === "") {
            $(".portaria").addClass("has-error has-feedback");
        } else {
            $(".portaria").removeClass("has-error has-feedback");
        }
        
        if($("#filipeta").val() === "") {
            $(".filipeta").addClass("has-error has-feedback");
        } else {
            $(".filipeta").removeClass("has-error has-feedback");
        }
        
        $('.response-error').text(msg);
        
    }
    
}

function searching_filipeta() {
    
    if($('#filipeta').val()) {
        
        $('.feed').removeClass('has-error has-feedback');
        $('.feed').removeProp('placeholder');
        
        $.ajax({

            type: 'POST',
            contentType: 'application/json',
            dataType: 'json',
            url: '/formigas/flyer/searching/'+$('#filipeta').val(),
            data: JSON.stringify({filipetaCod:$('#filipeta').val()}),

            error: function (data, textStatus, jqXHR) {
                console.log(data);
            },
            success: function (data, textStatus, jqXHR) {
                table(data);
            },

            //error: on_error_response.bind(this),
            beforeSend: start_request,
            complete: finalize_request

        });
    } else {
        $('.feed').addClass('has-error has-feedback');
        $('#filipeta').focus();
        $('#filipeta').prop('placeholder','Flyer cod...');
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
        
        $.each(data, function (index, filipeta) {
            table.append("<tr style='background-color: white'>"+
                            "<td>"+filipeta.id+"</td>"+
                            "<td>"+filipeta.condominio+"</td>"+
                            "<td>"+filipeta.portaria+"</td>"+
                            "<td style='font-weight: bold;' >"+filipeta.filipeta+"</td>"+
                            "<td class='text-center'>"+
                                "<a class='btn  btn-link  btn-xs' title='Editar'>"+ 
                                    "<i class='glyphicon glyphicon-pencil'></i>"+
                                "</a>"+
                                "<a class='btn  btn-link  btn-xs' title='Excluir'>"+ 
                                    "<i class='glyphicon glyphicon-remove'></i>"+
                                "</a>"+
                            "</td>"+
                        "</tr>");
        });
    }
}

function start_request() {
    $('#divLoading').addClass('show');
}

function finalize_request() {
    $('#divLoading').removeClass('show');
}


//table.append("<tr>"+
//                            "<td>"+
//                                "<div class='panel panel-primary'>"+
//                                    "<div class='panel-heading'>Filipeta</div>"+
//                                    "<div class='panel-body'>"+
//                                        "<div class='list-group'>"+
//                                            "<input type='hidden' value='"+filipeta.id+"' />"+
//                                            "<a class='list-group-item'>"+"Condominio: "+filipeta.condominio+"</a>"+
//                                            "<a class='list-group-item'>"+"Portaria: "+filipeta.portaria+"</a>"+
//                                            "<b><a style='color: #000000;' class='list-group-item'>"+"Filipeta: "+filipeta.filipeta+"</a></b>"+
//                                        "</div>"+
//                                    "</div>"+
//                                    "<div class='panel-footer'>"+
//                                        "<button class='btn btn-primary'>Visitar</button>"+
//                                    "</div>"+
//                                "</div>"+
//                            "</td>"+
//                        "</tr>");