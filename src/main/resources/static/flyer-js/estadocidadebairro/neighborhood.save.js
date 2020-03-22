var Bairro = Bairro || {};

Bairro.Save = (function () {

    var idBairro;
    var objbairro;
    
    function Save() {
        $.fn.select2.defaults.set("theme", "bootstrap");
        this.form = $("form");
        this.comboUF = $("#uf");
        this.comboCid = $("#cidade").select2();
        this.btnSave = $(".btn-save");
        this.btnReset = $("#btn-reset");
        this.nomeBairro = $("input[name='nome']");
        this.iduf = "";
        this.idcid = "";
    }

    Save.prototype.init = function () {
        this.form.on("submit", function (event) {
            event.preventDefault();
        });
        this.comboCid.attr("disabled",true);
        this.btnSave.on("click", save.bind(this));
        this.btnReset.on("click", clearForNewRegister);
        objbairro = objectBairro.call(this);
        populaCombos.call(this, objbairro);
    };

    function save() {

        if (this.iduf && this.idcid && this.nomeBairro.val()) {

            $(".uf").removeClass("has-error has-feedback");
            $(".cidade").removeClass("has-error has-feedback");
            $(".nome").removeClass("has-error");

            var arrayBairro = {
                id: idBairro,
                nome: this.nomeBairro.val(),
                cidade: {
                    id: this.idcid,
                    estado: {
                        id: this.iduf
                    }
                }
            };

            var bairro = {
                id: arrayBairro.id,
                nome: arrayBairro.nome,
                cidade: {
                    id: arrayBairro.cidade.id,
                    estado: {
                        id: arrayBairro.cidade.estado.id
                    }
                }
            };

            $.ajax({
                url: $("#context-app").val() + "neighborhood/save",
                dataType: "json",
                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(bairro),

                success: function (data, textStatus, jqXHR) {
                    idBairro = data.id;
                    Object.keys(sessionStorage).reduce(function (obj, key) {
                        sessionStorage.removeItem(key);
                    }, {});
                }

            });
        } else {
            $(".uf").addClass("has-error has-feedback");
            $(".cidade").addClass("has-error has-feedback");
            $(".nome").addClass("has-error has-feedback");
        }
    }

    function populaCombos(objbairro) {

        this.comboUF.select2({

            language: "pt-BR",
            placeholder: "Estados",
            allowClear: true,

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
            initSelection: function (element, callback) {

                if (objbairro.id !== null) {
                    var data = {
                        id: objbairro.cidade.estado.id,
                        text: objbairro.cidade.estado.nome
                    };

                    $("#uf").append("<option label='" + objbairro.cidade.estado.nome + "' value='" + objbairro.cidade.estado.id + "'>" + objbairro.cidade.estado.nome + "</option>");
                    $("input[name='nome']").val(objbairro.nome);
                    
                } else {
                    var data = {
                        id: "-1",
                        text: "Estados"
                    };

                }

                callback(data);
            }
        });

        this.comboUF.on("select2:select", function (e) {
            this.comboCid.attr("disabled",false);
            this.iduf = e.params.data.id;
            this.comboCid.empty().trigger('change');
            
            this.comboCid.select2({

                language: "pt-BR",
                placeholder: "Cidades",
                allowClear: true,

                ajax: {
                    url: $("#context-app").val() + "resident/lists/cidade/" + e.params.data.id,
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

        }.bind(this));

        this.comboCid.on("select2:select", function (e) {
            this.idcid = e.params.data.id;
            this.nomeBairro.select();
        }.bind(this));

    }

    function clearForNewRegister() {
        idBairro = null;
    }

    function objectBairro() {
        
        var nomeBai = "";
        var nomeCid = "";
        var nomeEs = "";
        
        if(sessionStorage.getItem("idbairro")) {
            nomeBai = sessionStorage.getItem("bairro");
            nomeCid = sessionStorage.getItem("cidade");
            nomeEs  = sessionStorage.getItem("estado");
        }
        
        var bairro = {
            id: sessionStorage.getItem("idbairro"),
            nome: nomeBai.split("-").join(" "),
            cidade: {
                id: sessionStorage.getItem("idcidade"),
                nome: nomeCid.split("-").join(" "),
                estado: {
                    id: sessionStorage.getItem("idestado"),
                    nome: nomeEs.split("-").join(" ")
                }
            }
        };

        if (bairro.id !== null) {
            this.comboCid.attr("disabled",false);
            idBairro = bairro.id;
            this.idcid = bairro.cidade.id;
            this.iduf = bairro.cidade.estado.id;
            
            this.comboCid.select2({

                language: "pt-BR",
                placeholder: "Cidades",
                allowClear: true,

                ajax: {
                    url: $("#context-app").val() + "resident/lists/cidade/" + bairro.cidade.estado.id,
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
                initSelection: function (element, callback) {

                    if (bairro.id !== null) {
                        var data = {
                            id: bairro.cidade.id,
                            text: bairro.cidade.nome
                        };
                        
                    } else {
                        var data = {
                            id: "-1",
                            text: "Estados"
                        };
                    }
                    callback(data);
                }
            });
            
            $(".btn-search").css("display","none");
            
        }
        return bairro;
    }

    return Save;

}());

$(function () {
    var bairro = new Bairro.Save();
    bairro.init();
});