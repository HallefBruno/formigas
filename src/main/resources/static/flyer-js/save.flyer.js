var add_msg_success;
var add_msg_danger;

$(document).ready(function () {
    
    event.preventDefault();

    $(".js-status").bootstrapToggle();
    
    add_msg_success = "<div class='alert-dismissible alert alert-success' role='alert'>"+"<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'></span>"+"<button type='button' class='close' data-dismiss='alert' aria-label='Close'>"+ "<span aria-hidden='true'>&times;</span>"+ "</button>"+"<span class='response-success-flyer'></span>"+"</div>";
    add_msg_danger = "<div class='alert-dismissible alert alert-danger' role='alert'>"+"<span class='glyphicon glyphicon-exclamation-sign' aria-hidden='true'>"+"</span><button type='button' class='close' data-dismiss='alert' aria-label='Close'><span aria-hidden='true'>&times;</span></button>"+"<span class='response-error-flyer'></span>"+"</div>";
    
    initMessage();
    
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
                responseMensage(-1,data);
            },
            success: function (data, textStatus, jqXHR) {
                responseMensage(0,data);
            },
            beforeSend: start_request,
            complete: finalize_request


        });
    } else {
        
        initMessage();

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
        if(data !== null)
            $(".response-success-flyer").text(" Registro salvo com sucesso!");
    }
}

function initMessage() {
    $(".alert-danger-flyer").prop("style", "display: block;");
    $(".alert-success-flyer").prop("style", "display: none;");
    $(".alert-danger-flyer").html("");
    $(".alert-danger-flyer").append(add_msg_danger);
    $(".response-error-flyer").text(" Todos os campos são obrigatórios!");
}

function start_request() {
    $("#divLoading").addClass("show");
}

function finalize_request() {
    $("#divLoading").removeClass("show");
}
