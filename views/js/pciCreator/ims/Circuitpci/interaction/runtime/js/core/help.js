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
            var chapter1 = '<div class="chapter"><h1>Ajouter un composant sur l\'espace de travail</h1><p>Cliquez sur un des boutons « Composant ». Un point blanc apparait sur l\’espace de travail. Maintenez le bouton gauche de la souris enfoncé tout en faisant glisser la souris pour faire apparaître le dipôle et ajuster la taille des fils. Au contact de leur extrémité, une connexion se crée entre les composants.</p></div>';
            var chapter2 = '';
            var chapter3 = '<div class="chapter"><h1>Modifier les composants</h1><p>Utiliser l\'outil <img class="middle" width="50px" src="' + icoGrab.src + '"/> pour sélectionner un composant. Déplacer la souris à l\’extrémité du composant. Un point bleu apparait. Cliquer sur ce point pour modifier la longueur des fils ou pour faire pivoter/bouger le composant. </p><img class="demoImg" src="' + demoAssets.pointBleu + '"> <h2>Supprimer un composant</h2><p>Sélectionner le composant avec l’outil  <img class="middle" width="50px" src="' + icoGrab.src + '"/>. Appuyer sur la touche suppr. Remarque : si vous sélectionnez un composant, seul ce composant sera supprimé, si vous sélectionnez une connection, les deux composants connectés seront détruits.</p><h2> Déconnecter un composant du circuit</h2><p>Approcher la souris d’une connexion. Un tiret bleu apparait. Cliquer sur le tiret et déplacer le. Les composants ne sont plus connectés.</p><img class="demoImg" src="' + demoAssets.selectConnect + '"><img class="demoImg" src="' + demoAssets.deconnect + '"><h2>Etirer le circuit</h2><p>Sélectionner une connexion avec l\'outil <img class="middle" width="50px" src="' + icoGrab.src + '"/>   . Un point bleu apparait sur la connexion. Déplacer le point bleu avec souris. Le circuit est étiré par cet angle.</p><img class="demoImg" src="' + demoAssets.selectExtr + '"><img class="demoImg" src="' + demoAssets.deform + '"><p>Sélectionner un composant entier avec l’outil <img class="middle" width="50px" src="' + icoGrab.src + '"/> . Un trait bleu apparait sur le composant. Déplacer le trait bleu. Le circuit est étiré par un coté.</p><img class="demoImg" src="' + demoAssets.selectCompo + '"><img class="demoImg" src="' + demoAssets.etirer + '"></div>'

            //doc = closeButton + chapter0 + chapter1 + chapter2 + chapter3;
            doc = closeButton + chapter1 + chapter2 + chapter3;
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