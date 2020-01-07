$(document).ready(function () {
    
    event.preventDefault();

    $(".js-status").bootstrapToggle();

    $(".btn-save").on("click", function () {
       save();
    });
    
});

function save() {
    
    var tipoSelecionado = $("#situacao").prop("checked");
    var status;
    
    if(tipoSelecionado === true) {
        status = "ONLINE";
    } else {
        status = "OFFLINE";
    }
    
    var flyer = {
        
        "condominio":$("#condominio").val(),
        "portaria":$("#portaria").val(),
        "codFlyer":$("#codFlyer").val(),
        "status":status
    };
    
    if(flyer.condominio && flyer.portaria && flyer.codFlyer) {

        $(".condominio").removeClass("has-error has-feedback");
        $(".portaria").removeClass("has-error has-feedback");
        $(".codFlyer").removeClass("has-error has-feedback");
        
        var context = $("#context-app").val();
        
        $.ajax({

            type: "POST",
            contentType: "application/json",
            dataType: "json",
            url: context+"flyer/save",
            data: JSON.stringify(flyer),

            error: function (data, textStatus, jqXHR) {
                $(".alert-danger").prop("style","display: block;");
                $(".alert-success").prop("style","display: none;");
                $(".response-error").text(data.responseText);
            },
            success: function (data, textStatus, jqXHR) {
                $(".alert-danger").prop("style","display: none;");
                $(".alert-success").prop("style","display: block;");
            },
            beforeSend: start_request,
            complete: finalize_request


        });
    } else {
        
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
        
        if($("#codFlyer").val() === "") {
            $(".codFlyer").addClass("has-error has-feedback");
        } else {
            $(".codFlyer").removeClass("has-error has-feedback");
        }
        
        $(".response-error").text(msg);
        
    }
    
}

function start_request() {
    $("#divLoading").addClass("show");
}

function finalize_request() {
    $("#divLoading").removeClass("show");
}
