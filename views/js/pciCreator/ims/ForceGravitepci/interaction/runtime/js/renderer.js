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
define(['taoQtiItem/portableLib/jquery_2_1_1', 
        'forcegravitePCI/interaction/runtime/js/assets',
        'css!forcegravitePCI/interaction/runtime/css/forcegravite'
    ], function($, assets) {
    'use strict';

    function renderChoices(id, $container, config) {

/*         var meteorloc;
        var objdrag;
        var decalleur = 0;
        var poidsDroite = 0; */
        var astro = "start";
        var answbal = "not-use";
        var answdyna = "not-use";

        var getpathmeteor2 = $('<img>', { src: assets.meteor });
        var $labo = $container.find(".labo");
        var svgstring = fillsvg();
        $labo.prepend(svgstring);

        var $gravterre = $container.find(".grav-terre");
        var $gravmars = $container.find(".grav-mars");
        var $gravlune = $container.find(".grav-lune");
        var $poids40kg = $container.find(".poids40kg");
        var $path4268 = $container.find(".path4268");
        var $path42687 = $container.find(".path4268-7");
        var $path4292 = $container.find(".path4292");
        var $textmass = $container.find(".txtmass");
        var $meteor = $container.find(".meteor");
        var $bgsvg = $container.find(".bgsvg");
        var $etqterre = $container.find(".etq_terre");
        var $etqlune = $container.find(".etq_lune");
        var $etqmars = $container.find(".etq_mars");
        var $zerograv = $container.find(".zero-grav");

        // Tab System
        $labo.css("background-color", "black");
        $gravterre.hide();
        $gravmars.hide();
        $gravlune.hide();

        $container.find(".ong_lune").click(function (event) {

            $poids40kg.hide();
            $textmass.hide();
            astro = "lune";

            $meteor.remove();
            $container.find(".balGauche").remove();
            $container.find(".dynamo").remove();
            $container.find(".socle").remove();
            $labo.append("<div name='socle' class='dropper socle'></div>");
            $labo.append("<div name='dynamo' class='dropper dynamo'></div>");
            $labo.append("<div name='balGauche' class='dropper balGauche'><span class='txtmass'> </span></div>");
            $container.find(".socle").append("<div class='draggable meteor'></div>");

            draganddroper();
            $zerograv.show();
            $gravlune.hide();
            $gravmars.hide();
            $gravterre.hide();
            $path4268.css("display", "none");
            $path42687.css("display", "none");
            $path4292.show();
            $bgsvg.css("fill", "#7b7b7b");
            $etqterre.hide();
            $etqlune.show();
            $etqmars.hide();
        });

        $container.find(".ong_mars").click(function (event) {
            $poids40kg.hide();
            $textmass.hide();
            astro = "mars";
            $meteor.remove();

           // $meteor.remove();
            $container.find(".balGauche").remove();
            $container.find(".dynamo").remove();
            $container.find(".socle").remove();
            $labo.append("<div name='socle' class='dropper socle'></div>");
            $labo.append("<div name='dynamo' class='dropper dynamo'></div>");
            $labo.append("<div name='balGauche' class='dropper balGauche'><span class='txtmass'> </span></div>");
            $container.find(".socle").append("<div class='draggable meteor'></div>");

            draganddroper();

            $zerograv.show();
            $gravlune.hide();
            $gravmars.hide();
            $gravterre.hide();
            $path4268.css("display", "none");
            $path42687.show();
            $path4292.hide();
            $bgsvg.css("fill", "#854e37");
            $etqterre.hide();
            $etqlune.hide();
            $etqmars.show();
        });

        $container.find(".ong_terre").click(function (event) {
            $poids40kg.hide();
            $textmass.hide();
            astro = "terre";
            $meteor.remove();
            $container.find(".balGauche").remove();
            $container.find(".dynamo").remove();
            $container.find(".socle").remove();
            $labo.append("<div name='socle' class='dropper socle'></div>");
            $labo.append("<div name='dynamo' class='dropper dynamo'></div>");
            $labo.append("<div name='balGauche' class='dropper balGauche'><span class='txtmass'> </span></div>");
            $container.find(".socle").append("<div class='draggable meteor'></div>");

            draganddroper();

            $zerograv.show();
            $gravlune.hide();
            $gravmars.hide();
            $gravterre.hide();

            $etqterre.show();
            $path4268.show();
            $path42687.hide();
            $path4292.hide();
            $bgsvg.css("fill", "#3465a0");
            $etqterre.show();
            $etqlune.hide();
            $etqmars.hide();
        });


        //$container.find(".ong_mars").trigger("click");
        //$container.find(".ong_terre").trigger("click")

        // *********Drag & Drop **************

        draganddroper();

        function draganddroper() {

            var dragImg = new Image();
            dragImg.src = $(getpathmeteor2).attr("src");
            var dndHandler = {

                draggedElement: null,

                applyDragEvents: function applyDragEvents(element) {

                    element.draggable = true;

                    var dndHandler = this;

                    element.addEventListener('dragstart', function (e) {
                        dndHandler.draggedElement = e.target;
                        e.dataTransfer.setData('text/plain', ''); //  Firefox
                        e.dataTransfer.setDragImage(dragImg, 40, 40);


                    }, false);

                },

                applyDropEvents: function applyDropEvents(dropper) {


                    dropper.addEventListener('dragover', function (e) {
                        e.preventDefault();

                        $container.find(this).addClass('drop_hover');
                    }, false);

                    dropper.addEventListener('dragleave', function () {
                        $container.find(this).removeClass('drop_hover');


                    });

                    var dndHandler = this;

                    dropper.addEventListener('drop', function (e) {

                        var target = e.target,
                            draggedElement = dndHandler.draggedElement,
                            clonedElement = draggedElement.cloneNode(true);

                        // Target identification by name
                        var cible = String($container.find(target).attr("name"));

                        if (cible == "balGauche") {
                                if(astro == "terre" || astro == "start"){
                                    $container.find(".Terre_balanceAsw").html('true');                               
                                }
                                if (astro == "lune") {
                                    $container.find(".Lune_balanceAsw").html('true');
                                }
                                if (astro == "mars") {
                                    $container.find(".Mars_balanceAsw").html('true');
                                }
                                
                            $container.find(".dynamo").css("top", "0px");
                            $poids40kg.show();
                            $container.find(".txtmass").show();
                            $zerograv.show();
                            $gravlune.hide();
                            $gravmars.hide();
                            $gravterre.hide();

                            if(astro == "start"){
                                $(this).css("margin-top","-207px")
                            }
                        }
                        if (cible == "dynamo") {
                            if (astro == "terre" || astro == "start") {
                                $container.find(".Terre_dynamoAsw").html('true');
                            }
                            if (astro == "lune") {
                                $container.find(".Lune_dynamoAsw").html('true');
                            }
                            if (astro == "mars") {
                                $container.find(".Mars_dynamoAsw").html('true');
                            }
                            $poids40kg.hide();
                            $container.find(".txtmass").hide();

                            if (astro == "start") {
                                $zerograv.hide();
                                $gravlune.hide();
                                $gravmars.hide();
                                $gravterre.show();
                                $container.find(this).css("top", "100px");


                            }
                            
                            if (astro == "terre") {
                                $zerograv.hide();
                                $gravlune.hide();
                                $gravmars.hide();
                                $gravterre.show();
                                $container.find(this).css("top", "155px");
                                
                            }
                            if (astro == "lune") {
                                $zerograv.hide();
                                $gravlune.show();
                                $gravmars.hide();
                                $gravterre.hide();
                                $container.find(this).css("top", "60px");
                            }
                            if (astro == "mars") {
                                $zerograv.hide();
                                $gravlune.hide();
                                $gravmars.show();
                                $gravterre.hide();
                                $container.find(this).css("top", "85px");
                            }
                        }
                        if (cible == "socle") {
                            $container.find(".dynamo").css("top", "0px");
                            $poids40kg.hide();
                            $container.find(".txtmass").hide();
                            $zerograv.show();
                            $gravlune.hide();
                            $gravmars.hide();
                            $gravterre.hide();

                        }


                        while (target.className.indexOf('dropper') == -1) {
                            target = target.parentNode;
                        }
                        $container.find(target).removeClass('drop_hover');


                        clonedElement = target.appendChild(clonedElement);
                        dndHandler.applyDragEvents(clonedElement);

                        draggedElement.parentNode.removeChild(draggedElement);

                    });

                }

            };


            var elements = $container.find('.draggable'),
                elementsLen = elements.length;

            for (var i = 0; i < elementsLen; i++) {
                dndHandler.applyDragEvents(elements[i]);
            }

            var droppers = $container.find('.dropper'),
                droppersLen = droppers.length;

            var basestation = $container.find('.base'),
                basestationlen = basestation.length;

            for (var i = 0; i < droppersLen; i++) {
                dndHandler.applyDropEvents(droppers[i]);
            }
        }

        // Get the SVG background    
        function fillsvg() {
            
            svgstring = assets.background;

            return svgstring;
        }
        
    }

   

    return {
        render: function(id, container, config, assetManager) {

            var $container = $(container);

            renderChoices(id, $container, config);
            
        }
    };
});