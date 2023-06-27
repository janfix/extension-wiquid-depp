/*
Copyright Depp - march 2019
Based on Wiquid's PCI Generator for TAO platform Free to use 
www.wiquid.fr/depp/chatbot
Developed by Jean-Philippe Rivière - Wiquid
Project Coordination : Isabelle Lavieville, Saskia Keskpaik, Thierry Rocher. 
Authors: Francoise Detienne, Michael Baker, Jean-Marie Burkhard, Ifsttar - Todd Lubart, Cyrille Feybesse, Severine Maggio, Paris Descartes, Lati
*/

define([], function() {
    var dataImport = [{
            "root": {
                "nodeId": "root",
                "parentNode": "#",
                "nodetype": "SQTxt",
                "subType": "Introduction",
                "callButton": true,
                "callButtonLabel": "Continuer",
                "timer": false,
                "delay": "",
                "desti": ["bot0"],
                "title": "Ecrire une histoire originale",
                "html": "<h2>Vous allez inventer une histoire : elle doit sortir de l’ordinaire et être originale. </h2>",
                "resume": "",
                "css": "",
                "js": ""
            }
        }, {
            "bot0": {
                "nodeId": "bot0",
                "parentNode": "root",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["bot2"],
                "actor": "System",
                "html": "Vous ne serez pas seul…",
                "js": ""
            }
        }, {
            "bot2": {
                "nodeId": "bot2",
                "parentNode": "bot0",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["iDoc1"],
                "actor": "Glips",
                "html": "Bonjour, je m’appelle Glips et je serai à tes côtés pour t’aider !",
                "js": ""
            }
        }, {
            "iDoc1": {
                "nodeId": "iDoc1",
                "parentNode": "bot2",
                "nodetype": "IDoc",
                "subType": "Display Int.Document",
                "callButton": true,
                "callButtonLabel": "Valider",
                "timer": false,
                "delay": "",
                "desti": ["bot3"],
                "title": "C'est parti!",
                "html": "<div class='audioContainer'></div> <h2>« Avec Glips, vous allez devoir être créatifs !  Il va falloir faire preuve d’imagination, mais sans écrire n’importe quoi !… »</h2>",
                "css": "",
                "js": ""
            }
        }, {
            "bot3": {
                "nodeId": "bot3",
                "parentNode": "bot2",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["iDoc4"],
                "actor": "System",
                "html": "A présent, vous allez commencer à faire votre histoire. Pour cela, il faut choisir le LIEU où elle se déroule et choisir les PERSONNAGES. <br> D’ abord choisissez le lieu.",
                "js": ""
            }
        }, {
            "iDoc4": {
                "nodeId": "iDoc4",
                "parentNode": "bot3",
                "nodetype": "IDoc",
                "subType": "Display Int.Document",
                "callButton": true,
                "callButtonLabel": "Valider",
                "timer": false,
                "delay": "",
                "desti": ["bot5"],
                "title": "Le lieu de l'histoire",
                "html": "<div><fieldset class='choixDuLieu'></fieldset></div>",
                "css": "",
                "js": ""
            }
        }, {
            "bot5": {
                "nodeId": "bot5",
                "parentNode": "iDoc4",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset6"],
                "actor": "Glips",
                "html": "Est-ce que je peux te proposer un lieu ?",
                "js": ""
            }
        }, {
            "Fst6asw6": {
                "nodeId": "Fst6asw6",
                "parentNode": "Fanset6",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot7"],
                "semantic": "",
                "answerContent": "Oui, fais-moi une proposition.",
                "js": ""
            }
        }, {
            "bot7": {
                "nodeId": "bot7",
                "parentNode": "Fst6asw6",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset8"],
                "actor": "Glips",
                "html": "J’aimerais bien que notre histoire se passe dans une forêt. Tu es d’accord ?",
                "js": ""
            }
        }, {
            "Fst8asw8": {
                "nodeId": "Fst8asw8",
                "parentNode": "Fanset8",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot9"],
                "semantic": "accord soutien +",
                "answerContent": "Oui, Super idée ! ",
                "js": ""
            }
        }, {
            "bot9": {
                "nodeId": "bot9",
                "parentNode": "Fst8asw8",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset13"],
                "actor": "Glips",
                "html": "Tu veux ajouter un élément au lieu que j’ai choisi ?",
                "js": ""
            }
        }, {
            "Fst13asw13": {
                "nodeId": "Fst13asw13",
                "parentNode": "Fanset13",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot10"],
                "semantic": "Elaboration soutien -",
                "answerContent": "Non, ça ne m’intéresse pas.",
                "js": ""
            }
        }, {
            "Fst13asw14": {
                "nodeId": "Fst13asw14",
                "parentNode": "Fanset13",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot10"],
                "semantic": "Elaboration soutien neutre",
                "answerContent": "Non, merci.",
                "js": ""
            }
        }, {
            "Fst13asw15": {
                "nodeId": "Fst13asw15",
                "parentNode": "Fanset13",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot10"],
                "semantic": "",
                "answerContent": "Non, c’est bien comme ça.",
                "js": ""
            }
        },
        {
            "Fst13asw16": {
                "nodeId": "Fst13asw16",
                "parentNode": "Fanset13",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["Fanset76"],
                "semantic": "",
                "answerContent": "Oui, je pense qu’on peut mieux faire.",
                "js": ""
            }
        },
        {
            "Fst13asw17": {
                "nodeId": "Fst13asw17",
                "parentNode": "Fanset13",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["Fanset76"],
                "semantic": "",
                "answerContent": "Oui, je veux bien ajouter quelque chose.",
                "js": ""
            }
        },
        {
            "Fst13asw18": {
                "nodeId": "Fst13asw18",
                "parentNode": "Fanset13",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["Fanset76"],
                "semantic": "",
                "answerContent": "Oui, merci de me le proposer, j’ai peut-être une idée à proposer.",
                "js": ""
            }
        },
        {
            "bot17": {
                "nodeId": "bot17",
                "parentNode": "Fst16asw16",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": true,
                "desti": ["bot20"],
                "actor": "Glips",
                "html": "Super.",
                "js": ""
            }
        }, {
            "Fst8asw9": {
                "nodeId": "Fst8asw9",
                "parentNode": "Fanset8",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot9",
                "semantic": "Accord Soutien neutre",
                "answerContent": "Oui, je suis d’accord avec ta proposition",
                "js": ""
            }
        }, {
            "Fst8asw10": {
                "nodeId": "Fst8asw10",
                "parentNode": "Fanset8",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": "bot9",
                "semantic": "Accord Soutien",
                "answerContent": "Mouais.... je veux bien. ",
                "js": ""
            }
        }, {
            "bot10": {
                "nodeId": "bot10",
                "parentNode": "Fst8asw10",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset11"],
                "actor": "Glips",
                "html": "Pourquoi tu ne veux pas ?",
                "js": ""
            }
        }, {
            "Fst11asw11": {
                "nodeId": "Fst11asw11",
                "parentNode": "Fanset11",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot12"],
                "semantic": "",
                "answerContent": "C’est comme ça.",
                "js": ""
            }
        }, {
            "bot12": {
                "nodeId": "bot12",
                "parentNode": "Fst11asw11",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset18"],
                "actor": "Glips",
                "html": "D’accord. Tu peux me dire pourquoi tu as choisi : XLocation&#8239;?",
                "js": ""
            }
        }, {
            "Fst18asw18": {
                "nodeId": "Fst18asw18",
                "parentNode": "Fanset18",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot19"],
                "semantic": "",
                "answerContent": "Je trouve que c’est original.",
                "js": ""
            }
        }, {
            "bot19": {
                "nodeId": "bot19",
                "parentNode": "Fst18asw18",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["bot20"],
                "actor": "Glips",
                "html": "D’accord, je te suis.",
                "js": ""
            }
        }, {
            "bot20": {
                "nodeId": "bot20",
                "parentNode": "bot51",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["iDoc21"],
                "actor": "System",
                "html": "Maintenant, choisissez les 3 personnages de votre histoire dans la liste proposée.",
                "js": ""
            }
        }, {
            "iDoc21": {
                "nodeId": "iDoc21",
                "parentNode": "bot20",
                "nodetype": "IDoc",
                "subType": "Display Int.Document",
                "callButton": true,
                "callButtonLabel": "Valider",
                "timer": false,
                "delay": "",
                "desti": ["bot22"],
                "title": "Le choix des personnages",
                "html": "<div class='choixPerso'><div class='warningZone'><div class='Missing1'>Choisissez bien <span class='MissMess1'>3</span> personnages...</div><div class='MissMess2'>Il vous en reste <span class='MMValue'></span> à choisir</div><div class='warningChoice'>Oups les 3 propositions sont faites, pour les modifier, désélectionner une proposition</div></div></div>",
                "css": "",
                "js": ""
            }
        }, {
            "bot22": {
                "nodeId": "bot22",
                "parentNode": "iDoc21",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset23"],
                "actor": "Glips",
                "html": "Est-ce que je te propose d'autres personnages ?",
                "js": ""
            }
        }, {
            "Fst23asw23": {
                "nodeId": "Fst23asw23",
                "parentNode": "Fanset23",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot24"],
                "semantic": "",
                "answerContent": "Oui, propose-moi autre chose pour voir.",
                "js": ""
            }
        }, {
            "bot24": {
                "nodeId": "bot24",
                "parentNode": "Fst23asw23",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset25"],
                "actor": "Glips",
                "html": "Je te propose un facteur, une souris et un extraterrestre. Qu’en penses-tu ?",
                "js": ""
            }
        }, {
            "Fst25asw25": {
                "nodeId": "Fst25asw25",
                "parentNode": "Fanset25",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot33"],
                "semantic": "",
                "answerContent": "Non, je trouve ça nul.",
                "js": ""
            }
        }, {
            "bot26": {
                "nodeId": "bot26",
                "parentNode": "Fst25asw25",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset27"],
                "actor": "Glips",
                "html": "Tu veux ajouter quelque chose aux personnages que j’ai choisis ?",
                "js": ""
            }
        }, {
            "Fst27asw27": {
                "nodeId": "Fst27asw27",
                "parentNode": "Fanset27",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot52"],
                "semantic": "",
                "answerContent": "Je n’en ai pas envie.",
                "js": ""
            }
        }, {
            "Fst27asw28": {
                "nodeId": "Fst27asw28",
                "parentNode": "Fanset27",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot52"],
                "semantic": "",
                "answerContent": "Ce n’est pas nécessaire. ",
                "js": ""
            }
        }, {
            "Fst27asw29": {
                "nodeId": "Fst27asw29",
                "parentNode": "Fanset27",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot52"],
                "semantic": "",
                "answerContent": "Non, ce n’est pas utile mais merci quand même ! ",
                "js": ""
            }
        }, {
            "Fst27asw30": {
                "nodeId": "Fst27asw30",
                "parentNode": "Fanset27",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["Fanset29"],
                "semantic": "",
                "answerContent": "D’accord,  mais je ne suis pas convaincu.e. de l’utilité d’ajouter quelque chose.",
                "js": ""
            }
        }, {
            "Fst27asw31": {
                "nodeId": "Fst27asw31",
                "parentNode": "Fanset27",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["Fanset29"],
                "semantic": "",
                "answerContent": "Pourquoi pas. On peut ainsi créer une histoire plus intéressante.",
                "js": ""
            }
        }, {
            "Fst27asw32": {
                "nodeId": "Fst27asw32",
                "parentNode": "Fanset27",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["Fanset29"],
                "semantic": "",
                "answerContent": "Oui, super. Je pense que cela peut apporter un plus à l’histoire.",
                "js": ""
            }
        }, {
            "bot28": {
                "nodeId": "bot28",
                "parentNode": "Fst27asw29",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "1",
                "activShortCut": false,
                "desti": ["Fanset29"],
                "actor": "",
                "html": "...",
                "js": ""
            }
        }, {
            "Fst29asw29": {
                "nodeId": "Fst29asw29",
                "parentNode": "Fanset29",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot30"],
                "semantic": "",
                "answerContent": "ABC",
                "js": ""
            }
        }, {
            "bot30": {
                "nodeId": "bot30",
                "parentNode": "Fst29asw29",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["bot37"],
                "actor": "Glips",
                "html": "Très bonne idée !",
                "js": ""
            }
        }, {
            "bot37": {
                "nodeId": "bot37",
                "parentNode": "bot30",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["iDoc38"],
                "actor": "System",
                "html": "Comment voulez-vous appeler votre personnage ?",
                "js": ""
            }
        }, {
            "iDoc38": {
                "nodeId": "iDoc38",
                "parentNode": "bot37",
                "nodetype": "IDoc",
                "subType": "Display Int.Document",
                "callButton": true,
                "callButtonLabel": "Valider",
                "timer": false,
                "delay": "",
                "desti": ["bot39"],
                "title": "Le nom du premier personnage",
                "html": "<div class='premierPerso'><p>Ecrire ci-dessous le nom du premier personnage.</p><input class='prem' type='text'></div>",
                "css": "",
                "js": ""
            }
        }, {
            "bot39": {
                "nodeId": "bot39",
                "parentNode": "iDoc38",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["iDoc40"],
                "actor": "System",
                "html": "<div class='audiotest'></div>Pour le deuxième personnage, choisissez un nom dans la liste ci-contre : ",
                "js": ""
            }
        }, {
            "iDoc40": {
                "nodeId": "iDoc40",
                "parentNode": "bot39",
                "nodetype": "IDoc",
                "subType": "Display Int.Document",
                "callButton": true,
                "callButtonLabel": "Valider",
                "timer": false,
                "delay": "",
                "desti": ["bot41"],
                "title": "Le nom du second personnage ",
                "html": '<fieldset> <legend>Choisissez un nom dans la liste. </legend> <input type="radio" name="persoRadio" id="persoRadio-1" value="Eolia"> <label for="persoRadio-1">Eolia</label><br /> <input type="radio" name="persoRadio" id="persoRadio-2" value="Dune"> <label for="persoRadio-2">Dune</label><br /> <input type="radio" name="persoRadio" id="persoRadio-3" value="Maya"> <label for="persoRadio-3">Maya</label><br /> <input type="Radio" name="persoRadio" id="persoRadio-4" value="Cleon"> <label for="persoRadio-4">Cléon</label><br /> <input type="radio" name="persoRadio" id="persoRadio-5" value="Nikita"> <label for="persoRadio-5">Nikita</label> </fieldset>',
                "css": "",
                "js": ""
            }
        }, {
            "bot41": {
                "nodeId": "bot41",
                "parentNode": "iDoc40",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["bot42"],
                "actor": "System",
                "html": "Le nom du troisième personnage vous sera imposé, ce sera Alix.",
                "js": ""
            }
        }, {
            "bot42": {
                "nodeId": "bot42",
                "parentNode": "bot41",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["iDoc43"],
                "actor": "System",
                "html": "Vous allez bientôt créer votre histoire originale. Pour vous aider, on vous propose trois verbes, et un autre à sélectionner.",
                "js": ""
            }
        }, {
            "iDoc43": {
                "nodeId": "iDoc43",
                "parentNode": "bot42",
                "nodetype": "IDoc",
                "subType": "Display Int.Document",
                "callButton": true,
                "callButtonLabel": "Valider",
                "timer": false,
                "delay": "",
                "desti": ["bot44"],
                "title": "Verbes pour créer un début d'histoire original",
                "html": "<div class='verbGlips'></div><fieldset class='verbs'></fieldset>",
                "css": "",
                "js": ""
            }
        }, {
            "bot44": {
                "nodeId": "bot44",
                "parentNode": "iDoc43",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset45"],
                "actor": "Glips",
                "html": "Tu veux que je te propose un verbe ou tu conserves ton choix ?",
                "js": ""
            }
        }, {
            "Fst45asw45": {
                "nodeId": "Fst45asw45",
                "parentNode": "Fanset45",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot46"],
                "semantic": "",
                "answerContent": "Vas-y, propose !",
                "js": ""
            }
        }, {
            "bot46": {
                "nodeId": "bot46",
                "parentNode": "Fst45asw45",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset47"],
                "actor": "Glips",
                "html": "Je propose qu’au début de l’histoire, on ajoute le verbe <i>s'envoler</i> car cela va créer un effet de surprise. Qu’en penses-tu ?",
                "js": ""
            }
        }, {
            "Fst47asw47": {
                "nodeId": "Fst47asw47",
                "parentNode": "Fanset47",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": "bot53",
                "semantic": "",
                "answerContent": "Laisse tomber, c’est nul !",
                "js": ""
            }
        }, {
            "bot48": {
                "nodeId": "bot48",
                "parentNode": "Fst47asw47",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset49"],
                "actor": "Glips",
                "html": "Tu veux ajouter quelque chose ?",
                "js": ""
            }
        }, {
            "Fst49asw49": {
                "nodeId": "Fst49asw49",
                "parentNode": "Fanset49",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot52",
                "semantic": "",
                "answerContent": "Je n’en ai pas envie.",
                "js": ""
            }
        }, {
            "Fst49asw50": {
                "nodeId": "Fst49asw50",
                "parentNode": "Fanset49",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot52",
                "semantic": "",
                "answerContent": "Non, je ne veux rien ajouter.",
                "js": ""
            }
        }, {
            "Fst49asw51": {
                "nodeId": "Fst49asw51",
                "parentNode": "Fanset49",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": "bot52",
                "semantic": "",
                "answerContent": "Non, ton idée est bonne.",
                "js": ""
            }
        }, {
            "Fst49asw52": {
                "nodeId": "Fst49asw52",
                "parentNode": "Fanset49",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["Fanset51"],
                "semantic": "",
                "answerContent": "Oui, on peut trouver mieux.",
                "js": ""
            }
        }, {
            "Fst49asw53": {
                "nodeId": "Fst49asw53",
                "parentNode": "Fanset49",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["Fanset51"],
                "semantic": "",
                "answerContent": "Oui, j’ai une idée à proposer.",
                "js": ""
            }
        }, {
            "Fst49asw54": {
                "nodeId": "Fst49asw54",
                "parentNode": "Fanset49",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["Fanset51"],
                "semantic": "",
                "answerContent": "Oui, ça va m’aider pour la suite.",
                "js": ""
            }
        }, {
            "bot50": {
                "nodeId": "bot50",
                "parentNode": "Fst49asw51",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "-1",
                "activShortCut": false,
                "desti": ["Fanset51"],
                "actor": "System",
                "html": "...",
                "js": ""
            }
        }, {
            "Fst51asw51": {
                "nodeId": "Fst51asw51",
                "parentNode": "Fanset51",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot54"],
                "semantic": "",
                "answerContent": "Je propose que tous les personnages de notre histoire soient empoisonnés.",
                "js": ""
            }
        }, {
            "bot52": {
                "nodeId": "bot52",
                "parentNode": "Fst51asw51",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["bot58"],
                "actor": "Glips",
                "html": "Super.",
                "js": ""
            }
        }, {
            "Fst51asw52": {
                "nodeId": "Fst51asw52",
                "parentNode": "Fanset51",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot52",
                "semantic": "",
                "answerContent": "Je propose que personne ne soit empoisonné dans notre histoire.",
                "js": ""
            }
        }, {
            "Fst51asw53": {
                "nodeId": "Fst51asw53",
                "parentNode": "Fanset51",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot52",
                "semantic": "",
                "answerContent": "Je propose que l’empoisonnement soit décrit de manière violente.",
                "js": ""
            }
        }, {
            "Fst47asw48": {
                "nodeId": "Fst47asw48",
                "parentNode": "Fanset47",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot53",
                "semantic": "",
                "answerContent": "Non, je ne suis pas d’accord avec ta proposition.",
                "js": ""
            }
        }, {
            "Fst47asw49": {
                "nodeId": "Fst47asw49",
                "parentNode": "Fanset47",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": "bot53",
                "semantic": "",
                "answerContent": "Intéressant mais pas là...",
                "js": ""
            }
        }, {
            "bot53": {
                "nodeId": "bot53",
                "parentNode": "Fst47asw49",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset54"],
                "actor": "Glips",
                "html": "Pourquoi tu ne veux pas de mon aide ?",
                "js": ""
            }
        }, {
            "Fst54asw54": {
                "nodeId": "Fst54asw54",
                "parentNode": "Fanset54",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot55"],
                "semantic": "",
                "answerContent": "Parce que.",
                "js": ""
            }
        }, {
            "bot55": {
                "nodeId": "bot55",
                "parentNode": "Fst54asw54",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset56"],
                "actor": "Glips",
                "html": "J’aimerais savoir pourquoi tu as choisi  Xverb&#8239;?",
                "js": ""
            }
        }, {
            "Fst56asw56": {
                "nodeId": "Fst56asw56",
                "parentNode": "Fanset56",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot57"],
                "semantic": "",
                "answerContent": "Parce que ça me plaît.",
                "js": ""
            }
        }, {
            "bot57": {
                "nodeId": "bot57",
                "parentNode": "Fst56asw56",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["bot58"],
                "actor": "Glips",
                "html": "C’est toi qui décides.",
                "js": ""
            }
        }, {
            "bot58": {
                "nodeId": "bot58",
                "parentNode": "bot57",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["iDoc59"],
                "actor": "System",
                "html": "C’est à vous ! Imaginez un maximum de débuts d’histoire. Vous avez 8 minutes pour les écrire. <span class='callMemo'> Cliquez ici </span> pour voir les choix que vous avez déjà faits (lieu, choix des personnages, noms, idées pour réaliser votre début d'histoire originale …)",
                "js": ""
            }
        }, {
            "iDoc59": {
                "nodeId": "iDoc59",
                "parentNode": "bot58",
                "nodetype": "IDoc",
                "subType": "Display Int.Document",
                "callButton": true,
                "callButtonLabel": "Valider",
                "timer": false,
                "delay": 100, //300
                "desti": ["bot60"], //bot60 Non effectif, hard coded !!!
                "title": "Les débuts d'histoire",
                "html": "<div class='audioConsi'></div><div class='clock'><span class='minutes'>00</span>:<span class='seconde'>00</span></div><div class='debhist'></div><div class='clock'></div>",
                "css": "",
                "js": ""
            }
        }, {
            "bot60": {
                "nodeId": "bot60",
                "parentNode": "iDoc59",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset77"],
                "actor": "System",
                "html": "Pour développer vos histoires, vous allez pouvoir situer vos personnages dans une autre époque. Vous pouvez faire appel à Glips pour avoir des idées.",
                "js": ""
            }
        }, {
            "iDoc61": {
                "nodeId": "iDoc61",
                "parentNode": "bot79",
                "nodetype": "IDoc",
                "subType": "Display Int.Document",
                "callButton": true,
                "callButtonLabel": "Valider",
                "timer": false,
                "delay": "",
                "desti": ["bot62"],
                "title": "Quatre mots pour finir votre histoire",
                "html": "<div>Choisissez un mot dans la liste.</div><div class='motsGlips'></div><div class='mots'></div>",
                "css": "",
                "js": ""
            }
        }, {
            "iDoc63": {
                "nodeId": "iDoc63",
                "parentNode": "bot89",
                "nodetype": "IDoc",
                "subType": "Display Int.Document",
                "callButton": true,
                "callButtonLabel": "Valider",
                "timer": false,
                "delay": "",
                "desti": ["bot90"],
                "title": "Un son pour illustrer votre histoire",
                "html": "<div class='consignAtmo'>Pour finir l’exercice, on vous propose de choisir une bande son qui pourrait correspondre à l’atmosphère de votre histoire originale.</div><div class='sonAtmo'></div>",
                "css": "",
                "js": ""
            }
        }, {
            "bot62": {
                "nodeId": "bot62",
                "parentNode": "iDoc61",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset63"],
                "actor": "Glips",
                "html": "Tu veux que je te propose un autre mot ?",
                "js": ""
            }
        }, {
            "Fst63asw63": {
                "nodeId": "Fst63asw63",
                "parentNode": "Fanset63",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot88"],
                "semantic": "",
                "answerContent": "Non, c’est comme ça et c’est pas autrement.",
                "js": ""
            }
        }, {
            "bot68": {
                "nodeId": "bot68",
                "parentNode": "Fst67asw69",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "1",
                "activShortCut": false,
                "desti": ["Fanset69"],
                "actor": "System",
                "html": "...",
                "js": ""
            }
        }, {
            "bot70": {
                "nodeId": "bot70",
                "parentNode": "Fst69asw69",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["bot76"],
                "actor": "Glips",
                "html": "Super.",
                "js": ""
            }
        }, {
            "bot71": {
                "nodeId": "bot71",
                "parentNode": "Fst65asw67",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset72"],
                "actor": "Glips",
                "html": "D’accord. Tu peux me dire pourquoi tu as choisi Xidea&#8239;?",
                "js": ""
            }
        }, {
            "Fst72asw72": {
                "nodeId": "Fst72asw72",
                "parentNode": "Fanset72",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot73"],
                "semantic": "",
                "answerContent": "Mais parce que !",
                "js": ""
            }
        }, {
            "bot73": {
                "nodeId": "bot73",
                "parentNode": "Fst72asw72",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["bot76"],
                "actor": "Glips",
                "html": "D’accord.",
                "js": ""
            }
        }, {
            "bot76": {
                "nodeId": "bot76",
                "parentNode": "bot73",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["iDoc77"],
                "actor": "System",
                "html": "Imaginez un maximum de fins d’histoire. Vous avez 8 minutes pour les écrire.<span class = 'callMemo'> Cliquez ici </span> pour voir les choix que vous avez déjà faits.",
                "js": ""
            }
        }, {
            "iDoc77": {
                "nodeId": "iDoc77",
                "parentNode": "bot76",
                "nodetype": "IDoc",
                "subType": "Display Int.Document",
                "callButton": true,
                "callButtonLabel": "Valider",
                "timer": false,
                "delay": 100, //300
                "desti": ["bot78"],
                "title": "Les fins d'histoire",
                "html": "<div class='audioConsi'></div><div class='clock'><span class='minutes'>00</span>:<span class='seconde'>00</span></div><div class='finhist'></div><div class='clock'></div>",
                "css": "",
                "js": ""
            }
        }, {
            "bot78": {
                "nodeId": "bot78",
                "parentNode": "iDoc77",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["iDoc79"],
                "actor": "System",
                "html": "De toutes vos propositions, choisissez le début et la fin d’histoire qui vous semblent les plus originaux.",
                "js": ""
            }
        }, {
            "iDoc79": {
                "nodeId": "iDoc79",
                "parentNode": "bot78",
                "nodetype": "IDoc",
                "subType": "Display Int.Document",
                "callButton": true,
                "callButtonLabel": "Valider",
                "timer": false,
                "delay": "",
                "desti": ["iDoc80"],
                "title": "Le début d'histoire le plus original",
                "html": "<p>De toutes vos propositions, choisissez celle qui est la plus originale.</p><div class='choixDebs'></div>",
                "css": "",
                "js": ""
            }
        }, {
            "iDoc80": {
                "nodeId": "iDoc80",
                "parentNode": "iDoc79",
                "nodetype": "IDoc",
                "subType": "Display Int.Document",
                "callButton": true,
                "callButtonLabel": "Valider",
                "timer": false,
                "delay": "",
                "desti": ["bot81"],
                "title": "La fin d'histoire la plus originale",
                "html": "<p>De toutes vos propositions, choisissez celle qui est la plus originale.</p><div class='choixFins'></div>",
                "css": "",
                "js": ""
            }
        }, {
            "bot81": {
                "nodeId": "bot81",
                "parentNode": "iDoc80",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset82"],
                "actor": "Glips",
                "html": "Si on ne t’avait pas précisé « originale » aurais-tu fait le même choix ?",
                "js": ""
            }
        }, {
            "Fst82asw82": {
                "nodeId": "Fst82asw82",
                "parentNode": "Fanset82",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot89"],
                "semantic": "",
                "answerContent": "Oui, j’aurais fait le même choix.",
                "js": ""
            }
        }, {
            "Fst82asw83": {
                "nodeId": "Fst82asw83",
                "parentNode": "Fanset82",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot89"],
                "semantic": "",
                "answerContent": "Non, j’aurais fait un autre choix.",
                "js": ""
            }
        }, {
            "conclu83": {
                "nodeId": "conclu83",
                "parentNode": "Fst82asw83",
                "nodetype": "SQTxt",
                "subType": "Conclusion",
                "callButton": false,
                "callButtonLabel": "",
                "timer": false,
                "delay": "",
                "desti": [],
                "title": "Fin de l'exercice",
                "html": "<hr><p>Voilà l'exercice est terminé. Pas facile de créer une histoire, mais vous y êtes parvenu(e). Merci de votre participation !</p>",
                "resume": "",
                "css": "",
                "js": ""
            }
        }, {
            "Fst72asw73": {
                "nodeId": "Fst72asw73",
                "parentNode": "Fanset72",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot73",
                "semantic": "",
                "answerContent": "J’ai déjà utilisé ça en classe dans mes rédactions.",
                "js": ""
            }
        }, {
            "Fst72asw74": {
                "nodeId": "Fst72asw74",
                "parentNode": "Fanset72",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot73",
                "semantic": "",
                "answerContent": "J’ai déjà utilisé cet élément en classe dans mes rédactions.",
                "js": ""
            }
        }, {
            "Fst63asw64": {
                "nodeId": "Fst63asw64",
                "parentNode": "Fanset63",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot88"],
                "semantic": "",
                "answerContent": "Ce n’est pas la peine. ",
                "js": ""
            }
        }, {
            "Fst63asw65": {
                "nodeId": "Fst63asw65",
                "parentNode": "Fanset63",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot88"],
                "semantic": "",
                "answerContent": "Bien essayé mais non merci !",
                "js": ""
            }
        }, {
            "Fst63asw66": {
                "nodeId": "Fst63asw66",
                "parentNode": "Fanset63",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot80"],
                "semantic": "",
                "answerContent": "Oui, fais ta proposition si tu veux mais ça ne m’emballe pas.",
                "js": ""
            }
        }, {
            "Fst63asw67": {
                "nodeId": "Fst63asw67",
                "parentNode": "Fanset63",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot80"],
                "semantic": "",
                "answerContent": "Oui, les mots proposés ne me plaisent pas.",
                "js": ""
            }
        }, {
            "Fst63asw68": {
                "nodeId": "Fst63asw68",
                "parentNode": "Fanset63",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot80"],
                "semantic": "",
                "answerContent": "Oui, ce serait sympa, ça pourra m’aider pour la suite.",
                "js": ""
            }
        }, {
            "bot74": {
                "nodeId": "bot74",
                "parentNode": "Fst63asw64",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset75"],
                "actor": "Glips",
                "html": "Pourquoi tu ne veux pas que je te fasse une proposition ?",
                "js": ""
            }
        }, {
            "Fst75asw75": {
                "nodeId": "Fst75asw75",
                "parentNode": "Fanset75",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot71",
                "semantic": "",
                "answerContent": "C’est comme ça.",
                "js": ""
            }
        }, {
            "Fst75asw76": {
                "nodeId": "Fst75asw76",
                "parentNode": "Fanset75",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot71",
                "semantic": "",
                "answerContent": "Parce c’est moi qui décide.",
                "js": ""
            }
        }, {
            "Fst75asw77": {
                "nodeId": "Fst75asw77",
                "parentNode": "Fanset75",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot71",
                "semantic": "",
                "answerContent": "Je ne sais pas.",
                "js": ""
            }
        }, {
            "Fst56asw57": {
                "nodeId": "Fst56asw57",
                "parentNode": "Fanset56",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot57",
                "semantic": "",
                "answerContent": "Je trouve que ça va bien ensemble.",
                "js": ""
            }
        }, {
            "Fst54asw55": {
                "nodeId": "Fst54asw55",
                "parentNode": "Fanset54",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot55",
                "semantic": "",
                "answerContent": "Je n'en ai aucune idée.",
                "js": ""
            }
        }, {
            "Fst54asw56": {
                "nodeId": "Fst54asw56",
                "parentNode": "Fanset54",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot55",
                "semantic": "",
                "answerContent": "Merci, mais pas ici.",
                "js": ""
            }
        }, {
            "Fst54asw57": {
                "nodeId": "Fst54asw57",
                "parentNode": "Fanset54",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot55",
                "semantic": "",
                "answerContent": "Parce que tes propositions sont nulles.",
                "js": ""
            }
        }, {
            "Fst54asw58": {
                "nodeId": "Fst54asw58",
                "parentNode": "Fanset54",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot55",
                "semantic": "",
                "answerContent": "J’aimerais qu’on avance.",
                "js": ""
            }
        }, {
            "Fst54asw59": {
                "nodeId": "Fst54asw59",
                "parentNode": "Fanset54",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot55",
                "semantic": "",
                "answerContent": "Tu as sans doute une bonne idée mais là notre histoire avance bien.",
                "js": ""
            }
        }, {
            "Fst47asw50": {
                "nodeId": "Fst47asw50",
                "parentNode": "Fanset47",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot48",
                "semantic": "",
                "answerContent": "Ok, mais j’y avais pensé moi aussi !",
                "js": ""
            }
        }, {
            "Fst47asw51": {
                "nodeId": "Fst47asw51",
                "parentNode": "Fanset47",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot48",
                "semantic": "",
                "answerContent": "D’accord ça me va on fait comme ça, c’est une idée qui me plaît.",
                "js": ""
            }
        }, {
            "Fst47asw52": {
                "nodeId": "Fst47asw52",
                "parentNode": "Fanset47",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot48",
                "semantic": "",
                "answerContent": "C’est top ! L’idée va plaire.",
                "js": ""
            }
        }, {
            "Fst45asw46": {
                "nodeId": "Fst45asw46",
                "parentNode": "Fanset45",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot53",
                "semantic": "",
                "answerContent": "Non, on continue avec ce que j'ai dit.",
                "js": ""
            }
        }, {
            "Fst25asw26": {
                "nodeId": "Fst25asw26",
                "parentNode": "Fanset25",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot33",
                "semantic": "",
                "answerContent": "Ça ne me plaît pas trop.",
                "js": ""
            }
        }, {
            "Fst25asw27": {
                "nodeId": "Fst25asw27",
                "parentNode": "Fanset25",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot33"],
                "semantic": "",
                "answerContent": "Bien essayé mais non merci.",
                "js": ""
            }
        },
        {
            "Fst25asw28": {
                "nodeId": "Fst25asw28",
                "parentNode": "Fanset25",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot26"],
                "semantic": "",
                "answerContent": "Comme tu veux mais je ne suis pas convaincu.e.",
                "js": ""
            }
        },
        {
            "Fst25asw29": {
                "nodeId": "Fst25asw29",
                "parentNode": "Fanset25",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot26"],
                "semantic": "",
                "answerContent": "Ça marche.",
                "js": ""
            }
        },
        {
            "Fst25asw30": {
                "nodeId": "Fst25asw30",
                "parentNode": "Fanset25",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot26"],
                "semantic": "",
                "answerContent": "Oui c’est bien trouvé !",
                "js": ""
            }
        },
        {
            "bot31": {
                "nodeId": "bot31",
                "parentNode": "Fst25asw27",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset32"],
                "actor": "Glips",
                "html": "Pourquoi tu ne veux pas que je te fasse une proposition ?",
                "js": ""
            }
        }, {
            "Fst32asw32": {
                "nodeId": "Fst32asw32",
                "parentNode": "Fanset32",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot33"],
                "semantic": "",
                "answerContent": "C’est comme ça.",
                "js": ""
            }
        }, {
            "bot33": {
                "nodeId": "bot33",
                "parentNode": "Fst32asw32",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset35"],
                "actor": "Glips",
                "html": "D’accord. Tu peux me dire pourquoi tu as choisi Xperso&#8239;?",
                "js": ""
            }
        }, {
            "Fst35asw35": {
                "nodeId": "Fst35asw35",
                "parentNode": "Fanset35",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": false,
                "desti": ["bot36"],
                "semantic": "",
                "answerContent": "Ça me donne plein d’idées pour la suite. ",
                "js": ""
            }
        }, {
            "bot36": {
                "nodeId": "bot36",
                "parentNode": "Fst35asw35",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": true,
                "desti": ["bot37"],
                "actor": "Glips",
                "html": "Ok on fait comme ça.",
                "js": ""
            }
        }, {
            "Fst35asw36": {
                "nodeId": "Fst35asw36",
                "parentNode": "Fanset35",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot36",
                "semantic": "",
                "answerContent": "Parce qu’il fallait bien faire un choix.",
                "js": ""
            }
        }, {
            "Fst32asw33": {
                "nodeId": "Fst32asw33",
                "parentNode": "Fanset32",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot33",
                "semantic": "",
                "answerContent": "Je ne sais pas.",
                "js": ""
            }
        }, {
            "Fst32asw34": {
                "nodeId": "Fst32asw34",
                "parentNode": "Fanset32",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot33",
                "semantic": "",
                "answerContent": "Parce c’est moi qui décide.",
                "js": ""
            }
        }, {
            "Fst23asw24": {
                "nodeId": "Fst23asw24",
                "parentNode": "Fanset23",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot33",
                "semantic": "",
                "answerContent": "Ce n’est pas la peine.",
                "js": ""
            }
        }, {
            "Fst18asw19": {
                "nodeId": "Fst18asw19",
                "parentNode": "Fanset18",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot19",
                "semantic": "",
                "answerContent": "Parce qu’il faut bien répondre à la question.",
                "js": ""
            }
        }, {
            "Fst11asw12": {
                "nodeId": "Fst11asw12",
                "parentNode": "Fanset11",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot12",
                "semantic": "",
                "answerContent": "Je ne sais pas.",
                "js": ""
            }
        }, {
            "Fst11asw13": {
                "nodeId": "Fst11asw13",
                "parentNode": "Fanset11",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot12",
                "semantic": "",
                "answerContent": "Une prochaine fois peut-être.",
                "js": ""
            }
        },
        {
            "Fst11asw14": {
                "nodeId": "Fst11asw14",
                "parentNode": "Fanset11",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot12",
                "semantic": "",
                "answerContent": "Parce c’est moi qui décide.",
                "js": ""
            }
        },
        {
            "Fst11asw15": {
                "nodeId": "Fst11asw15",
                "parentNode": "Fanset11",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot12",
                "semantic": "",
                "answerContent": "Parce que je veux passer à la suite.",
                "js": ""
            }
        },
        {
            "Fst11asw16": {
                "nodeId": "Fst11asw16",
                "parentNode": "Fanset11",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot12",
                "semantic": "",
                "answerContent": "Ne le prends pas mal mais j’adore mon idée.",
                "js": ""
            }
        }, {
            "Fst8asw11": {
                "nodeId": "Fst8asw11",
                "parentNode": "Fanset8",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot10",
                "semantic": "Désaccord Soutien + ",
                "answerContent": "Non, mais merci.",
                "js": ""
            }
        },
        {
            "Fst8asw12": {
                "nodeId": "Fst8asw12",
                "parentNode": "Fanset8",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot10",
                "semantic": "Désaccord soutien neutre",
                "answerContent": "Je n’aime pas cette idée.",
                "js": ""
            }
        },
        {
            "Fst8asw13": {
                "nodeId": "Fst8asw13",
                "parentNode": "Fanset8",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot10",
                "semantic": "Désaccord Soutien -",
                "answerContent": "Ah non, c’est vraiment pas terrible. ",
                "js": ""
            }
        },

        {
            "Fst6asw7": {
                "nodeId": "Fst6asw7",
                "parentNode": "Fanset6",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot12",
                "semantic": "",
                "answerContent": "Non, on garde ma proposition.",
                "js": ""
            }
        }, {
            "Fanset6": {
                "nodeId": "Fanset6",
                "nodetype": "Fanset",
                "parentNode": "bot5",
                "desti": ["Fst6asw6", "Fst6asw7"]
            }
        }, {
            "Fanset8": {
                "nodeId": "Fanset8",
                "nodetype": "Fanset",
                "parentNode": "bot7",
                "desti": ["Fst8asw8", "Fst8asw9", "Fst8asw10", "Fst8asw11", "Fst8asw12", "Fst8asw13"]
            }
        }, {
            "Fanset13": {
                "nodeId": "Fanset13",
                "nodetype": "Fanset",
                "parentNode": "bot9",
                "desti": ["Fst13asw13", "Fst13asw14", "Fst13asw15", "Fst13asw16", "Fst13asw17", "Fst13asw18"]
            }
        }, {
            "Fanset11": {
                "nodeId": "Fanset11",
                "nodetype": "Fanset",
                "parentNode": "bot10",
                "desti": ["Fst11asw11", "Fst11asw12", "Fst11asw13", "Fst11asw14", "Fst11asw15", "Fst11asw16"]
            }
        }, {
            "Fanset18": {
                "nodeId": "Fanset18",
                "nodetype": "Fanset",
                "parentNode": "bot12",
                "desti": ["Fst18asw18", "Fst18asw19"]
            }
        }, {
            "Fanset23": {
                "nodeId": "Fanset23",
                "nodetype": "Fanset",
                "parentNode": "bot22",
                "desti": ["Fst23asw23", "Fst23asw24"]
            }
        }, {
            "Fanset25": {
                "nodeId": "Fanset25",
                "nodetype": "Fanset",
                "parentNode": "bot24",
                "desti": ["Fst25asw25", "Fst25asw26", "Fst25asw27", "Fst25asw28", "Fst25asw29", "Fst25asw30"]
            }
        }, {
            "Fanset27": {
                "nodeId": "Fanset27",
                "nodetype": "Fanset",
                "parentNode": "bot26",
                "desti": ["Fst27asw27", "Fst27asw28", "Fst27asw29", "Fst27asw30", "Fst27asw31", "Fst27asw32"]
            }
        }, {
            "Fanset29": {
                "nodeId": "Fanset29",
                "nodetype": "Fanset",
                "parentNode": "bot28",
                "desti": ["Fst29asw29"]
            }
        }, {
            "Fanset45": {
                "nodeId": "Fanset45",
                "nodetype": "Fanset",
                "parentNode": "bot44",
                "desti": ["Fst45asw45", "Fst45asw46"]
            }
        }, {
            "Fanset47": {
                "nodeId": "Fanset47",
                "nodetype": "Fanset",
                "parentNode": "bot46",
                "desti": ["Fst47asw47", "Fst47asw48", "Fst47asw49", "Fst47asw50", "Fst47asw51", "Fst47asw52"]
            }
        }, {
            "Fanset49": {
                "nodeId": "Fanset49",
                "nodetype": "Fanset",
                "parentNode": "bot48",
                "desti": ["Fst49asw49", "Fst49asw50", "Fst49asw51", "Fst49asw52", "Fst49asw53", "Fst49asw54"]
            }
        }, {
            "Fanset51": {
                "nodeId": "Fanset51",
                "nodetype": "Fanset",
                "parentNode": "bot50",
                "desti": ["Fst51asw51"]
            }
        }, {
            "Fanset54": {
                "nodeId": "Fanset54",
                "nodetype": "Fanset",
                "parentNode": "bot53",
                "desti": ["Fst54asw54", "Fst54asw55", "Fst54asw56", "Fst54asw57", "Fst54asw58", "Fst54asw59"]
            }
        }, {
            "Fanset56": {
                "nodeId": "Fanset56",
                "nodetype": "Fanset",
                "parentNode": "bot55",
                "desti": ["Fst56asw56", "Fst56asw57"]
            }
        }, {
            "Fanset63": {
                "nodeId": "Fanset63",
                "nodetype": "Fanset",
                "parentNode": "bot62",
                "desti": ["Fst63asw63", "Fst63asw64", "Fst63asw65", "Fst63asw66", "Fst63asw67", "Fst63asw68"]
            }
        }, {
            "Fanset72": {
                "nodeId": "Fanset72",
                "nodetype": "Fanset",
                "parentNode": "bot71",
                "desti": ["Fst72asw72", "Fst72asw73"]
            }
        }, {
            "Fanset82": {
                "nodeId": "Fanset82",
                "nodetype": "Fanset",
                "parentNode": "bot81",
                "desti": ["Fst82asw82", "Fst82asw83"]
            }
        },
        {
            "Fanset83": {
                "nodeId": "Fanset83",
                "nodetype": "Fanset",
                "parentNode": "bot52",
                "desti": ["Fst83asw83", "Fst83asw84", "Fst83asw85", "Fst83asw86", "Fst83asw87", "Fst83asw88"]
            }
        },
        {
            "Fanset84": {
                "nodeId": "Fanset84",
                "nodetype": "Fanset",
                "parentNode": "bot85",
                "desti": ["Fst84asw84", "Fst84asw85"]
            }
        }, {
            "Fanset85": {
                "nodeId": "Fanset85",
                "nodetype": "Fanset",
                "parentNode": "bot85",
                "desti": ["Fst85asw85"]
            }
        }, {
            "Fanset86": {
                "nodeId": "Fanset86",
                "nodetype": "Fanset",
                "parentNode": "bot88",
                "desti": ["Fst86asw86", "Fst86asw87", "Fst86asw88", "Fst86asw89", "Fst86asw90", "Fst86asw91"]
            }
        },
        {
            "Fanset75": {
                "nodeId": "Fanset75",
                "nodetype": "Fanset",
                "parentNode": "bot74",
                "desti": ["Fst75asw75", "Fst75asw76", "Fst75asw77"]
            }
        }, {
            "Fanset32": {
                "nodeId": "Fanset32",
                "nodetype": "Fanset",
                "parentNode": "bot31",
                "desti": ["Fst32asw32", "Fst32asw33", "Fst32asw34"]
            }
        }, {
            "Fanset35": {
                "nodeId": "Fanset35",
                "nodetype": "Fanset",
                "parentNode": "bot33",
                "desti": ["Fst35asw35", "Fst35asw36"]
            }
        }, {
            "Fanset76": {
                "nodeId": "Fanset76",
                "nodetype": "Fanset",
                "parentNode": "bot33",
                "desti": ["Fst76asw76"]
            }
        }, {
            "Fanset77": {
                "nodeId": "Fanset77",
                "nodetype": "Fanset",
                "parentNode": "bot60",
                "desti": ["Fst77asw77", "Fst77asw78"]
            }
        },
        {
            "Fanset78": {
                "nodeId": "Fanset78",
                "nodetype": "Fanset",
                "parentNode": "Fst77asw78",
                "desti": ["Fst78asw78"]
            }
        }, {
            "Fanset79": {
                "nodeId": "Fanset79",
                "nodetype": "Fanset",
                "parentNode": "--",
                "desti": ["Fst79asw79", "Fst79asw80", "Fst79asw81", "Fst79asw82", "Fst79asw83", "Fst79asw84"]
            }
        }, {
            "Fanset80": {
                "nodeId": "Fanset80",
                "nodetype": "Fanset",
                "parentNode": "bot82",
                "desti": ["Fst80asw80", "Fst80asw81", "Fst80asw82", "Fst80asw83", "Fst80asw84", "Fst80asw85"]
            }
        }, {
            "Fanset81": {
                "nodeId": "Fanset81",
                "nodetype": "Fanset",
                "parentNode": "--",
                "desti": ["Fst81asw81", "Fst81asw82", "Fst81asw83", "Fst81asw84", "Fst81asw85", "Fst81asw86"]
            }
        }, {
            "Fanset87": {
                "nodeId": "Fanset87",
                "nodetype": "Fanset",
                "parentNode": "bot90",
                "desti": ["Fst87asw87", "Fst87asw88"]
            }
        }, {
            "Fanset88": {
                "nodeId": "Fanset88",
                "nodetype": "Fanset",
                "parentNode": "bot91",
                "desti": ["Fst88asw88", "Fst88asw89", "Fst88asw90", "Fst88asw91", "Fst88asw92", "Fst88asw93"]
            }
        }, {
            "Fanset89": {
                "nodeId": "Fanset89",
                "nodetype": "Fanset",
                "parentNode": "bot92",
                "desti": ["Fst89asw89", "Fst89asw90", "Fst89asw91", "Fst89asw92", "Fst89asw93", "Fst89asw94"]
            }
        }, {
            "Fanset90": {
                "nodeId": "Fanset90",
                "nodetype": "Fanset",
                "parentNode": "bot93",
                "desti": ["Fst90asw90", "Fst90asw91", "Fst90asw92", "Fst90asw93", "Fst90asw94", "Fst90asw95"]
            }
        }, {
            "Fst86asw86": {
                "nodeId": "Fst86asw86",
                "parentNode": "Fanset86",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot71",
                "semantic": "",
                "answerContent": "C’est comme ça et pas autrement.",
                "js": ""
            }
        },
        {
            "Fst86asw87": {
                "nodeId": "Fst86asw87",
                "parentNode": "Fanset86",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot71",
                "semantic": "",
                "answerContent": "Je ne peux pas t’expliquer...",
                "js": ""
            }
        }, {
            "Fst86asw88": {
                "nodeId": "Fst86asw88",
                "parentNode": "Fanset86",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot71",
                "semantic": "",
                "answerContent": "Une prochaine fois, je te remercie.",
                "js": ""
            }
        }, {
            "Fst86asw89": {
                "nodeId": "Fst86asw89",
                "parentNode": "Fanset86",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot71",
                "semantic": "",
                "answerContent": "Parce j’ai quand même de meilleures idées que toi. ",
                "js": ""
            }
        }, {
            "Fst86asw90": {
                "nodeId": "Fst86asw90",
                "parentNode": "Fanset86",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot71",
                "semantic": "",
                "answerContent": "J’aimerais finir l’exercice.",
                "js": ""
            }
        }, {
            "Fst86asw91": {
                "nodeId": "Fst86asw91",
                "parentNode": "Fanset86",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot71",
                "semantic": "",
                "answerContent": " Ne sois pas fâché mais il faut avancer.",
                "js": ""
            }
        },


        {
            "Fst90asw90": {
                "nodeId": "Fst90asw90",
                "parentNode": "Fanset90",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot94",
                "semantic": "",
                "answerContent": "C’est comme ça, je n’ai pas à me justifier.",
                "js": ""
            }
        }, {
            "Fst90asw91": {
                "nodeId": "Fst90asw91",
                "parentNode": "Fanset90",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot94",
                "semantic": "",
                "answerContent": "Je ne sais pas.",
                "js": ""
            }
        }, {
            "Fst90asw92": {
                "nodeId": "Fst90asw92",
                "parentNode": "Fanset90",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot94",
                "semantic": "",
                "answerContent": "C’est bon. Merci.",
                "js": ""
            }
        }, {
            "Fst90asw93": {
                "nodeId": "Fst90asw93",
                "parentNode": "Fanset90",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot94",
                "semantic": "",
                "answerContent": "Parce que tu n’es pas de bons conseils.",
                "js": ""
            }
        }, {
            "Fst90asw94": {
                "nodeId": "Fst90asw94",
                "parentNode": "Fanset90",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot94",
                "semantic": "",
                "answerContent": "Je souhaiterais passer à un autre exercice.",
                "js": ""
            }
        }, {
            "Fst90asw95": {
                "nodeId": "Fst90asw95",
                "parentNode": "Fanset90",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot94",
                "semantic": "",
                "answerContent": "Tu es cool mais là je préfère être le seul à décider.",
                "js": ""
            }
        }, {
            "Fst89asw89": {
                "nodeId": "Fst89asw89",
                "parentNode": "Fanset89",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot93",
                "semantic": "",
                "answerContent": "Carrément pas !",
                "js": ""
            }
        }, {
            "Fst89asw90": {
                "nodeId": "Fst89asw90",
                "parentNode": "Fanset89",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot93",
                "semantic": "",
                "answerContent": "Bof.",
                "js": ""
            }
        },
        {
            "Fst89asw91": {
                "nodeId": "Fst89asw91",
                "parentNode": "Fanset89",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot93",
                "semantic": "",
                "answerContent": "Pas trop, mais merci quand même.",
                "js": ""
            }
        },
        {
            "Fst89asw92": {
                "nodeId": "Fst89asw92",
                "parentNode": "Fanset89",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot94",
                "semantic": "",
                "answerContent": "Si ça te fait plaisir.",
                "js": ""
            }
        },
        {
            "Fst89asw93": {
                "nodeId": "Fst89asw93",
                "parentNode": "Fanset89",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot94",
                "semantic": "",
                "answerContent": "Pourquoi pas.",
                "js": ""
            }
        },
        {
            "Fst89asw94": {
                "nodeId": "Fst89asw94",
                "parentNode": "Fanset89",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot94",
                "semantic": "",
                "answerContent": "Excellent ! Allons-y",
                "js": ""
            }
        },
        {
            "Fst85asw85": {
                "nodeId": "Fst85asw85",
                "parentNode": "Fanset85",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot87",
                "semantic": "",
                "answerContent": "ABC",
                "js": ""
            }
        },
        {
            "Fst80asw80": {
                "nodeId": "Fst80asw80",
                "parentNode": "Fanset80",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot73",
                "semantic": "",
                "answerContent": "Je ne veux surtout pas.",
                "js": ""
            }
        },
        {
            "Fst80asw81": {
                "nodeId": "Fst80asw81",
                "parentNode": "Fanset80",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot73",
                "semantic": "",
                "answerContent": "Je ne veux rien ajouter.",
                "js": ""
            }
        }, {
            "Fst80asw82": {
                "nodeId": "Fst80asw82",
                "parentNode": "Fanset80",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot73",
                "semantic": "",
                "answerContent": "Non mais une autre fois si tu veux bien.",
                "js": ""
            }
        }, {
            "Fst80asw83": {
                "nodeId": "Fst80asw83",
                "parentNode": "Fanset80",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "Fanset85",
                "semantic": "",
                "answerContent": "Oui, je peux faire une proposition plus intéressante que toi. ",
                "js": ""
            }
        }, {
            "Fst80asw84": {
                "nodeId": "Fst80asw84",
                "parentNode": "Fanset80",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "Fanset85",
                "semantic": "",
                "answerContent": "Oui, merci. Je viens d’avoir une idée.",
                "js": ""
            }
        }, {
            "Fst80asw85": {
                "nodeId": "Fst80asw85",
                "parentNode": "Fanset80",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "Fanset85",
                "semantic": "",
                "answerContent": "Oui, ça va m’aider.",
                "js": ""
            }
        },
        {
            "Fst88asw88": {
                "nodeId": "Fst88asw88",
                "parentNode": "Fanset88",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot94",
                "semantic": "",
                "answerContent": "C’est comme ça, je n’ai pas de compte à te rendre.",
                "js": ""
            }
        },
        {
            "Fst88asw89": {
                "nodeId": "Fst88asw89",
                "parentNode": "Fanset88",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot94",
                "semantic": "",
                "answerContent": "Je n’en ai aucune idée.",
                "js": ""
            }
        },
        {
            "Fst88asw90": {
                "nodeId": "Fst88asw90",
                "parentNode": "Fanset88",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot94",
                "semantic": "",
                "answerContent": "C’est bon, je te remercie.",
                "js": ""
            }
        },
        {
            "Fst88asw91": {
                "nodeId": "Fst88asw91",
                "parentNode": "Fanset88",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot94",
                "semantic": "",
                "answerContent": "Parce que j’ai plus d’imagination que toi. ",
                "js": ""
            }
        },
        {
            "Fst88asw92": {
                "nodeId": "Fst88asw92",
                "parentNode": "Fanset88",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot94",
                "semantic": "",
                "answerContent": "J’aimerais enfin terminer cet exercice. ",
                "js": ""
            }
        },
        {
            "Fst88asw93": {
                "nodeId": "Fst88asw93",
                "parentNode": "Fanset88",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot94",
                "semantic": "",
                "answerContent": "Ne te vexe pas mais mon choix va faire la différence.",
                "js": ""
            }
        },
        {
            "Fst87asw87": {
                "nodeId": "Fst87asw87",
                "parentNode": "Fanset87",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot92",
                "semantic": "",
                "answerContent": "Oui je veux bien que Glips me fasse une proposition.",
                "js": ""
            }
        },
        {
            "Fst87asw88": {
                "nodeId": "Fst87asw88",
                "parentNode": "Fanset87",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot91",
                "semantic": "",
                "answerContent": "Non, je n’ai pas besoin de l’aide de Glips. J’ai fait mon choix.",
                "js": ""
            }
        },
        {
            "Fst81asw81": {
                "nodeId": "Fst81asw81",
                "parentNode": "Fanset81",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot85",
                "semantic": "",
                "answerContent": "Parce que.",
                "js": ""
            }
        },
        {
            "Fst81asw82": {
                "nodeId": "Fst81asw82",
                "parentNode": "Fanset81",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot85",
                "semantic": "",
                "answerContent": "Je n'en ai aucune idée.",
                "js": ""
            }
        },
        {
            "Fst81asw83": {
                "nodeId": "Fst81asw83",
                "parentNode": "Fanset81",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot85",
                "semantic": "",
                "answerContent": "Merci mais pas ici.",
                "js": ""
            }
        },
        {
            "Fst81asw84": {
                "nodeId": "Fst81asw84",
                "parentNode": "Fanset81",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot85",
                "semantic": "",
                "answerContent": "Parce que tes propositions sont nulles. Il vaut mieux que j’avance seul.",
                "js": ""
            }
        },
        {
            "Fst81asw85": {
                "nodeId": "Fst81asw85",
                "parentNode": "Fanset81",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot85",
                "semantic": "",
                "answerContent": "J’aimerais qu’on avance. ",
                "js": ""
            }
        },
        {
            "Fst81asw86": {
                "nodeId": "Fst81asw86",
                "parentNode": "Fanset81",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot85",
                "semantic": "",
                "answerContent": "Tu as sans doute une bonne idée mais là notre histoire avance bien.",
                "js": ""
            }
        },
        {
            "Fst79asw79": {
                "nodeId": "Fst79asw79",
                "parentNode": "Fanset79",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot88",
                "semantic": "",
                "answerContent": "Laisse tomber, c’est nul !",
                "js": ""
            }
        }, {
            "Fst84asw84": {
                "nodeId": "Fst84asw84",
                "parentNode": "Fanset84",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot86",
                "semantic": "",
                "answerContent": "Parce que rien d'autre ne me plaisait.",
                "js": ""
            }
        }, {
            "Fst84asw85": {
                "nodeId": "Fst84asw85",
                "parentNode": "Fanset84",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot86",
                "semantic": "",
                "answerContent": "Ça me rappelle une histoire que je connais.",
                "js": ""
            }
        },
        {
            "Fst79asw80": {
                "nodeId": "Fst79asw80",
                "parentNode": "Fanset79",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot88",
                "semantic": "",
                "answerContent": "Bof.",
                "js": ""
            }
        }, {
            "Fst79asw81": {
                "nodeId": "Fst79asw81",
                "parentNode": "Fanset79",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot88",
                "semantic": "",
                "answerContent": "Non mais une prochaine fois peut-être.",
                "js": ""
            }
        },
        {
            "Fst79asw82": {
                "nodeId": "Fst79asw82",
                "parentNode": "Fanset79",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot82",
                "semantic": "",
                "answerContent": "Ok, mais ça ne veut pas dire que tu es le plus fort.",
                "js": ""
            }
        },
        {
            "Fst79asw83": {
                "nodeId": "Fst79asw83",
                "parentNode": "Fanset79",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot82",
                "semantic": "",
                "answerContent": "Si tu veux.",
                "js": ""
            }
        },
        {
            "Fst79asw84": {
                "nodeId": "Fst79asw84",
                "parentNode": "Fanset79",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot82",
                "semantic": "",
                "answerContent": "Trop bien !",
                "js": ""
            }
        },
        {
            "Fst78asw78": {
                "nodeId": "Fst78asw78",
                "parentNode": "Fanset78",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot83",
                "semantic": "open ended",
                "answerContent": "ABC",
                "js": ""
            }
        }, {
            "Fst77asw77": {
                "nodeId": "Fst77asw77",
                "parentNode": "Fanset77",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot84",
                "semantic": "",
                "answerContent": "Oui je veux bien que Glips me fasse une proposition.",
                "js": ""
            }
        }, {
            "Fst77asw78": {
                "nodeId": "Fst77asw78",
                "parentNode": "Fanset77",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "Fanset78",
                "semantic": "",
                "answerContent": "Non, je n’ai pas besoin de l’aide de Glips. J’ai déjà mon idée.",
                "js": ""
            }
        },

        {
            "Fst76asw76": {
                "nodeId": "Fst76asw76",
                "parentNode": "Fanset76",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot51",
                "semantic": "open ended",
                "answerContent": "ABC",
                "js": ""
            }
        }, {
            "Fst83asw83": {
                "nodeId": "Fst83asw83",
                "parentNode": "Fanset83",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot33",
                "semantic": "open ended",
                "answerContent": "Parce que je n'en ai pas envie.",
                "js": ""
            }
        },
        {
            "Fst83asw84": {
                "nodeId": "Fst83asw84",
                "parentNode": "Fanset83",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot33",
                "semantic": "open ended",
                "answerContent": "Désolé, je le sens comme ça...",
                "js": ""
            }
        }, {
            "Fst83asw85": {
                "nodeId": "Fst83asw85",
                "parentNode": "Fanset83",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot33",
                "semantic": "open ended",
                "answerContent": "C’est gentil mais pas cette fois.",
                "js": ""
            }
        }, {
            "Fst83asw86": {
                "nodeId": "Fst83asw86",
                "parentNode": "Fanset83",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot33",
                "semantic": "open ended",
                "answerContent": "Parce que ton avis ne m'intéresse pas.",
                "js": ""
            }
        }, {
            "Fst83asw87": {
                "nodeId": "Fst83asw87",
                "parentNode": "Fanset83",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot33",
                "semantic": "open ended",
                "answerContent": "Parce que j’aimerais qu’on aille plus vite.",
                "js": ""
            }
        }, {
            "Fst83asw88": {
                "nodeId": "Fst83asw88",
                "parentNode": "Fanset83",
                "nodetype": "ans",
                "subType": "normal",
                "activShortCut": true,
                "desti": "bot33",
                "semantic": "open ended",
                "answerContent": "Ton idée est sûrement bonne mais je peux avancer sans ton aide.",
                "js": ""
            }
        },

        {
            "bot51": {
                "nodeId": "bot51",
                "parentNode": "Fst76asw76",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["bot20"],
                "actor": "Glips",
                "html": "Super !",
                "js": ""
            }
        }, {
            "bot52": {
                "nodeId": "bot52",
                "parentNode": "Fst27asw27",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset83"],
                "actor": "Glips",
                "html": "Et pourquoi non ?",
                "js": ""
            }
        }, {
            "bot54": {
                "nodeId": "bot54",
                "parentNode": "Fst51asw51",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["bot58"],
                "actor": "Glips",
                "html": "Cela me convient.",
                "js": ""
            }
        }, {
            "bot79": {
                "nodeId": "bot79",
                "parentNode": "iDoc62",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["iDoc61"],
                "actor": "System",
                "html": "A présent, on va passer à la fin de l’histoire. Pour vous aider, on vous propose trois mots et un autre à sélectionner.",
                "js": ""
            }
        }, {
            "bot80": {
                "nodeId": "bot80",
                "parentNode": "Fst63asw66",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset79"],
                "actor": "Glips",
                "html": "Je propose qu’à la fin de l’histoire, il y ait un orage pour surprendre le lecteur.",
                "js": ""
            }
        }, {
            "bot82": {
                "nodeId": "bot82",
                "parentNode": "Fst79asw82",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset80"],
                "actor": "Glips",
                "html": "Tu veux ajouter un élément à mon idée ?",
                "js": ""
            }
        }, {
            "bot83": {
                "nodeId": "bot83",
                "parentNode": "Fst78asw78",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset81"],
                "actor": "Glips",
                "html": "Pas besoin de mon aide ? Très bien, je respecte ton choix. Et pourquoi tu ne veux pas prendre le temps de voir ma proposition ?",
                "js": ""
            }
        }, {
            "bot84": {
                "nodeId": "bot84",
                "parentNode": "Fst77asw77",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["iDoc62"],
                "actor": "Glips",
                "html": "Je te propose 4 époques complétement différentes. Laquelle te conviendrait pour tes personnages ?",
                "js": ""
            }
        }, {
            "iDoc62": {
                "nodeId": "iDoc62",
                "parentNode": "bot84",
                "nodetype": "IDoc",
                "subType": "Display Int.Document",
                "callButton": true,
                "callButtonLabel": "Valider",
                "timer": false,
                "delay": "",
                "desti": ["bot79"],
                "title": "Le choix d'une époque",
                "html": "Je te propose 4 époques complétement différentes. Laquelle te conviendrait pour tes personnages ? <div class='imgEpoq'></div>",
                "css": "",
                "js": ""
            }
        }, {
            "bot85": {
                "nodeId": "bot85",
                "parentNode": "Fst81asw81",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset84"],
                "actor": "Glips",
                "html": "D’accord. Pourquoi tu as choisi XEpoq&#8239;?",
                "js": ""
            }
        }, {
            "bot86": {
                "nodeId": "bot86",
                "parentNode": "Fst84asw84",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["bot79"],
                "actor": "Glips",
                "html": "C’est toi le chef XEmoticon&#8239;",
                "js": ""
            }
        }, {
            "bot87": {
                "nodeId": "bot87",
                "parentNode": "Fst85asw85",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["bot76"],
                "actor": "Glips",
                "html": "Top!",
                "js": ""
            }
        }, {
            "bot88": {
                "nodeId": "bot88",
                "parentNode": "Fst63asw63",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset86"],
                "actor": "Glips",
                "html": "Pourquoi tu refuses ?",
                "js": ""
            }
        }, {
            "bot89": {
                "nodeId": "bot89",
                "parentNode": "Fst82asw82",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["iDoc63"],
                "actor": "System",
                "html": "Pour finir l’exercice, on vous propose de choisir une bande son qui pourrait correspondre à l’atmosphère de votre histoire originale.",
                "js": ""
            }
        }, {
            "bot90": {
                "nodeId": "bot90",
                "parentNode": "idoc63",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset87"],
                "actor": "System",
                "html": "Vous pouvez faire appel à Glips pour une autre proposition.",
                "js": ""
            }
        }, {
            "bot91": {
                "nodeId": "bot91",
                "parentNode": "Fst87asw88",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset88"],
                "actor": "Glips",
                "html": "Pas besoin de mon aide ? Pourquoi ?",
                "js": ""
            }
        }, {
            "bot92": {
                "nodeId": "bot92",
                "parentNode": "Fst87asw87",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset89"],
                "actor": "Glips",
                "html": "Je te propose une bande son super originale :  le bruit d’une tombe que l’on ouvre ! Es-tu d'accord avec ma proposition ?",
                "js": ""
            }
        }, {
            "bot93": {
                "nodeId": "bot93",
                "parentNode": "Fst89asw89",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["Fanset90"],
                "actor": "Glips",
                "html": "Pourquoi tu refuses ma proposition ?",
                "js": ""
            }
        }, {
            "bot94": {
                "nodeId": "bot94",
                "parentNode": "Fst90asw90",
                "nodetype": "bot",
                "subType": "Bot Reaction",
                "timer": false,
                "delay": "",
                "activShortCut": false,
                "desti": ["conclu83"],
                "actor": "Glips",
                "html": "Parfait, on a fini l’exercice ! Je te remercie. A bientôt !",
                "js": ""
            }
        }

    ];
    return dataImport;
});