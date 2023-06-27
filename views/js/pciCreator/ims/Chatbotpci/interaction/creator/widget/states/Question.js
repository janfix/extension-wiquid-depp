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
    'taoQtiItem/qtiCreator/editor/simpleContentEditableElement',
    'tpl!ChatBotPCI/interaction/creator/tpl/propertiesForm',
    'lodash',
    'taoQtiItem/portableLib/jquery_2_1_1'
], function(stateFactory, Question, formElement, simpleEditor, formTpl, _, $) {
    'use strict';

    var ChatBotInteractionStateQuestion = stateFactory.extend(Question, function() {}, function() {
        console.log("preload")
    });

    ChatBotInteractionStateQuestion.prototype.initForm = function() {

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

        infoDisplayer()

        function infoDisplayer() {
            var PData;
            if (interaction.prop('chatGen').length > 1) {
                if (typeof interaction.prop('chatGen') === "object") {
                    PData = interaction.prop('chatGen')
                } else {
                    PData = JSON.parse(interaction.prop('chatGen'));
                }

                $form.find("#ChatMeta").show();
                $form.find("#chat_Pname").html(PData[0].projectName);
                $form.find("#chat_auteur").html(PData[0].author);
                $form.find("#chat_version").html(PData[0].version);
                $form.find("#chat_date").html(PData[0].creationDate);
                $form.find("#chat_tags").html(PData[0].tags);
                $form.find("#chat_descript").html(PData[0].infos);
                $form.find("#chat_noeuds").html(PData.length);
                $form.find("#chat_catego").html(getAllCat(PData));

                for (let i = 0; i < PData.length; i++) {
                    if (!PData[i].type.includes("ans")) {
                        $("#allnodes").append("<option data-nodeID='" + PData[i].id + "'>" + PData[i].id + "</option>")
                    }

                }

            }
        }


        $form.find(".jsonImport").on("change", function(event) {
            var uploadedFile = event.target.files[0];
            if (uploadedFile) {
                var readFile = new FileReader();
                readFile.onload = function(e) {
                    var contents = e.target.result;
                    interaction.prop('chatGen', contents); //
                    interaction.triggerPci('jsonImporterChange', [contents]);
                    var PData = JSON.parse(contents)
                    $form.find("#ChatMeta").show();
                    $form.find("#chat_Pname").html(PData[0].projectName);
                    $form.find("#chat_auteur").html(PData[0].author);
                    $form.find("#chat_version").html(PData[0].version);
                    $form.find("#chat_date").html(PData[0].creationDate);
                    $form.find("#chat_tags").html(PData[0].tags);
                    $form.find("#chat_descript").html(PData[0].infos);

                    $form.find("#chat_noeuds").html(PData.length);


                    $form.find("#chat_catego").html(getAllCat(PData));

                    for (let i = 0; i < PData.length; i++) {
                        if (!PData[i].type.includes("ans")) {
                            $("#allnodes").append("<option data-nodeID='" + PData[i].id + "'>" + PData[i].id + "</option>")
                        }
                    }



                };
                readFile.readAsText(uploadedFile);



            } else {
                alert("Failed to load file");
            }

        });

        function getAllCat(PData) {
            var allCat = [];
            for (let i = 0; i < PData.length; i++) {
                if (allCat.indexOf(PData[i].semantic) == -1) {
                    allCat.push(PData[i].semantic)
                }
            }
            return allCat.toString().substring(1);
        }

        $form.find("#home").on("click", function(event) {
            var Tdata = interaction.prop('chatGen')
            interaction.triggerPci('backHomeChange', [Tdata]);
        })


        $form.find("#allnodes").on("change", function(event) {
            var nodeActif = $(this).val()
            var Tdata = interaction.prop('chatGen')
            if (typeof Tdata == "object") {
                interaction.triggerPci('activNodeChange', [nodeActif, Tdata]);
            } else {
                Tdata = JSON.parse(Tdata);
                interaction.triggerPci('activNodeChange', [nodeActif, Tdata]);
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
         }); */

    };

    return ChatBotInteractionStateQuestion;
});