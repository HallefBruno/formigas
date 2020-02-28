var Cidade = Cidade || {};

Cidade.Save = (function () {

    function Save() {
        event.preventDefault();
        $.fn.select2.defaults.set("theme", "bootstrap");

        this.comboUF = $("#uf");
        this.nomeCidade = $("input[name='nome']");
        this.btnSave = $(".btn-save");
        this.idEstado;
    }

    Save.prototype.enabled = function () {
        popularCombo.call(this);

        this.comboUF.on("select2:select", function (e) {
            this.nomeCidade.select();
            this.nomeCidade.focus();
            this.idEstado = e.params.data.id;
            
            var t = e.params.originalEvent.target;

            if ($(t) && $(t).hasClass('info')) {
                window.open($("#context-app").val()+"estado");
            }
            
        }.bind(this));

        this.btnSave.on("click", save.bind(this));
    };

    function save() {
        if (this.idEstado && this.nomeCidade.val()) {

            $(".uf").removeClass("has-error has-feedback");
            $(".nome").removeClass("has-error has-feedback");

            var cidade = {
                estado: {
                    id: this.idEstado
                },
                nome: this.nomeCidade.val()
            };

            $.ajax({

                url: $("#context-app").val() + "city/save",
                dataType: "json",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(cidade),

                success: function (data, textStatus, jqXHR) {

                }

            });
        } else {
            $(".uf").addClass("has-error has-feedback");
            $(".nome").addClass("has-error has-feedback");
        }
    }

    function format(state) {
        var $state = state;
        if (!$state.id) return $state.text;
        return $state.text + " <i class='info'>update</i>";
    }
    
    
    function popularCombo() {

        this.comboUF.select2({

            language: "pt-BR",
            placeholder: "Estados",
            
            templateResult: format,
            escapeMarkup: function(m) { return m; },
            
            ajax: {
                url: $("#context-app").val() + "city/list/estado",
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
            }
        });
    }

    return Save;

}());

$(function () {

    var save = new Cidade.Save();
    save.enabled();

    
});