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
    'tpl!SnapPCI/interaction/creator/tpl/propertiesForm',
    'lodash',
    'taoQtiItem/portableLib/jquery_2_1_1', 
    'SnapPCI/interaction/runtime/js/lib/snapsrc',
    'css!SnapPCI/interaction/runtime/css/Snap'
    
], function(stateFactory, Question, formElement, simpleEditor, formTpl, _, $, snapsrc) {
    'use strict';

    var SnapInteractionStateQuestion = stateFactory.extend(Question, function() {
    }, function() {});

    SnapInteractionStateQuestion.prototype.initForm = function() {

        var _widget = this.widget,
            $form = _widget.$form,
            $container = this.widget.$container,
            interaction = _widget.element,
            response = interaction.getResponseDeclaration(),
            panelsizer, testLimiter, scriptImporter,
            psize = interaction.prop('panelSizer'),
            plimit = interaction.prop('testLimiter'),
            config = interaction.properties;

       
       //Install app in Editor

       $container.find(".snapy").append('<canvas class="world" tabindex="1" ><p>Your browser doesn\'t support canvas.</p></canvas>');

        snapsrc.snap(id, $container, config);
      
        $container.find(".world").css('position', 'relative');  

       //End
       
        
       
       
       
            //render the form using the form template
       $form.html(formTpl({
            serial : response.serial,
            identifier : interaction.attr('responseIdentifier')
        }));
       
        $container.find(".snapyOverlay").addClass("displayOverlay");

        //init form javascript
        formElement.initWidget($form); 
        
         $form.find(".panelSizer").val(psize).change();
         $form.find(".testLimiter").val(plimit).change();

         $form.find(".scriptImporter").on("click", function() {
           var value;
           interaction.triggerPci('scriptImporterChange', [value]);
        });

         interaction.onPci('scriptSaverChange', function(value){ 
            interaction.prop('snapScript', value);            
         });

         console.log(interaction.prop('XMLData'))
         console.log(interaction.prop('HTMLReport')) 
         console.log(interaction.prop('snapshot'))
        
        if(interaction.prop('XMLData')){
             $form.find( "#dataXML" ).prop( "checked", true );
        } else{ $form.find( "#dataXML" ).prop( "checked", false );}  

        
        if(interaction.prop('HTMLReport')){
             $form.find( "#dataHTML" ).prop( "checked", true );
        } else{ $form.find( "#dataHTML" ).prop( "checked", false );} 

        
        if(interaction.prop('snapshot')){
             $form.find( "#SnapShot" ).prop( "checked", true );
        } else{ $form.find( "#SnapShot" ).prop( "checked", false );}

         //********************Save Snap State***************************/
        $form.find(".saveSnapState").on("click", function () {
            var value;
            interaction.triggerPci('saveSnapStateChange', [value]);
        });

        //*********************Activate Report in Data***************** */

       $form.find("#dataXML").on("click", function () {
            var value = $(this).prop("checked");
            interaction.prop('XMLData', value)     
        });

        $form.find("#dataHTML").on("click", function () {
            var value = $(this).prop("checked");
            interaction.prop('HTMLReport',value)
        });

        $form.find("#SnapShot").on("click", function () {
           var value = $(this).prop("checked");
           interaction.prop('snapshot',value)
        });

        $form.find(".panelSizer").on("change", function(event){
            $form.find(".saveSnapState").trigger("click");
            var value = $(this).val();
            interaction.triggerPci('panelSizerChange', [value]);
        })

         $form.find(".testLimiter").on("change", function(event){
            $form.find(".saveSnapState").trigger("click");
            var value = $(this).val();
            interaction.triggerPci('testLimiterChange', [value]);
        })


        //init data change callbacks
        formElement.setChangeCallbacks($form,interaction, {
            panelSizer : function panelSizer(interaction, value){
            interaction.prop('panelSizer', value);           
            },

            testLimiter : function testLimiter(interaction, value){
            interaction.prop('testLimiter', value);
            },

            identifier : function(i, value){
            response.id(value);
            interaction.attr('responseIdentifier', value);
                  
            }
        });

    };

    return SnapInteractionStateQuestion;
});