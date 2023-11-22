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
            var chapter1 = '<div class="chapter"><h1>Ajouter un composant sur l\'espace de travail</h1>Cliquer sur un des boutons « Composant ».<br />Sur l\’espace de travail, maintenir le bouton gauche de la souris. Le dipôle apparait. Déplacer la souris pour ajuster la taille du dipôle. Relâcher le bouton de la souris. <br />Si les extrémités de deux composants se touchent, une connexion se crée entre les composants.</div>';
            var chapter2 = '';
            var chapter3 = '<div class="chapter"><h1 style="margin-top : 10px">Modifier un composant</h1>Cliquer sur l\'outil <img class="middle" width="50px" src="' + icoGrab.src + '"/>. Cliquer sur un composant pour le déplacer. <br /> Cliquer sur l’extrémité d’un composant et déplacer la souris pour modifier la longueur des fils ou faire pivoter le composant.<br />  <h1 style="margin-top : 10px">Supprimer un composant</h1>Sélectionner le composant avec l’outil  <img class="middle" width="50px" src="' + icoGrab.src + '"/>. Appuyer sur la touche « Suppr » du clavier. <br/>Si un composant est sélectionné. Seul ce composant sera supprimé.<br />Si une connexion entre deux composants est sélectionnée. Les deux composants seront supprimés. <br /><h1 style="margin-top : 10px"> Déconnecter un composant du circuit</h1>Approcher la souris d’une connexion. Un tiret bleu apparait.<br/>Cliquer sur le tiret et déplacer le. Les composants ne sont plus connectés.<br/><img class="demoImg" src="' + demoAssets.selectConnect + '"><img class="demoImg" src="' + demoAssets.deconnect + '"><h1 style="margin-top : 10px">Étirer le circuit</h1>Sélectionner une connexion avec l\'outil <img class="middle" width="50px" src="' + icoGrab.src + '"/>. Un point bleu apparait sur la connexion.<br />Déplacer le point bleu avec la souris. Le circuit est étiré par cet angle.<br /><img class="demoImg" src="' + demoAssets.selectExtr + '"><img class="demoImg" src="' + demoAssets.deform + '"><br />Sélectionner un composant entier avec l’outil <img class="middle" width="50px" src="' + icoGrab.src + '"/> . Un trait bleu apparait sur le composant.<br/> Déplacer le trait bleu. Le circuit est étiré par un coté.<br/><img class="demoImg" src="' + demoAssets.selectCompo + '"><img class="demoImg" src="' + demoAssets.etirer + '"></div>'

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