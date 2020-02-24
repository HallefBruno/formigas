/* global Formiga */

var EstadoSearch = EstadoSearch || {};

EstadoSearch.Pesquisar = (function () {

    function Pesquisar() {
        this.parametro = $("input[name='nome']");
        this.btnSearch = $(".search");
    }

    Pesquisar.prototype.enable = function () {
        this.btnSearch.on("click", search.bind(this));
    };
    
    function search() {
        
        console.log(this.parametro.val());
        
        $.ajax({
            
            url: $("#context-app").val()+"estado/search?param="+this.parametro.val(),
            dataType: "json",
            type: "GET",
            contentType: "application/json",

            success: function (data, textStatus, jqXHR) {
                var datatb = new Formiga.AssembleDataTable();
                datatb.enable("Nenhum registro encontrado", data,true);
            }
            
        });

    }

    return Pesquisar;

}());

$(function () {
    var search = new EstadoSearch.Pesquisar();
    search.enable();
});