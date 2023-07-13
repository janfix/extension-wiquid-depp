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
        'GlipsPCI/interaction/runtime/js/lib/jquery-ui',
        'GlipsPCI/interaction/runtime/js/assets',
        'GlipsPCI/interaction/runtime/js/sounds',
        'GlipsPCI/interaction/runtime/js/dataImport',
        'css!GlipsPCI/interaction/runtime/css/glips'
    ],
    function($, assets, sounds, dataImport) {
        'use strict';

        //console.log("GLIPS V2");
        var stay = 1000; // delay Bot dialog default value
        var chatBoxOn = false; // Controle ChatBox opener 
        var resumeLib = []; //for resume
        var timeSystem, timeActor, timeIntro, timeDesti, timeTimer, timeEnvoy, timeDisplay; // To controle  setTimeOut for suppression
        var allTimeOut = [];
        var respons = [];
        var lastNodeTracer;
        var firstName = '';
        var location, locList = [];
        var triple = []; //3 characters
        var prem; // 1srt character name
        var verbChoice // chosen verb in random list
        var ideaChoice // chosen idea in random list
        var debs = ""; //All starting stories
        var lesfins = ""; //All ending stories
        var characters = ["Une enfant", "Un perroquet", "Une grand-mère", "Une sirène", "Un explorateur", "Un mécanicien", "Une artiste", "Un chat", "Un monstre", "Une voleuse"];
        var allStarts = [];
        var allStartsHTML = [];
        var allEnds = [];
        var allEndsHTML = [];
        var x; // interval
        var IDocAnswers = [];
        var dataArray = [];
        var sematicatego = [];


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



        function getResume(node, $container) {
            for (var i = 0; i < dataImport.length; i++) {
                if (dataImport[i][node]) {
                    if (resumeLib.indexOf(node) === -1) { // Neutralize doubles.
                        addToArray(resumeLib, node);
                        $container.find('.accordionBox').append('<div class="btAccordion">' + insertFname(dataImport[i][node].title) + '</div><div class="AccordionContent">' + insertFname(dataImport[i][node].resume) + '</div>');
                    }
                }
            }
        }

        function addToArray(array, value) {
            if (array.indexOf(value) === -1) {
                array.push(value);
            }
        }

        function getAllNodeId() {
            var allNodes = [];
            for (var i = 0; i < dataImport.length; i++) {
                allNodes.push(String(Object.keys(dataImport[i])));
            }
            return allNodes;
        }

        function getActors() {
            var actors = [];
            var allNodeId = getAllNodeId();
            for (var j = 0; j < allNodeId.length; j++) {
                for (var i = 0; i < dataImport.length; i++) {
                    if (dataImport[i][allNodeId[j]]) {
                        if (dataImport[i][allNodeId[j]].nodetype == 'bot' && !(dataImport[i][allNodeId[j]].actor == 'System')) {
                            if (!(actors.includes(dataImport[i][allNodeId[j]].actor))) {
                                actors.push(dataImport[i][allNodeId[j]].actor);
                            }
                        }
                    }
                }
            }
            return actors;
        }


        function getJsonData(node, jsonData) {
            if (dataImport.length < 1) {
                dataImport = jsonData;
            }
            var nodeData;
            for (var i = 0; i < dataImport.length; i++) {
                if (dataImport[i][node]) {
                    if (dataImport[i][node].nodeId == node) {
                        nodeData = dataImport[i];
                    }
                }
            }
            return nodeData;
        }


        function intro($container, jsonData) {
            var nodeData = getJsonData('root', jsonData);
            // Prepare intro : 
            var AButton = nodeData.root.callButton;
            var AbuttonLabel = nodeData.root.callButtonLabel;
            var ATimer = nodeData.root.timer;
            var Adelay = nodeData.root.delay;
            var Adesti = nodeData.root.desti[0];
            var Atitle = nodeData.root.title;
            var AContent = nodeData.root.html;
            var Acss = nodeData.root.css;
            var AJs = nodeData.root.js;
            var AnodeId = nodeData.root.nodeId;

            chatBoxOn = false; //Avoid memory leaks for preview

            if ($container.parent().hasClass("widget-box")) {
                $container.find(".debug").show()
            }

            //call js addition function

            $container.find('.globWrapper').html(
                '<div class="SQContainer"><div class="SQTitre">' + Atitle + '<hr></div><div class="SQContent">' + AContent + '</div><button class="desti">' + AbuttonLabel + '</button></div>');
            if (AButton === false) {
                $container.find(".desti").hide();
            } // Destination button must disappear if no label
            else {
                $container.find('.desti').click(function(event) {
                    firstName = setFname($container);
                    displayer(Adesti, $container);
                });
            }

            if (ATimer === true) {
                timeDesti = setTimeout(function() {
                    firstName = setFname($container);
                    displayer(Adesti, $container);
                }, Adelay * 1000);
            }



        }



        function displayer(node, $container, navNodeData) {
            var nodeData;
            if (typeof navNodeData === "undefined") {
                nodeData = getJsonData(node);
            } else {
                nodeData = navNodeData;

                for (let NodName in nodeData) {
                    node = nodeData[NodName].nodeId;
                }
                //console.log(nodeData)
                //console.log(node)
            }



            //Node Type identification : 
            var nodeType = nodeData[node].nodetype;
            var AButton, AbuttonLabel, ATimer, Adelay, Adesti, Atitle, AContent, Acss, AJs, AActor, AsubType, AnodeId;
            var fanSetOn = false;
            var leftBox = $container.find('.fridge .leftBox');
            var Gwrapp = $container.find('.globWrapper'); //


            $container.find(".debug").html("<div class='debugItem'>Parent node :" + nodeData[node].parentNode + "</div><div class='debugItem'>Active node : " + node + "</div><div class='debugItem'>Desti node : " + nodeData[node].desti + "</div>");

            // Displayer choices : ++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++
            if (nodeType == 'SQTxt') {
                chatBoxOn = false;
                AButton = nodeData[node].callButton;
                AbuttonLabel = nodeData[node].callButtonLabel;
                ATimer = nodeData[node].timer;
                Adelay = nodeData[node].delay;
                Adesti = nodeData[node].desti[0];
                Atitle = nodeData[node].title;
                AContent = nodeData[node].html;
                Acss = nodeData[node].css;
                AJs = nodeData[node].js;
                AsubType = nodeData[node].subType;
                AnodeId = nodeData[node].nodeId;

                //appel de la fonction js additionnel


                $container.find('.globWrapper').html(
                    '<div class="SQContainer"><div class="SQTitre">' + insertFname(Atitle) + '</div><div class="SQContent">' + insertFname(AContent) + '</div><div class="btDiv"><button class="desti">' + AbuttonLabel + '</button></div></div>');

                if (AButton === false) {
                    $container.find(".desti").hide();
                } //  Desti button dispear if empty

                if (AsubType == 'Transition') {
                    $container.find('.SQContainer').css({
                        'float': 'left',
                        'width': '450px',
                        'border': '1px grey solid'
                    });
                }
                $container.find('.desti').click(function(event) {
                    firstName = setFname($container);
                    clearTimeout(timeTimer);
                    clearTimeout(timeDesti);
                    if (AsubType == 'Conclusion' || AsubType == 'Introduction') {
                        $container.find('.SQContainer').remove();
                    }
                    $container.find(this).hide();
                    displayer(Adesti, $container); //OK
                });

                if (ATimer === true) {
                    timeTimer = setTimeout(function() {
                        if (AsubType == 'Conclusion' || AsubType == 'Introduction') {
                            $container.find('.SQContainer').remove();
                        }
                        $container.find(this).hide();
                        firstName = setFname($container);
                        displayer(Adesti, $container); //OK
                    }, Adelay * 1000);
                }

                //Résumé ! 
                if (AsubType == 'Introduction' || AsubType == 'Transition') {

                    getResume(node, $container);
                }
                preparRespons($container);
            }

            if (AsubType == "Conclusion") { // replace button for preview mode
                $container.find(".lastNode").html(AnodeId);
                preparRespons($container);
                $container.find('.SQContainer button').hide();


            }

            if (nodeType == 'bot') {
                AActor = nodeData[node].actor;
                Adelay = nodeData[node].delay;
                Adesti = nodeData[node].desti[0];
                AContent = nodeData[node].html;
                AJs = nodeData[node].js;
                AnodeId = nodeData[node].nodeId; // PCI Specific

                /**JS additional Triggers  */


                if (AnodeId == 'bot5') { // Reinject information location in choice-history
                    if (typeof location !== "undefined") {

                        $container.find(".nothingIn").hide();
                        $container.find(".locationValue").html(locList[location]);
                        $container.find(".locationLine").show();
                    } else {
                        AContent = AContent.replace("XLocation", "Aucun choix");
                    }
                }
                if (AnodeId == 'bot9') {
                    $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.satisfaction + '">');
                }
                if (AnodeId == 'bot92') {
                    setTimeout(function() {
                        $container.find(".globWrapper").append("<audio autoplay src = '" + sounds.tumb + "'></audio> ");
                    }, 4000);
                }

                if (AnodeId == 'bot12') {
                    if (typeof location !== "undefined") {
                        AContent = AContent.replace("XLocation", "<span class='lower'>" + locList[location] + "</span>");
                    } else {
                        AContent = AContent.replace("XLocation", "Aucun choix");
                    }
                }

                if (AnodeId == 'bot86') {
                    AContent = AContent.replace("XEmoticon", "! <img class='emoticon' src='" + assets.emoticon_smile + "'/>");
                }

                if (AnodeId == 'bot22') { // Reinject information : Characters  in dialog
                    $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.expose + '">');
                    if (typeof triple !== "undefined") {

                        $container.find(".characterList").html(triple[0] + ", " + triple[1] + ", " + triple[2]);
                        $container.find(".charType1").html(triple[0]);
                        $container.find(".charType2").html(triple[1]);
                        $container.find(".charType3").html(triple[2]);
                        $container.find(".characterListLine").show();
                    } else {
                        AContent = AContent.replace("Xperso", "Aucun choix");
                    }
                }

                if (AnodeId == 'bot33') {
                    if (typeof triple !== "undefined") {
                        AContent = AContent.replace("Xperso", "<span class='lower'>" + triple[0] + ", " + triple[1] + ", " + triple[2] + "</span>");
                    } else {
                        AContent = AContent.replace("Xperso", "Aucun choix");
                    }
                }

                if (AnodeId == 'bot37') {
                    $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.expose + '">');
                }

                if (AnodeId == 'bot82') {
                    prem = $container.find('.prem').val();
                    if (typeof prem !== "undefined") {
                        //AContent = AContent.replace("XPREM", "<b class='nomPerso1'>" + prem + "</b>");
                        $container.find(".charName1").html(prem);
                        $container.find(".charTitleline").show();
                        $container.find(".character1line").show();
                    } else {
                        AContent = AContent.replace("XPREM", "PROBLEM");
                    }
                    $container.find('.IDocWrapper').empty();
                }

                if (AnodeId == 'bot83') {
                    var perso2 = $container.find('input[name=herosName]:checked').val();

                    if (typeof perso2 !== "undefined") {
                        // AContent = AContent.replace("XPERSO2", "<b>" + perso2 + "</b>");
                        $container.find(".charName2").html(perso2);
                        $container.find(".character2line").show();
                    } else {
                        AContent = AContent.replace("XPERSO2", "PROBLEM");
                    }
                    $container.find('.IDocWrapper').empty();
                }

                if (AnodeId == 'bot55') {
                    if (typeof verbChoice !== "undefined") {
                        AContent = AContent.replace("Xverb", "<span class='lower'>" + verbChoice + "</span>");
                    } else {
                        AContent = AContent.replace("Xverb", "Aucun choix");
                    }
                }
                if (AnodeId == 'bot71') {
                    if (typeof ideaChoice !== "undefined") {
                        AContent = AContent.replace("Xidea", "<span class='lower'>" + ideaChoice + "</span>");
                    } else {
                        AContent = AContent.replace("Xidea", "Aucun choix");
                    }
                }

                if (AnodeId == 'bot58') {
                    Fnbot58($container);
                }
                if (AnodeId == 'bot76') {
                    Fnbot76($container);
                }
                if (AnodeId == 'bot46') {
                    $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.expose + '">');
                }

                if (AnodeId == 'bot41') {
                    Fnbot41($container);
                }

                if (AnodeId == 'bot7') {
                    Fnbot7($container);
                }
                if (AnodeId == 'bot5') {
                    Fnbot5($container);
                }
                if (AnodeId == 'bot2') {
                    Fnbot2($container);
                } //BOT Call additional JS function

                if (AnodeId == 'bot85') {
                    var EpoqFromMemo = $container.find(".epoqTxt").html();
                    AContent = AContent.replace("XEpoq", EpoqFromMemo);
                }

                $container.find('.desti').hide();
                $container.find('.SQContainer').remove();

                // Is chatBOx open ?
                if (chatBoxOn) {
                    //Bot dialog injection
                    //Bot Dialog
                    timeTimer = setTimeout(function() {
                        renderBotRepliq(Gwrapp, AActor, AContent, Adelay, Adesti, $container);
                    }, 2000);
                } else {
                    chatBoxOn = true; // ChatBox is now open
                    // Install actor list
                    var actors = getActors();
                    var actorList = "";
                    actorList = 'Participants : Vous, Glips.'
                    leftBox.find('.actorList').html(actorList);
                    //Display leftBox  
                    var chatDiva = leftBox.find('.chatBox').clone();
                    $container.find('.globWrapper').prepend(
                        '<div class="leftBoxClone"><button class="callModalResu ui-button ui-widget ui-corner-all">Afficher les éléments de votre histoire</button><div class="accordionclone"></div><div class="chatDiv"></div><div class="repDiv"></div></div>');

                    if ($container.parent().hasClass("widget-box")) {
                        console.log("EDITOR CONTEXT")
                    }

                    modalResu($container);
                    $container.find(".chatDiv").empty();
                    $container.find('.globWrapper .chatDiv').html(chatDiva[0]);




                    //Bot Dialog
                    timeTimer = setTimeout(function() {
                        renderBotRepliq(Gwrapp, AActor, AContent, Adelay, Adesti, $container);
                    }, 500);
                }

                preparRespons($container);
            }

            if (nodeType == 'Fanset') {

                console.log("FANSET DISPLAY")

                $container.find(".openSetAns").removeAttr("disabled");

                Adesti = nodeData[node].desti;
                AContent = nodeData[node].html;
                //Answers
                // Install answerSet element

                var answBox = leftBox.find('.ansGroup').clone();
                console.log(answBox.length)



                if ($container.find('.globWrapper .leftBoxClone .repDiv')) {
                    console.log("TRACKER 1")
                    $container.find('.globWrapper .leftBoxClone .repDiv').html(answBox[0]);
                } else {
                    console.log("TRACKER 2")
                    $container.find('.globWrapper .leftBoxClone .repDiv').append(answBox[0]);
                }

                //Hider for answering system - Show also open ended text area
                for (let i = (Adesti.length + 1); i < 7; i++) {
                    $container.find('.prop' + i).hide();
                }

                for (var i = 0; i < Adesti.length; i++) {
                    var propos = getPropContent(Adesti[i]);
                    var destina = getPropDesti(Adesti[i]);
                    $(answBox).find('.prop' + (i + 1)).html(propos).show();
                    $container.find('.propOpen').hide();
                    if (Adesti.length == 1) {
                        //console.log(destina);
                        $container.find('.propClose').hide();
                        $container.find('.propOpen').show();
                        $(answBox).find('.prop7').attr('data', destina);
                    }

                    $(answBox).find('.prop' + (i + 1)).attr('data', destina);

                }
                // Install answerSet command
                renderDialogChoices($container.find('.leftBoxClone'), Adesti, node, $container);

                // Add precision on characters
                if (node == "Fanset29") {
                    $container.find(".openSetAns").val("Je propose que les personnages…").focus();
                }

                if (node == "Fanset76") {

                    $container.find(".openSetAns").val("Je propose que notre forêt soit…").focus();
                }

                if (node == "Fanset51") {
                    $container.find(".openSetAns").val("Je propose que…").focus();
                }

                if (node == "Fanset85") {
                    $container.find(".openSetAns").val("Je propose que l'orage…").focus();
                }

                if (node == "Fanset78") {
                    $container.find(".openSetAns").attr("placeholder", "Taper ici l’époque que vous avez choisie pour situer vos personnages.").focus();
                }

                if (node == "Fanset89") {

                    $container.find(".proposi").addClass("audioStop");

                    $container.find(".audioStop").on("click", function() {
                        $container.find("audio").trigger('pause');
                    });

                }



                preparRespons($container);
            }

            if (nodeType == 'IDoc') {
                $container.find(".SQContainer").remove();
                AButton = nodeData[node].callButton;
                AbuttonLabel = nodeData[node].callButtonLabel;
                ATimer = nodeData[node].timer;
                Adelay = nodeData[node].delay;
                Adesti = nodeData[node].desti[0];
                Atitle = nodeData[node].title;
                AContent = nodeData[node].html;
                Acss = nodeData[node].css;
                AJs = nodeData[node].js;
                AnodeId = nodeData[node].nodeId;

                //call additionnal js function - PCI specific.



                var IDocContainer = $container.find('.globWrapper').find('.IDocWrapper');
                if (IDocContainer.length == 0) {
                    $container.find('.globWrapper').append(
                        '<div class="IDocWrapper"><span class="SQTitre">' +
                        insertFname(Atitle) + '</span><hr><div class="IDocContent">' + insertFname(AContent) + '</div>');
                    $container.find('.IDocWrapper').append('</div><div class="btDiv"><button class="desti">' + AbuttonLabel + '</button></div>');
                    $container.find(".desti").click(function(event) {
                        displayer(Adesti, $container); //OK
                    });
                } else {

                    $container.find('.IDocWrapper').html('<span class="SQTitre">' + insertFname(Atitle) + '</span><hr>' + insertFname(AContent) + '<div class="btDiv"><button class="desti">' + AbuttonLabel + '</button></div>');
                    $container.find('.desti').click(function(event) {
                        displayer(Adesti, $container); //OK
                    });
                }

                if (AbuttonLabel == '') {
                    $container.find('.desti').hide();

                }

                //Need installation of Idoc -> must be at the end ! 
                if (AnodeId == 'iDoc1') {
                    FniDoc1($container);
                }
                if (AnodeId == 'iDoc4') {
                    FniDoc4($container);
                }
                if (AnodeId == 'iDoc21') {
                    FniDoc21($container);
                }
                if (AnodeId == 'iDoc38') {
                    FniDoc38($container);
                }
                if (AnodeId == 'iDoc40') {
                    FniDoc40($container);
                }
                if (AnodeId == 'iDoc59') {
                    FniDoc59($container);
                    $container.find(".audioConsi").prepend("<audio class='piste3' src = '" + sounds.AVC3 + "'> </audio> <p>Attention, il faut des débuts d’histoire, pas un récit complet. Des débuts différents avec les mots que vous avez choisis.</p>");
                    $container.find(".audioConsi").prepend("<img class='instructionBT IBSmall' src='" + assets.listen + "'>");
                    setTimeout(function() {
                        $container.find(".piste3")[0].play();
                    }, 1000);
                    $container.find(".instructionBT").on("click", function() {
                        $container.find(".piste3")[0].play();
                    });
                }
                if (AnodeId == 'iDoc79') {
                    FniDoc79($container);
                }
                if (AnodeId == 'iDoc80') {
                    FniDoc80($container);
                }
                if (AnodeId == 'iDoc43') {
                    FniDoc43($container);

                    $container.find(".verbGlips").prepend("<audio class='piste2' src = '" + sounds.AVC2 + "'> </audio> <p>Vous devrez utiliser ces verbes dans votre histoire.</p>");
                    $container.find(".verbGlips").prepend("<img class='instructionBT' src='" + assets.listen + "'>")
                    setTimeout(function() {
                        $container.find(".piste2")[0].play();
                    }, 1000);
                    $container.find(".instructionBT").on("click", function() {
                        $container.find(".piste2")[0].play();
                    });

                }
                if (AnodeId == 'iDoc61') {
                    FniDoc61($container);
                }
                if (AnodeId == 'iDoc62') {
                    FniDoc62($container);
                }
                if (AnodeId == 'iDoc63') {
                    FniDoc63($container);
                }
                if (AnodeId == 'iDoc77') {
                    FniDoc77($container);
                    $container.find(".audioConsi").prepend("<audio class='piste4' src = " + sounds.AVC4 + "> </audio> <p>Attention, il faut des fins d’histoire, pas un récit complet. Des fins différentes avec les mots que vous avez choisis.</p>");
                    $container.find(".audioConsi").prepend("<img class='instructionBT IBSmall' src='" + assets.listen + "'>");
                    setTimeout(function() {
                        $container.find(".piste4")[0].play();
                    }, 1000);
                    $container.find(".instructionBT").on("click", function() {
                        $container.find(".piste4")[0].play();
                    });
                }
                /*             if (AnodeId == 'iDoc66') {
                                FniDoc66($container );
                            } */
                preparRespons($container);
            }

        }

        function getPropContent(nodeProp) {
            var nodeData = getJsonData(nodeProp);
            var proposition = nodeData[nodeProp].answerContent;
            return proposition;
        }

        function getPropDesti(nodeProp) {
            var nodeData = getJsonData(nodeProp);
            var desti = nodeData[nodeProp].desti;
            return desti;
        }

        function renderBotRepliq(lBox, actor, repliq, delay, desti, $container) {
            var specialDesti;
            var messageStyle;
            if (!delay) {
                delay = 0;
            }
            var delax = parseInt(delay) * 1000;
            var dipiu = parseInt(delay) + 1500; // Variable d'ajustement du temps pour les non Bots !
            stay = delax + stay;
            if (specialDesti == -1) {
                dipiu = 1000;
            }
            if (actor == 'System') {
                messageStyle = 'dialogLi system arriving';
                timeSystem = setTimeout(function() {
                    lBox.find('.dialogUl').append('<li class="' + messageStyle + '">' + insertFname(repliq) + '</li>');
                    if ($container.find('.chatRoom')) {
                        $container.find('.chatRoom').scrollTop($container.find('.chatRoom')[0].scrollHeight);
                    }
                }, 1000);
                lBox.find('.dialogLi').removeClass('arriving');
                timeDesti = setTimeout(function() {
                    displayer(desti, $container); //OK
                    if ($container.find('.chatRoom')) {
                        $container.find('.chatRoom').scrollTop($container.find('.chatRoom')[0].scrollHeight);
                    }
                }, 2000 + dipiu);
            } else {
                messageStyle = 'dialogLi arriving';

                lBox.find('.dialogUl').append('<li class="' + messageStyle + '"><span class="actorlabel">' + actor + '</span> : ' + insertFname(repliq) + '</li>');
                if ($container.find('.chatRoom')) {
                    $container.find('.chatRoom').scrollTop($container.find('.chatRoom')[0].scrollHeight);
                }
                timeActor = setTimeout(function() {
                    lBox.find('.dialogLi').removeClass('arriving');
                }, 2000);

                timeDesti = setTimeout(function() {
                    displayer(desti, $container); //OK
                    if ($container.find('.chatRoom')[0]) {
                        $container.find('.chatRoom').scrollTop($container.find('.chatRoom')[0].scrollHeight);
                    }
                }, stay + dipiu);
            }
        }

        function renderDialogChoices(lbox, setAnsw, node, $container) {
            $container.find(".proposiAfter").removeClass('proposiAfter').addClass('proposi'); //Cleaning Restart

            // Attach listeners to button
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
            lbox.find('.prop5').click(function(event) {
                lbox.find('.selected').removeClass('selected').addClass('proposi');
                $container.find(this).addClass('selected').removeClass('proposi');
            });
            lbox.find('.prop6').click(function(event) {
                lbox.find('.selected').removeClass('selected').addClass('proposi');
                $container.find(this).addClass('selected').removeClass('proposi');
            });

            lbox.find('.envoy').click(function(event) {
                $container.find('.selected').css("color", "whitesmoke");

                if ($container.find('.selected').attr('data')) {
                    var ansNumber = String($container.find('.selected').attr("class"));
                    ansNumber = String(ansNumber.match(/\d/g));
                    ansNumber = ansNumber - 1;
                    //console.log(setAnsw);
                    if (ansNumber == 6) { // Special case open ended is 7-1 !!! 
                        ansNumber = 0;
                        //Open ended to Result Data!
                        var proAnswer = $container.find(".openSetAns").val().replace(/[&\/\\#+()$~%'":*?<>={}]/g, '');
                        IDocAnswers.push('"' + setAnsw + '":' + (JSON.stringify(proAnswer)));
                        //IDocAnswers.push('"'+setAnsw +'":'+(JSON.stringify($(".openSetAns").val())));
                        //IDocAnswers.push('"' + setAnsw + '":' + $(".openSetAns").val().replace(/[&\/\\#+()$~%'":*?<>={}]/g, ''));
                    }

                    respons.push(setAnsw[ansNumber]); //Stock response node.
                    timeEnvoy = setTimeout(function() {

                        let replic = lbox.find('.selected');
                        if (replic.children().is("textarea")) {
                            lbox.find('.dialogUl').append('<li class="dialogLi arriving"><span class="actor">Moi :</span>' + $container.find(".openSetAns").val() + '</li>');
                            $container.find(".openSetAns").prop("disabled", "true");
                            // $container.find(".openSetAns").removeAttr("disabled");
                            $container.find(".locationSpecial").html($container.find(".openSetAns").val());
                        } else {
                            lbox.find('.dialogUl').append('<li class="dialogLi arriving"><span class="actor">Moi :</span>' + replic.html() + '</li>');
                        }

                        if ($container.find('.chatRoom')) {
                            $container.find('.chatRoom').scrollTop($container.find('.chatRoom')[0].scrollHeight);
                        }
                    }, 500);

                    timeDisplay = setTimeout(function() {
                        displayer($container.find('.selected').attr('data'), $container);
                    }, 2000); //OK

                    $container.find(this).hide();

                    $container.find('.proposi').removeClass('proposi').addClass('proposiAfter');
                    lbox.find('.prop1').unbind('click');
                    lbox.find('.prop2').unbind('click');
                    lbox.find('.prop3').unbind('click');
                    lbox.find('.prop4').unbind('click');
                    lbox.find('.prop5').unbind('click');
                    lbox.find('.prop6').unbind('click');
                }

                // Glips proposition is accepted for location : GLIPS 2 : En forêt
                if (node == "Fanset8") {
                    if (setAnsw[ansNumber] == "Fst8asw8") {
                        //location = 100;
                        $container.find(".locationValue").html("En forêt...");
                        $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.autour13 + '">');
                    };
                    if (setAnsw[ansNumber] == "Fst8asw9" || setAnsw[ansNumber] == "Fst8asw10") {
                        //location = 100;
                        $container.find(".locationValue").html("En forêt...");
                        $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.autour24 + '">');
                    };
                    if (setAnsw[ansNumber] == "Fst8asw11" || setAnsw[ansNumber] == "Fst8asw12" || setAnsw[ansNumber] == "Fst8asw13") {
                        $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.autour36 + '">');
                    }
                }


                // Glips proposition is accepted for characters : un facteur, une souris et un extraterrestre
                if (node == "Fanset25") {

                    if (setAnsw[ansNumber] == "Fst25asw28" || setAnsw[ansNumber] == "Fst25asw29" || setAnsw[ansNumber] == "Fst25asw30") {
                        $container.find(".characterList").html("un facteur, une souris et un extraterrestre");
                        triple[0] = "un facteur";
                        triple[1] = "une souris";
                        triple[2] = "un extraterrestre";
                        $container.find(".charType1").html(triple[0]);
                        $container.find(".charType2").html(triple[1]);
                        $container.find(".charType3").html(triple[2]);

                        if (setAnsw[ansNumber] == "Fst25asw25") {
                            $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.autour13 + '">');
                        }
                        if (setAnsw[ansNumber] == "Fst25asw26") {
                            $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.autour24 + '">');
                        }

                    };
                    if (setAnsw[ansNumber] == "Fst25asw27") {
                        $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.autour28 + '">');

                    }
                    if (setAnsw[ansNumber] == "Fst25asw28") {
                        $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.autour46 + '">');
                    }

                }

                //Add  verbs : empoisonner
                if (node == "Fanset47") {
                    if (setAnsw[ansNumber] == "Fst47asw50" || setAnsw[ansNumber] == "Fst47asw51" || setAnsw[ansNumber] == "Fst47asw52") {
                        $container.find(".empoisonner").show();
                        $container.find(".verbChosen").hide();
                        $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.autour24 + '">');
                    };
                    if (setAnsw[ansNumber] == "Fst47asw49") {
                        $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.autour30 + '">');
                    };
                    if (setAnsw[ansNumber] == "Fst47asw50") {
                        $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.autour36 + '">');
                    };
                }



                //Add precision on ideas : trahison
                if (node == "Fanset79") {
                    if (setAnsw[ansNumber] == "Fst79asw82" || setAnsw[ansNumber] == "Fst79asw83" || setAnsw[ansNumber] == "Fst79asw84") {
                        $container.find(".wordPropGlips").show();
                        $container.find(".motChosen").hide();
                        $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.autour24 + '">');

                    };
                    if (setAnsw[ansNumber] == "Fst65asw67") {
                        $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.autour30 + '">');
                    };
                    if (setAnsw[ansNumber] == "Fst65asw68") {
                        $container.find(".globWrapper").append('<img class="avatar autour13"  src="' + assets.autour36 + '">');
                    };
                }

                // Add precision on end for Trahison
                /*             if (node == "Fanset69") {
                                if (setAnsw[ansNumber] == "Fst69asw69") {
                                    $(".endSpecial").html(" La trahison conduit à la mort d’un personnage.");
                                };
                                if (setAnsw[ansNumber] == "Fst69asw70") {
                                    $(".endSpecial").html(" La trahison provoque un duel entre les personnages.");
                                };
                                if (setAnsw[ansNumber] == "Fst69asw71") {
                                    $(".endSpecial").html(" La trahison provoque un tremblement de terre.");
                                };
                                if (setAnsw[ansNumber] == "Fst69asw72") {
                                    $(".endSpecial").html(" La trahison n\'est pas révélée à tous les personnages.");
                                };
                            } */
                //Add open ended value on LOCATION
                if (node == "Fanset76") {
                    var openA = $container.find(".openSetAns").val();
                    $container.find(".locationSpecial").html(openA);
                }
                //Add open ended value on CHARACTERS
                if (node == "Fanset29") {
                    var openB = $container.find(".openSetAns").val();
                    $container.find(".characterSpecial").html(openB);
                }
                //Add open ended value on VERBS - S'ENVOLER
                if (node == "Fanset51") {
                    var openC = $container.find(".openSetAns").val();
                    $container.find(".verbSpecial").html(openC);
                }
                //Add open ended value on WORDS - ORAGE
                if (node == "Fanset85") {
                    var openD = $container.find(".openSetAns").val();
                    $container.find(".wordSpecial").html(openD).show();
                }

                //Add open ended value on EPOQ PROP
                if (node == "Fanset78") {
                    var openE = $container.find(".openSetAns").val();
                    $container.find(".epoqLine").show();
                    $container.find(".epoqImgSlot").html(openE).show().addClass("epoqTxt");
                }
            });
            preparRespons($container);
        }

        function preparRespons($container) {
            // getSemanticCat($container);
            $container.find(".respNode").html('"' + respons.join('","') + '"');
            $container.find(".idocAnswers").html(IDocAnswers.join(","));
            $container.find(".lastNode").html(lastNodeTracer);
        }

        function installTemplate($container) {

            $container.append("<div class='fridge'> <div class='headBar'></div> <div class='leftBox' > <div class='accordionBox'> </div> <div class='chatDiv'> <div class='chatBox'> <div class='actorList'>Participants au chat : Vous </div> <div class='chatRoom'> <ul class='dialogUl'> </ul> </div> </div> </div> <div class='repDiv'> <div class='ansGroup'><b>Vous : </b> <div class='propositions'> <div class='proposi prop1 propClose'>Proposition 1</div> <div class='proposi prop2 propClose'>Proposition 2</div> <div class='proposi prop3 propClose'>Proposition 3</div> <div class='proposi prop4 propClose'>Proposition 4</div><div class='proposi prop5 propClose'>Proposition 5</div><div class='proposi prop6 propClose'>Proposition 6</div><div class='proposi prop7 propOpen selected'><textarea maxlength='70' class='openSetAns'></textarea></div></div> <div class='propSender'> <div class='envoy'>envoyer</div> </div> </div> </div> </div> <div class='IDocWrapper'> Ici le doc interactif. </div> </div> <div class='respNode hiddenRep'></div><div class='idocAnswers hiddenRep'></div> <div class='respCatSem hiddenRep'></div> <div class='lastNode hiddenRep'></div>");

            $container.find(".fridge").hide()
            $container.find(".hiddenRep").hide()
        }

        function insertFname(stringos) {
            var rest = stringos.replace(/_Fname_/g, firstName);
            return rest;
        }

        function setFname($container) {
            var Fnamer;
            if ($container.find("[name='Fname']").length > 0) {
                Fnamer = $container.find("[name='Fname']").val();
            } else {
                Fnamer = firstName;
            }
            return Fnamer;
        }

        /**
         * Display spécial js for node  iDoc4 : location list.
         * @param {dom object} $container 
         * @param {string} assetManager 
         */

        function FniDoc1($container) {
            $container.find(".audioContainer").prepend("<img class='instructionBT' src=" + assets.listen + ">")
            $container.find(".audioContainer").append("<audio class='piste1' autoplay src = " + sounds.AVC1 + "> </audio>")
            $container.find(".desti").on("click", function() {
                $container.find(".piste1").prop("muted", "true");
            });
            $container.find(".instructionBT").on("click", function() {
                $container.find(".piste1")[0].play();
            });
        }

        function FniDoc4($container) {
            var glieu = {
                "liste1": ["&Agrave; la montagne", "Dans un musée", "Au supermarché", "Au collège"],
                "liste2": ["Dans la rue", "Dans un avion", "Au camping", "Dans un terrier"],
                "liste3": ["Sur une île déserte", "&Agrave; l’école de musique", "&Agrave; l’arrêt de bus", "Au cimetière"],
                "liste4": ["Dans un jardin", "Sur la lune", "&Agrave; la gare", "Au marché"],
                "liste5": ["Sur la banquise", "Sur un plateau de télévision", "Au stade", "Sur l’autoroute"],
                "liste6": ["Dans un château", "Au skate parc", "Dans un nid", "&Agrave; la plage"],
                "liste7": ["Sur un bateau", "Dans le désert", "Au ski", "Au restaurant"],
                "liste8": ["&Agrave; la campagne", "Dans une grotte", "Au gymnase", "Au théâtre"],
                "liste9": ["&Agrave; la fête foraine", "Dans l’espace", "Dans le train", "&Agrave; la cantine"],
                "liste10": ["Au pôle nord", "Au parc", "Dans une grande ville", "Au cinéma"]
            }
            var randowListe = Math.floor(Math.random() * 10) + 1;
            var keyList = "liste" + randowListe;


            for (var i = 0; i < glieu[keyList].length; i++) {
                locList.push(glieu[keyList][i]);
                $container.find(".choixDuLieu").append("<input class='location' id='loc" + i + "' type='radio' name='location' value=" + i + " ><label for='loc" + i + "'>" + glieu[keyList][i] + "</label><br>");
                $container.find('.location').on("click", function() {
                    location = $container.find('input[name=location]:checked').val();
                    $container.find(".desti").prop("disabled", false); // control form.  
                })
            }
            //control to avoid empty answers
            $container.find(".desti").prop("disabled", true);
            //control to disable list after validation
            $container.find(".desti").on("click", function() {
                $container.find(".choixDuLieu").prop('disabled', true);
                //Answering system    
                IDocAnswers.push('"lieu":"' + glieu[keyList][location] + '"');
                preparRespons($container);
            })
        }

        function FniDoc21($container) {

            $container.find(".desti").hide();

            for (var i = 0; i < characters.length; i++) {
                $container.find(".choixPerso").append("<span class='persoCadre ui-corner-all ui-button ui-widget'><input class='personnage ui-checkboxradio-icon ui-corner-all ui-icon ui-icon-background ui-icon-blank ' id='perso" + i + "' type='checkbox' name=" + i + " ><label class='ui-checkboxradio-label' for='perso" + i + "'>" + characters[i] + "</label></span><br>");
                var limit = 3;
            }

            $container.find('input.personnage').on('click', function(evt) {
                if ($container.find('.personnage:checked').length > limit) {
                    this.checked = false;
                    $container.find(".Missing1").hide();
                    $container.find(".MissMess2").hide();
                    $container.find(".warningChoice").show();
                    $container.find(".warningChoice").fadeOut(8000);

                } else if ($container.find('.personnage:checked').length == 0) {
                    $container.find(".Missing1").show();
                    $container.find(".MissMess2").hide();
                } else if ($container.find('.personnage:checked').length > 0) {
                    $container.find(".Missing1").hide();
                    $container.find(".MMValue").html(3 - $container.find('.personnage:checked').length);
                    $container.find(".MissMess2").show();
                }
            });

            $container.find('input.personnage').on("change", function() {
                triple = [];
                $container.find('input[type="checkbox"]').each(function(i, item) {
                    if ($(this).prop('checked')) {
                        triple.push(characters[$(this).attr("name")]);
                        if (triple.length == 3) {
                            $container.find(".desti").show();
                        } else {
                            $container.find(".desti").hide();
                        }
                    }
                });
            });

            $container.find(".desti").on("click", function() {
                $container.find('.personnage').prop("disabled", true);
                IDocAnswers.push('"seriePerso":["' + triple[0] + '","' + triple[1] + '","' + triple[2] + '"]');
                preparRespons($container);
            });
        }

        function FniDoc38($container) {

            $container.find('.desti').prop("disabled", true);
            $container.find('.prem').on("focus", function() {
                $container.find('.desti').prop("disabled", false);
            })

            $container.find('.desti').on("click", function() {
                prem = $container.find('.prem').val();
                $container.find(".charTitleline").show();
                $container.find(".character1line").show();
                $container.find(".charType1").html(characters[triple[0]]);
                $container.find(".charName1").html(prem);
                IDocAnswers.push('"nom_perso1": ' + JSON.stringify(prem)); //GOK
                preparRespons($container);
            })
        }

        function FniDoc40($container) {

            $container.find('.desti').prop("disabled", true);
            $container.find('input[name=persoRadio]').on("click", function() {
                $container.find('.desti').prop("disabled", false);
            });

            $container.find('.desti').on("click", function() {
                var perso2Name = $container.find('input[name=persoRadio]:checked').val();
                $container.find(".character2line").show();
                $container.find(".charType2").html(characters[triple[1]]);
                $container.find(".charName2").html(perso2Name);
                $container.find('input[name=persoRadio]').prop("disabled", true);
                IDocAnswers.push('"nom_perso2":"' + perso2Name + '"');
                preparRespons($container);
            });



        };

        function FniDoc59($container) {
            var propNumber = 1;
            countDown($container, ["bot60"]);

            function addHistForm() {
                $container.find('.debhist').append("<div class='prop prop" + propNumber + "'>Proposition n°" + propNumber + '</div><div><textarea class="tarea tarea' + propNumber + '" cols="500" name="debut1" rows="5" maxlength="400"></textarea></div>');
                propNumber++;
            }

            $container.find('.btDiv').prepend("<button class='addDeb'>Ajouter une nouvelle proposition</button>")
            for (let i = 0; i < 4; i++) {
                addHistForm();
            }

            $container.find('.addDeb').on("click", function() {
                addHistForm();
            })

            $container.find('.desti').prop("disabled", true);
            $container.find('.tarea').on("change", function() {
                $container.find('.desti').prop("disabled", false);

            });

            $container.find('.desti').on("click", function() {
                clearTimeout(timeTimer);
                clearTimeout(timeDesti);
                $container.find(".tarea").each(function(index) {
                    if ($container.find(this).val() != "") {
                        allStarts.push(JSON.stringify($container.find(this).val()));
                        allStartsHTML.push($container.find(this).val());
                    }
                });

                for (let i = 0; i < allStartsHTML.length; i++) {
                    $container.find(".beginLine").show();
                    $container.find(".memoStart").append("<li>" + allStartsHTML[i] + "</li>")
                }
                IDocAnswers.push('"propDebut":[' + allStarts.join(',') + ']');
                displayer(["bot60"], $container); //OK bot60 HARDCODED!
                preparRespons($container);
                clearInterval(x); // Cancel countdown !
                $container.find(".tarea").prop("disabled", true);
                $container.find(".addDeb").prop("disabled", true);

            });

        }

        function FniDoc63($container) {
            var atmoSound = [sounds.wind, sounds.heartbeat, sounds.sea, sounds.train];
            var atmoSoundLabel = ["wind", "heartbeat", "sea", "train"];
            var chosenSound;
            var chosenSoundLabel;
            for (let i = 0; i < atmoSound.length; i++) {
                $container.find(".sonAtmo").append("<div class='atmoContainer'><input id='sltAudioAtmo" + i + "' class='selectAudiAtmo' name='atmosound' value='" + atmoSound[i] + "' type='radio'/><label for='sltAudioAtmo" + i + "' class='sicoCont' href='#'><span>Son n°" + (i + 1) + " : <audio controls controlsList='nodownload' data-index='" + i + "' class='gatmo atmo" + i + "' src = " + atmoSound[i] + "> </audio></span></label></div>");
            }
            $container.find(".desti").addClass("audioStop");

            $container.find(".audioStop").prop("disabled", "true");

            $container.find(".selectAudiAtmo").on("click", function() {
                $container.find("audio").trigger('pause')
                $(this).parent().find("audio").trigger("play");
                console.log($(this).parent().find("audio").attr("data-index"))
                chosenSound = $(this).val();
                var y = $(this).parent().find("audio").attr("data-index");
                chosenSoundLabel = atmoSoundLabel[y];
                $container.find(".audioStop").removeAttr("disabled");
            });

            $container.find(".audioStop").on("click", function() {
                $container.find("audio").trigger('pause');
                $container.find(".IDocContent").append("<div class='maskAudio'><div>")
                $container.find(".selectAudiAtmo").prop("disabled", "true");
                IDocAnswers.push('"Son":"' + chosenSoundLabel + '"');
                preparRespons($container);
            });



        }

        function FniDoc79($container) {
            //Tempo A supp
            var selectedStart;
            var dataSpecial;
            //var special = "Double quote \" Simple quote' partenthèse ( Accolade { Crochet [ Fermeture }])";
            // special = special.replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_');
            //allStarts = ["Tintin", "Milou", "Haddock", "La castafiore", "Dupond et Dupont", "Alcazar", "Lampion", "Chang", "Sanzo", "Tournesol", "Nestor"];
            //allStartsHTML = ["Tintin", "Milou", "Haddock", "La castafiore", "Dupond et Dupont", "Alcazar", "Lampion", "Chang", "Sanzo", "Tournesol", "Nestor"];
            clearTimeout(timeTimer);
            clearTimeout(timeDesti);
            clearInterval(x);
            for (var i = 0; i < allStarts.length; i++) {
                // dataSpecial = allStarts[i].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_');
                //$container.find(".choixDebs").hide().fadeIn("slow").css("border", "1px blue dashed");

                $container.find(".choixDebs").append('<div class="proposal"><p><input type="radio" name="debutHistoire" id="propid' + i + '" data="' + i + '" value=' + allStartsHTML[i].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') + '> <label for="propid' + i + '">Proposition ' + (i + 1) + ' : </label></p><textarea disabled class = "tarea propDeb" ' + i + 'col=5000 row = "5" name = "debut' + i + '">' + allStartsHTML[i] + '</textarea></div>');

                $container.find(".proposal p").animate({
                    'font-size': '1.3em'
                })

                $container.find(".proposal").animate({
                    'background-color': '#a6d1e0',
                    'height': "130px"
                }, 3000)
            }

            $container.find('.desti').prop("disabled", true);
            $container.find('input[name=debutHistoire]').on("click", function() {
                selectedStart = $(this).attr("data");
                //console.log(selectedStart);
                $container.find('.desti').prop("disabled", false);
                //$container.find('input[name=debutHistoire]').prop("disabled", true);
            });
            $container.find('.desti').on("click", function() {
                IDocAnswers.push('"propDebutSelect":' + JSON.stringify(selectedStart));
                preparRespons($container);
                clearTimeout(timeDesti);
                clearTimeout(timeTimer);
            });


        };

        function FniDoc80($container) {
            var selectedEnd;
            var dataSpecial;
            //Tempo A supp
            //allEnds = ["Astérix", "Obelix", "Idefix", "Batman"];
            // allEnds = ["Tintin", "Milou", "Haddock", "La castafiore", "Dupond et Dupont", "Alcazar", "Lampion", "Chang", "Sanzo", "Tournesol", "Nestor"];
            //allEndsHTML = ["Tintin", "Milou", "Haddock", "La castafiore", "Dupond et Dupont", "Alcazar", "Lampion", "Chang", "Sanzo", "Tournesol", "Nestor"];
            clearTimeout(timeTimer);
            clearTimeout(timeDesti);
            clearInterval(x);
            //console.log(allEndsHTML);
            for (var i = 0; i < allEnds.length; i++) {
                // dataSpecial = allEnds[i].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '_');
                $container.find(".choixFins").append('<div class="proposal"><p><input type="radio" name="finHistoire" id="propid' + i + '" data="' + i + '" value=' + allEndsHTML[i].replace(/[&\/\\#,+()$~%.'":*?<>{}]/g, '') + '> <label for="propid' + i + '">Proposition ' + (i + 1) + ' : </label></p><textarea disabled class = "tarea propDeb" ' + i + 'col=5000 row = "5" name = "debut' + i + '">' + allEndsHTML[i] + '</textarea></div>');
            }

            $container.find(".proposal p").animate({
                'font-size': '1.3em'
            })

            $container.find(".proposal").animate({
                'background-color': 'rgb(208, 255, 200)',
                'height': "130px"
            }, 3000);

            $container.find('.desti').prop("disabled", true);
            $container.find('input[name=finHistoire]').on("click", function() {
                $container.find('input[name=debutHistoire]').prop("disabled", true);
                $container.find('.desti').prop("disabled", false);
                selectedEnd = $(this).attr("data");
            });
            $container.find('.desti').on("click", function() {
                window.scrollTo(0, 0);
                IDocAnswers.push('"propFinSelect":' + JSON.stringify(selectedEnd));
                preparRespons($container);
            });
        };

        function FniDoc43($container) {
            var listA = {
                listA1: ["Courir, sauter, s'amuser et ...", "s'enfuir", "se cacher", "manger", "s'enflammer", "découvrir", "jouer", "rire"],
                listA2: ["S’enfuir, se cacher, abandonner et ...", "se promener", "disparaître", "vomir", "grimper", "se téléporter", "embrasser", "se battre"],
                listA3: ["Dormir, se reposer, rêver et ...", "se noyer", "boire", "trahir", "métamorphoser", "craindre", "effrayer", "surprendre"],
                listA4: ["Embrasser, aimer, trahir et ...", "dormir", "bâtir", "s’amuser", "danser", "fumer", "rêver", "mentir"],
                listA5: ["Mentir, voler, manipuler et ...", "transformer", "se baigner", "épingler", "émietter", "reculer", " manigancer", "effrayer"],
                listA6: ["Créer, dessiner, sculpter et ...", "rougir", "voler", "craindre", "jardiner", "dévoiler", "surprendre", "enquêter"],
                listA7: ["Rôtir, couper, déguster et ...", "insulter", "dévorer", "interdire", "dessiner", "nourrir", "trahir", "empailler"],
                listA8: ["Enquêter, trouver, découvrir et ...", "empoisonner", "boire", " anesthésier", "se cacher", "manger", "voler", "peindre"]
            }
            var verb4;
            var verbList = [];
            var randowListe = Math.floor(Math.random() * 8) + 1;
            var keyList = "listA" + randowListe;



            $container.find(".verbGlips").prepend("<div class='triplet'>" + listA[keyList][0] + "</div>");



            for (var i = 1; i < listA[keyList].length; i++) {
                verbList.push(listA[keyList][i]);
                $container.find(".verbs").append("<input class='verbeA' id='verb" + i + "' type='radio' name='verbeA' value=" + i + " ><label for='verb" + i + "'>" + listA[keyList][i] + "</label><br>");
                $container.find('.verbA').on("click", function() {})
            }
            $container.find('.desti').prop("disabled", true);
            $container.find('input[name=verbeA]').on("click", function() {
                $container.find('.desti').prop("disabled", false);
            });

            $container.find(".desti").on("click", function() {
                verb4 = $container.find('input[name=verbeA]:checked').val();
                verbChoice = listA[keyList][verb4];
                $container.find(".verbLine").show();
                $container.find(".verbList").html(listA[keyList][0]);
                $container.find(".verbChosen").html(listA[keyList][verb4]);
                $container.find('.verbs').prop("disabled", true);
                IDocAnswers.push('"verbesDebutList":"' + listA[keyList][0].slice(-(listA[keyList][0].length), -6) + '","verbeChoisi":"' + listA[keyList][verb4] + '"');
                preparRespons($container);

            });

        }

        function FniDoc61($container) {
            var listM = {
                listM1: ["Amour, déception, couple et ...", "hélicoptère", "cinéma", "supermarché", "colère", "revue", "éléphant", "passion"],
                listM2: ["Château, roi, pont-levis et ...", "épée", "sable", "princesse", "nuage", "couronne", "martien", "fourmi"],
                listM3: ["Diable, mal, feu et ...", "gourmandise", "fourche", "argent", "histoire", "savon", "allumette", "cape"],
                listM4: ["Bonbon, gourmandise, muffin et ...", "chocolat", "pépite", "sucreries", "train", "toupie", "salive", "tournevis"],
                listM5: ["Dentiste, molaire, gencive et ...", "racine", "langue", "rage", "douleur", "soupe", "glace", "rendez-vous"],
                listM6: ["Avocat, tribunal, accusé et ...", "robe", "voleur", "discours", "mayonnaise", "poireau", "crevette", "lunettes"],
                listM7: ["Espoir, rêve, malédiction et ...", "destin", "voyante", "cristal", "pétanque", "livre", "cerise", "ordinateur"],
                listM8: ["Omelette, champignon, fromage et ...", "frite", "orange", "poisson", "piment", "escalade", "baleine", "mort"]
            }
            var mot4;
            var motList = [];

            var randowListe = Math.floor(Math.random() * 8) + 1;
            var keyList = "listM" + randowListe;

            $container.find(".motsGlips").prepend("<div class='triplet'>" + listM[keyList][0] + "</div>");

            for (var i = 1; i < listM[keyList].length; i++) {
                motList.push(listM[keyList][i]);
                $container.find(".mots").append("<input class='motA' id='mot" + i + "' type='radio' name='motA' value=" + i + " ><label for='mot" + i + "'>" + listM[keyList][i] + "</label><br>");
            }
            mot4 = $container.find('input[name=motA]:checked').val();

            $container.find('.desti').prop("disabled", true);
            $container.find('input[name=motA]').on("click", function() {
                $container.find('.desti').prop("disabled", false);
            });

            $container.find(".desti").on('click', function() {
                mot4 = $container.find('input[name=motA]:checked').val();
                ideaChoice = listM[keyList][mot4];
                $container.find(".motLine").show();
                $container.find(".motList").html(listM[keyList][0]);
                $container.find(".motChosen").html(listM[keyList][mot4]);
                $container.find('input[name=motA]').prop("disabled", true);
                IDocAnswers.push('"motsFin":"' + listM[keyList][0].slice(-(listM[keyList][0].length), -6) + '","motFinChoisi":"' + listM[keyList][mot4] + '"');
                preparRespons($container);

            })

        }

        function FniDoc62($container) {
            var epoqImg = [assets.prehistoire, assets.chevalier, assets.immeubles, assets.futur];
            var epoqImgLabel = ["prehistoire", "chevalier", "immeubles", "futur"];
            var imageChosen;
            $container.find(".desti").addClass("EpoqBT");

            $container.find(".imgEpoq").append('<label for="epoq1"><img class="timeImg timg1"  src="' + assets.prehistoire + '"></label><input id="epoq1" class="epoqChoice" name="epoq" type="radio" value="0"><br/>');
            $container.find(".imgEpoq").append('<label for="epoq2"><img class="timeImg timg2"  src="' + assets.chevalier + '"></label><input id="epoq2" class="epoqChoice" name="epoq" type="radio" value="1"><br/>');
            $container.find(".imgEpoq").append('<label for="epoq3"><img class="timeImg timg3"  src="' + assets.immeubles + '"></label><input id="epoq3" class="epoqChoice" name="epoq" type="radio" value="2"><br/>');
            $container.find(".imgEpoq").append('<label for="epoq4"><img class="timeImg timg4"  src="' + assets.futur + '"></label><input id="epoq4" class="epoqChoice" name="epoq" type="radio" value="3">');

            $container.find(".timeImg").on("click", function() {
                $container.find(".timeImg").css("border", "0px");
                $(this).css("border", "3px red solid");
            });

            $container.find(".desti").prop("disabled", "true");

            $container.find(".epoqChoice").on("click", function() {
                $container.find(".timeImg").css("border", "0px");
                imageChosen = parseInt($(this).val()) + 1;
                $container.find(".timg" + imageChosen).css("border", "3px red solid");
                $container.find(".epoqLine").show();
                $container.find(".desti").removeAttr("disabled");
                imageChosen = imageChosen - 1;
                $container.find(".epoqImgSlot").html('<img class="timeImg timg1"  src=' + epoqImg[imageChosen] + '>');
            });

            $container.find(".EpoqBT").on("click", function() {
                IDocAnswers.push('"Image":"' + epoqImgLabel[imageChosen] + '"');
                //console.log(epoqImgLabel[imageChosen])
                preparRespons($container);
            })

        }

        function FniDoc77($container) {
            var propNumber = 1;

            countDown($container, ["bot78"]);

            function addHistForm() {
                $container.find('.finhist').append("<div class='propi propo" + propNumber + "'>Proposition n°" + propNumber + '</div><div><textarea class="tarea tarea' + propNumber + '" cols="500" name="debut1" rows="5" maxlength="400"></textarea></div>');
                propNumber++;
            }

            $container.find('.btDiv').prepend("<button class='addFin'>Ajouter une nouvelle proposition</button>")

            for (let i = 0; i < 4; i++) {
                addHistForm();
            }
            //addHistForm();

            $container.find('.addFin').on("click", function() {
                addHistForm();
            });

            $container.find('.desti').prop("disabled", true);
            $container.find('.tarea').on("change", function() {
                $container.find('.desti').prop("disabled", false);
            });

            $container.find('.desti').on("click", function() {
                clearTimeout(timeTimer);
                clearTimeout(timeDesti);
                $container.find(".tarea").each(function(index) {
                    if ($container.find(this).val() != "") {
                        allEnds.push(JSON.stringify($container.find(this).val()));
                        allEndsHTML.push($container.find(this).val());
                    }
                });
                IDocAnswers.push('"propFin":[' + allEnds.join(',') + ']');
                displayer(["bot78"], $container); //OK
                preparRespons($container);
                $container.find(".tarea").prop("disabled", true);
                $container.find(".addFin").prop("disabled", true);
            })

        }

        function Fnbot76($container) {
            setTimeout(function() {
                $container.find('.callMemo').on("click", function() {
                    $container.find(".wbody").show();
                })
            }, 5000);

            /*IDocAnswers.push('{resume:' + $('.wbody').html()+'}');
            preparRespons($container); */
        }

        function Fnbot58($container) {
            setTimeout(function() {
                $container.find('.callMemo').on("click", function() {
                    $container.find(".wbody").show();
                })
            }, 5000);
        }

        function Fnbot41($container) {
            $container.find(".character3line").show();
            $container.find(".charType3").html(characters[triple[2]]);
            $container.find(".charName3").html("Alix");
        }

        function Fnbot7($container) {
            $container.find(".expose").hide();
            $container.find(".globWrapper").append('<img class="avatar satisfaction"  src="' + assets.satisfaction + '")>');
        }

        function Fnbot5($container) {
            $container.find(".bonjour").hide();
            $container.find(".globWrapper").append('<img class="avatar expose"  src="' + assets.expose + '")>');

        }

        function Fnbot2($container) {
            $container.find(".globWrapper").append('<img class="avatar bonjour"  src="' + assets.glipsHello + '")>');
        }

        function countDown($container, nodeAfter) {
            // Set the date we're counting down to
            //var countDownDate = new Date("Jan 5, 2021 15:37:25").getTime();
            var solo = true;


            if (countDownDate) {
                countDownDate = {};
                clearInterval(x);
            }
            var countDownDate = new Date();
            countDownDate.setMinutes(countDownDate.getMinutes() + 8);
            // Update the count down every 1 second
            x = setInterval(function() {

                // Get todays date and time
                var now = new Date().getTime();

                // Find the distance between now and the count down date
                var distance = countDownDate - now;

                // Time calculations for days, hours, minutes and seconds
                var days = Math.floor(distance / (1000 * 60 * 60 * 24));
                var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
                var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
                var seconds = Math.floor((distance % (1000 * 60)) / 1000);

                // Display the result in the element with id="demo"
                $container.find(".clock").html(minutes + "min : " + seconds + "s ");

                // If the count down is finished, write some text 
                /*  if (distance < 100) {
                     console.log("INF100");
                     if (nodeAfter[0] == "bot60") {
                         $container.find(".tarea").each(function (index) {
                             if ($container.find(this).val() != "") {
                                 if (solo) {
                                     allStarts.push(JSON.stringify($container.find(this).val()));
                                     allStartsHTML.push($container.find(this).val());
                                 }
                             }
                         });
                         solo = false;
                         //IDocAnswers.push('"propDebut":[' + allStarts.join(',') + ']');
                     }
     
                     if (nodeAfter[0] == "bot78") {
                         $container.find(".tarea").each(function (index) {
                             if ($container.find(this).val() != "") {
                                 if (solo) {
                                     allEnds.push(JSON.stringify($container.find(this).val()));
                                     allEndsHTML.push($container.find(this).val());
                                 }
                             }
                         });
                         solo = false;
                         //IDocAnswers.push('"propFin":[' + allEnds.join(',') + ']');
                     }
                 } */

                if (distance < 2) {
                    clearTimeout(timeTimer);
                    clearTimeout(timeDesti);

                    if (nodeAfter[0] == "bot60") {
                        $container.find(".tarea").each(function(index) {
                            if ($container.find(this).val() != "") {
                                allStarts.push(JSON.stringify($container.find(this).val()));
                                allStartsHTML.push($container.find(this).val());
                            }
                        });

                        for (let i = 0; i < allStartsHTML.length; i++) {
                            $container.find(".beginLine").show();
                            $container.find(".memoStart").append("<li>" + allStartsHTML[i] + "</li>")
                        }
                        IDocAnswers.push('"propDebut":[' + allStarts.join(',') + ']');
                        preparRespons($container);
                        clearInterval(x); // Cancel countdown !

                        $container.find(".IDocContent").prepend("<div class='timesUp'>Temps écoulé !</div>");
                        $container.find(".IDocContent").append("<div class='timesUp'>Temps écoulé !</div>");
                        $container.find(".instructionBT").hide();
                        $container.find(".clock").hide();
                        $container.find("textarea").prop("disabled", true);
                        $container.find(".addDeb").prop("disabled", true);
                    }

                    if (nodeAfter[0] == "bot78") {
                        $container.find(".tarea").each(function(index) {
                            if ($container.find(this).val() != "") {
                                if (solo) {
                                    allEnds.push(JSON.stringify($container.find(this).val()));
                                    allEndsHTML.push($container.find(this).val());
                                }
                            }
                        });
                        solo = false;
                        IDocAnswers.push('"propFin":[' + allEnds.join(',') + ']');
                        preparRespons($container);
                        clearInterval(x); // Cancel countdown !
                        $container.find(".IDocContent").prepend("<div class='timesUp'>Temps écoulé !</div>");
                        $container.find(".IDocContent").append("<div class='timesUp'>Temps écoulé !</div>");
                        $container.find(".clock").hide();
                        $container.find(".instructionBT").hide();
                        $container.find("textarea").prop("disabled", true);
                        $container.find(".addFin").prop("disabled", true);
                    }

                    displayer(nodeAfter, $container);
                }
            }, 1000);
        }

        function modalResu($container) {

            $container.find(".globWrapper").append("<div class='wbody' title='Les éléments de votre histoire'>" +
                "<div class='line nothingIn'> Pour le moment, aucun élément n'a encore été choisi.</div>" +
                "<div class='line locationLine'><div class='itemTitle'>Le lieu de l’histoire : <span class='locationValue itemvalue'></span><span class='locationSpecial itemvalue'></span></div></div>" +
                "<div class='line characterListLine'><div class='itemTitle'>Le choix des 3 personnages : <span class='characterList itemvalue'></span> <span class='characterSpecial itemvalue'></span></div></div>" +
                "<div class='charTitleline'><div class='itemTitle'>Les noms des personnages:</div></div><div>" +
                "<div class='line character1line'><div class='itemTitle'> - Personnage 1 : <span class='charType1'></span> qui s'appelle <span class='charName1 itemvalue'></span></div></div>" +
                "<div class='line character2line'><div class='itemTitle'> - Personnage 2 : <span class='charType2'></span> dont le nom est <span class='charName2 itemvalue'></span></div></div>" +
                "<div class='line character3line'><div class='itemTitle'> - Personnage 3 : <span class='charType3'></span> qui s'appelle <span class='charName3 itemvalue'>Alix</span></div></div></div>" +
                "<div class='line verbLine'><div class='itemTitle'>Les actions des personnages : <span class='verbList itemvalue'></span><span class='verbChosen itemvalue'></span><span class='empoisonner itemvalue'>. En début d'histoire, ajouter le verbe s'envoler. </span><span class='poisonprecision verbSpecial itemvalue'></span></div><div></div></div>" +
                "<div class='line beginLine'><div class='itemTitle memoStart'>Vos débuts d’histoire : </div><div></div></div>" +
                "<div class='line epoqLine'><div class='itemTitle'>L’histoire se situe: <div class='epoqImgSlot'></div></div><div></div></div>" +
                "<div class='line motLine'><div class='itemTitle'>Les mots pour terminer l'histoire : <span class='motList itemvalue'></span><span class='motChosen itemvalue'></span><span class='wordPropGlips itemvalue'>. En fin d'histoire, ajouter un orage. </span><span class='endSpecial wordSpecial itemvalue'></span></div><div></div></div>" +
                "<div class='line subjectLine'><div class='itemTitle'>Le sujet de l’histoire :</div><div></div></div>" +
                "<div class='line endLine'><div class='itemTitle'>La fin d’histoire la plus originale :</div><div><textarea class='tarea tarea' cols='500' name='debut1' rows='5'></textarea></div></div>" +
                "<div><button class='btresuclose'>Fermer</button></div></div>"
            )

            $container.find(".btresuclose").on("click", function() {
                    $container.find(".wbody").hide();
                    $container.find('.callModalResu').prop("disabled", false);
                })
                /* $container.find(".wbody").dialog({
                    minWidth: 500,
                    autoOpen: false,
                    closeText: ""
                }); */

            $container.find('.callModalResu').on("click", function() {
                $container.find(".wbody").show();
                $(this).attr("disabled", "disabled");
                /* $container.find(".wbody").dialog({
                    close: function(event, ui) {
                        $container.find(".callModalResu").prop('disabled', false);
                    }
                }); */
                // $container.find(".wbody").dialog("open");
            });

        }

        return {
            render: function(id, $container, config) {
                var $container = $($container);
                installTemplate($container);
                intro($container);

            },
            stopTime: function() {
                stopAllTimeouts()
            },
            displayNode: function(container, config, nodeData, jsonData, dataImport) {
                // console.log("LAUNCH DISPLAY NODE !!!!")
                var $container = $(container);
                installTemplate($container);
                ResetAll()
                intro($container, dataImport);

                displayer(nodeData.nodeId, $container, nodeData);

            },
            getNodeData: function(nodeActiv) {
                var nodeActif = getJsonData(nodeActiv)
                return nodeActif
            }
        };
    });