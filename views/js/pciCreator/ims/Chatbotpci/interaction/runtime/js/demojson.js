define([], function() {
    var dataImport = [{
            "id": "root",
            "text": "Introduction",
            "icon": "glyphicon glyphicon-align-justify",
            "li_attr": {
                "id": "root"
            },
            "a_attr": {
                "href": "#",
                "id": "root_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "#",
            "type": "SQTxt",
            "subType": "Introduction",
            "callButton": true,
            "callButtonLabel": "Commencez le tuto",
            "timer": false,
            "delay": "",
            "desti": [
                "introd13"
            ],
            "title": "Comment faire un ChatBot ?",
            "html": "<p style=\"margin-left:0cm; margin-right:0cm\"><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">Bonjour, bienvenue dans le tutoriel Chatbot PCI. Cette PCI propose de construire une &eacute;valuation sur la base de dialogues avec l&#39;&eacute;l&egrave;ve. Ces dialogues reposent sur des choix ferm&eacute;s et l&#39;encha&icirc;nement des choix d&eacute;finit des situations. Il est possible de confronter l&#39;&eacute;l&egrave;ve &agrave; des documents ou des m&eacute;dias, vous pouvez lui proposer des outils complexes comme GeoGebra, Scratch ou Snap par le truchement des iframes. Les dialogues offrent d&rsquo;immenses possibilit&eacute;s pour cr&eacute;er des situations et des r&eacute;actions.</span></span></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\"><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">Vous pouvez ainsi &eacute;valuer des raisonnements et des r&eacute;actions en &eacute;tudiant le parcours de l&rsquo;&eacute;l&egrave;ve.</span></span></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\"><img alt=\"arborescence navigation open branches\" src=\"https://www.wiquid.fr/projects/depp/chatbot/mediademo/arbonav.gif\" style=\"height:239px; width:250px\" /></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\"><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">Pour construire une &eacute;valuation ChatBot, vous devez utiliser le g&eacute;n&eacute;rateur en ligne&nbsp;: <a href=\"https://www.wiquid.fr/projects/depp/chatbot/\" style=\"color:#0563c1; text-decoration:underline\">ChatBot Generator</a>. Il permet de construire une arborescence qui encha&icirc;ne les &eacute;v&egrave;nements et les &eacute;changes soumis &agrave; l&rsquo;&eacute;l&egrave;ve. Une fois votre arborescence compl&egrave;te, vous pouvez g&eacute;n&eacute;rer votre fichier JSON et l&rsquo;importer dans cette PCI comme il est mentionn&eacute; dans le panneau ci-contre. Votre nouvelle &eacute;preuve est pr&ecirc;te&nbsp;! </span></span></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\"><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">Pour en savoir plus sur la construction de ce type d&rsquo;item, je vous invite &agrave; suivre notre tutoriel.</span></span></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\">Cet outil a &eacute;t&eacute; con&ccedil;u et r&eacute;alis&eacute; par</p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\">&nbsp;<img alt=\"\" src=\"https://www.wiquid.fr/projects/depp/chatbot/mediademo/WiquidYellowTilesBIG.png\" style=\"height:52px; width:300px\" /></p>\n",
            "resume": "Découvrir le chatBot generator",
            "css": "",
            "js": "",
            "projectName": "Demo Chat",
            "author": "Janfix",
            "version": "1",
            "creationDate": "6062023",
            "tags": "demo",
            "infos": "By wiquid -- Jean-Philippe Rivière"
        },
        {
            "id": "introd13",
            "text": "Introduction",
            "icon": "glyphicon glyphicon-align-justify",
            "li_attr": {
                "id": "introd13"
            },
            "a_attr": {
                "href": "#",
                "id": "introd13_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "root",
            "type": "SQTxt",
            "subType": "Introduction",
            "callButton": true,
            "callButtonLabel": "Suivant",
            "timer": false,
            "delay": "",
            "desti": [
                "bot1"
            ],
            "title": "Créer des noeuds grâce au menu contextuel",
            "html": "<p><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">L&rsquo;arborescence et son menu contextuel permettent de cr&eacute;er l&rsquo;ensemble des parcours. L&rsquo;introduction repr&eacute;sente le n&oelig;ud de d&eacute;part et tout parcours doit finir par une conclusion.</span></span></p>\n\n<p><img alt=\"arborescence context menu\" src=\"https://www.wiquid.fr/projects/depp/chatbot/mediademo/contextMenu.gif\" style=\"height:420px; width:650px\" /></p>\n\n<p><img alt=\"\" src=\"https://www.wiquid.fr/projects/depp/chatbot/contextMenu.gif\" /></p>\n",
            "resume": "Construire l'arborescence",
            "css": "",
            "js": ""
        },
        {
            "id": "bot1",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot1"
            },
            "a_attr": {
                "href": "#",
                "id": "bot1_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "introd13",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "bot25"
            ],
            "html": "Si vous avez des questions, allez-y, je suis là pour ça...",
            "js": "",
            "actor": "System"
        },
        {
            "id": "bot25",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot25"
            },
            "a_attr": {
                "href": "#",
                "id": "bot25_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot1",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "bot26"
            ],
            "html": "Comment créer des pages avec ces noeuds ?",
            "js": "",
            "actor": "Paul"
        },
        {
            "id": "bot26",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot26"
            },
            "a_attr": {
                "href": "#",
                "id": "bot26_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot25",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "iDoc27"
            ],
            "html": "C'est simple chaque noeud représente une page ou une demi-page... Regardez le document ci-contre...",
            "js": "",
            "actor": "System"
        },
        {
            "id": "iDoc27",
            "text": "Display Int.Document",
            "icon": "glyphicon glyphicon-file",
            "li_attr": {
                "id": "iDoc27"
            },
            "a_attr": {
                "href": "#",
                "id": "iDoc27_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot26",
            "type": "IDoc",
            "subType": "Display Int.Document",
            "callButton": false,
            "callButtonLabel": "",
            "timer": true,
            "delay": "",
            "desti": [
                "bot28"
            ],
            "title": "Organisation des pages ",
            "html": "<p><img width=\"450px\" alt=\"\" src=\"https://www.wiquid.fr/projects/depp/chatbot/mediademo/CDF.png\" /></p>\n",
            "css": "",
            "js": ""
        },
        {
            "id": "bot28",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot28"
            },
            "a_attr": {
                "href": "#",
                "id": "bot28_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "iDoc27",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "bot29"
            ],
            "html": "Voici les possibilités d'affichage, vous pouvez choisir de présenter un document sur un page entière ou sur une demi-page. L'idée est de pouvoir maintenir la discussion avec un support sous les yeux si nécessaire.",
            "js": "",
            "actor": "System"
        },
        {
            "id": "bot29",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot29"
            },
            "a_attr": {
                "href": "#",
                "id": "bot29_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot28",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "bot30"
            ],
            "html": "A quoi sert le résumé ?",
            "js": "Le résumé s'affiche au-dessus de la boite de dialogue, il est là pour garder un trace des documents présentés, mais aussi, pour faciliter la consultation d'information précise qu'on peut rendre facilement accessible. Cliquez sur le résumé pour avoir un rappel du document que vous avez utilisé.",
            "actor": "Paul"
        },
        {
            "id": "bot30",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot30"
            },
            "a_attr": {
                "href": "#",
                "id": "bot30_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot29",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "bot2"
            ],
            "html": "Le résumé s'affiche au-dessus de la boite de dialogue, il est là pour garder une trace des documents présentés, mais aussi, pour faciliter la consultation d'information précise qu'on peut rendre facilement accessible. Cliquez sur le résumé pour avoir un rappel du document que vous avez utilisé.",
            "js": "",
            "actor": "System"
        },
        {
            "id": "bot2",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot2"
            },
            "a_attr": {
                "href": "#",
                "id": "bot2_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot30",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "bot3"
            ],
            "html": "Comment faire pour créer une boite de dialogue contenant le Chat ?",
            "js": "",
            "actor": "Paul"
        },
        {
            "id": "bot3",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot3"
            },
            "a_attr": {
                "href": "#",
                "id": "bot3_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot2",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "bot5"
            ],
            "html": "Dès qu'un noeud Bot Reaction est activé, la boite de dialogue Chat apparaît.",
            "js": "",
            "actor": "System"
        },
        {
            "id": "bot5",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot5"
            },
            "a_attr": {
                "href": "#",
                "id": "bot5_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot3",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "Fanset6"
            ],
            "html": "C'est donc automatique ?",
            "js": "",
            "actor": "Paul"
        },
        {
            "id": "Fanset6",
            "text": "Answers set",
            "icon": true,
            "li_attr": {
                "id": "Fanset6"
            },
            "a_attr": {
                "href": "#",
                "id": "Fanset6_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot5",
            "type": "Fanset",
            "desti": [
                "Fst6asw6",
                "Fst6asw7",
                "Fst6asw8",
                "Fst6asw9"
            ]
        },
        {
            "id": "Fst6asw6",
            "text": "Answer 1",
            "icon": "glyphicon glyphicon-circle-arrow-right",
            "li_attr": {
                "id": "Fst6asw6"
            },
            "a_attr": {
                "href": "#",
                "id": "Fst6asw6_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "Fanset6",
            "type": "ans",
            "subType": "normal",
            "activShortCut": false,
            "desti": [
                "bot14"
            ],
            "js": "",
            "semantic": "good",
            "answerContent": "Oui, c'est bien automatique !"
        },
        {
            "id": "bot14",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot14"
            },
            "a_attr": {
                "href": "#",
                "id": "bot14_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "Fst6asw6",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "introd16"
            ],
            "html": "Une documentation est disponible sur le site pour connaître tous les trucs et astuces ! ",
            "js": "",
            "actor": "System"
        },
        {
            "id": "introd16",
            "text": "Introduction",
            "icon": "glyphicon glyphicon-align-justify",
            "li_attr": {
                "id": "introd16"
            },
            "a_attr": {
                "href": "#",
                "id": "introd16_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot14",
            "type": "SQTxt",
            "subType": "Introduction",
            "callButton": true,
            "callButtonLabel": "Suivant",
            "timer": false,
            "delay": "",
            "desti": [
                "bot31"
            ],
            "title": "Un wiki pour mieux comprendre ChatBot",
            "html": "<p><iframe frameborder=\"1\" height=\"590\" scrolling=\"yes\" src=\"https://www.wiquid.fr/projects/depp/chatbot/doc/doku.php?id=:fr:start\" width=\"900\"></iframe></p>\n",
            "resume": "La doc en ligne",
            "css": "",
            "js": ""
        },
        {
            "id": "bot31",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot31"
            },
            "a_attr": {
                "href": "#",
                "id": "bot31_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "introd16",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "bot32"
            ],
            "html": "Savez-vous que vous pouvez utiliser des shorcuts (raccourcis) ?",
            "js": "",
            "actor": "System"
        },
        {
            "id": "bot32",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot32"
            },
            "a_attr": {
                "href": "#",
                "id": "bot32_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot31",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "bot33"
            ],
            "html": "Ça sert à quoi ? ",
            "js": "",
            "actor": "Paul"
        },
        {
            "id": "bot33",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot33"
            },
            "a_attr": {
                "href": "#",
                "id": "bot33_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot32",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "bot34"
            ],
            "html": "Ça sert à rediriger différentes branches vers un nœud et unifier les parcours, par exemple si vous voulez simplement enchaîner les questions de façon linéaire, vous continuez votre arborescence sur la première réponse et rebranchez les autres réponses sur la branche de la première proposition.",
            "js": "",
            "actor": "System"
        },
        {
            "id": "bot34",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot34"
            },
            "a_attr": {
                "href": "#",
                "id": "bot34_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot33",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "Fanset35"
            ],
            "html": "Peut-on dialoguer en utilisant le prénom de l’élève ?",
            "js": "",
            "actor": "Lyse"
        },
        {
            "id": "Fanset35",
            "text": "Answers set",
            "icon": true,
            "li_attr": {
                "id": "Fanset35"
            },
            "a_attr": {
                "href": "#",
                "id": "Fanset35_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot34",
            "type": "Fanset",
            "desti": [
                "Fst35asw35",
                "Fst35asw36"
            ]
        },
        {
            "id": "Fst35asw35",
            "text": "Answer 1",
            "icon": "glyphicon glyphicon-circle-arrow-right",
            "li_attr": {
                "id": "Fst35asw35"
            },
            "a_attr": {
                "href": "#",
                "id": "Fst35asw35_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "Fanset35",
            "type": "ans",
            "subType": "normal",
            "activShortCut": false,
            "desti": [
                "bot36"
            ],
            "js": "",
            "semantic": "good",
            "answerContent": "Oui, mais je ne sais pas comment faire pour que le système connaisse son nom ..."
        },
        {
            "id": "bot36",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot36"
            },
            "a_attr": {
                "href": "#",
                "id": "bot36_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "Fst35asw35",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "bot37"
            ],
            "html": "Tu dois insérer un champ spécial dans l'éditeur, il y a un bouton pour ça.",
            "js": "",
            "actor": "System"
        },
        {
            "id": "bot37",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot37"
            },
            "a_attr": {
                "href": "#",
                "id": "bot37_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot36",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "bot17"
            ],
            "html": "Peut-on insérer un tableur dans les Idocs ?",
            "js": "",
            "actor": "Lyse"
        },
        {
            "id": "bot17",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot17"
            },
            "a_attr": {
                "href": "#",
                "id": "bot17_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot37",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "bot18"
            ],
            "html": "Oui, tu peux utiliser celui de GeoGebra par exemple...",
            "js": "",
            "actor": "System"
        },
        {
            "id": "bot18",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot18"
            },
            "a_attr": {
                "href": "#",
                "id": "bot18_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot17",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "bot19"
            ],
            "html": "GeoGebra peut être intégré dans les Idocs ?",
            "js": "",
            "actor": "Paul"
        },
        {
            "id": "bot19",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot19"
            },
            "a_attr": {
                "href": "#",
                "id": "bot19_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot18",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "bot20"
            ],
            "html": "Montre nous ça ...",
            "js": "",
            "actor": "Lyse"
        },
        {
            "id": "bot20",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot20"
            },
            "a_attr": {
                "href": "#",
                "id": "bot20_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot19",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "iDoc21"
            ],
            "html": "Comme ça, voici ci-contre un document interactif qui l'intègre... Il y a un bouton dans l'éditeur pour gérer les Iframes",
            "js": "",
            "actor": "System"
        },
        {
            "id": "iDoc21",
            "text": "Display Int.Document",
            "icon": "glyphicon glyphicon-file",
            "li_attr": {
                "id": "iDoc21"
            },
            "a_attr": {
                "href": "#",
                "id": "iDoc21_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "bot20",
            "type": "IDoc",
            "subType": "Display Int.Document",
            "callButton": true,
            "callButtonLabel": "Suivant",
            "timer": false,
            "delay": "",
            "desti": [
                "bot22"
            ],
            "title": "Exemple d'utilisation de GeoGebra dans le chatbot",
            "html": "<p><iframe frameborder=\"0\" height=\"590\" scrolling=\"no\" src=\"https://www.geogebra.org/calculator\" width=\"450\"></iframe></p>\n",
            "css": "",
            "js": ""
        },
        {
            "id": "bot22",
            "text": "Bot Reaction",
            "icon": "glyphicon glyphicon-comment",
            "li_attr": {
                "id": "bot22"
            },
            "a_attr": {
                "href": "#",
                "id": "bot22_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "iDoc21",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": false,
            "desti": [
                "introd23"
            ],
            "html": "Mais on peut aussi utiliser Snap et  dialoguer pour construire un programme",
            "js": "",
            "actor": "System"
        },
        {
            "id": "introd23",
            "text": "Introduction",
            "icon": "glyphicon glyphicon-align-justify",
            "li_attr": {
                "id": "introd23"
            },
            "a_attr": {
                "href": "#",
                "id": "introd23_anchor"
            },
            "state": {
                "loaded": true,
                "opened": true,
                "selected": true,
                "disabled": false
            },
            "data": "",
            "parent": "bot22",
            "type": "SQTxt",
            "subType": "Introduction",
            "callButton": true,
            "callButtonLabel": "Suivant",
            "timer": false,
            "delay": "",
            "desti": [
                "conclu24"
            ],
            "title": "Exemple d'intégration de Snap",
            "html": "<p><iframe frameborder=\"0\" height=\"590\" scrolling=\"no\" src=\"https://www.wiquid.fr/projects/snap\" width=\"900\"></iframe></p>\n",
            "resume": "Snap in ChatBot !",
            "css": "",
            "js": ""
        },
        {
            "id": "conclu24",
            "text": "Conclusion",
            "icon": "glyphicon glyphicon-align-justify",
            "li_attr": {
                "id": "conclu24"
            },
            "a_attr": {
                "href": "#",
                "id": "conclu24_anchor"
            },
            "state": {
                "loaded": true,
                "opened": false,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "introd23",
            "type": "SQTxt",
            "subType": "Conclusion",
            "callButton": false,
            "callButtonLabel": "",
            "timer": false,
            "delay": "",
            "desti": [],
            "title": "Voilà un rapide aperçu des possibilités de cette PCI",
            "html": "<p>Reportez-vous &agrave; la documentation pour comprendre combien il est facile de cr&eacute;er de nouvelles situations d&#39;&eacute;valuation pour vos &eacute;l&egrave;ves.</p>\n\n<p><strong>D&eacute;couvrez d&#39;autres aspects du g&eacute;n&eacute;rateur de ChatBot :&nbsp;</strong></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\"><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">Quelles donn&eacute;es peut-on recueillir&nbsp;?</span></span></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\"><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">Quelle est la mani&egrave;re plus efficace de collecter les donn&eacute;es&nbsp;?</span></span></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\"><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">Comment ins&eacute;rer un n&oelig;ud dans une branche d&eacute;j&agrave; constitu&eacute;e&nbsp;?</span></span></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\"><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">Peut-on utiliser des sons&nbsp;ou des vid&eacute;os&nbsp;?</span></span></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\"><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">Peut-on utiliser des &eacute;moticons dans les dialogues&nbsp;?</span></span></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\"><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">Pourquoi utiliser le champ r&eacute;sum&eacute;&nbsp;?</span></span></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\"><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">Peut-on faire encha&icirc;ner automatiquement les n&oelig;uds sans intervention de l&rsquo;&eacute;l&egrave;ve&nbsp;?</span></span></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\"><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">Peut-on faire varier le rythme des dialogues pour donner plus de r&eacute;alisme&nbsp;?</span></span></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\"><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">Peut-on faire simplement un test adaptatif&nbsp;? Bien entendu !</span></span></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\"><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">Pourquoi ne pas essayer de faire un Quizz sous influence&nbsp;?</span></span></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\"><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">Connaissez-vous le format JSON&nbsp;?</span></span></p>\n\n<p style=\"margin-left:0cm; margin-right:0cm\"><span style=\"font-size:11pt\"><span style=\"font-family:Calibri,sans-serif\">ChatGPT, peux-tu m&rsquo;aider &agrave; faire mon &eacute;valuation&nbsp;? Oui, ChatGPT peux g&eacute;n&eacute;rer des noeuds &agrave; votre place !&nbsp;</span></span></p>\n\n<p>Cette PCI est en open source disponible sur GitHub :<a href=\"https://github.com/janfix/\">https://github.com/janfix/</a>&nbsp;</p>\n\n<p>Plus d&#39;information sur le site <a href=\"https://www.wiquid.fr\">www.wiquid.fr</a></p>\n\n<p><img alt=\"\" src=\"https://www.wiquid.fr/projects/depp/chatbot/mediademo/WiquidYellowTilesBIG.png\" style=\"height:35px; width:200px\" /></p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n\n<p>&nbsp;</p>\n",
            "resume": "",
            "css": "",
            "js": ""
        },
        {
            "id": "Fst35asw36",
            "text": "Answer 2",
            "icon": "img/short.png",
            "li_attr": {
                "id": "Fst35asw36"
            },
            "a_attr": {
                "href": "#",
                "id": "Fst35asw36_anchor"
            },
            "state": {
                "loaded": true,
                "opened": false,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "Fanset35",
            "type": "ans",
            "subType": "normal",
            "activShortCut": true,
            "desti": "bot37",
            "js": "",
            "semantic": "bad",
            "answerContent": "Non ce n'est pas possible"
        },
        {
            "id": "Fst6asw7",
            "text": "Answer 2",
            "icon": "glyphicon glyphicon-circle-arrow-right",
            "li_attr": {
                "id": "Fst6asw7"
            },
            "a_attr": {
                "href": "#",
                "id": "Fst6asw7_anchor"
            },
            "state": {
                "loaded": true,
                "opened": false,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "Fanset6",
            "type": "ans",
            "subType": "normal",
            "activShortCut": false,
            "desti": [
                "bot15"
            ],
            "js": "",
            "semantic": "bad",
            "answerContent": "Pas du tout, il faut s'y connaître en javascript ! Je peux vous l'assurer !"
        },
        {
            "id": "bot15",
            "text": "Bot Reaction",
            "icon": "img/short.png",
            "li_attr": {
                "id": "bot15"
            },
            "a_attr": {
                "href": "#",
                "id": "bot15_anchor"
            },
            "state": {
                "loaded": true,
                "opened": false,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "Fst6asw7",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": true,
            "desti": [
                "bot14"
            ],
            "html": "",
            "js": "",
            "actor": ""
        },
        {
            "id": "Fst6asw8",
            "text": "Answer 3",
            "icon": "glyphicon glyphicon-circle-arrow-right",
            "li_attr": {
                "id": "Fst6asw8"
            },
            "a_attr": {
                "href": "#",
                "id": "Fst6asw8_anchor"
            },
            "state": {
                "loaded": true,
                "opened": false,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "Fanset6",
            "type": "ans",
            "subType": "normal",
            "activShortCut": false,
            "desti": [
                "j2_6"
            ],
            "js": "",
            "semantic": "bad",
            "answerContent": "Non ça ne marche jamais comme ça !"
        },
        {
            "id": "j2_6",
            "text": "Bot Reaction",
            "icon": "img/short.png",
            "li_attr": {
                "id": "j2_6"
            },
            "a_attr": {
                "href": "#",
                "id": "j2_6_anchor"
            },
            "state": {
                "loaded": true,
                "opened": false,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "Fst6asw8",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": true,
            "desti": [
                "bot14"
            ],
            "html": "",
            "js": "",
            "actor": ""
        },
        {
            "id": "Fst6asw9",
            "text": "Answer 4",
            "icon": "glyphicon glyphicon-circle-arrow-right",
            "li_attr": {
                "id": "Fst6asw9"
            },
            "a_attr": {
                "href": "#",
                "id": "Fst6asw9_anchor"
            },
            "state": {
                "loaded": true,
                "opened": false,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "Fanset6",
            "type": "ans",
            "subType": "normal",
            "activShortCut": false,
            "desti": [
                "j2_7"
            ],
            "js": "",
            "semantic": "good",
            "answerContent": "Je n'ai jamais rien vu de pareil, c'est génial cet outil ! "
        },
        {
            "id": "j2_7",
            "text": "Bot Reaction",
            "icon": "img/short.png",
            "li_attr": {
                "id": "j2_7"
            },
            "a_attr": {
                "href": "#",
                "id": "j2_7_anchor"
            },
            "state": {
                "loaded": true,
                "opened": false,
                "selected": false,
                "disabled": false
            },
            "data": "",
            "parent": "Fst6asw9",
            "type": "bot",
            "subType": "Bot Reaction",
            "timer": false,
            "delay": "",
            "activShortCut": true,
            "desti": [
                "bot14"
            ],
            "html": "",
            "js": "",
            "actor": ""
        }
    ]
    return dataImport
})