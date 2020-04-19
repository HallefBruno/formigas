/* global Infinity, Formiga, arrayCarro, Swal */

var SaveResCasaNum = SaveResCasaNum || {};

var idAtualRes = null;
var carros = [];
var telefones;

SaveResCasaNum.Save = (function () {
    
    var msgToast;
    var divBtnAddRemove;
    
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
        this.btnSave = $(".btn-save");
        this.selectTelefone = $("#telefones");
        
        this.nome = $("#nome");
        this.cpf = $("#cpf");
        this.rg = $("#rg");
        this.orgaoEmissor = $("#emissor");
        this.dataNascimento = $("#dataNascimento");
        this.naturalidade = $("#natural");
        this.estadoCivil = $("#combo-civil-value");
        this.sexo = $("#combo-sexo-value");
        this.numeroCasa = $("#casa");
        this.qtdMoradores = $("#qtdMorador");
        divBtnAddRemove = $(".btnAdd");

    }

    Save.prototype.init = function () {
        this.comboModelo.attr("disabled", true);
        this.comboModelosMoto.attr("disabled", true);
        
        this.btnSave.on("click", save.bind(this));
        
        popularCombos.call(this);
        msgToast = new Formiga.MessageToast();
        
        divBtnAddRemove.block({ message: null });
        divBtnAddRemove.on("mouseover", function() {
            divBtnAddRemove.prop("title","Salve primeiro o resident");
        });
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
        
        this.comboEsCivil.on("select2:select", function(e) {
            $("#combo-civil-value").val(e.params.data.id);
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
        
        this.comboSexo.on("select2:select", function(e) {
            $("#combo-sexo-value").val(e.params.data.id);
        });
    }
    
    function save() {

        var permitSave = true;

        var resident = {
            
            id:idAtualRes,
            nome:this.nome.val(),
            cpf:this.cpf.val(),
            rg:this.rg.val(),
            orgaoEmissor:this.orgaoEmissor.val(),
            dataNascimento:this.dataNascimento.val(),
            naturalidade:this.naturalidade.val(),
            estadoCivil:this.estadoCivil.val(),
            sexo:this.sexo.val(),
            numeroCasa:this.numeroCasa.val(),
            qtdMoradores:this.qtdMoradores.val(),
            animalDomestico:$("input:radio[name=animal]:checked").val()
            
        };

        $.each(resident, function(key,value) {
            if(value==="") {
                $("."+key).addClass("has-error has-feedback");
                msgToast.show("Por favor, preencha todos os campos!","warning");
                permitSave = false;
            } else {
                $("."+key).removeClass("has-error has-feedback");
            }
        });

        if(permitSave) {

            $.ajax({

                type: "POST",
                contentType: "application/json",
                data: JSON.stringify(resident),
                url: $("#context-app").val() + "resident/save",

                success: function (data, textStatus, jqXHR) {
                    idAtualRes = data.id;
                    divBtnAddRemove.removeAttr("title");
                    divBtnAddRemove.unblock();
                    
                    Swal.fire('Pronto!', "Salvo com sucesso", 'success');
                },
                error: function (jqXHR, textStatus, errorThrown) {
                    Swal.fire("Atenção!",jqXHR.responseText, "warning");
                }

            });
            
        }

    }

    return Save;

}());

$(function () {
    var resCasaNum = new SaveResCasaNum.Save();
    resCasaNum.init();
});



