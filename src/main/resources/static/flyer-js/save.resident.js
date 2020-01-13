
$(document).ready(function () {
    
    event.preventDefault();
    $.fn.select2.defaults.set("theme", "bootstrap");

    $(".select-quadra").select2();
    $(".select-lote").select2();
    $(".select-estado").select2();
    $(".select-cidade").select2();
    $(".select-bairro").select2();
    
    $(".cpf").mask("000.000.000-00", {reverse: true});
    
    $("#fileimagem").on("change",function () {
        if($("#fileimagem").val() !== "") {
            $(".btn-file").removeClass("btn btn-danger");
            $(".btn-file").addClass("btn btn-primary");
        }
    });
    
    popularCombos();
    saveResident();

});

function saveResident() {
    
    $('.btn-save').click(function () {
        
        var resident_array = $("form").serializeArray();

        var campos_preenchidos = true;
        
        for(var vazio = resident_array.length; vazio--;) {
            if(resident_array[vazio].value === "") {
                $('.'+resident_array[vazio].name).addClass("has-error has-feedback");
                if(resident_array[vazio].name === "cpf") {
                    $(".meu_cpf").addClass("has-error has-feedback");
                }

                campos_preenchidos = false;
            } else {
                if(resident_array[vazio].name === "cpf") {
                    $(".meu_cpf").removeClass("has-error has-feedback");
                }
                
                $('.'+resident_array[vazio].name).removeClass("has-error has-feedback");
            }

        }

        $(".alert-danger").prop('style','display: block;');
        $(".response-error").text("Todos os campos são obrigatórios!");
        
        if($("#fileimagem").val() && campos_preenchidos) {
            
            var resident = {
                "nome":$("#nome").val(),
                "cpf":$("#cpf").val(),
                "telefone":$("#telefone").val(),
                "endereco":$("#endereco").val(),
                "quadra":$("#quadra").val(),
                "lote":$("#quadra").val(),
                "bairro": {
                    "id":$("#bairro").val()
                }
            };
            
            $.ajax({
                url: $('.context-app').val()+"resident/save",
                type: 'POST',
                contentType: 'application/json',
                dataType: 'json',
                data: JSON.stringify(resident),
                success: function (data) {
                    savePhoto(data.id);
                    $(".alert-danger").prop('style','display: none;');
                    $(".alert-morador").prop('style','display: block;');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    console.log(jqXHR.responseText);
                    $(".alert-morador").prop('style','display: none;');
                    $(".response-error-msg").text(jqXHR.responseText+"!");
                    $(".response-error").prop('style','display: none;');
                    $(".alert-danger").prop('style','display: block;');
                }
            });
            
        }
    });
}

function savePhoto(idResident) {
    if(idResident> 0 ) {
        
        var data = new FormData();
        data.append("photo", $('#fileimagem')[0].files[0]);
        var residentName = $("#nome").val();

        $.ajax({
            url: $(".context-app").val()+"fotos/save/"+residentName+"/"+idResident,
            data: data,
            enctype: "multipart/form-data",
            processData: false,
            contentType: false,
            type: "POST",
            success: function (resp) {
                $(".alert-danger").prop('style','display: none;');
                $(".alert-foto").prop('style','display: block;').fadeOut(3000);
            },
            error: function (jqXHR, textStatus, errorThrown) {
                $(".alert-danger").prop('style','display: block;');
                $(".response-error").text(jqXHR.responseText);
            }
        });
        
    }

}

function popularCombos() {
    var valueSelectEstado = $(".select-estado").select2({
        
        language: 'pt-BR',
        
        ajax: {
            url: $(".context-app").val()+"resident/lists/estado/0",
            type: "get",
            dataType: "json",

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
        }
    });
    
    valueSelectEstado.on("select2:select", function (e) {
        
        var valueSelectCidade = $(".select-cidade").select2({
            
            language: 'pt-BR',
            
            ajax: {
                url: $(".context-app").val()+"resident/lists/cidade/"+e.params.data.id,
                type: "get",
                dataType: "json",
                
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
            }
            
        });
        
        valueSelectCidade.on("select2:select", function (e) {
            $(".select-bairro").select2({
                
                language: 'pt-BR',
                
                ajax: {
                    url: $(".context-app").val()+"resident/lists/bairro/"+e.params.data.id,
                    type: "get",
                    dataType: "json",

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
                }
            });
        });
    });

}