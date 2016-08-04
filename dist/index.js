"use strict";
var ko = require("knockout");
var folke = require("folke-core");
var ConfirmPopup = (function () {
    function ConfirmPopup(parameters) {
        var _this = this;
        this.parameters = parameters;
        this.confirm = function () {
            folke.default.hidePopin();
            _this.parameters.resolve(true);
        };
        this.cancel = function () {
            folke.default.hidePopin();
        };
        this.title = parameters['title'] || 'Veuillez confirmer';
        this.message = parameters['message'];
    }
    return ConfirmPopup;
}());
function register() {
    ko.components.register('popin-close-button', {
        template: '<button type="button" data-bind="click: close" class="close"><span class="fa fa-close"></span></button>',
        viewModel: { instance: { close: function () { folke.default.hidePopin(); } } }
    });
    ko.components.register('folke-view', {
        template: "<!-- ko with: popin -->\n<div class=\"popin-background\" data-bind=\"click: $parent.hidePopin\"></div>\n<div data-bind=\"component: { name: id, params:params }, css: id\"></div>\n<!-- /ko -->\n<!-- ko foreach: pages -->\n<div data-bind=\"component: { name: id, params: params }, css: id\"></div>\n<!-- /ko -->",
        viewModel: { instance: folke.default }
    });
    ko.components.register('popin-confirm', {
        template: "<section class=\"popin\"><header><popin-close-button></popin-close-button><div data-bind=\"text: title\"></div></header>\n                    <section>\n                    <div data-bind=\"text: message\"></div>\n                    <button data-bind=\"click: confirm\">Confirmer</button>\n                    <button data-bind=\"click: cancel\">Annuler</button>\n                    </section>",
        viewModel: ConfirmPopup
    });
}
exports.register = register;
