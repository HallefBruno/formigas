$(function () {
    
    initCheck();
    
    criarConta();
    
});

function criarConta() {
    alert("Criar conta");
}

function initCheck() {
    
    $("#checkcn").bootstrapToggle({
        on: "Meu modelo",
        off: "Não",
        offstyle: "danger",
        onstyle: "primary"
    });
    
    $("#checkcqdlt").bootstrapToggle({
        on: "Meu modelo",
        off: "Não",
        offstyle: "danger",
        onstyle: "primary"
    });
    
    $("#checkceb").bootstrapToggle({
        on: "Meu modelo",
        off: "Não",
        offstyle: "danger",
        onstyle: "primary"
    });
    
    $("#checkmeb").bootstrapToggle({
        on: "Meu modelo",
        off: "Não",
        offstyle: "danger",
        onstyle: "primary"
    });
    
    $("#ativo").bootstrapToggle({
        on: "SIM",
        off: "NÃO",
        offstyle: "danger",
        onstyle: "primary"
    });
    
    $("#perfil").bootstrapToggle({
        on: "ADMIN",
        off: "ATEND",
        offstyle: "danger",
        onstyle: "primary"
    });
}