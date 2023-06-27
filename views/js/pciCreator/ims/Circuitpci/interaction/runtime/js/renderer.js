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
        'CircuitPCI/interaction/runtime/js/assets',
        'CircuitPCI/interaction/runtime/js/core/uiToolbar',
        'CircuitPCI/interaction/runtime/js/core/circuiteditor',
        'CircuitPCI/interaction/runtime/js/core/circuit2Json',
        'css!CircuitPCI/interaction/runtime/css/circuit'
    ],

    function($, asset, uiToolbar, CircuitEditor, circuit2Json) {
        'use strict';

        function renderChoices(id, $container, config, assetManager) {


            var Kanvas = $container.find("canvas").get(0);
            var circuitCanvas = CircuitEditor.add($container, config, Kanvas)
            uiToolbar.add($container, config, assetManager, circuitCanvas);
            $container.find(".CSaver").html('<button>Save Circuit data</button>')

            circuitCanvas.run();
            circuitCanvas.onKeyDown();


            $container.find(".CSaver").on("click", function() {
                var chain = circuitCanvas.saveToString();

                var imageBase64 = Kanvas.toDataURL("image/png");
                $container.find(".etiquette").html(imageBase64)

                /*  if ($container.parent().hasClass("widget-box")) {
                     //Editor Context
                     console.log("Editor Contexte")
                 } else {
                     //Autre Context
                     let json1 = JSON.parse(circuit2Json.convert(config.savedCircuit));
                     console.log(circuit2Json.convert(config.savedCircuit))
                     let json2 = JSON.parse(circuit2Json.convert($container.find(".raw").html()));

                     console.log(json1);
                     console.log(json2);

                     let graph1 = buildGraph(json1);
                     let graph2 = buildGraph(json2);

                     let componentsList1 = buildComponentsList(json1);
                     let componentsList2 = buildComponentsList(json2);


                     let scoreGraph = 0;
                     let scoreElement = 0;
                     let scoreStrict = 0;
                     let scoreTotal = 0;

                     if (areGraphsEqual(graph1, graph2)) {
                         scoreGraph = 1;
                     }
                     if (areComponentsListsEqual(componentsList1, componentsList2)) {
                         scoreElement = 1;
                     }

                     scoreStrict = areJsonEqual(json1, json2) ? 1 : 0;

                     scoreTotal = scoreGraph + scoreElement + scoreStrict;

                     console.log("scoreGraph:", scoreGraph);
                     console.log("scoreElement:", scoreElement);
                     console.log("scoreStrict:", scoreStrict);
                     console.log("ScoreTotal:", scoreTotal);
                 } */
                return chain;
            })

            $container.find(".CClear").on("click", function() {
                // Appel de la fonction de confirmation
                recommencerTravail();
                $container.find("canvas").show();
                $container.find(".help").hide();
            })



            // Fonction pour recommencer le travail depuis le début
            function recommencerTravail() {
                // Affiche une fenêtre de confirmation
                var confirmation = confirm("Êtes-vous sûr de vouloir tout effacer ?");
                // Vérifie si l'utilisateur a cliqué sur le bouton "OK"
                if (confirmation) {
                    // Réinitialise le travail ici
                    console.log("Travail réinitialisé !");
                    renderChoices(id, $container, config, assetManager)
                    $container.find(".raw").empty()
                } else {
                    // L'utilisateur a cliqué sur le bouton "Annuler" ou a fermé la fenêtre de confirmation
                    console.log("Opération annulée !");
                }
            }



            /*  function areJsonEqual(json1, json2) {
                 return JSON.stringify(json1) === JSON.stringify(json2);
             }


             function buildGraph(json) {
                 let graph = {};
                 json.forEach(component => {
                     if (!graph[component.Connecteur1]) {
                         graph[component.Connecteur1] = [];
                     }
                     if (!graph[component.Connecteur2]) {
                         graph[component.Connecteur2] = [];
                     }
                     graph[component.Connecteur1].push(component.Connecteur2);
                     graph[component.Connecteur2].push(component.Connecteur1);
                 });
                 return graph;
             }

             function areGraphsEqual(graph1, graph2) {
                 for (let node in graph1) {
                     if (!graph2[node]) {
                         return false;
                     }
                     let neighbors1 = new Set(graph1[node]);
                     let neighbors2 = new Set(graph2[node]);
                     if (neighbors1.size !== neighbors2.size) {
                         return false;
                     }
                     for (let neighbor of neighbors1) {
                         if (!neighbors2.has(neighbor)) {
                             return false;
                         }
                     }
                 }
                 return true;
             }

             function buildComponentsList(json) {
                 let componentsList = json.map(component => {
                     return component.Composant + '-' + component.Valeur;
                 });
                 return componentsList.sort();
             }

             function areComponentsListsEqual(list1, list2) {
                 if (list1.length !== list2.length) {
                     return false;
                 }
                 for (let i = 0; i < list1.length; i++) {
                     if (list1[i] !== list2[i]) {
                         return false;
                     }
                 }
                 return true;
             } */

            //circuitCanvas.refreshUI = refreshUI();
            /* $(document).keydown(function(e) {
                if (e.keyCode == 46) {
                    circuitCanvas.removeComponentsForEditing();
                }
            }); */




        }

        return {
            render: function(id, container, config, assetManager) {
                var $container = $(container);
                renderChoices(id, $container, config, assetManager);
                //render rich text content in prompt
            }
        };
    });