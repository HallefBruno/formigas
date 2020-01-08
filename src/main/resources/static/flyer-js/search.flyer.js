/* global Swal */
var add_msg_success;
var add_msg_danger;

$(document).ready(function () {
    
    event.preventDefault();
    
    $('.icone-btn-save').append("<i class='glyphicon glyphicon-floppy-saved'></i> Salvar");
    
    $(".btn-search").on("click", function () {
        searching_flyer(); 
    });
    
    add_msg_success = "<div class='alert-dismissible alert alert-success' role='alert'>"+"<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>"+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+ "<span aria-hidden='true'>&times;</span>"+ "</button>"+"<span class='response-success-flyer'></span>"+"</div>";
    add_msg_danger = "<div class='alert-dismissible alert alert-danger' role='alert'>"+"<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'>"+"</span><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"+"<span class='response-error-flyer'></span>"+"</div>";

    $(".open-modal").on("click", function () {

        update();
    });
    
    
});

function deletar(id) {
    
    var context = $("#context-app").val();
    
    Swal.fire({
        title: 'Tem certeza?',
        text:'Você não poderá recuperar depois!',
        icon: 'warning',
        showCancelButton: true,
        cancelButtonText: 'Cancelar',
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sim, delete agora!'
    }).then((result) => {
        
        if (result.value) {
            
            $.ajax({
        
                url: context+"flyer/delete/"+id,
                type: "DELETE",
                dataType: "json",
                contentType: "application/json",
                data: id,
                success: function (data, textStatus, jqXHR) {
                    table(data);
                    $(".alert-success").prop("style","display: block;");
                    Swal.fire('Pronto!', 'Seu registro foi deletado.', 'success');
                },
                error: function (data, textStatus, jqXHR) {
                    $(".alert-danger").prop("style", "display: block;");
                    $(".alert-success").prop("style", "display: none;");
                    $(".response-error-flyer").text(" "+data.responseText);
                },

                beforeSend: startRequest,
                complete: finalizeRequest
            });
        }
    });
    
    remove_class_swal2();
}

function update() {
    
    initUpdate();
    
    var flyer = $(event.currentTarget);
    
    $('.js-status').bootstrapToggle('off');
    
    $("#idFlyer").val(flyer.data("id"));
    $("#condominio-update").val(flyer.data("condominio"));
    $("#portaria-update").val(flyer.data("portaria"));
    $("#codFlyer-update").val(flyer.data("codflyer"));
    
    $("#modalUpdateFlyer").modal("show");
    
    $('.icone-btn-save').on("click", function () {
        
        var context = $("#context-app").val();
        
        var tipoSelecionado = $("#situacao").prop("checked");
        var status;

        if(tipoSelecionado === true) {
            status = "ONLINE";
        } else {
            status = "OFFLINE";
        }
        
        var flyer = {
            "id":$("#idFlyer").val(),
            "condominio":$("#condominio-update").val(),
            "portaria":$("#portaria-update").val(),
            "codFlyer":$("#codFlyer-update").val(),
            "status":status
        };

        if(flyer.condominio && flyer.portaria && flyer.codFlyer) {
            
            $.ajax({

                type: "PUT",
                contentType: "application/json",
                dataType: "json",
                url: context+"flyer/update",
                data: JSON.stringify(flyer),

                error: function (data, textStatus, jqXHR) {
                    responseMensage(-1,data);
                },
                success: function (data, textStatus, jqXHR) {
                    responseMensage(0,data);
                    table(data.lista[0]);
                },

                beforeSend: function() {
                    $(".js-modal-update").addClass('disabled');
                    $(".js-modal-cancel").addClass('disabled');
                    $('.icone-btn-save').html('');
                    $('.icone-btn-save').append("<img src='"+$('#context-app').val()+"imagens/mini-loading.gif'/> Salvar");
                },
                complete: function () {
                    $(".js-modal-update").removeClass('disabled');
                    $(".js-modal-cancel").removeClass('disabled');
                    $('.icone-btn-save').html('');
                    $('.icone-btn-save').append("<i class='glyphicon glyphicon-floppy-saved'></i> Salvar");
                }

            });
            
        }else {
        

        }
        
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

            beforeSend: startRequest,
            complete: finalizeRequest
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
            var acaoUpdate = "<a class='btn  btn-link  btn-xs' title='Editar'>"+ "<i class='glyphicon glyphicon-pencil'></i>"+"</a>";
            
            if(flyer.status === "ONLINE") {
                acaoDelete = "";
                acaoUpdate = "<a class='btn  btn-link  btn-xs' title='Vinculado'>"+"<i style='color: #b80b0c' class='glyphicon glyphicon-link'></i>"+"</a>";
            } else {
                acaoDelete = "<a class='btn  btn-link  btn-xs' title='Excluir' onclick='deletar(this.id);' id="+flyer.id+">"+ "<i class='glyphicon glyphicon-remove'></i>"+"</a>";
                acaoUpdate = "<a class='btn  btn-link  btn-xs open-modal' title='Editar' onclick='update();' data-id="+flyer.id+" data-condominio="+flyer.condominio+" data-portaria="+flyer.portaria+" data-codFlyer="+flyer.codFlyer+">"+ "<i class='glyphicon glyphicon-pencil'></i>"+"</a>";
            }

            table.append("<tr style='background-color: white'>"+
                            "<td>"+flyer.id+"</td>"+
                            "<td>"+flyer.condominio+"</td>"+
                            "<td>"+flyer.portaria+"</td>"+
                            "<td style='font-weight: bold;' >"+flyer.codFlyer+"</td>"+
                            "<td class='text-center'>"+
                                acaoUpdate+
                                acaoDelete+
                            "</td>"+
                        "</tr>");
        });
    }
}

function responseMensage(indicator, data) {
    //Erro
    if(indicator === -1) {
        $(".alert-danger-flyer").prop("style", "display: block;");
        $(".alert-danger-flyer").html("");
        $(".alert-danger-flyer").append(add_msg_danger);
        $(".alert-success-flyer").prop("style", "display: none;");
        $(".response-error-flyer").text(" "+data.responseText);
    } 
    
    //Sucesso
    if(indicator === 0) {
        $(".alert-success-flyer").prop("style", "display: block;");
        $(".alert-success-flyer").html("");
        $(".alert-danger-flyer").prop("style", "display: none;");
        $(".alert-success-flyer").append(add_msg_success);
        $(".response-success-flyer").text(" "+data.message[0]);
    }
}

function initUpdate() {
    $(".alert-danger-flyer").prop("style", "display: block;");
    $(".alert-success-flyer").prop("style", "display: none;");
    $(".alert-danger-flyer").html("");
    $(".alert-danger-flyer").append(add_msg_danger);
    $(".response-error-flyer").text(" Todos os campos são obrigatórios!");
}

function startRequest() {
    $("#divLoading").addClass("show");
}

function finalizeRequest() {
    $("#divLoading").removeClass("show");
}