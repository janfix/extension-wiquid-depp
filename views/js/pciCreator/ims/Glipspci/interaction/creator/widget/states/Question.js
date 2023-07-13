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
 * Copyright (c) 2016 (original work) Open Assessment Technologies SA;
 *
 */
define([
    'taoQtiItem/qtiCreator/widgets/states/factory',
    'taoQtiItem/qtiCreator/widgets/interactions/states/Question',
    'taoQtiItem/qtiCreator/widgets/helpers/formElement',
    'tpl!GlipsPCI/interaction/creator/tpl/propertiesForm',
    'lodash',
    'GlipsPCI/interaction/runtime/js/dataImport',
    'taoQtiItem/portableLib/jquery_2_1_1'
], function(stateFactory, Question, formElement, formTpl, _, dataImport, $) {
    'use strict';

    var GlipsInteractionStateQuestion = stateFactory.extend(Question, function() {}, function() {
        console.log("preload")
    });

    GlipsInteractionStateQuestion.prototype.initForm = function() {

        var _widget = this.widget,
            $form = _widget.$form,
            interaction = _widget.element,
            response = interaction.getResponseDeclaration();

        //render the form using the form template
        $form.html(formTpl({
            serial: response.serial,
            info: infoDisplayer()
        }));

        //init form javascript
        formElement.initWidget($form);

        var objData = {};
        dataImport.forEach(element => {
            let nodeId = Object.keys(element)[0]; // On récupère le nodeId
            objData[nodeId] = element[nodeId]; // On crée une nouvelle entrée dans objData
        });


        infoDisplayer()

        function infoDisplayer() {

            $form.find("#ChatMeta").show();
            $form.find("#chat_Pname").html("GLIPS");
            $form.find("#chat_auteur").html("DEPP");
            $form.find("#chat_version").html("1.0.0");
            $form.find("#chat_date").html("21/06/2023");
            $form.find("#chat_tags").html("creation littéraire, collaboration");
            $form.find("#chat_descript").html("Réussir à produire des textes sur la base d'une démarche collaborative");
            $form.find("#chat_noeuds").html(dataImport.length);
            $form.find("#chat_catego").html(getAllCat(objData));

            for (const key in objData) {
                //console.log(key, objData[key]);
                //console.log(objData[key].nodetype);
                if (!objData[key].nodetype.includes("ans")) {
                    $("#allnodes").append("<option data-nodeID='" + objData[key].nodeId + "'>" + objData[key].nodeId + "</option>")
                }

            }



        }

        function getAllCat(dataImport) {
            var allCat = [];
            var ListBox = "";

            for (const key in dataImport) {
                //console.log(key, dataImport[key]);
                if (allCat.indexOf(dataImport[key].semantic) == -1) {
                    allCat.push(dataImport[key].semantic);
                    if (typeof dataImport[key].semantic !== "undefined") {
                        ListBox = "<option>" + dataImport[key].semantic + "</option>" + ListBox;
                    }
                }
            }

            ListBox = "<select>" + ListBox + "</select>"


            return ListBox;
        }

        $form.find("#home").on("click", function(event) {
            console.log("PRESSED")
            interaction.triggerPci('backHomeChange', [objData, dataImport]);
        })


        $form.find("#allnodes").on("change", function(event) {
            var nodeActif = $(this).val()
            var Tdata = objData
            if (typeof Tdata == "object") {
                interaction.triggerPci('activNodeChange', [nodeActif, Tdata, dataImport]);
            } else {
                Tdata = JSON.parse(Tdata);
                interaction.triggerPci('activNodeChange', [nodeActif, Tdata, dataImport]);
            }

        });

        //init data change callbacks
        /*  formElement.setChangeCallbacks($form, interaction, {
            level: function(interaction, value) {

                //update the pci property value:
                interaction.prop('level', value);

                //trigger change event:
                interaction.triggerPci('levelchange', [parseInt(value)]);
            }
        });
 */
    };

    return GlipsInteractionStateQuestion;
});