/* global Swal */

var add_msg_success = "<div class='alert-dismissible alert alert-success' role='alert'>"+"<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>"+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+ "<span aria-hidden='true'>&times;</span>"+ "</button>"+"<span class='response-success-flyer'></span>"+"</div>";
var add_msg_danger = "<div class='alert-dismissible alert alert-danger' role='alert'>"+"<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'>"+"</span><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"+"<span class='response-error-flyer'> Todos os campos são obrigatórios!</span>"+"</div>";

$(document).ready(function () {
    
    event.preventDefault();

    $('.icone-btn-save').append("<i class='glyphicon glyphicon-floppy-saved'></i> Salvar");

    $(".btn-search").on("click", function () {
        searching_flyer(); 
    });

    $(".btn_update_flyer").on("click", function (e) {
        
        var id, condominio, portaria, codFlyer,status;
        
        id = $(event.currentTarget).data("id");
        
        $(this).closest('tr').find('input').each(function() {
            if ($(this).attr("name") === "condominio") {
                condominio = $(this).val();
            }
            if ($(this).attr("name") === "portaria") {
                portaria = $(this).val();
              
            }
            if ($(this).attr("name") === "codflyer") {
                codFlyer = $(this).val();
                
            }
            if($(this).attr("class") === "js-status") {
                if($(this).prop('checked')) {
                    status = "ONLINE";
                } else {
                    status = "OFFLINE";
                }
            }
        });
        
        id = $(event.currentTarget).data("id");
        
        var flyer = {
            "id":id,
            "condominio":condominio,
            "portaria":portaria,
            "codFlyer":codFlyer,
            "status":status
        };
        
        update(flyer);
    });
});


function updateTbMontada() {

    var id, condominio, portaria, codFlyer, status,i = 0;
    
    var index = $(event.currentTarget).data("rowstatuson");

    var array = [];
    
    var arrayFlyer = [];
    
    var fake_row = 0;
    
    var qtdCasas;
    
    $('tr').find('input').each(function () {
        
        i = i + 1;
        
        if ($(this).attr("name") === "condominio") {
            condominio = $(this).val();
            array.push(condominio);
        }
        if ($(this).attr("name") === "portaria") {
            portaria = $(this).val();

            array.push(portaria);
        }
        if ($(this).attr("name") === "codflyer") {
            codFlyer = $(this).val();
            
            array.push(codFlyer);
        }
        if ($(this).attr("class") === "js-status") {

            if($(this).prop('checked')) {
                status = "ONLINE";
            } else {
                status = "OFFLINE";
            }
            array.push(status);
            
            fake_row++;
        }
        
    });

    id = $(event.currentTarget).data("id");
    
    qtdCasas = (array.length/fake_row);
    
    if(index === 1) {
        for(var i=0; i<qtdCasas; i++) {
            arrayFlyer.push(array[i]);
        }
    } else {
        for(var i=(qtdCasas*index)-4; i<(qtdCasas*index); i++) {
            arrayFlyer.push(array[i]);
        }
    }

    var flyer = {
        "id": id,
        "condominio": arrayFlyer[0],
        "portaria": arrayFlyer[1],
        "codFlyer": arrayFlyer[2],
        "status": arrayFlyer[3]
    };

    update(flyer);
    
}

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
                    Swal.fire('Ocorreu um erro!', data.responseText, 'error');
                },

                beforeSend: startRequest,
                complete: finalizeRequest
            });
        }
    });
    
    remove_class_swal2();
}

