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
        'taoQtiItem/portableLib/jquery_2_1_1', 
        'maraissalantPCI/interaction/runtime/js/assets',
        'css!maraissalantPCI/interaction/runtime/css/maraissalant'
        ], function($, assets) {
    'use strict';

    function renderChoices(id, $container, config) {
        var msansw = "non";
        var svgstring;
        svgstring = fillsvg();
        $container.find(".msalantsvg").append(svgstring);

        var $feu = $container.find(".feu");
        var $btzero = $container.find(".btzero");
        var $sel1 = $container.find(".sel1");
        var $sel2 = $container.find(".sel2");
        var $sel3 = $container.find(".sel3");
        var $sel4 = $container.find(".sel4");

        var $granos = $container.find(".granos");
        var $granosb = $container.find(".granosb");
        var $granosc = $container.find(".granosc");
        var $granosd = $container.find(".granosd");

        var $heure = $container.find(".heure");
        var $minute = $container.find(".minute");

        var $btdemarrer = $container.find(".btdemarrer");

        $feu.hide();
        $btzero.hide();
        $sel1.hide();
        $sel2.hide();
        $sel3.hide();
        $sel4.hide();

        $granos.hide();
        $granosb.hide();
        $granosc.hide();
        $granosd.hide();


        $btdemarrer.click(function (event) {
            if (msansw == "non") { $container.find(".msanswer").html('{"animation" : true}'); msansw = "oui"; }
            $container.find(this).hide();
            $btzero.show();
            $btzero.css("background-color", "ligthgrey");

            $heure.addClass('short-hand-start');
            $minute.addClass('long-hand-start');

            $feu.show();
            //liquid/ start level/speed/salt/stop level
            evapora1(".liquid1", 80, 12000, '.sel1', 0);
            evapora1(".liquid2", 80, 33000, '.sel2', 50);
            evapora1(".liquid3", 35, 20000, '.sel3', 0);
            evapora1(".liquid4", 80, 33000, '.sel4', 50);



            function granini(grainsufix, tempo) {
                $container.find(".grain" + grainsufix).hide().delay(tempo).queue(function (next) {
                    $container.find(".grain" + grainsufix).fadeIn('slow').delay(1000).fadeOut('400');
                    $container.find(".grain" + grainsufix).fadeIn('slow');
                    next();
                });

            }

            // mask on the button
            $container.find(".bouclier").show().delay(19000).queue(function (next) {
                $container.find(this).hide();
                $btzero.css("background-color", "#76c7a4");
                $btzero.css("color", "white");
                next();
            });

            // Salt deposit   
            for (var i = 1; i < 8; i++) {
                var tempor = i * 250 + 2000; // container 1
                granini("a" + i, tempor);
                var tempor2 = i * 320 + 4000; // container 2 and 4
                granini("b" + i, tempor2);
                granini("d" + i, tempor2);
                var tempor3 = i * 250 + 6000; // container 3
                granini("c" + i, tempor3);

            }


            $sel1.hide().delay(6000).queue(function (next) {
                $(this).fadeIn();
                next();
            });
            $sel2.hide().delay(12000).queue(function (next) {
                $(this).fadeIn();
                next();
            });
            $sel3.hide().delay(14000).queue(function (next) {
                $(this).fadeIn();
                next();
            });
            $sel4.hide().delay(12000).queue(function (next) {
                $(this).fadeIn();
                next();
            });

        });

        $btzero.click(function (event) {

            $container.find('.liquid1').attr("height", 80);
            $container.find('.liquid2').attr("height", 80);
            $container.find('.liquid3').attr("height", 35);
            $container.find('.liquid4').attr("height", 80);

            $container.find(this).hide();
            $btdemarrer.show();
            $feu.hide();
            $granos.hide();
            $granosb.hide();
            $granosc.hide();
            $granosd.hide();

            $sel1.hide();
            $sel2.hide();
            $sel3.hide();
            $sel4.hide();

            $heure.removeClass('short-hand-start');
            $minute.removeClass('long-hand-start');
            $heure.addClass('short-hand');
            $minute.addClass('long-hand');
        });

        function evapora1(liquid, base, vitos, sel, niveau) {
            $({ height: $container.find('.joker').attr('height', 0) })
                .animate({ height: base }, {
                    duration: vitos,
                    step: function step(now, fx) {
                        var largos = (base - now);
                        $container.find(liquid).attr('height', largos);
                        if (largos < niveau) {
                            $(this).stop();
                        }
                        if (vitos === 0) {
                            $container.find(sel).hide();
                            $(this).stop();
                        }
                    }
                });
        }

        function fillsvg() {
            
            return assets.background;
        }


    }

   

    return {
        render: function(id, container, config) {

            var $container = $(container);

            renderChoices(id, $container, config);
            
        }
    };
});