/*
 * This program is free software; you can redistribute it and/or
 * modify it under the terms of the GNU General Public License
 * as published by the Free Software Foundation; under version 2
 * of the License (non-upgradable).
 *
 * This program is distributed in the hope that it will be useful,
 * but WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
 * GNU General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program; if not, write to the Free Software
 * Foundation, Inc., 51 Franklin Street, Fifth Floor, Boston, MA  02110-1301, USA.
 *
 * Copyright (c) 2017 (original work) Open Assessment Technologies SA;
 *
 */
define([
    'qtiCustomInteractionContext',
    'taoQtiItem/portableLib/jquery_2_1_1',
    'SnapPCI/interaction/runtime/js/renderer',
    'taoQtiItem/portableLib/OAT/util/event',
    'SnapPCI/interaction/runtime/js/lib/snapsrc',
    'SnapPCI/interaction/runtime/js/lib/lz-string.min'
], function(qtiCustomInteractionContext, $, renderer, event, snapsrc, LZString) {
    'use strict';

    var _typeIdentifier = 'SnapPCI';

    var SnapInteraction = {

        /*********************************
         *
         * IMS specific PCI API property and methods
         *
         *********************************/

        typeIdentifier: _typeIdentifier,

        /**
         * initialize the PCI object. As this object is cloned for each instance, using "this" is safe practice.
         * @param {DOMELement} dom - the dom element the PCI can use
         * @param {Object} config - the sandard configuration object
         * @param {Object} [state] - the json serialized state object, returned by previous call to getStatus(), use to initialize an
         */
        getInstance: function getInstance(dom, config, state) {
            var response = config.boundTo;
            //simply mapped to existing TAO PCI API
            this.initialize(Object.getOwnPropertyNames(response).pop(), dom, config.properties, config.assetManager);
            this.setSerializedState(state);

            //tell the rendering engine that I am ready
            if (typeof config.onready === 'function') {
                config.onready(this, this.getState());
            }
        },

        /**
         * Get the current state fo the PCI
         * @returns {Object}
         */
        getState: function getState() {
            //simply mapped to existing TAO PCI API
            return this.getSerializedState();
        },

        /**
         * Called by delivery engine when PCI is fully completed
         */
        oncompleted: function oncompleted() {
            this.destroy();
        },

        /*********************************
         *
         * TAO and IMS shared PCI API methods
         *
         *********************************/

        /**
         * Get the response in the json format described in
         * http://www.imsglobal.org/assessment/pciv1p0cf/imsPCIv1p0cf.html#_Toc353965343
         *
         * @param {Object} interaction
         * @returns {Object}
         */
        getResponse: function() {
            var XMLDataRep, HTMLDataRep, snapshot, essai = {},
                value;
            var $container = $(this.dom);
            //Quantifier les essais : Il est toujours intéressant d'avoir le nombre d'essai. donc je conserve l'idée même sans limiteur.
            //essai.total = 5 -> 0=non actif, 1-5.
            //essai.util = 3 //Try number!!!
            essai.limit = this.config.testLimiter;
            essai.util = $container.find(".compteur").html();


            //Use XML Data for Response
            if (this.config.XMLData) {
                XMLDataRep = snapsrc.snap.world.stateSaver();
            } else {
                XMLDataRep = "";
            }

            if (this.config.HTMLReport) {
                HTMLDataRep = snapsrc.snap.world.getReport(true); // attention on peut envoyer un true / false pour avoir l'effet dropshadow 
            } else {
                HTMLDataRep = "";
            }

            if (this.config.snapshot) {

                var canvasArrLenght = $container.find(".world").length;
                canvasArrLenght = canvasArrLenght - 1;
                var canvas = $container.find(".world")[canvasArrLenght];
                snapshot = canvas.toDataURL();
            } else {
                snapshot = ""
            }

            var XMLDataRep_cp = LZString.compressToBase64(XMLDataRep);
            var HTMLDataRep_cp = LZString.compressToBase64(HTMLDataRep);
            var essai_rep = JSON.stringify(essai);


            value = '{"XMLData":"' + XMLDataRep_cp + '","HTMLReport":"' + HTMLDataRep_cp + '","Snapshot":"' + snapshot + '", "Essais":' + essai_rep + '}';

            return { base: { string: value } };
        },
        /**
         * Reverse operation performed by render()
         * After this function is executed, only the inital naked markup remains
         * Event listeners are removed and the state and the response are reset
         *
         * @param {Object} interaction
         */
        destroy: function() {
            var $container = $(this.dom);
            $container.off().empty();
        },


        /*********************************
         *
         * TAO specific PCI API methods
         *
         *********************************/

        /**
         * Get the type identifier of a pci
         * @returns {string}
         */
        getTypeIdentifier: function() {
            return _typeIdentifier;
        },

        /**
         * Render the PCI :
         * @param {String} id
         * @param {Node} dom
         * @param {Object} config - json
         */
        initialize: function(id, dom, config, assetManager) {

            //add method on(), off() and trigger() to the current object
            event.addEventMgr(this);

            var customSnapContext = {};
            event.addEventMgr(customSnapContext);


            var _this = this;
            this.id = id;
            this.dom = dom;
            this.config = config || {};
            this.config.customSnapContext = customSnapContext;

            //Save the data in the config using event
            customSnapContext.on('rawDefinitionChange', function(value) {
                _this.trigger('scriptSaverChange', [value]);
            });


            customSnapContext.on('rawStateChange', function(value) {
                _this.trigger('scriptSaverChange', [value]);
            });

            renderer.render(this.id, this.dom, this.config);
            //tell the rendering engine that I am ready
            qtiCustomInteractionContext.notifyReady(this);


            //listening to dynamic configuration change for 1.panelSizer 2.testLimiter 3.scriptImporter 4.snapScript
            this.on('panelSizerChange', function(level) {
                _this.config.panelSizer = level;
                if (_this.config.panelSizer == 'nonVisible') {
                    snapsrc.snap.world.leftReducer();
                    // $(dom).find(".snapy").empty()

                    renderer.renderSnap(_this.id, _this.dom, _this.config);
                } else {
                    snapsrc.snap.world.leftExpand();
                    //$(dom).find(".snapy").empty()
                    renderer.renderSnap(_this.id, _this.dom, _this.config);
                }
            });

            this.on('testLimiterChange', function(limiter) {
                _this.config.testLimiter = limiter;
                //$(dom).find(".snapy").empty()
                renderer.renderSnap(_this.id, _this.dom, _this.config);
            });

            this.on('scriptImporterChange', function() {
                // Importator function open file explorer to find xml project.

                //$(dom).find(".snapy").empty()
                renderer.renderSnap(_this.id, _this.dom, _this.config);
                snapsrc.snap.world.importator(); //Lance le selecteur de fichier xml
            });


            //Saver de projet modifié
            this.on('saveSnapStateChange', function() {

                snapsrc.snap.world.stateSaver();
                //$(dom).find(".snapy").empty()
                renderer.renderSnap(_this.id, _this.dom, _this.config);
            })


            $(window).resize(function() {
                //Missing save state automatic to protect content
                //$(dom).find(".snapy").empty()
                renderer.renderSnap(_this.id, _this.dom, _this.config);
            });


        },

        /**
         * Programmatically set the response following the json schema described in
         * http://www.imsglobal.org/assessment/pciv1p0cf/imsPCIv1p0cf.html#_Toc353965343
         *
         * @param {Object} interaction
         * @param {Object} response
         */
        setResponse: function(response) {

            var $container = $(this.dom),
                value = response && response.base ? parseInt(response.base.integer) : -1;

            $container.find('input[value="' + value + '"]').prop('checked', true);
        },

        /**
         * Remove the current response set in the interaction
         * The state may not be restored at this point.
         *
         * @param {Object} interaction
         */
        resetResponse: function() {

            var $container = $(this.dom);

            $container.find('input').prop('checked', false);
        },

        /**
         * Restore the state of the interaction from the serializedState.
         *
         * @param {Object} interaction
         * @param {Object} serializedState - json format
         */
        setSerializedState: function(state) {
            if (state && state.response) {
                this.setResponse(state.response);
            }
        },

        /**
         * Get the current state of the interaction as a string.
         * It enables saving the state for later usage.
         *
         * @param {Object} interaction
         * @returns {Object} json format
         */
        getSerializedState: function() {
            return { response: this.getResponse() };
        }
    };

    qtiCustomInteractionContext.register(SnapInteraction);

    return SnapInteraction;
});