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
    'relatemPCI/interaction/runtime/js/assets',
    'css!relatemPCI/interaction/runtime/css/relatem'
    ], function($, assets) {
    'use strict';

    function renderChoices(id, $container, config) {
        var svgroue1 = assets.svgroue1;
        var svgroue2 = assets.svgroue2;
        var moto = assets.moto

        $container.find(".contanim").prepend(svgroue1);
        $container.find(".contanim").append(svgroue2);

        var $vuefille = $container.find(".vuefille");
        var $vueglobale = $container.find(".vueglobale");
        var $vuegars = $container.find(".vuegars");
        var $aswrdm = $container.find(".ansrdm");

        $vuefille.append($('<img>', {src: assets.vuefille }).attr("class", "vfimg"));
        $container.find(".contanim").append(moto).attr("class", "moto");
        $vuegars.append($('<img>', { src: assets.cactus}).attr("class", "cactus"));
        var anim1 = "non";
        var anim2 = "non";
        // Wheel rotation
        var angle = 0;
        setInterval(function () {
            angle += 3;
        }, 10);

        var angle = 0;
        setInterval(function () {
            angle += 3;
        }, 10);




        $container.find(".activVF").click(function (event) {
            
            $container.find(".animFilleAsw").html("true");
            
            $vueglobale.hide();
            $vuegars.hide();
            $vuefille.show();
            // Replay animation event if animation is running
            var el = $container.find(".vfimg"),
                newone = el.clone(true);
            el.before(newone);
            $container.find("." + el.attr("class") + ":last").remove();

        });


        $container.find(".activG").click(function (event) {
            $container.find(".animGarsAsw").html("true");
            $vueglobale.hide();
            $vuegars.show();
            $vuefille.hide();
        });

        $container.find(".activGlobal").click(function (event) {
            $vueglobale.show();
            $vuegars.hide();
            $vuefille.hide();

        });
    }

   
    return {
        render: function(id, container, config) {

            var $container = $(container);
            renderChoices(id, $container, config);

        }
    };
});