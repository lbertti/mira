
var rules = [
    {
        name: "isLancamento",
        validate: "$data.tipo == 'Lançamento'"
    },
    {
        name: "isVenda",
        validate: "$data.tipo == 'Venda'"
    },
    {
        name: "isAluguel",
        validate: "$data.tipo == 'Aluguel'"
    },
    {
        name: "isDesktop",
        validate: "$env.device.desktop == true"
    },
    {
        name: "isTablet",
        validate: "$env.device.tablet == true"
    },
    {
        name: "isMobile",
        validate: "$env.device.mobile == true"
    },
    {
        name: "isImovel",
        validate: "$data.id != null"
    }

];

var selection = [
    {
        when: "isImovel",
        abstract: "detalheImovel"
    }
];

var interface_abstracts = [
    {
        name: "landing",
        widgets: [{
            name: "container",
            children: [{
                name: "head",
                children: [{name: "title"}]
            },
                {
                    name: "content",
                    children: [{
                        name: "itens",
                        datasource: "url:/api/imovel",
                        children: [{
                            name: "item",
                            children: [{
                                name: "tipo",
                                children: [{
                                    name: "link",
                                    children: [{name: "nome"},
                                        {name: "bairro"}]
                                }]
                            }]
                        }]
                    }]
                }]
        }]
    }, {
        name: "detalheImovel",
        widgets: [{
            name: "carousel",
            datasource: "$data.fotos",
            children: [{name: "carousel_item"}]
        },
            {
                name: "content",
                children: [{name: "nome"},
                    {
                        name: "detalhes",
                        children: [{
                            name: "row",
                            children: [{
                                name: "localizacao_box",
                                children: [{name: "localizacao_title"},
                                    {
                                        name: "localizacao_lista",
                                        datasource: "$data.localizacao",
                                        children: [{name: "localizacao_item"}]
                                    }]
                            },
                                {
                                    name: "negociacao_box",
                                    children: [{name: "negociacao_title"},
                                        {
                                            name: "negociacao_lista",
                                            datasource: "$data.aluguel",
                                            when: "isAluguel",
                                            children: [{name: "negociacao_item"}]
                                        },
                                        {
                                            name: "negociacao_lista",
                                            datasource: "$data.venda",
                                            when: "isVenda",
                                            children: [{name: "negociacao_item"}]
                                        },
                                        {
                                            name: "negociacao_lista",
                                            datasource: "$data.lancamento",
                                            when: "isLancamento",
                                            children: [{name: "negociacao_item"}]
                                        }]
                                }]
                        },
                            {name: "descricao_title"},
                            {name: "descricao"}]
                    },
                    {
                        name: "mapa_box",
                        children: [{name: "mapa"}]
                    }]
            }]
    }
];

var concrete_interface = [
    {
        name: "landing",
        head: [
            {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
            {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
            {name: 'title', widget:'Title', value: '"Yo Imóveis para Você"'}
        ],
        maps: [
            { name: "container", class: "container" },
            { name: "head", class: "jumbotron" },
            { name: "title", tag: "H1", class: "text-center", value: "'Escolha seu imóvel'" },
            { name: "content", class: "row col-md-10 col-md-offset-1"},
            { name: "itens"},
            { name: "item", class: "col-md-6"},
            { name: "tipo", class: "panel-body alert-success alert" },
            { name: "tipo", class: "panel-body alert-success alert", when: "isLancamento" },
            { name: "tipo", class: "panel-body alert-warning alert", when: "isVenda" },
            { name: "tipo", class: "panel-body alert-info alert", when: "isAluguel" },
            { name: "link", href: "navigate('/api/imovel/' + $data.id)", tag:"a" },
            { name: "nome", class: "lead text-center", value: "$data.nome", tag:"p" },
            { name: "bairro", class:"text-center", value: "$data.bairro", tag:"p" },
        ]
    }, {
        name: "detalheImovel",
        head: [
            {name: 'main_css', widget:'Head', href:'css/bootstrap.css', tag: 'style'},
            {name: 'viewport', widget:'Meta', content:'width=device-width, initial-scale=1'},
            {name: 'title', widget:'Title', value: '"Yo Imóveis para Você | " + $data.tipo + " | " + $data.nome'}
        ],
        maps: [
            { name: "carousel", widget: "BootstrapCarousel" },
            { name: "carousel_item", widget: "BootstrapCarouselItem", when: "isDesktop", value: "$data.desktop" },
            { name: "carousel_item", widget: "BootstrapCarouselItem", when: "isTablet", value: "$data.tablet" },
            { name: "carousel_item", widget: "BootstrapCarouselItem", when: "isMobile", value: "$data.mobile" },
            { name: "content", class: "container" },
            { name: "nome", tag:'h1', when: "isAluguel", value: "$data.nome", class: "text-center alert-info alert" },
            { name: "nome", tag:'h1', when: "isVenda", value: "$data.nome", class: "text-center alert-warning alert" },
            { name: "nome", tag:'h1', when: "isLancamento", value: "$data.nome", class: "text-center alert-success alert" },
            { name: "detalhes", class: "col-md-8"},
            { name: "row", class: "row well" },
            { name: "localizacao_box", class: "col-md-6" },
            { name: "localizacao_title", tag: "H3", value: "'Localização'" },
            { name: "localizacao_lista", tag: "ul" },
            { name: "localizacao_item", tag: "li", value: "$data.item" },
            { name: "negociacao_box", class: "col-md-6" },
            { name: "negociacao_title", when:"isAluguel", tag: "H3", value: "'Contrato de Locação'"},
            { name: "negociacao_title", when:"isLancamento", tag: "H3", value: "'Lançamento'"},
            { name: "negociacao_title", when:"isVenda", tag: "H3", value: "'Contrato de Venda'"},
            { name: "negociacao_lista", tag: "ul"  },
            { name: "negociacao_item", tag: "li", value: "$data.item" },
            { name: "descricao_title", tag: "H3", value: "'Descrição'" },
            { name: "descricao", tag: "p", value: "$data.descricao" },
            { name: "mapa_box", class: "col-md-4" },
            { name: "mapa", widget: "MapStatic", value: "$data.bairro", zoom:13},
            { name: "mapa", when:"isDesktop", widget: "MapDynamic", address: "$data.bairro", options: {zoom:13}},
        ]
    }
];

if(typeof define === 'function') {
    define([
        // Load our app module and pass it to our definition function
        "jquery",
        "bootstrap",
        'mira/init'
    ], function ($, $bootstrap, Mira) {

        return function Index() {
            var app = new Mira.Application(interface_abstracts, concrete_interface, rules, selection);
        };

    });
} else {
    exports.ajaxSetup = {};
    exports.abstracts = interface_abstracts;
    exports.mapping = concrete_interface;
    exports.selection = selection;
    exports.rules = rules;
}