function update(flyer) {

    var context = $("#context-app").val();

    if(flyer.id && flyer.condominio && flyer.portaria && flyer.codFlyer) {

        $.ajax({

            type: "PUT",
            contentType: "application/json",
            dataType: "json",
            url: context+"flyer/update",
            data: JSON.stringify(flyer),

            error: function (data, textStatus, jqXHR) {
                Swal.fire('Ocorreu um erro!', data.responseText, 'error');
            },
            success: function (data, textStatus, jqXHR) {
                Swal.fire('Pronto!', data.message[0], 'success');
                table(data.lista[0]);
            },

            beforeSend: startRequest,
            complete: finalizeRequest

        });
    } else {
        Swal.fire("Ocorreu um erro!","Todos os campos são obrigatorios!","error");
    }
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
                responseMensage(-1, data);
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
                    "<th class='text-center'>Portaria</th>"+
                    "<th class='text-center'>N° Flyer</th>"+
                    "<th class='text-center' style='width: 100px;'>Status</th>"+
                    "<th class='text-center' style='width: 100px'>Ação</th>"+
                "</tr>");

    table.append("<tr class='lista-vazia'><td colspan='7' style='color:green'><b>Nenhum flyer encontrado</b></td></tr>");
    
    if(typeof data !== 'undefined' && data.length > 0) {
        
        $('.lista-vazia').remove();

        //$('.table-responsive').prop('style','padding-top: 20px;');
        
        var acaoDelete = "<a class='btn  btn-link  btn-xs' title='Excluir'>"+ "<i class='glyphicon glyphicon-remove'></i>"+"</a>";
        var acaoUpdate = "<a class='btn  btn-link  btn-xs' title='Editar'>"+ "<i class='glyphicon glyphicon glyphicon-ok'></i>"+"</a>";
        var tdCondominio;
        var tdPortaria;
        var tdCodFlyer;
        var tdStatus;
        var tabela;
        var rowStatusOn = 1;
        
        $.each(data, function (index, flyer) {

            if(index === 0) {
                index = index +1;
            } else {
                index = index +1;
            }

            tdCondominio = "<td class='id_flyer'>"+flyer.condominio+"</td>";
            tdPortaria = "<td style='text-align: center;'>"+flyer.portaria+"</td>";
            tdCodFlyer = "<td style='font-weight: bold; text-align: center;' class='text-center' >"+flyer.codFlyer+"</td>";
            tdStatus = "<td style='text-align: center;'><input disabled id='situacao' type='checkbox' class='checkd_vinculado' data-on='ON' data-off='OFF'  data-toggle='toggle' data-onstyle='success' data-offstyle='danger' checked data-size='small'/></td>";
            
            if(flyer.status === "ONLINE") {
                acaoDelete = "";
                acaoUpdate = "<a class='btn  btn-link  btn-xs' title='Vinculado'>"+"<i style='color: #b80b0c' class='glyphicon glyphicon-link'></i>"+"</a>";
            } else {
                
                tdCondominio="<td><input class='form-control' value='"+flyer.condominio+"' type='text' name='condominio' /></td>";
                tdPortaria="<td style='width: 150px;' ><input style='text-align: center;' class='form-control' value='"+flyer.portaria+"' type='text' name='portaria' /></td>";
                tdCodFlyer="<td style='width: 150px; font-weight: bold;' ><div class='feed"+index+"'><input style='text-align: center;' class='form-control' value='"+flyer.codFlyer+"' type='text' name='codflyer' /></div></td>";
                tdStatus="<td style='text-align: center;' ><input id='situacao' type='checkbox' class='js-status' data-on='ON' data-off='OFF'  data-toggle='toggle' data-onstyle='success' data-offstyle='danger' data-size='small'/></td>";
                acaoDelete="<a class='btn  btn-link  btn-xs' title='Excluir' onclick='deletar(this.id);' id="+flyer.id+">"+ "<i class='glyphicon glyphicon-remove'></i>"+"</a>";
                acaoUpdate="<a class='btn  btn-link  btn-xs btn_update_flyer' onclick='updateTbMontada();' title='Editar' data-rowstatuson="+rowStatusOn+" data-row="+index+" data-id="+flyer.id+">"+ "<i class='glyphicon glyphicon glyphicon-ok'></i>"+"</a>";
                rowStatusOn++;
            }

            tabela += "<tr style='background-color: white'>"+
                            "<td>"+flyer.id+"</td>"+
                            tdCondominio+
                            tdPortaria+
                            tdCodFlyer+
                            tdStatus+
                            "<td class='text-center'>"+
                                acaoUpdate+
                                acaoDelete+
                            "</td>"+
                        "</tr>";
        });
        
        table.append(tabela);
    }
    $(".js-status").bootstrapToggle();
    $(".checkd_vinculado").bootstrapToggle();
}

function startRequest(xhr) {
    var token = $("input[name='_csrf']").val();
    var header = $("input[name='_csrf_header']").val();
    
    xhr.setRequestHeader(header, token);
    $("#divLoading").addClass("show");
}

function finalizeRequest() {
    $("#divLoading").removeClass("show");
}