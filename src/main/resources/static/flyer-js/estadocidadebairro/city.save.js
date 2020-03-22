var Cidade = Cidade || {};

Cidade.Save = (function () {
    
    var idEstado;
    var idCidade;
    
    function Save() {

        $.fn.select2.defaults.set("theme", "bootstrap");

        this.$comboUF = $("#uf");
        this.nomeCidade = $("input[name='nome']");
        this.btnSave = $(".btn-save");
        this.btnMark = $(".btnmark");
        this.btnNew =  $(".btn-new");
        
    }

    Save.prototype.enabled = function () {

        var cidade = objectCidade.call(this);

        popularCombo.call(this, cidade);
        
        this.btnMark.on("click", function () {
            if(cidade.id !== null) {
                $("#uf").find("option").remove();
                $("#uf").append("<option label='" + cidade.estado.nome + "' value='" + cidade.estado.id + "'>" + cidade.estado.nome + "</option>");
                $("#uf").val(cidade.estado.nome).trigger("change");
            }
        }.bind(this));
        
        this.$comboUF.on("select2:select", function (e) {
            this.nomeCidade.select();
            this.nomeCidade.focus();
            idEstado = e.params.data.id;
            var target = e.params.originalEvent.target;

            if ($(target) && $(target).hasClass("combo-update")) {
                window.open($("#context-app").val() + "estado");
            }
        }.bind(this));

        this.btnSave.on("click", save.bind(this));
        this.btnNew.on("click", newCity.bind(this));

    };

    function save() {
        if (idEstado && this.nomeCidade.val()) {

            $(".uf").removeClass("has-error has-feedback");
            $(".nome").removeClass("has-error ");

            var cidade = {
                id:idCidade,
                estado: {
                    id: idEstado
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
                    idCidade = data.id;
                    Object.keys(sessionStorage).reduce(function (obj, key) {
                        sessionStorage.removeItem(key);
                    }, {});
                }

            });
        } else {
            $(".uf").addClass("has-error has-feedback");
            $(".nome").addClass("has-error has-feedback");
        }
    }


    function popularCombo(cidade) {

        this.$comboUF.select2({

            language: "pt-BR",
            placeholder: "Estados",
            allowClear: true,
            //minimumInputLength: 3,
            
            ajax: {
                url: $("#context-app").val() + "city/list/estado",
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
            },

            templateResult: function (state) {
                var $state = state;
                if (!$state.id)
                    return $state.text;
                return $state.text + "<i class='combo-update'>update</i>";
            },
            escapeMarkup: function (m) {
                return m;
            },
            initSelection: function (element, callback) {
                
                if(cidade.id !== null) {
                    var data = {
                        id: cidade.estado.id,
                        text: cidade.estado.nome
                    };
                    $("#uf").append("<option label='" + cidade.estado.nome + "' value='" + cidade.estado.id + "'>" + cidade.estado.nome + "</option>");
                    $("input[name='nome']").val(cidade.nome);
                    $(".btn-page-search").css("display","none");
                } else {
                    var data = {
                        id: "-1",
                        text: "Estados"
                    };
                    $(".btnmark").prop("disabled",true);
                }
                
                callback(data);
            }
            
        });

    }

    function objectCidade() {
        
        var nomecid = "";
        var nomees = "";
        
        if(sessionStorage.getItem("cidade")) {
            nomecid = sessionStorage.getItem("cidade");
            nomees = sessionStorage.getItem("estado");
        }
        
        var cidade = {

            id: sessionStorage.getItem("idcidade"),
            nome: nomecid.split("-").join(" "),
            estado: {
                id: sessionStorage.getItem("idestado"),
                nome: nomees.split("-").join(" "),
                uf: sessionStorage.getItem("uf")
            }
            
        };
        
        idCidade = cidade.id;
        idEstado = cidade.estado.id;

        return cidade;
    }
    
    function newCity() {
        this.nomeCidade.val("");
        idCidade = null;
    }

    return Save;

}());

$(function () {

    var save = new Cidade.Save();
    save.enabled();


});