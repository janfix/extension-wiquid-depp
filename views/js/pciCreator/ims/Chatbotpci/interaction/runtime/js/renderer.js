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
        'ChatBotPCI/interaction/runtime/js/lib/jquery-ui',
        'ChatBotPCI/interaction/runtime/js/assets',
        'ChatBotPCI/interaction/runtime/js/demojson',
        'css!ChatBotPCI/interaction/runtime/css/chatBot'
    ],
    function($, assets, demojson) {
        'use strict';

        var dataImport;
        var dataArray;
        var stay = 2000; // delay Bot dialog default value
        var chatBoxOn = false; // Controle ChatBox opener 
        var resumeLib = []; //for resume
        var timeSystem, timeActor, timeIntro, timeDesti, timeTimer, timeEnvoy, timeDisplay; // To controle  setTimeOut for suppression
        var allTimeOut = [];
        var respons = [];
        var sematicatego = [];
        var lastNodeTracer;
        var firstName = '';
        var nodeVisible = true;

        // Pour annuler tous les setTimeout actifs, parcours du tableau et lancement de clearTimeout
        function stopAllTimeouts() {
            //console.log("STOPPING TIMESOUT!")
            for (var i = 0; i < allTimeOut.length; i++) {
                clearTimeout(allTimeOut[i]);
            }
        }

        function ResetAll() {
            dataImport = [];
            dataArray = [];
            stay = 2000; // delay Bot dialog default value
            chatBoxOn = false; // Controle ChatBox opener 
            resumeLib = []; //for resume
            timeSystem, timeActor, timeIntro, timeDesti, timeTimer, timeEnvoy, timeDisplay; // To controle  setTimeOut for suppression
            allTimeOut = [];
            respons = [];
            sematicatego = [];
            lastNodeTracer;
            firstName = '';
            // Appel de la fonction stopAllTimeouts pour arrêter tous les setTimeout
            stopAllTimeouts();
        }




        function JsonLoader(jsonChat) {
            dataImport = jsonChat;
            dataArray = jsonChat;


            return dataArray
        }

        function getResume(nodeData, $container) {
            var resu = nodeData.resume;
            var title = nodeData.title;
            console.log(resu)
            console.log(title)
                // if (resumeLib.indexOf(title) === -1) { // Neutralize doubles.
            resumeLib.push(title)
            if ($container.parent().hasClass("widget-box")) {
                $container.find(".accordionBox").empty();
            }
            $container.find('.accordionBox').append('<div class="btAccordion">' + insertFname(title) + '</div><div class="AccordionContent">' + insertFname(resu) + '</div>');
            //}

        }

        /* function addToArray(array, value) {
            if (array.indexOf(value) === -1) {
                array.push(value);
            }
        } */

        function getActors() {
            var actors = [];
            for (var i = 0; i < dataArray.length; i++) {
                if (dataArray[i].type == 'bot' && !(dataArray[i].actor == 'System')) {
                    if (!(actors.includes(dataArray[i].actor))) { actors.push(dataArray[i].actor); }
                }
            }
            return actors;
        }

        function getJsonData(node) {
            var nodeData;
            for (var i = 0; i < dataImport.length; i++) {
                if (dataImport[i].id) {
                    if (dataImport[i].id == node) {
                        nodeData = dataImport[i];
                    }
                }
            }
            return nodeData;
        }


        function intro($container, config) {
            if (config.chatGen.length < 1) {
                //$container.find(".globWrapper").html("Importer votre projet pour commencer")
                dataImport = JsonLoader(demojson);
                ChatRunner()
            } else {
                dataImport = JsonLoader(JSON.parse(config.chatGen));
                ChatRunner()
            }

            function ChatRunner() {
                //console.log(dataImport)
                var nodeData = getJsonData('root');
                nodeVisible = true;
                //console.log(nodeData)
                // Prepare intro : 
                var AButton = nodeData.callButton;
                var AbuttonLabel = nodeData.callButtonLabel;
                var ATimer = nodeData.timer;
                var Adelay = nodeData.delay;
                var Adesti = nodeData.desti[0];
                var Atitle = nodeData.title;
                var AContent = nodeData.html;
                var Acss = nodeData.css;
                var AJs = nodeData.js;
                var AnodeId = nodeData.id;

                //call js addition function

                $container.find('.globWrapper').html(
                    '<div class="SQContainer"><div class="SQTitre">' + Atitle + '</div><div class="SQContent">' + AContent + '</div><button class="desti">' + AbuttonLabel + '</button></div>');
                if (AButton === false) { $container.find(".desti").hide(); } // Destination button must disappear if no label
                else {
                    $container.find('.desti').click(function(event) {
                        firstName = setFname($container);
                        nodeData = getJsonData(Adesti)
                        displayer(Adesti, $container, nodeData);
                    });
                }

                if (ATimer === true) {
                    timeDesti = setTimeout(function() {
                        firstName = setFname($container);
                        nodeData = getJsonData(Adesti)
                        displayer(Adesti, $container, nodeData);
                    }, Adelay);

                    allTimeOut.push(timeDesti)
                }
                getResume(nodeData, $container);
            }

        }

        function fixAdelay(Adelay) {
            if (Adelay.length == 0) { Adelay = 0 } else { Adelay = parseInt(Adelay) }
            return Adelay
        }

        function displayer(node, $container, nodeData) {
            //console.log(node)
            //console.log(nodeData)
            //Node Type identification : 

            if (typeof nodeData == "undefined") {
                nodeData = getJsonData("root")
            }
            if ($container.parent().hasClass("widget-box")) {
                if (nodeVisible) { $container.find(".nodeCode").show(); }

            }


            $container.find('.idCode').html(nodeData.id)
            var type = nodeData.type;
            //console.log(type)
            var AButton, AbuttonLabel, ATimer, Adelay, Adesti, Atitle, AContent, Acss, AJs, AActor, AsubType, AnodeId;
            var fanSetOn = false;
            var leftBox = $container.find('.fridge .leftBox');
            var Gwrapp = $container.find('.globWrapper'); //

            // Displayer choices : ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if (type == 'SQTxt') {
                chatBoxOn = false;
                AButton = nodeData.callButton;
                AbuttonLabel = nodeData.callButtonLabel;
                ATimer = nodeData.timer;
                Adelay = fixAdelay(nodeData.delay);
                Adesti = nodeData.desti[0];
                Atitle = nodeData.title;
                AContent = nodeData.html;
                Acss = nodeData.css;
                AJs = nodeData.js;
                AsubType = nodeData.subType;
                AnodeId = nodeData.id;

                //appel de la fonction js additionnel


                $container.find('.globWrapper').html(
                    '<div class="SQContainer"><div class="SQTitre">' + insertFname(Atitle) + '</div><div class="SQContent">' + insertFname(AContent) + '</div><div class="btDiv"><button class="desti">' + AbuttonLabel + '</button></div></div>');

                if (AButton === false) { $container.find(".desti").hide(); } //  Desti button dispear if empty

                //console.log(AsubType)


                if (AsubType == 'Transition') { $container.find('.SQContainer').css({ 'float': 'left', 'width': '450px', 'border': '1px grey solid' }); }
                $('.desti').click(function(event) {
                    firstName = setFname($container);
                    clearTimeout(timeTimer);
                    if (AsubType == 'Conclusion' || AsubType == 'Introduction') { $container.find('.SQContainer').remove(); }
                    $container.find(this).hide();
                    nodeData = getJsonData(Adesti)
                    displayer(Adesti, $container, nodeData); //OK
                });

                if (ATimer === true) {
                    timeTimer = setTimeout(function() {
                        if (AsubType == 'Conclusion' || AsubType == 'Introduction') { $container.find('.SQContainer').remove(); }
                        $container.find(this).hide();
                        firstName = setFname($container);
                        nodeData = getJsonData(Adesti)
                        displayer(Adesti, $container, nodeData); //OK 
                    }, Adelay);

                    allTimeOut.push(timeTimer)
                }

                //Résumé ! 
                if (AsubType == 'Introduction' || AsubType == 'Transition') {
                    getResume(nodeData, $container);
                }
            }

            if (AsubType == "Conclusion") { // replacec button for preview mode
                $container.find(".lastNode").html(AnodeId);
                preparRespons($container);
                $container.find('.SQContainer button').hide();
                stopAllTimeouts();
            }

            if (type == 'bot') {
                AActor = nodeData.actor;
                Adelay = fixAdelay(nodeData.delay);
                Adesti = nodeData.desti[0];
                AContent = nodeData.html;
                AJs = nodeData.js;
                AnodeId = nodeData.id; // PCI Specific

                //BOT Call additional JS function


                $container.find('.desti').hide();
                $container.find('.SQContainer').remove();

                // Is chatBOx open ?
                if (chatBoxOn) {
                    //Bot dialog injection
                    //Bot Dialog
                    timeTimer = setTimeout(function() {
                        console.log(Adelay)
                        renderBotRepliq(Gwrapp, AActor, AContent, Adelay, Adesti, $container);
                    }, 2000); //2000
                    allTimeOut.push(timeTimer)
                } else {
                    chatBoxOn = true; // ChatBox is now open
                    // Install actor list
                    var actors = getActors();
                    var actorList = "";
                    for (var i = 0; i < actors.length; i++) {
                        if (actors[i] !== "Vous" && actors[i] !== "vous") { actorList = actorList + ", " + actors[i]; }
                    }
                    //actorList = actorList.slice(0, -2);
                    actorList = 'Vous' + actorList;
                    var labelActorList = "<b>Participants</b> : " + actorList
                    leftBox.find('.actorList').html(labelActorList);
                    //Display leftBox  
                    var chatDiva = leftBox.find('.chatBox').html();
                    $container.find('.globWrapper').prepend(
                        '<div class="leftBoxClone"><div class="accordionclone"></div><div class="chatDiv"></div><div class="repDiv"></div></div>');
                    var accordionBox = $container.find('.accordionBox').html();
                    $container.find('.accordionclone').prepend(accordionBox);
                    renderHisto($container);
                    $container.find('.globWrapper .chatDiv').html(chatDiva);


                    //Bot Dialog
                    timeTimer = setTimeout(function() {
                        renderBotRepliq(Gwrapp, AActor, AContent, Adelay, Adesti, $container);
                        //console.log(Adelay)
                    }, 1000 + Adelay); //3000
                    allTimeOut.push(timeTimer)
                }
            }

            if (type == 'Fanset') {

                Adesti = nodeData.desti;
                AContent = nodeData.html;
                //Answers
                // Install answerSet element
                var answBox = leftBox.find('.ansGroup').html();
                //console.log(answBox)
                if ($container.find('.globWrapper .leftBoxClone .repDiv').length > 0) {
                    $container.find('.globWrapper .leftBoxClone .repDiv').html(answBox);
                } else {
                    $container.find('.globWrapper .leftBoxClone .repDiv').append(answBox);

                }

                for (var i = 0; i < Adesti.length; i++) {
                    var propos = getPropContent(Adesti[i]);
                    var destina = getPropDesti(Adesti[i]);
                    $container.find('.globWrapper .leftBoxClone .repDiv .propositions').find('.prop' + (i + 1)).html(propos);
                    if (Adesti.length == 2) {
                        $container.find('.prop3').hide();
                        $container.find('.prop4').hide();
                    }
                    if (Adesti.length == 3) { $container.find('.prop4').hide(); }

                    $container.find('.globWrapper .leftBoxClone .repDiv .propositions').find('.prop' + (i + 1)).attr('data', destina);
                }

                // Install answerSet command
                renderDialogChoices($container.find('.leftBoxClone'), Adesti, nodeData, $container);
            }

            if (type == 'IDoc') {
                $container.find(".SQContainer").remove();
                AButton = nodeData.callButton;
                AbuttonLabel = nodeData.callButtonLabel;
                ATimer = nodeData.timer;
                Adelay = fixAdelay(nodeData.delay);
                Adesti = nodeData.desti[0];
                Atitle = nodeData.title;
                AContent = nodeData.html;
                Acss = nodeData.css;
                AJs = nodeData.js;
                AnodeId = nodeData.id;

                //call additionnal js function - PCI specific.

                var IDocContainer = $container.find('.globWrapper').find('.IDocWrapper');
                if (IDocContainer.length == 0) {
                    $container.find('.globWrapper').append(
                        '<div class="IDocWrapper"><span class="SQTitre">' +
                        insertFname(Atitle) + '</span><div class="IDocContent">' + insertFname(AContent) + '</div>');
                    $container.find('.IDocWrapper').append('</div><div class="btDiv"><button class="desti">' + AbuttonLabel + '</button></div>');
                    $container.find(".desti").click(function(event) {
                        nodeData = getJsonData(Adesti)
                        displayer(Adesti, $container, nodeData); //OK
                    });
                } else {

                    $container.find('.IDocWrapper').html('<span class="SQTitre">' + insertFname(Atitle) + '</span>' + insertFname(AContent) + '<div class="btDiv"><button class="desti">' + AbuttonLabel + '</button></div>');
                    $container.find('.desti').click(function(event) {
                        nodeData = getJsonData(Adesti)
                        displayer(Adesti, $container, nodeData); //OK
                    });
                }

                if (AbuttonLabel == '') { $container.find('.desti').hide(); }

                if (ATimer === true) {
                    timeTimer = setTimeout(function() {
                        nodeData = getJsonData(Adesti)
                        displayer(Adesti, $container, nodeData); //OK 
                    }, Adelay);
                    allTimeOut.push(timeTimer)
                }

            }

        }

        function getPropContent(nodeProp) {
            var nodeData = getJsonData(nodeProp);
            var proposition = nodeData.answerContent;
            return proposition;
        }

        function getPropDesti(nodeProp) {
            //console.log(nodeProp)
            var nodeData = getJsonData(nodeProp);
            var desti = nodeData.desti;
            return desti;
        }

        function renderBotRepliq(lBox, actor, repliq, delay, desti, $container) {
            var messageStyle;
            if (!delay) { delay = 0; }
            var dipiu = fixAdelay(delay) + stay; // Variable d'ajustement du temps pour les non Bots !
            if (actor == 'System') {
                messageStyle = 'dialogLi system arriving';
                timeSystem = setTimeout(function() {
                    lBox.find('.dialogUl').append('<li class="' + messageStyle + '">' + insertFname(repliq) + '</li>');
                    if ($container.find('.chatRoom')) { $container.find('.chatRoom').scrollTop($container.find('.chatRoom')[0].scrollHeight); }
                }, 10);
                allTimeOut.push(timeSystem)
                lBox.find('.dialogLi').removeClass('arriving');
                timeDesti = setTimeout(function() {
                    var nodeData = getJsonData(desti)
                    displayer(desti, $container, nodeData); //OK
                    if ($container.find('.chatRoom')) { $container.find('.chatRoom').scrollTop($container.find('.chatRoom')[0].scrollHeight); }
                }, stay + dipiu);
                allTimeOut.push(timeDesti)
            } else {
                messageStyle = 'dialogLi arriving';

                lBox.find('.dialogUl').append('<li class="' + messageStyle + '"><span class="actorlabel">' + actor + '</span> : ' + insertFname(repliq) + '</li>');
                if ($container.find('.chatRoom')) { $container.find('.chatRoom').scrollTop($container.find('.chatRoom')[0].scrollHeight); }
                timeActor = setTimeout(function() { lBox.find('.dialogLi').removeClass('arriving'); }, 10);
                allTimeOut.push(timeActor)
                timeDesti = setTimeout(function() {
                    var nodeData = getJsonData(desti)
                    displayer(desti, $container, nodeData); //OK
                    if ($container.find('.chatRoom')) { $container.find('.chatRoom').scrollTop($container.find('.chatRoom')[0].scrollHeight); }
                }, stay + dipiu);
                allTimeOut.push(timeDesti)
            }
        }

        function renderDialogChoices(lbox, setAnsw, node, $container) {

            $container.find(".proposiAfter").removeClass('proposiAfter').addClass('proposi'); //Cleaning Restart

            lbox.find('.prop1').click(function(event) {
                lbox.find('.selected').removeClass('selected').addClass('proposi');
                $container.find(this).addClass('selected').removeClass('proposi');
            });
            lbox.find('.prop2').click(function(event) {
                lbox.find('.selected').removeClass('selected').addClass('proposi');
                $container.find(this).addClass('selected').removeClass('proposi');
            });
            lbox.find('.prop3').click(function(event) {
                lbox.find('.selected').removeClass('selected').addClass('proposi');
                $container.find(this).addClass('selected').removeClass('proposi');
            });
            lbox.find('.prop4').click(function(event) {
                lbox.find('.selected').removeClass('selected').addClass('proposi');
                $container.find(this).addClass('selected').removeClass('proposi');
            });

            lbox.find('.envoy').click(function(event) {
                if ($container.find('.selected').attr('data')) {
                    var ansNumber = String($container.find('.selected').attr("class"));
                    ansNumber = String(ansNumber.match(/\d/g));
                    ansNumber = ansNumber - 1;
                    respons.push(setAnsw[ansNumber]); //Stock response node.
                    sematicatego.push(getSemanticCat(setAnsw[ansNumber]))
                    console.log(sematicatego)
                    $container.find(".respCatSem").html(sematicatego.toString())
                    timeEnvoy = setTimeout(function() {
                        lbox.find('.dialogUl').append('<li class="dialogLi arriving"><span class="actor">Moi :</span>' + lbox.find('.selected').html() + '</li>');
                        if ($container.find('.chatRoom')) { $container.find('.chatRoom').scrollTop($container.find('.chatRoom')[0].scrollHeight); }
                    }, 500);
                    allTimeOut.push(timeEnvoy)
                    var desti = $container.find('.selected').attr('data')
                    var nodeData = getJsonData(desti)
                    timeDisplay = setTimeout(function() { displayer(desti, $container, nodeData); }, 2500); //OK
                    allTimeOut.push(timeDisplay)
                    $container.find(this).hide();
                    $container.find('.proposi').removeClass('proposi').addClass('proposiAfter');
                    lbox.find('.prop1').unbind('click');
                    lbox.find('.prop2').unbind('click');
                    lbox.find('.prop3').unbind('click');
                    lbox.find('.prop4').unbind('click');

                    preparRespons($container)
                }
            });
        }

        function preparRespons($container) {
            //getSemanticCat($container);
            $container.find(".respNode").html(respons.join(","));
            $container.find(".lastNode").html(lastNodeTracer);
        }


        function getSemanticCat(nodeId) {
            var semanticat;
            for (var i = 0; i < dataArray.length; i++) {
                if (dataArray[i].id == nodeId) {
                    semanticat = dataArray[i].semantic;
                }
            }
            return semanticat
        }

        function renderHisto($container) {
            $container.find('.AccordionContent').slideUp();
            $container.find('.btAccordion').click(function(event) {
                var targetSlider = $container.find(this).next();
                $container.find(targetSlider).slideToggle();
            });
        }

        function installTemplate($container) {
            $container.append("<div class='fridge'><div class='headBar'></div> <div class='leftBox'> <div class='accordionBox'> </div> <div class='chatDiv'> <div class='chatBox'> <div class='participants'><div class='actorList'><b>Participants</b> : Vous </div> </div> <div class='chatRoom'> <ul class='dialogUl'> </ul> </div> </div> </div> <div class='repDiv'> <div class='ansGroup'> Vous : <div class='propositions'> <div class='proposi prop1'>Proposition 1</div> <div class='proposi prop2'>Proposition 2</div> <div class='proposi prop3'>Proposition 3</div> <div class='proposi prop4'>Proposition 4</div> </div> <div class='propSender'> <div class='envoy'>envoyer</div> </div> </div> </div> </div> <div class='IDocWrapper'> Ici le doc interactif. </div> </div> <div class='respNode hiddenRep'></div> <div class='respCatSem hiddenRep'></div> <div class='lastNode hiddenRep'></div>");
            $container.find(".fridge").hide();
            $container.find(".hiddenRep").hide();
            if ($container.parent().hasClass("widget-box")) {
                $container.find(".nodeCode").remove();
                $container.prepend('<div class="nodeCode"><span class="idCode">Root</span><div class="cross">' + assets.cross + '</div></div>')
                $container.find(".nodeCode").draggable();
            }

            $container.find(".cross").on("click", function() {
                $(this).parent().hide();
                nodeVisible = false;
            })
        }

        function insertFname(stringos) {
            var rest = stringos.replace(/_Fname_/g, firstName);
            return rest;
        }

        function setFname($container) {
            var Fnamer;
            if ($container.find("[name='Fname']").length > 0) { Fnamer = $container.find("[name='Fname']").val(); } else { Fnamer = firstName; }
            return Fnamer;
        }






        return {
            render: function(container, config, jsonChat) {
                var $container = $(container);
                installTemplate($container);
                ResetAll()
                intro($container, config, jsonChat);
                //render rich text content in prompt
            },
            stopTime: function() {
                stopAllTimeouts()
            },
            displayNode: function(container, config, nodeData, jsonChat) {
                console.log("LAUNCH DISPLAY NODE !!!!")
                var $container = $(container);
                installTemplate($container);
                ResetAll()
                intro($container, config, jsonChat);
                displayer('joker', $container, nodeData);

            },
            getNodeData: function(nodeActiv) {
                var nodeActif = getJsonData(nodeActiv)
                return nodeActif
            }


        };
    });