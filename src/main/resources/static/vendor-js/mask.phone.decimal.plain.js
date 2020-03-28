var Formatter = Formatter || {};

Formatter.MaskMoney = (function () {

    function MaskMoney() {
        this.decimal = $('.js-decimal');
        this.plain = $('.js-plain');
    }

    MaskMoney.prototype.enable = function () {
        this.decimal.maskMoney({decimal: ',', thousands: '.'});
        this.plain.maskMoney({precision: 0, thousands: '.'});
    };

    return MaskMoney;

}());

Formatter.MaskPhoneNumber = (function () {

    function MaskPhoneNumber() {
        this.inputPhoneNumber = $('.js-phone-number');
    }

    MaskPhoneNumber.prototype.enable = function () {
        var maskBehavior = function (val) {
            return val.replace(/\D/g, '').length === 11 ? '(00) 00000-0000' : '(00) 0000-00009';
        };

        var options = {
            onKeyPress: function (val, e, field, options) {
                field.mask(maskBehavior.apply({}, arguments), options);
            }
        };

        this.inputPhoneNumber.mask(maskBehavior, options);
    };

    return MaskPhoneNumber;

}());

Formatter.MaskCep = (function () {

    function MaskCep() {
        this.inputCep = $('.js-cep');
    }

    MaskCep.prototype.enable = function () {
        this.inputCep.mask('00.000-000');
    };

    return MaskCep;

}());

Formatter.MaskPlcaCar = (function () {

    function MaskPlcaCar() {
        this.inputPlacaCar = $('.js-placa-car');
    }

    MaskPlcaCar.prototype.enable = function () {
        
        var MercoSulMaskBehavior = function (val) {
            var myMask = 'AAA0A00';
            var mercosul = /([A-Za-z]{3}[0-9]{1}[A-Za-z]{1})/;
            var normal = /([A-Za-z]{3}[0-9]{2})/;
            var replaced = val.replace(/[^\w]/g, '');
            if (normal.exec(replaced)) {
                myMask = 'AAA-0000';
            } else if (mercosul.exec(replaced)) {
                myMask = 'AAA-0A00';
            }
            return myMask;
        };
        var mercoSulOptions = {
            onKeyPress: function (val, e, field, options) {
                field.mask(MercoSulMaskBehavior.apply({}, arguments), options);
            }
        };
        
        this.inputPlacaCar.mask(MercoSulMaskBehavior, mercoSulOptions);
        
    };

    return MaskPlcaCar;

}());

$(function () {
    var maskMoney = new Formatter.MaskMoney();
    maskMoney.enable();

    var maskPhoneNumber = new Formatter.MaskPhoneNumber();
    maskPhoneNumber.enable();

    var maskCep = new Formatter.MaskCep();
    maskCep.enable();
    
    var maskPlacaCar = new Formatter.MaskPlcaCar();
    maskPlacaCar.enable();


});