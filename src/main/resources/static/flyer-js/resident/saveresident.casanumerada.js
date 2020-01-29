$(document).ready( function () {
    
    event.preventDefault();
    $.fn.select2.defaults.set("theme", "bootstrap");
    
    $(".cpf").mask("000.000.000-00", {reverse: true});

    $("#fileimagem").on("change",function () {
        if($("#fileimagem").val() !== "") {
            $(".btn-file").removeClass("btn btn-danger");
            $(".btn-file").addClass("btn btn-primary");
        }
    });
    
});