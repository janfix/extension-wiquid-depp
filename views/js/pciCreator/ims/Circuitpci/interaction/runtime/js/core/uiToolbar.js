define([
        'taoQtiItem/portableLib/jquery_2_1_1',
        'CircuitPCI/interaction/runtime/js/core/base/componentWire',
        'CircuitPCI/interaction/runtime/js/core/base/componentBattery',
        'CircuitPCI/interaction/runtime/js/core/depp/componentResistor',
        'CircuitPCI/interaction/runtime/js/core/depp/componentMoteur',
        'CircuitPCI/interaction/runtime/js/core/depp/componentLampe',
        'CircuitPCI/interaction/runtime/js/core/base/componentInductor',
        'CircuitPCI/interaction/runtime/js/core/base/componentVoltageSource',
        'CircuitPCI/interaction/runtime/js/core/depp/componentInterFerm',
        'CircuitPCI/interaction/runtime/js/core/depp/componentInterOuv',
        'CircuitPCI/interaction/runtime/js/core/depp/componentDiodeLumi',
        'CircuitPCI/interaction/runtime/js/assets',
        'CircuitPCI/interaction/runtime/js/deppAssets',
        'CircuitPCI/interaction/runtime/js/core/help',


    ],
    function($, ComponentWire, ComponentBattery, ComponentResistor, ComponentMoteur, ComponentLampe, ComponentInductor, ComponentVoltagesource, componentInterFerm, componentInterOuv, ComponentDiodeLumi, assets, deppAssets, help) {
        'use strict';

        function UIToolbar($container, config, assetManager, circuitCanvas) {

            var icoGrab = { src: assets.icon_grab };
            /* var icon_battery = { src: assets.icon_battery };
            var icon_capacitor = { src: assets.icon_capacitor };
            var icon_currentsource = { src: assets.icon_currentsource };
            var icon_ground = { src: assets.icon_ground };
            var icon_inductor = { src: assets.icon_inductor };
            var icon_resistor = { src: assets.icon_resistor };
            var icon_voltagesource = { src: assets.icon_voltagesource };
            var icon_wire = { src: assets.icon_wire }; 

            $container.find(".toolbar").html(

                '<button class="buttonTool buttonToolSelected grabber" title="Saisir et déplacer"><img class="buttonToolIcon" src="' + icoGrab.src + '">' +
                '</button> <button class="buttonTool wire" title="Cable"><img class="buttonToolIcon" src="' + icon_wire.src + '"> </button>' +
                '<button class="buttonTool battery" title="Batterie"><img class="buttonToolIcon"  src="' + icon_battery.src + '"> </button>' +
                '<button class="buttonTool resistor" title="Resistance"><img class="buttonToolIcon"  src="' + icon_resistor.src + '"> </button> ' +
                '<button class="buttonTool currentsource" title="Current Source"><img class="buttonToolIcon"  src="' + icon_currentsource.src + '"> </button> ' +
                '<button class="buttonTool capacitor" title="Condensateur"><img class="buttonToolIcon"  src="' + icon_capacitor.src + '"> </button> ' +
                '<button class="buttonTool inductor" title="Electroaimant"><img class="buttonToolIcon"  src="' + icon_inductor.src + '"> </button> ' +
                '<button class="buttonTool voltagesource" title="Voltage Source"><img class="buttonToolIcon"  src="' + icon_voltagesource.src + '"> </button> ' +
                '<button class="buttonTool ground" title="Terre"><img class="buttonToolIcon"  src="' + icon_ground.src + '"> </button>  '

            );
            
            */

            var icon_battery = { src: deppAssets.batterie };
            var icon_lampe = { src: deppAssets.lampe };
            var icon_moteur = { src: deppAssets.moteur };
            var icon_diodeElu = { src: deppAssets.diodeElu };
            var icon_interOuv = { src: deppAssets.interOuv };
            var icon_resistance = { src: deppAssets.resistance };
            var icon_interFerm = { src: deppAssets.interFerm };
            var icon_wire = { src: deppAssets.cable };
            var icon_reset = { src: deppAssets.reset };


            $container.find(".toolbar").html(

                '<button class="buttonTool buttonToolSelected grabber" title="Saisir pour déplacer ou effacer"><img class="buttonToolIcon" src="' + icoGrab.src + '">' +
                '</button> <button class="buttonTool wire" title="Cable"><img class="buttonToolIcon" src="' + icon_wire.src + '"> </button>' +
                '<button class="buttonTool battery" title="Batterie"><img class="buttonToolIcon"  src="' + icon_battery.src + '"> </button>' +
                '<button class="buttonTool resistor" title="Resistance"><img class="buttonToolIcon"  src="' + icon_resistance.src + '"> </button> ' +
                '<button class="buttonTool moteur" title="Moteur"><img class="buttonToolIcon"  src="' + icon_moteur.src + '"> </button> ' +
                '<button class="buttonTool lampe" title="Lampe"><img class="buttonToolIcon"  src="' + icon_lampe.src + '"> </button> ' +
                '<button class="buttonTool interOuv" title="Interrupteur ouvert"><img class="buttonToolIcon"  src="' + icon_interOuv.src + '"> </button> ' +
                '<button class="buttonTool interFerm" title="Interrupteur fermé"><img class="buttonToolIcon"  src="' + icon_interFerm.src + '"> </button> ' +
                '<button class="buttonTool diodeElu" title="Diode Electroluminescente"><img class="buttonToolIcon"  src="' + icon_diodeElu.src + '"> </button>  ' +
                '<button style="float:right;" class="CTool CClear" title="Recommencer depuis le debut"><span><img class="buttonToolIcon"  src="' + icon_reset.src + '"></span></button>' +
                '<button style="float:right;"  class="CTool expli" title="Explications du fonctionnement"><span style="text-shadow:none;font-size:2.5em!important;color:white;line-height:initial;">?</span></button>'
            );

            var currentComponent;

            $container.find('.wire').on("click", function() {
                circuitCanvas.mouseAddComponentClass = ComponentWire
                $container.find(".activeBT").removeClass("activeBT");
                $(this).addClass("activeBT")

            })
            $container.find('.battery').on("click", function() {
                circuitCanvas.mouseAddComponentClass = ComponentBattery
                $container.find(".activeBT").removeClass("activeBT");
                $(this).addClass("activeBT")

            })
            $container.find('.resistor').on("click", function() {
                circuitCanvas.mouseAddComponentClass = ComponentResistor
                $container.find(".activeBT").removeClass("activeBT");
                $(this).addClass("activeBT")

            })
            $container.find('.moteur').on("click", function() {
                circuitCanvas.mouseAddComponentClass = ComponentMoteur
                $container.find(".activeBT").removeClass("activeBT");
                $(this).addClass("activeBT")

            })
            $container.find('.lampe').on("click", function() {
                circuitCanvas.mouseAddComponentClass = ComponentLampe
                $container.find(".activeBT").removeClass("activeBT");
                $(this).addClass("activeBT")

            })
            $container.find('.interOuv').on("click", function() {
                circuitCanvas.mouseAddComponentClass = componentInterOuv
                $container.find(".activeBT").removeClass("activeBT");
                $(this).addClass("activeBT")

            })
            $('.interFerm').on("click", function() {
                circuitCanvas.mouseAddComponentClass = componentInterFerm
                $(".activeBT").removeClass("activeBT");
                $(this).addClass("activeBT")

            })
            $container.find('.diodeElu').on("click", function() {
                circuitCanvas.mouseAddComponentClass = ComponentDiodeLumi
                $container.find(".activeBT").removeClass("activeBT");
                $(this).addClass("activeBT")

            })
            $container.find(".grabber").on("click", function() {
                circuitCanvas.mouseAddComponentClass = null;
                $container.find(".activeBT").removeClass("activeBT");
                $(this).addClass("activeBT")
            })
            $container.find('.expli').on("click", function() {
                $container.find(".help").toggle();
                $container.find("canvas").toggle();
                help.render($container, config);
                $container.find(".activeBT").removeClass("activeBT");
                $(this).addClass("activeBT")

            })

        }



        return {
            add: function($container, config, assetManager, circuitCanvas) {
                UIToolbar($container, config, assetManager, circuitCanvas)
            }
        };
    });