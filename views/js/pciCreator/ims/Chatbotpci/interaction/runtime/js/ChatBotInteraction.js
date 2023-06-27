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
    'ChatBotPCI/interaction/runtime/js/renderer',
    'taoQtiItem/portableLib/OAT/util/event'
], function(qtiCustomInteractionContext, $, renderer, event) {
    'use strict';

    var _typeIdentifier = 'ChatBotPCI';

    var ChatBotInteraction = {

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
            this.initialize(dom, config.properties);
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

            var $container = $(this.dom),
                value, $pulite;

            $pulite = $container.find('.respCatSem').html();
            //if (typeof $pulite !== "undefined") { $pulite = $pulite.slice(0, -1); }


            value = 'Answers : ' + $container.find('.respNode').html() + ' - Semantic : ' + $pulite + ' - Last Node : ' + $container.find('.lastNode').html(); // TO DO Response System


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
            renderer.stopTime();
            var $container = $(this.dom);
            $container.off().empty();
            console.log($container)
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
        initialize: function(dom, config) {

            var self = this;

            //add method on(), off() and trigger() to the current object
            event.addEventMgr(this);

            self.dom = dom;
            self.config = config || {};

            renderer.render(this.dom, this.config, this.config.chatgen);

            //listening to dynamic configuration change
            this.on('jsonImporterChange', function(jsonData) {
                // Importator function 
                self.config.chatGen = jsonData;
                renderer.render(self.dom, self.config, JSON.parse(jsonData));
            });

            this.on('backHomeChange', function(jsonData) {
                //restart from Home
                $(self.dom).find(".accordionBox").empty();
                if (typeof jsonData === "object") {
                    renderer.render(self.dom, self.config, jsonData);
                } else {
                    renderer.render(self.dom, self.config, JSON.parse(jsonData));
                }

            });

            this.on('activNodeChange', function(nodeActiv, jsonData) {
                var nodeData = renderer.getNodeData(nodeActiv)
                renderer.displayNode(self.dom, self.config, nodeData, jsonData);
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

    qtiCustomInteractionContext.register(ChatBotInteraction);

    return ChatBotInteraction;
});