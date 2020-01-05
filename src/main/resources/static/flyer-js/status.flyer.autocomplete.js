$(document).ready(function () {
    
    event.preventDefault();
    $.fn.select2.defaults.set("theme", "bootstrap");
    
    $(".js-status").bootstrapToggle();
    
    var context = $("#context-app").val();
    
    $("#autocomplete").autocomplete({
        source: context+"flyer/search/car",
        minLength: 2,
        select: function (event, ui) {
            this.label = ui.item.label;
            this.value = ui.item.label;
            $("#codMarca").val(ui.item.value);
            tipoAutomovel(true);
            return false;
        }
    });

    $(".js-status").change(function() {
        alterPropAutoCompleteSelect();
        $("#carros-motos").html("<option value=''>Selecione um veículo</option>");
        $("#carros-motos").prop("disabled",true);
        $("#autocomplete").val("");
    });
    
    
    $("#carros-motos").select2();
    
    $("#resident").select2({
        ajax: {
            url: context+"flyer/search/resident",
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
    
    $(".select2-selection__arrow").prop("style","display:none;");

});

function test(element) {
    document.getElementById(element).addEventListener("keydown", function(event) {
 
	var tecla = event.keyCode;
	
	if(tecla === 13) {
	 
	 // tecla ENTER
		
	} else if(tecla === 27) {
	 
	 // tecla ESC
		
	} else if(tecla === 37) {
	 
	 // seta pra ESQUERDA
		
	} else if(tecla === 38) {
            
	 // seta pra CIMA
            console.log(event.target.label);
            console.log(event);
	} else if(tecla === 39) {
	 
	 // seta pra DIREITA
		
	} else if(tecla === 40) {
            console.log(event.target.label);
            console.log(event);
	 // seta pra BAIXO
		
	}
 
});
}

function alterPropAutoCompleteSelect() {
    
    var tipoSelecionado = $("#tipoautomovel").prop("checked");
    
    var context = $("#context-app").val();
    
    if(tipoSelecionado === false) {
        
        $(".iniciais").text("Digite as iniciais da marca da moto");
        $(".carros-motos").text("Selecione a moto");
        
        $("#autocomplete").autocomplete({
            source: context+"flyer/search/moto",
            minLength: 2,
            select: function (event, ui) {
                this.value = ui.item.label;
                $("#codMarca").val(ui.item.value);
                tipoAutomovel(tipoSelecionado);
                return false;
            }
        });
        
    } else {
        
        $(".iniciais").text("Digite as iniciais da marca do carro");
        $(".carros-motos").text("Selecione o carro");
        
        $("#autocomplete").autocomplete({
            source: "/formigas/flyer/search/car",
            minLength: 2,
            select: function (event, ui) {
                this.value = ui.item.label;
                $("#codMarca").val(ui.item.value);
                tipoAutomovel(tipoSelecionado);
                return false;
            }
        });
        
    }
}

function tipoAutomovel(tipoSelecionado) {

    //tipoSelecionado=true[carro]
    //tipoSelecionado=false[moto]
    
    $("#carros-motos").html("");
    $("#carros-motos").html("<option value=''>Selecione um veículo</option>");
    $("#carros-motos").prop("disabled",false);
    
    var context = $("#context-app").val();
    
    if(tipoSelecionado === true) {
        $("#carros-motos").select2({
            ajax: {
                url: context+"flyer/search/"+$("#codMarca").val()+"/car",
                type: "get",
                dataType: "json",
                placeholder: "Selcione um veículo",

                data: function (params) {
                    return {
                        searchTerm: params.term
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

    } else {
        $("#carros-motos").select2({
            ajax: {
                url: context+"flyer/search/"+$("#codMarca").val()+"/moto",
                type: "get",
                dataType: "json",
                placeholder: "Selcione um veículo",

                data: function (params) {
                    return {
                        searchTerm: params.term
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

}