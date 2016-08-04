import * as ko from "knockout";
import * as folke from "./index";

class ConfirmPopup {
    title: string;
    message: string;

    constructor(private parameters: folke.Parameters<boolean>) {
        this.title = parameters['title'] || 'Veuillez confirmer';
        this.message = parameters['message'];
    }

    confirm = () => {
        folke.application.hidePopin();
        this.parameters.resolve(true);
    }

    cancel = () => {
        folke.application.hidePopin();
    }
}

export function register() {
    ko.components.register('popin-close-button', {
        template: '<button type="button" data-bind="click: close" class="close"><span class="fa fa-close"></span></button>',
        viewModel: { instance: { close: function() { folke.application.hidePopin(); } } }
    });

    ko.components.register('folke-view', {
        template: `<!-- ko with: popin -->
<div class="popin-background" data-bind="click: $parent.hidePopin"></div>
<div data-bind="component: { name: id, params:params }, css: id"></div>
<!-- /ko -->
<!-- ko foreach: pages -->
<div data-bind="component: { name: id, params: params }, css: id"></div>
<!-- /ko -->`,
        viewModel: { instance: folke.application }
    });

    ko.components.register('popin-confirm', {
        template: `<section class="popin"><header><popin-close-button></popin-close-button><div data-bind="text: title"></div></header>
                    <section>
                    <div data-bind="text: message"></div>
                    <button data-bind="click: confirm">Confirmer</button>
                    <button data-bind="click: cancel">Annuler</button>
                    </section>`,
        viewModel: ConfirmPopup
    });
}