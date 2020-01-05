
/* global select_resident */

var select_resident;

$(document).ready(function () {
    
    event.preventDefault();
    $.fn.select2.defaults.set("theme", "bootstrap");
    
    $('.select-quadra').select2();
    $('.select-lote').select2();
    $('.select-estado').select2();
    $('.select-cidade').select2();
    $('.select-bairro').select2();
    
    $('.cpf').mask('000.000.000-00', {reverse: true});
    
    var url_new_resident = $("#context-app").val()+"resident";

    select_resident = $("#resident").select2({

        language: {
            noResults: function () {
                return "Nehum Resident encontrado <a id='no-results-btn' href='"+url_new_resident+"' target='_blank'><label style='cursor: pointer;' class='label label-default'>Add novo</label></a>";
            }
        },
        escapeMarkup: function (markup) {
            return markup;
        },
        
        ajax: {
            url: $("#context-app").val()+"flyer/search/resident",
            type: "get",
            dataType: "json",
            allowClear: true,

            data: function (params) {
                return {
                    term: params.term
                };
            },
            processResults: function (response) {
                return {
                    results: response
                };
            },

            cache: true
        },
        templateResult: function (state) {

            var name_photo_original = state.text;
            var photo;
            var url_photo;
            var qtdSpaces = 0;
            
            if(name_photo_original !== "Searching…") {
                
                for(var i=0; i<name_photo_original.length; i++) {
                    
                    if(name_photo_original.charAt(i) === " ") {
                        qtdSpaces ++;
                        if(qtdSpaces === 2) {
                            
                            photo = name_photo_original.substring(i+1,name_photo_original.length);
                            
                            if(photo.includes(" ")) {
                                photo = name_photo_original.substring(i+1,name_photo_original.length);
                                photo = photo.substring(0, photo.indexOf(" "));
                            } else {
                                photo = name_photo_original.substring(i+1,name_photo_original.length);
                            }
                        }
                    }
                }
            }

            if (!state.id) {
                return state.text;
            }

            url_photo = $("#context-app").val()+"imagens/resident/thumbnail-" + photo.toLowerCase() + "_" + state.id + ".png";

            var $state = $('<span ><img sytle="display: inline-block;" src="'+url_photo+'"/> ' + state.text + '</span>');
            return $state;
        }
    });
    
    $(".select2-selection__arrow").prop("style","display:none;");
    
    list_result_search();
    
});

function list_result_search() {
    select_resident.on("select2:select", function (e) {
        var codResident = e.params.data.id;
        $.ajax({

            type: 'GET',
            contentType: 'application/json',
            dataType: 'json',
            url: $("#context-app").val()+"resident/search/"+codResident,
            data: codResident,

            error: function (data, textStatus, jqXHR) {
                alert.log(data);
            },
            success: function (data, textStatus, jqXHR) {
                table(data);
            }

        });
        
    });
}

