var Bairro = Bairro || {};

Bairro.Edit = (function () {
    
    function Edit() {}
    
    Edit.prototype.init = function () {
        
    };
    
    return Edit;
    
}());


function openWindowBairro() {
        
    var bairro = $(event.currentTarget);
    sessionStorage.setItem("idbairro",bairro.data("idbairro"));
    sessionStorage.setItem("idcidade",bairro.data("idcidade"));
    sessionStorage.setItem("idestado",bairro.data("idestado"));
    sessionStorage.setItem("bairro",bairro.data("bairro"));
    sessionStorage.setItem("cidade",bairro.data("cidade"));
    sessionStorage.setItem("estado",bairro.data("estado"));
    window.open($("#context-app").val()+"neighborhood");

}

$(function () {
    var bairro = new Bairro.Edit();
    bairro.init();
});