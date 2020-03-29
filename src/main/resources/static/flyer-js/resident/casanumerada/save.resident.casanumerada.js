/* global Infinity */

var SaveResCasaNum = SaveResCasaNum || {};

SaveResCasaNum.Save = (function () {

    function Save() {
        $.fn.select2.defaults.set("theme", "bootstrap");
        this.comboMarca = $("#marcas").select2();
        this.comboModelo = $("#modelos").select2();
        this.comboEsCivil = $("#estadoCivil").select2();
        this.comboSexo = $("#sexo").select2();
        this.comboMarcasMoto = $("#marcasMoto").select2();
        this.comboModelosMoto = $("#modelosMoto").select2();
        this.comboCor = $("#cor");
        this.comboCorMoto = $("#cor-moto");
    }

    Save.prototype.init = function () {
        this.comboModelo.attr("disabled", true);
        this.comboModelosMoto.attr("disabled", true);
        popularCombos.call(this);
    };

    function popularCombos() {

        //Combo Marcas Carro
        this.comboMarca.select2({

            language: "pt-BR",
            placeholder: "Marcas",
            allowClear: true,
            minimumInputLength: 2,

            ajax: {
                url: $("#context-app").val() + "resident/list/marcacar",
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

        //Populando combo de modelos de carro
        this.comboMarca.on("select2:select", function (e) {

            this.comboModelo.attr("disabled", false);
            this.comboModelo.empty().trigger("change");
            $("input[name='fabri-carro']").val(e.params.data.text);
            $("input[name='id-fabri-carro']").val(e.params.data.id);
            
            this.comboModelo.select2({

                language: "pt-BR",
                placeholder: "Modelos",
                allowClear: true,

                ajax: {
                    url: $("#context-app").val() + "resident/list/modelo/veiculo/" + e.params.data.id,
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

            this.comboModelo.select2("focus");
            
            this.comboModelo.on("select2:select", function(e) {
                $("input[name='modelo-carro']").val(e.params.data.text);
                $("input[name='id-modelo-carro']").val(e.params.data.id);
            });
            

        }.bind(this));

        //populando combo marcas moto
        this.comboMarcasMoto.select2({

            language: "pt-BR",
            placeholder: "Marca da moto",
            allowClear: true,
            minimumInputLength: 2,

            ajax: {
                url: $("#context-app").val() + "resident/list/marcamoto",
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

        this.comboMarcasMoto.on("select2:select", function (e) {
            
            this.comboModelosMoto.attr("disabled", false);
            this.comboModelosMoto.empty().trigger("change");
            $("input[name='fabri-moto']").val(e.params.data.text);
            $("input[name='id-fabri-moto']").val(e.params.data.id);
            
            this.comboModelosMoto.select2({

                language: "pt-BR",
                placeholder: "Modelos",
                allowClear: true,

                ajax: {
                    url: $("#context-app").val() + "resident/list/modelomoto/"+e.params.data.id,
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
            
            this.comboModelosMoto.select2("focus");
            
            this.comboModelosMoto.on("select2:select", function(e) {
                $("input[name='modelo-moto']").val(e.params.data.text);
                $("input[name='id-modelo-moto']").val(e.params.data.id);
            });

        }.bind(this));

        //popuando combo estado civil
        this.comboEsCivil.select2({

            language: "pt-BR",
            placeholder: "Estado civil",
            allowClear: true,

            ajax: {
                url: $("#context-app").val() + "resident/estadocivil",
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

        //populando combo sexo
        this.comboSexo.select2({

            language: "pt-BR",
            placeholder: "Sexo",
            allowClear: true,

            ajax: {
                url: $("#context-app").val() + "resident/sexo",
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
    }

    return Save;

}());

$(function () {
    var resCasaNum = new SaveResCasaNum.Save();
    resCasaNum.init();
});



