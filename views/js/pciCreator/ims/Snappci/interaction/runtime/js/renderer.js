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
 *
 */
define(['taoQtiItem/portableLib/jquery_2_1_1',
    'SnapPCI/interaction/runtime/js/lib/snapsrc',
    'css!SnapPCI/interaction/runtime/css/Snap'
], function($, snapsrc) {
    'use strict';

    function renderSnap(id, $container, config) {

        $container.find(".snapy").empty()

        function DefineTaoContext() {
            if ($container.parent().hasClass("widget-box")) {
                console.log(Array())
                return "Editor"
            } else {
                return "Preview"
            }
        }
        var TaoContext = DefineTaoContext();
        console.log(TaoContext);


        $container.find(".snapy").append('<canvas class="world" tabindex="1" ><p>Your browser doesn\'t support canvas.</p></canvas>');

        snapsrc.snap(id, $container, config);

        $container.find(".world").css('position', 'relative');

        //Limiter 
        console.log(config)

        var limitor = parseInt(config.testLimiter)
        if (limitor > 0 && TaoContext === "Preview") {
            $container.find(".warnLimit").html("Attention ! Le nombre de lancement de votre code sera limité. Vous aurez le droit à " + limitor + " tentatives maximum.<br/><br/><button class='suivant'>Fermer</button>")
            $container.find(".snapy").append("<div class='stop'></div");
            $container.find(".warnLimit").show();

            $container.find(".suivant").on("click", function() {
                $container.find(".warnLimit").hide();
                $container.find(".stop").remove();
            })
            $container.find(".consignes").html("Le nombre de lancement de votre code est limité. Vous avez le droit au total à " + limitor + " tentatives.");
        }


    }

    return {
        render: function(id, container, config) {

            var $container = $(container);

            renderSnap(id, $container, config);

        },
        renderSnap: function(id, container, config) {
            renderSnap(id, $(container), config);
        }
    };
});