var CityEdit = CityEdit || {};

CityEdit.Edit = (function () {
    
    function Edit() {
        this.btnEdit = $("#btn-edit");
    }
    
    Edit.prototype.init = function () {
        
    };
    
    return Edit;
    
}());


function openWindowCidade() {
        
    var cidade = $(event.currentTarget);
    sessionStorage.setItem("idcidade",cidade.data("idcidade"));
    sessionStorage.setItem("idestado",cidade.data("idestado"));
    sessionStorage.setItem("cidade",cidade.data("cidade"));
    sessionStorage.setItem("estado",cidade.data("estado"));
    sessionStorage.setItem("uf",cidade.data("uf"));
    window.open($("#context-app").val()+"city");

}

$(function () {
    var cityEdit = new CityEdit.Edit();
    cityEdit.init();
});