define([
        'taoQtiItem/portableLib/jquery_2_1_1',
        'CircuitPCI/interaction/runtime/js/assets',
        'CircuitPCI/interaction/runtime/js/deppAssets',
        'CircuitPCI/interaction/runtime/js/demoAssets',
    ],
    function($, assets, deppAssets, demoAssets) {
        'use strict';

        function renderHelp($container, config) {
            console.log("Call RenderHelp")
            var icoGrab = { src: assets.icon_grab };
            var icon_battery = { src: deppAssets.batterie };
            var icon_lampe = { src: deppAssets.lampe };
            var icon_moteur = { src: deppAssets.moteur };
            var icon_diodeElu = { src: deppAssets.diodeElu };
            var icon_interOuv = { src: deppAssets.interOuv };
            var icon_resistance = { src: deppAssets.resistance };
            var icon_interFerm = { src: deppAssets.interFerm };
            var icon_wire = { src: deppAssets.cable };
            var doc;

            var closeButton = '<div class="topbar"><button class="closeHelp">Fermer l\'aide</button><div/>'
            var chapter0 = '<div class="chapter"><h1>Inventaire des composants</h1><p>Laisser la souris sur le bouton du composant pour faire apparaître sa définition.</p><ul class="no-bullets">' + '<li><img class="middle"  width="30px" src="' + icoGrab.src + '"/> : Permet de saisir les composants, une fois qu\'ils ont été posés sur l\'espace de travail</li>' +
                '<li><img class="middle"  width="30px" src="' + icon_wire.src + '"/> : Ajouter des cables pour connecter les éléments. Vous pouvez également étirer les cables attachés aux composants</li>' +
                '<li><img class="middle"  width="30px" src="' + icon_battery.src + '"/> : Ajouter une source d\'énergie(batterie)</li>' +
                '<li><img class="middle"  width="30px" src="' + icon_resistance.src + '"/> : Ajouter une resistance</li>' +
                '<li><img class="middle"  width="30px" src="' + icon_moteur.src + '"/> : Ajouter un moteur</li>' +
                '<li><img class="middle"  width="30px" src="' + icon_lampe.src + '"/> : Ajouter une lampe</li>' +
                '<li><img class="middle"  width="30px" src="' + icon_interOuv.src + '"/> : Ajouter un interrupteur sur la position ouverte</li>' +
                '<li><img class="middle"  width="30px" src="' + icon_interFerm.src + '"/> : Ajouter un interrupteur sur la position fermée</li>' +
                '<li><img class="middle"  width="30px" src="' + icon_diodeElu.src + '"/> : Ajouter une diode électroluminescente</li>' +
                '</ul> </div>'
            var chapter1 = '<div class="chapter"><h1>Ajouter un composant sur l\'espace de travail</h1><p>Cliquez sur un des boutons "composant", un point blanc apparaît sur l\'espace de travail, vous pouvez avec la souris l\'étirer (drag), cela fera apparaître le composant et permettra d\'ajuster la taille de ses cables.</p></div>'
            var chapter2 = ''
            var chapter3 = '<div class="chapter"><h1>Manipuler les composants</h1><p>Utiliser l\'outil <img class="middle" width="50px" src="' + icoGrab.src + '"/> pour manipuler les composants.</p><h2>Supprimer un composant</h2><p>Lorsque vous venez de déposer un composant, une de ses extrémités présente un point bleu, vous pouvez appuyer sur suppr. sur le clavier pour directement l\'effacer. Sinon, vous devez le sélectionner en utilisant l\'outil de saisie <img class="middle" width="50px" src="' + icoGrab.src + '"/> et appuyer sur la touche suppr. Si vous sélectionnez un composant, seul ce composant sera supprimé, si vous sélectionnez une connection, les deux composants connectés seront détruits.</p><h2>Etirer le circuit</h2><p>Il est possible de saisir une connection et la déplacer avec la souris, le circuit sera alors étiré par cet angle.</p><img class="demoImg" src="' + demoAssets.selectExtr + '"><img class="demoImg" src="' + demoAssets.deform + '"><p>Il est également possible d\'étendre le circuit en sélectionnant un composant entier et en le déplaçant à l\'aide de la souris</p><img class="demoImg" src="' + demoAssets.selectCompo + '"><img class="demoImg" src="' + demoAssets.etirer + '"><h2>Déconnecter un composant du circuit</h2><p>Si vous approchez votre souris d\'une extrémité, la sélection de la connection apparaît plus longue, cela vous permet de tirer dessus avec la souris et de déconnecter le composant</p><img class="demoImg" src="' + demoAssets.selectConnect + '"><img class="demoImg" src="' + demoAssets.deconnect + '"> </div>'

            doc = closeButton + chapter0 + chapter1 + chapter2 + chapter3;
            $container.find(".help").html(doc);

            $container.find(".closeHelp").on("click", function() {
                // Appel de la fonction de confirmation
                $container.find("canvas").show();
                $container.find(".help").hide();
            })


            return doc
        }

        return {
            render: function($container, config) {
                return renderHelp($container, config);

            }
        };
    });