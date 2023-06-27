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
        'lampedoublePCI/interaction/runtime/js/assets',
        'lampedoublePCI/interaction/runtime/js/lib/raphael.min',
        'css!lampedoublePCI/interaction/runtime/css/lampedouble'
    
], function ($, assets, Raphael) {
    'use strict';

    function renderChoices(id, $container, config) {

        var idlampe = _.uniqueId('idlampe_');// lodash generate unique id
        $container.find(".lampe").attr('id', idlampe); // Attribution of the unique Id to the Id attribute

        var paper = Raphael(idlampe, 960, 600); // Raphael JS use the id for positionning its canvas


        var lampeimage = { src: assets.lampedouble };

        var lampe = paper.image(lampeimage.src, 0, 0, 960, 540);

        var clickswitch = 0;
        var clickRlamp = 0;
        var clickLlamp = 0;

        var circuit = false;
        var L1 = true;
        var L2 = true;

        var btinterouvert = paper.rect(70, 380, 180, 40, 5).attr({ 'cursor': 'pointer', fill: 'lightgrey', title: 'Cliquer ici' });
        var interouvert = paper.text(160, 400, 'Interrupteur ouvert');
        interouvert.attr({ 'font-size': 17, 'cursor': 'pointer' });
        var set_ouvert = paper.set();
        set_ouvert.push(btinterouvert);
        set_ouvert.push(interouvert);
        set_ouvert.click(function (event) {
            clickswitch += 1;
            $container.find(".clickswitch").html(clickswitch);
            set_ouvert.forEach(function (element, index) {
                element.hide();
            });
            set_ferme.show();
            if (L1 === true) { lumgauche.show(); }
            if (L2 === true) { lumdroite.show(); }
            circuit = true;
        });


        var btinterferme = paper.rect(70, 380, 180, 40, 5).attr({ 'cursor': 'pointer', fill: 'transparent' }).hide();
        var interferme = paper.text(160, 400, 'Interrupteur fermé').hide();
        interferme.attr({ 'font-size': 17, 'cursor': 'pointer' });
        var set_ferme = paper.set();
        set_ferme.push(btinterferme);
        set_ferme.push(interferme);
        set_ferme.click(function (event) {
            clickswitch += 1;
            $container.find(".clickswitch").html(clickswitch);

            set_ferme.forEach(function (element, index) {
                element.hide();
            });
            set_ouvert.show();
            lumgauche.hide();
            lumdroite.hide();
            circuit = false;
        });


        var ligneInter = paper.path('M248 418 l25 50');

        var lumgauche = paper.path('m 297,243 61.07143,1.07143 60.71428,-1.42857 26.78572,121.07143 -173.92858,-0.71429 z').hide();
        lumgauche.attr({ fill: '#fcfc8f', stroke: 'none' });

        var lumdroite = paper.path('m 540,243 61.07143,1.07143 60.71428,-1.42857 26.78572,121.07143 -173.92858,-0.71429 z').hide();
        lumdroite.attr({ fill: '#fcfc8f', stroke: 'none' });

        var btgrillgauche = paper.rect(100, 90, 140, 60, 5).attr({ 'cursor': 'pointer', fill: 'lightgrey' });
        var grillgauche = paper.text(170, 120, 'Faire griller \nla lampe 1');
        grillgauche.attr({ 'font-size': 17, 'cursor': 'pointer' });
        var setgrillgauche = paper.set();
        setgrillgauche.push(btgrillgauche);
        setgrillgauche.push(grillgauche);
        setgrillgauche.click(function (event) {
            clickLlamp += 1;
            $container.find(".clickLlamp").html(clickLlamp);
            setgrillgauche.forEach(function (element, index) {
                element.hide();
            });
            lumgauche.hide();
            setOKgauche.show();
            L1 = false;
        });

        var btOKgauche = paper.rect(100, 90, 140, 60, 5).attr({ 'cursor': 'pointer', fill: 'transparent' }).hide();
        var OKgauche = paper.text(170, 120, 'Faire fonctionner \nla lampe 1').hide();
        OKgauche.attr({ 'font-size': 17, 'cursor': 'pointer' });
        var setOKgauche = paper.set();
        setOKgauche.push(btOKgauche);
        setOKgauche.push(OKgauche);
        setOKgauche.click(function (event) {
            clickLlamp += 1;
            $container.find(".clickLlamp").html(clickLlamp);
            setOKgauche.forEach(function (element, index) {
                element.hide();
            });
            setOKgauche.hide();
            if (circuit === true) { lumgauche.show(); }
            setgrillgauche.show();
            L1 = true;
        });


        var btgrilldroite = paper.rect(690, 90, 140, 60, 5).attr({ 'cursor': 'pointer', fill: 'lightgrey' });
        var grilldroite = paper.text(760, 120, 'Faire griller \nla lampe 2');
        grilldroite.attr({ 'font-size': 17, 'cursor': 'pointer' });
        var setgrilldroite = paper.set();
        setgrilldroite.push(btgrilldroite);
        setgrilldroite.push(grilldroite);
        setgrilldroite.click(function (event) {
            clickRlamp += 1;
            $container.find(".clickRlamp").html(clickRlamp);
            setgrilldroite.forEach(function (element, index) {
                element.hide();
            });
            lumdroite.hide();
            setOKdroite.show();
            L2 = false;
        });

        var btOKdroite = paper.rect(690, 90, 140, 60, 5).attr({ 'cursor': 'pointer', fill: 'transparent' }).hide();
        var OKdroite = paper.text(760, 120, 'Faire fonctionner \nla lampe 2').hide();
        OKdroite.attr({ 'font-size': 17, 'cursor': 'pointer' });
        var setOKdroite = paper.set();
        setOKdroite.push(btOKdroite);
        setOKdroite.push(OKdroite);
        setOKdroite.click(function (event) {
            clickRlamp += 1;
            $container.find(".clickRlamp").html(clickRlamp);
            setOKdroite.forEach(function (element, index) {
                element.hide();
            });
            setOKdroite.hide();
            if (circuit === true) { lumdroite.show(); }
            setgrilldroite.show();
            L2 = true;
        });



    }

    

    return {
        render: function(id, container, config, assetManager) {

            var $container = $(container);

            renderChoices(id, $container, config);
            
        }
    };
});