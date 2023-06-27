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
    'trainPCI/interaction/runtime/js/assets',
    'css!trainPCI/interaction/runtime/css/train',
], function($, assets) {
    'use strict';

    function renderChoices(id, $container, config) {

        var $premierplan = $container.find(".premierplan");
        var $convoi = $container.find(".convoi");
        var $traj = $container.find(".traj");
        var $train = $container.find(".train");

        var $situercocci = $container.find(".situercocci");
        var $ccbleu = $container.find(".ccbleu");
        var $vache = $container.find(".vache");
        var $rmzero = $container.find(".rmzero");
        var $cctraj = $container.find(".cctraj");
        var $armzero = $container.find(".armzero");
        var $vtraj = $container.find(".vtraj");

        var mediapath = "train/runtime/img/";

        var premierplanmedialist = ['bg'];
        var convoimedialist = ['train', 'roue', 'coccifix'];
        var trajmedialist = ['ptvvache', 'ptvcc', 'cocciblue', 'coccired'];
        var situercoccimlist = ['bellescoccis'];
        var ccbleumlist = ['macrococci'];
        var vachemlist = ['vachelook'];
        var rmzeromlist = ['zeroid'];
        var cctrajmlist = ['cctrajimg'];
        var armzeromlist = ['zeroid'];
        var vtrajmlist = ['vtrajimg'];

        prependmedia($premierplan, premierplanmedialist);
        appendmedia($convoi, convoimedialist);
        prependmedia($traj, trajmedialist);
        prependmedia($situercocci, situercoccimlist);
        prependmedia($ccbleu, ccbleumlist);
        prependmedia($vache, vachemlist);
        prependmedia($rmzero, rmzeromlist);
        prependmedia($cctraj, cctrajmlist);
        prependmedia($armzero, armzeromlist);
        prependmedia($vtraj, vtrajmlist);


        function appendmedia(desti, timage) {
            for (var i = 0; i < timage.length; i++) {
                desti.append($('<img>', { src: assets[timage[i]] }).attr("class", timage[i]));
            }
        }

        function prependmedia(desti, timage) {
            for (var i = 0; i < timage.length; i++) {
                desti.prepend($('<img>', { src: assets[timage[i]]}).attr("class", timage[i]));
            }
        }

        $container.find(".cocciblue").addClass('cocci');
        $container.find(".coccired").addClass('cocci');
        var $cocci = $container.find(".cocci");
        var $bg = $container.find(".bg");
        var $ptvcc = $container.find(".ptvcc");
        var $roue = $container.find(".roue");
        var $ptvvache = $container.find(".ptvvache");
        var $cache = $container.find(".cache");



        var answccbleue = "non";
        var answvache = "non";


        $ccbleu.click(function (event) {
            $container.find(".refTrainAsw").html("true");
            $cocci.hide();
            $situercocci.hide();
            $vache.hide();
            $bg.addClass('vachego');
            $cache.show();
            ccrouego();

        });

        $vache.click(function (event) {
            $container.find(".refTerreAsw").html("true");
            $cocci.hide();
            $situercocci.hide();
            $ccbleu.hide();
            $convoi.addClass('convoigo');
            $cache.show();
            vrouego();
        });

        $rmzero.click(function (event) {
            $bg.removeClass('vachego');
            $premierplan.addClass('premplan');
            $convoi.removeClass('convoigo');
            $convoi.show();
            $ptvcc.stop();
            $convoi.css("opacity", 1);
            $(this).hide();
            $vache.show();
            $ccbleu.show();
            $cctraj.hide();
            $vtraj.hide();
            $ptvvache.hide();
            $bg.css("opacity", 1);
            $ptvcc.hide();
            $cocci.hide();
            $situercocci.show();
            $container.find(".coccifix").css("opacity", 1);// For Edge ! 
            $convoi.css("opacity", 1);
            $roue.css("opacity", 1);
            $container.find(".train").css("opacity", 1);// For Edge ! 


        });

        function vrouego() {
            $roue.addClass('rouego');
            $cache.show();
            $roue.delay(10000).queue(function (next) {
                $container.find('.vache').hide();
                $ccbleu.hide();
                $rmzero.show();
                $roue.removeClass('rouego');
                $roue.css("transform", "rotate(0deg)");
                $vtraj.show();
                $cache.hide();
                next();
            });

        }


        function ccrouego() {
            $roue.addClass('rouego');
            $cache.show();
            $roue.delay(11000).queue(function (next) {
                $vache.hide();
                $ccbleu.hide();
                $rmzero.show();
                $roue.removeClass('rouego');
                $roue.css("transform", "rotate(0deg)");
                $cctraj.show();
                $cache.hide();
                next();
            });
        }

        $vtraj.click(function (event) {
            $container.find(".trajectoirTerreAsw").html("true");
            $ptvvache.show();
            $ptvvache.animate({
                opacity: 1
            },
                2000,
                function () {
                    /* stuff to do after animation is complete */
                });

        });

        $cctraj.click(function (event) {
            $container.find(".trajectoirTrainAsw").html("true");
            $ptvcc.show();
            $bg.css("opacity", 0).css("border", "none");
            $premierplan.removeClass('premplan');
            $premierplan.css("background-image", "none");
            $ptvcc.stop();
            $ptvcc.animate({
                opacity: 1
            },
                1000,
                function () {
                    $convoi.css("opacity", 0.2);
                    $roue.css("opacity", 0.2);
                    $container.find('.coccifix').css("opacity", 0);// For Edge ! 
                    $container.find(".train").css("opacity", 0.2);// For Edge ! 
                    /* stuff to do after animation is complete */
                });

        });

        $situercocci.click(function (event) {
            $container.find(".situerCocciAsw").html("true");
            $cocci.toggle();
            $cocci.css("margin-top", "160px");
        });
    }

    

    return {
        render: function(id, container, config, assetManager) {

            var $container = $(container);

            renderChoices(id, $container, config);
           
        }
    };
});