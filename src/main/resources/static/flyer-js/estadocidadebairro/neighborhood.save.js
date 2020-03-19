var Bairro = Bairro || {};

Bairro.Save = (function () {
    
    var idBairro;
    
    function Save() {
        $.fn.select2.defaults.set("theme", "bootstrap");
        this.form = $("form");
        this.comboUF = $("#uf");
        this.comboCid = $("#cidade");
        this.btnSave = $(".btn-save");
        this.btnReset = $("#btn-reset");
        this.nomeBairro = $("input[name='nome']");
        this.iduf = "";
        this.idcid = "";
    }

    Save.prototype.init = function () {
        this.form.on("submit", function (event) {event.preventDefault();});
        this.btnSave.on("click", save.bind(this));
        this.btnReset.on("click",clearForNewRegister);
        populaCombos.call(this);
    };

    function save() {

        if (this.iduf && this.idcid && this.nomeBairro.val()) {

            var arrayBairro = {
                id:idBairro,
                nome:this.nomeBairro.val(),
                cidade: {
                    id:this.idcid,
                    estado: {
                        id:this.iduf
                    }
                }
            };
            
            console.log(idBairro);

            var bairro = {
                id:arrayBairro.id,
                nome:arrayBairro.nome,
                cidade: {
                    id:arrayBairro.cidade.id,
                    estado: {
                        id:arrayBairro.cidade.estado.id
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
                }

            });
        } else {
            alert("OK");
        }
    }

    function populaCombos() {

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
            }
        });

        this.comboUF.on("select2:select", function (e) {

            this.iduf = e.params.data.id;

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

        }.bind(this));

    }
    
    function clearForNewRegister() {
        idBairro = null;
        alert("OK");
    }

    return Save;

}());

$(function () {
    var bairro = new Bairro.Save();
    bairro.init();
});