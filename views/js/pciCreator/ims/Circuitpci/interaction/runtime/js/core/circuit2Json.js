define([],
    function() {
        'use strict';

        function circuit2Json(texte) {
            let elements = texte.split(",");

            let jsonData = [];

            for (let i = 0; i < elements.length - 1; i += 4) {
                jsonData.push({
                    "Composant": elements[i],
                    "Connecteur1": parseInt(elements[i + 1]),
                    "Connecteur2": parseInt(elements[i + 2]),
                    "Valeur": elements[i + 3]
                });
            }

            let jsonString = JSON.stringify(jsonData, null, 4);
            return jsonString
        }


        return {
            convert: function(texte) {
                return circuit2Json(texte)
            }
        };
    });