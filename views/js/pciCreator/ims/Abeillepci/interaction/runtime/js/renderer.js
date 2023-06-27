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
define(['abeillePCI/interaction/runtime/js/lib/jquery-ui',
        'abeillePCI/interaction/runtime/js/assets',
        'abeillePCI/interaction/runtime/js/lib/raphael.min',
        'lodash',
        'css!abeillePCI/interaction/runtime/css/abeille'
    ],
    function($, assets, Raphael, _) {

        'use strict';

        function renderChoices(id, $container, config, assetManager) {

            var icodanger = assets.danger;
            var icofrelon = assets.frelon2;
            var objfleurrouge = assets.fleurrouge;
            var objfleurjaune = assets.fleurjaune;
            var objfleurbleue = assets.fleurbleue;
            var objabeille = assets.abeille100;
            var objfrelonvolant = assets.frelonvolant;

            var $abeille = $container.find(".abeille");
            var pesticlick = 0;
            var frelonclick = 0;

            $abeille.append("<div class='Rarea'></div>");
            $abeille.append("<div id='cmdpanel' class='cmdpanel'><div class='consigne'>Modifier les paramètres pour déclencher l'animation</div></div>");

            $container.find(".cmdpanel").append(
                "<div class='pesti line'><div class='titrepesti'>Quantité de pesticide</div></div>" +
                "<div class='frelon line'><div class='titrefrelon'>Frelon asiatique</div></div>");
            $container.find(".frelon").append(
                "<img class = 'icofrelon' src=" + icofrelon + "><div class='grador'>" +
                "<div class='nuisible frelonslider'></div></div>"

            );
            $container.find(".pesti").append(
                "<img class = 'icodanger' src=" + icodanger + "> <div class='grador'>" +
                "<div class='nuisible pesticide'></div></div>"
            );

            $container.find(".quantiPesti").html("<input hidden class='pestiVal' type='number' value='0'/>")
            $container.find(".quantiFrelon").html("<input hidden class='frelonVal' type='number' value='0'/>")

            $container.find(".pesticide").slider({
                min: 0,
                max: 2,
                step: 1,
                slide: function(event, ui) {
                    $(".pestiVal").val(ui.value);
                    $(".posiPesti").html(ui.value).hide();
                    $container.find(".allPosi").append('{"pesticide_curseur":' + ui.value + ',"frelon_curseur":' + $container.find(".posiFrelon").text() + '},')
                }
            });

            $container.find(".frelonslider").slider({
                value: 0,
                min: 0,
                max: 2,
                step: 1,
                slide: function(event, ui) {
                    $(".frelonVal").val(ui.value);
                    $(".posiFrelon").html(ui.value).hide();
                    $container.find(".allPosi").append('{"pesticide_curseur":' + $container.find(".posiPesti").text() + ',"frelon_curseur":' + ui.value + '},')
                }
            });

            var pestival = 0;

            var idcanvas = _.uniqueId('idCanvas_'); // lodash generate unique id
            $container.find('.Rarea').attr('id', idcanvas);
            var paper = Raphael(idcanvas, 800, 440);
            var bg_asset = assets.bg2;
            var bg = paper.image(bg_asset, 0, 0, 800, 440);
            $container.find('svg').css('border', '1px grey solid');

            var abeille = [];
            var beeset = paper.set();
            var beepresente;

            var quantifb = 30;
            var quantifj = 60;
            var quantifr = 30;

            var group1 = [31, 62, 28, 6, 20, 24, 3, 61, 21, 14, 49, 36, 15, 22, 30, 60, 40];
            var group2 = [0, 11, 26, 4, 58, 29, 57, 63, 23, 10, 56, 38, 43, 1, 19, 12, 9];
            var group3 = [7, 52, 53, 65, 66, 67, 8, 41, 42, 34, 35, 18, 59, 47, 50, 37, 16];
            var group4 = [27, 25, 51, 64, 2, 33, 48, 45, 54, 55, 13, 44, 39, 32, 5, 17, 46];

            var blueset = paper.set();
            var redset = paper.set();
            var yellowset = paper.set();
            var popu, TextBox;

            function population(pop) {
                var accord;
                if (pop === 0) { accord = 'abeille'; } else { accord = 'abeilles'; }
                popu = paper.text(400, 415, 'Population de la ruche : ' + pop + ' ' + accord).attr({ 'font-size': 20, 'fill': '#ffffff' });
                // Obtenir la boîte englobante du texte
                var bbox = popu.getBBox();

                // Création d'un rectangle en utilisant les dimensions de la boîte englobante
                var padding = 5;
                TextBox = paper.rect(bbox.x - padding, bbox.y - padding, bbox.width + 2 * padding, bbox.height + 2 * padding);

                // Définition de la couleur de fond du rectangle
                TextBox.attr({
                    "fill": "grey",
                    "fill-opacity": 0.7
                });

                // Pour que le texte apparaisse au-dessus du rectangle, nous devons le réinsérer.
                popu.toFront();

            }

            population(80000);
            setTimeout(() => {
                console.log("SETTIMEOUT")
                TextBox.toFront();
                popu.toFront();
            }, 2000);


            function getRandomArbitrary(min, max) {
                return Math.random() * (max - min) + min;
            }

            function flower(fleurpath, quanti, setflower) {
                // Area 1 bottom image
                for (var i = 0; i < quanti; i++) {
                    var zoax = getRandomArbitrary(-20, 800);
                    var zoay = getRandomArbitrary(260, 600);
                    var fleur = paper.image(fleurpath, zoax, zoay, 90, 72);
                    var alsize = getRandomArbitrary(0.02, 0.17);
                    fleur.scale(alsize, alsize);
                    setflower.push(fleur);
                }

                // Area 2 on the right
                for (var i = 0; i < quanti; i++) {
                    var zoax = getRandomArbitrary(260, 800);
                    var zoay = getRandomArbitrary(140, 265);
                    var fleur = paper.image(fleurpath, zoax, zoay, 90, 72);
                    var alsize = getRandomArbitrary(0.06, 0.07);
                    fleur.scale(alsize, alsize);
                    setflower.push(fleur);
                }

                // zone 3 à gauche
                for (var i = 0; i < (quanti / 4); i++) {
                    var zoax = getRandomArbitrary(-100, 120);
                    var zoay = getRandomArbitrary(150, 300);
                    var fleur = paper.image(fleurpath, zoax, zoay, 90, 72);
                    var alsize = getRandomArbitrary(0.06, 0.07);
                    fleur.scale(alsize, alsize);
                    setflower.push(fleur);
                }

            }

            var pathblue = objfleurbleue;
            var pathred = objfleurrouge;
            var pathyellow = objfleurjaune;

            // For each kind of flower : path, quanti, set name !
            flower(pathblue, quantifb, blueset);
            flower(pathred, quantifr, redset);
            flower(pathyellow, quantifj, yellowset);


            function beefly(quanti) {
                var xmob = 20;
                for (var i = 0; i < quanti; i++) {

                    abeille[i] = paper.image(objabeille, 180, 160, 100, 68);
                    abeille[i].scale(0.1, 0.1);
                    beeset.push(abeille[i]);
                }
                beeset.forEach(function(e) {
                    var ymob = getRandomArbitrary(150, 370);
                    if (xmob > 650) { xmob = 20; }
                    e.animate({ 'transform': "s1 1", x: xmob, y: ymob }, 2000);
                    xmob = xmob + 100;
                });


            }

            beefly(8); // Init bees first value


            function beeremover(killedbee) {
                for (var i = 0; i < killedbee; i++) {
                    beeset[beeset.length - 1].animate({ 'opacity': 0 }, 3000);
                    beeset.pop();
                }
            }


            function frelonflight(event) {

                if (event.type == "mouseup") {
                    var frelonvolant = paper.image(objfrelonvolant, 0, 50, 100, 68);
                    frelonvolant.scale(1);
                    frelonvolant.animate({ 'x': 1000, 'y': 300, 'width': 300, 'height': 150 }, 6000, function() { this.remove(); });
                }

            }

            function showGroup(group) {
                for (var i = 0; i < group.length; i++) {
                    blueset[group[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
                    redset[group[i]].animate({ "opacity": "1" }, 2000); // Appearance of 25%
                }
            }

            function hideGroup(group) {
                for (var i = 0; i < group.length; i++) {
                    blueset[group[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
                    redset[group[i]].animate({ "opacity": "0" }, 2000); // Disappearance of 25%
                }

            }



            $container.find(".pesticide").on("mouseup mouseout", function(event) {

                beepresente = beeset.length;

                var pestiValue = $(".pestiVal").val();


                var otherslider = $container.find('.frelonVal').val();
                var actionbee;

                pesticlick += 1;
                $container.find(".pesticlick").html(pesticlick);

                if (parseInt(pestiValue) === 0 && parseInt(otherslider) === 0) {

                    showGroup(group1);
                    showGroup(group2);
                    showGroup(group3);
                    showGroup(group4);

                    // population = 8
                    actionbee = 8 - beepresente;
                    if (actionbee > 0) { beefly(actionbee); }
                    popu.remove();
                    TextBox.remove();
                    population(80000);
                }

                if (parseInt(pestiValue) === 1 && parseInt(otherslider) === 0) {

                    hideGroup(group1);
                    showGroup(group2);
                    showGroup(group3);
                    showGroup(group4);

                    // population = 6
                    actionbee = 6 - beepresente;
                    if (actionbee > 0) { beefly(actionbee); } else { beeremover(Math.abs(actionbee)); }
                    popu.remove();
                    TextBox.remove();
                    population(60000);
                }

                if (parseInt(pestiValue) === 0 && parseInt(otherslider) === 1) {

                    hideGroup(group1);
                    showGroup(group2);
                    showGroup(group3);
                    showGroup(group4);

                    // population = 6
                    actionbee = 6 - beepresente;
                    if (actionbee > 0) { beefly(actionbee); } else { beeremover(Math.abs(actionbee)); }
                    popu.remove();
                    TextBox.remove();
                    population(60000);
                }

                if (parseInt(pestiValue) === 1 && parseInt(otherslider) === 2) {

                    hideGroup(group1);
                    hideGroup(group2);
                    hideGroup(group3);
                    showGroup(group4);

                    // population = 2
                    actionbee = 2 - beepresente;
                    if (actionbee > 0) { beefly(actionbee); } else { beeremover(Math.abs(actionbee)); }
                    popu.remove();
                    TextBox.remove();
                    population(20000);
                }

                if (parseInt(pestiValue) === 2 && parseInt(otherslider) === 1) {

                    hideGroup(group1);
                    hideGroup(group2);
                    hideGroup(group3);
                    showGroup(group4);

                    // population = 2
                    actionbee = 2 - beepresente;
                    if (actionbee > 0) { beefly(actionbee); } else { beeremover(Math.abs(actionbee)); }
                    popu.remove();
                    TextBox.remove();
                    population(20000);
                }

                if (parseInt(pestiValue) === 2 && parseInt(otherslider) === 0) {

                    hideGroup(group1);
                    hideGroup(group2);
                    hideGroup(group3);
                    showGroup(group4);


                    // population = 4
                    actionbee = 4 - beepresente;
                    if (actionbee > 0) { beefly(actionbee); } else { beeremover(Math.abs(actionbee)); }
                    popu.remove();
                    TextBox.remove();
                    population(40000);
                }

                if (parseInt(pestiValue) === 0 && parseInt(otherslider) === 2) {

                    hideGroup(group1);
                    hideGroup(group2);
                    hideGroup(group3);
                    showGroup(group4);

                    // population = 4
                    actionbee = 4 - beepresente;
                    if (actionbee > 0) { beefly(actionbee); } else { beeremover(Math.abs(actionbee)); }
                    popu.remove();
                    TextBox.remove();
                    population(40000);
                }

                if (parseInt(pestiValue) === 1 && parseInt(otherslider) === 1) {

                    hideGroup(group1);
                    hideGroup(group2);
                    hideGroup(group3);
                    showGroup(group4);

                    // population = 4
                    actionbee = 4 - beepresente;
                    if (actionbee > 0) { beefly(actionbee); } else { beeremover(Math.abs(actionbee)); }
                    popu.remove();
                    TextBox.remove();
                    population(40000);
                }

                if (parseInt(pestiValue) === 2 && parseInt(otherslider) === 2) {
                    hideGroup(group1);
                    hideGroup(group2);
                    hideGroup(group3);
                    hideGroup(group4);

                    beeremover(beeset.length);
                    popu.remove();
                    TextBox.remove();
                    population(0);
                }
            })


            $container.find(".frelonslider").on("mouseup mouseout", function(event) {

                beepresente = beeset.length;

                var frelonValue = $(".frelonVal").val();
                var otherslider = $container.find('.pestiVal').val();
                var i, actionbee;
                frelonclick += 1;
                $container.find(".frelonclick").html(frelonclick);


                if (parseInt(frelonValue) === 0 && parseInt(otherslider) === 0) {
                    showGroup(group1);
                    showGroup(group2);
                    showGroup(group3);
                    showGroup(group4);
                    // population = 8
                    actionbee = 8 - beepresente;
                    if (actionbee > 0) { beefly(actionbee); } else { beeremover(Math.abs(actionbee)); }
                    popu.remove();
                    TextBox.remove();
                    population(80000);

                }

                if (parseInt(frelonValue) === 1 && parseInt(otherslider) === 0) {
                    hideGroup(group1);
                    showGroup(group2);
                    showGroup(group3);
                    showGroup(group4);
                    // population = 6
                    actionbee = 6 - beepresente;
                    if (actionbee > 0) { beefly(actionbee); } else {
                        frelonflight(event);
                        beeremover(Math.abs(actionbee));
                    }
                    popu.remove();
                    TextBox.remove();
                    population(60000);

                }

                if (parseInt(frelonValue) === 0 && parseInt(otherslider) === 1) {

                    hideGroup(group1);
                    showGroup(group2);
                    showGroup(group3);
                    showGroup(group4);

                    // population = 6
                    actionbee = 6 - beepresente;
                    if (actionbee > 0) { beefly(actionbee); } else { beeremover(Math.abs(actionbee)); }
                    popu.remove();
                    TextBox.remove();
                    population(60000);
                }

                if (parseInt(frelonValue) === 1 && parseInt(otherslider) === 2) {



                    hideGroup(group1);
                    hideGroup(group2);
                    hideGroup(group3);
                    showGroup(group4);

                    // population = 2
                    actionbee = 2 - beepresente;
                    if (actionbee > 0) { beefly(actionbee); } else {
                        frelonflight(event);
                        beeremover(Math.abs(actionbee));
                    }
                    popu.remove();
                    TextBox.remove();
                    population(20000);
                }

                if (parseInt(frelonValue) === 2 && parseInt(otherslider) === 1) {



                    hideGroup(group1);
                    hideGroup(group2);
                    hideGroup(group3);
                    showGroup(group4);

                    // population = 2
                    actionbee = 2 - beepresente;
                    if (actionbee > 0) { beefly(actionbee); } else {
                        frelonflight(event);
                        beeremover(Math.abs(actionbee));
                    }
                    popu.remove();
                    TextBox.remove();
                    population(20000);
                }

                if (parseInt(frelonValue) === 2 && parseInt(otherslider) === 0) {



                    hideGroup(group1);
                    hideGroup(group2);
                    hideGroup(group3);
                    showGroup(group4);

                    // population = 4
                    actionbee = 4 - beepresente;
                    if (actionbee > 0) { beefly(actionbee); } else {
                        frelonflight(event);
                        beeremover(Math.abs(actionbee));
                    }
                    popu.remove();
                    TextBox.remove();
                    population(40000);
                }

                if (parseInt(frelonValue) === 0 && parseInt(otherslider) === 2) {

                    hideGroup(group1);
                    hideGroup(group2);
                    hideGroup(group3);
                    showGroup(group4);

                    // population = 4
                    actionbee = 4 - beepresente;
                    if (actionbee > 0) { beefly(actionbee); } else { beeremover(Math.abs(actionbee)); }
                    popu.remove();
                    TextBox.remove();
                    population(40000);
                }

                if (parseInt(frelonValue) === 1 && parseInt(otherslider) === 1) {



                    hideGroup(group1);
                    hideGroup(group2);
                    hideGroup(group3);
                    showGroup(group4);

                    // population = 4
                    actionbee = 4 - beepresente;
                    if (actionbee > 0) { beefly(actionbee); } else {
                        frelonflight(event);
                        beeremover(Math.abs(actionbee));
                    }
                    popu.remove();
                    TextBox.remove();
                    population(40000);
                }

                if (parseInt(frelonValue) === 2 && parseInt(otherslider) === 2) {

                    frelonflight(event);

                    hideGroup(group1);
                    hideGroup(group2);
                    hideGroup(group3);
                    hideGroup(group4);

                    beeremover(beeset.length);
                    popu.remove();
                    TextBox.remove();
                    population(0);

                }
            })

        }


        return {
            render: function(id, container, config, assetManager) {

                var $container = $(container);

                renderChoices(id, $container, config);

            },
            renderChoices: function(id, container, config) {
                renderChoices(id, $(container), config);
            }
        };
    });