function table(data) {
    
    var context = $("#context-app").val();
    
    var table = $('table').find('tbody');

    $('table tr').remove();
        
    table.append("<tr class='lista-vazia'><td colspan='7' style='color:green'><b>Nenhum flyer encontrado</b></td></tr>");
    

    if(typeof data !== 'undefined' && data.length > 0) {
        
        $('.lista-vazia').remove();
        
        $.each(data, function (index, resident) {

            table.append("<tr>"+
                                "<td>"+
                                    "<div class='panel panel-primary'>"+
                                        
                                        "<div class='panel-heading'>Resident</div>"+

                                        "<div class='panel-body'>"+
                                            "<div class='row'>"+
                                                "<div class='list-group'>"+
                                                    "<div class=' col-xs-6 col-md-3'>"+
                                                        
                                                        "<a style='display: block;' class='ambiente-dev thumbnail'>"+
                                                            "<img src='"+context+"imagens/resident/"+resident.fileName+"' id='imagenFondo' style='height: 180px; width: 100%;'>"+
                                                        "</a>"+
                                                        
                                                        "<a style='display: none;' class='ambiente-prod thumbnail'>"+
                                                            "<img th:src='@{/imagens/imagem-sem.jpg}' id='imagenFondo' style='height: 180px; width: 100%;'>"+
                                                        "</a>"+
                                                        
                                                    "</div>"+
                                                "</div>"+
                                                
                                                "<div class='col-sm-9 form-group'>"+
                                                    "<div>"+
                                                        "<span class='glyphicon glyphicon-saved' aria-hidden='true'></span>"+
                                                        "<span class='response-success-morador'>"+resident.resident.nome+"</span>"+
                                                    "</div>"+
                                                "</div>"+

                                            "</div>"+
                                            
                                            
                                            "<div class='list-group'>"+
                                                
                                               "<a class='list-group-item' >"+
                                                    
                                                    "<div class='row' >"+
                                                        "<div class='col-sm-4 form-group '>"+
                                                            "<label class='control-label' for='nome'>Nome</label>"+ 
                                                            "<input class='form-control' type='text' name='nome' id='nome' value='"+resident.resident.nome+"' />"+
                                                        "</div>"+
                                                        
                                                        "<div class='col-sm-4 form-group '>"+
                                                            "<label class='control-label' for='cpf'>CPF</label>"+ 
                                                            "<input class='form-control' type='text' name='cpf' id='cpf' value='"+resident.resident.cpf+"' />"+
                                                        "</div>"+
                                                        
                                                        "<div class='col-sm-4 form-group '>"+
                                                            "<label class='control-label' for='telefone'>Telefone</label>"+ 
                                                            "<input class='form-control' type='text' name='telefone' id='telefone' value='"+resident.resident.telefone+"' />"+
                                                        "</div>"+
                                                        
                                                    "</div>"+
                                                "</a>"+

                                                "<a class='list-group-item' >"+
                                                    "<div class='row'>"+
                                                        "<div class='quadra col-sm-6 form-group '>"+
                                                            "<label class='control-label' for='quadra'>Quadra</label> "+
                                                            "<select data-placeholder='Quadra...' name='quadra' id='quadra' class='form-control select-quadra' data-live-search='true' >"+
                                                                "<option value=''>Selecione uma quadra</option>"+
                                                                "<option value='01'>Quadra 01</option>"+
                                                                "<option value='02'>Quadra 02</option>"+
                                                                "<option value='03'>Quadra 03</option>"+
                                                                "<option value='04'>Quadra 04</option>"+
                                                                "<option value='05'>Quadra 05</option>"+
                                                                "<option value='06'>Quadra 06</option>"+
                                                                "<option value='07'>Quadra 07</option>"+
                                                                "<option value='08'>Quadra 08</option>"+
                                                            "</select>"+
                                                        "</div>"+

                                                        "<div class='lote col-sm-6 form-group '>"+
                                                            "<label class='control-label' for='lote'>Lote</label> "+
                                                            "<select data-placeholder='Lote...' id='lote' name='lote' class='form-control select-lote ' data-live-search='true'>"+
                                                                "<option value=''>Selecione um lote</option>"+
                                                                "<option value='01'>Lote 01</option>"+
                                                                "<option value='02'>Lote 02</option>"+
                                                                "<option value='03'>Lote 03</option>"+
                                                                "<option value='04'>Lote 04</option>"+
                                                                "<option value='05'>Lote 05</option>"+
                                                                "<option value='06'>Lote 06</option>"+
                                                                "<option value='07'>Lote 07</option>"+
                                                                "<option value='08'>Lote 08</option>"+
                                                            "</select>"+
                                                        "</div>"+

                                                    "</div>"+
                                                "</a>"+
                                                
                                                "<a class='list-group-item'>"+
                                                    "<div class='row' >"+
                                                        "<div class='estado col-sm-4 form-group '>"+
                                                            "<input type='hidden' id='idEstado' />"+
                                                            "<label class='control-label' for='estado'>Estado</label> "+
                                                            "<select data-placeholder='Estado...' id='estado' name='estado' class='form-control select-estado' data-live-search='true' > "+                           
                                                                "<option value=''>Selecione o estado</option>"+
                                                            "</select>"+
                                                        "</div>"+

                                                        "<div class='cidade col-sm-4 form-group '>"+
                                                            "<input type='hidden' id='idCidade' />"+
                                                            "<label class='control-label' for='cidade'>Cidade</label> "+
                                                            "<select data-placeholder='Cidade...' id='cidade' name='cidade' class='form-control select-cidade' data-live-search='true' >"+
                                                                "<option value=''>Selecione a cidade</option>"+
                                                            "</select>"+
                                                        "</div>"+


                                                        "<div class='bairro col-sm-4 form-group '>"+
                                                            "<label class='control-label' for='bairro'>Bairro</label> "+
                                                            "<select data-placeholder='Bairro...' name='bairro' id='bairro' class='form-control select-bairro ' data-live-search='true'>"+
                                                                "<option value=''>Selecione o bairro</option>"+
                                                            "</select>"+
                                                        "</div>"+
                                                    "</div>"+
                                                "</a>"+
                                                
                                                "<a class='list-group-item' >"+
                                                    "<label class='control-label' for='endereco'>Endereço</label> "+
                                                    "<input class='form-control' type='text' name='endereco' id='endereco' value='"+resident.resident.endereco+"' />"+
                                                "</a>"+
                                                
                                            "</div>"+
                                            
                                            

                                        "</div>"+

                                        "<div class='panel-footer'>"+
                                        
                                            "<div class='row'>"+
                                                "<div class='form-group col-sm-1'>"+
                                                    "<button class='btn btn-success'>Update</button>"+
                                                "</div>"+
                                                "<div class='form-group col-sm-2'>"+
                                                    "<button class='btn btn-danger'>Delete</button>"+
                                                "</div>"+
                                            "</div>"+
                                            
                                        "</div>"+
                                    "</div>"+

                                "</td>"+
                            "</tr>");

        });
    }
}