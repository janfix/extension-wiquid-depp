<div class="panel chatPanel">
    <p>Construisez votre projet avec le <a href="https://www.wiquid.fr/projects/depp/chatbot/" target="blank">ChatBot generator</a></p>
    <p>ChatBot generator is a DEPP Project - Ministère de l'Education Nationale - France.</p>
    <p>Developped by : <a href="https://www.wiquid.fr" target="blank">Wiquid</a></p>
    <hr>
    <div class="smallTitle">Importer votre Projet au format JSON depuis le ChatBot Generator</div>
    <div style="padding:3px;"><input type="file" name="jsonImport" value="Charger les données" class="jsonImport btn-info small" accept="application/JSON"></div>
    <div id="ChatMeta" style="font-size:small; display:none;">
        <hr>
        <div><b>Nom du projet</b>: <span id="chat_Pname"></span></div>
        <div><b>Auteur</b>: <span id="chat_auteur"></span></div>
        <div><b>Version</b>: <span id="chat_version"></span></div>
        <div><b>Date</b>: <span id="chat_date"></span></div>
        <div><b>Tags</b>: <span id="chat_tags"></span></div>
        <div><b>Description</b>: <span id="chat_descript"></span></div>
        <div><b>Nombre de noeuds</b>: <span id="chat_noeuds"></span></div>
        <div><b>Catégories</b>: <span id="chat_catego"></span></div>
        <hr>
        <div class="toStart">
            <button id="home">Retour au début</button>
        </div>
        <hr>
        <div class="nodeDisplayer">Afficher le noeud:
            <select name="allnodes" id="allnodes"></select>
        </div>
    </div>

    <div>{{info}}</div>

</div>
<hr>
<div class="panel">
    <label for="" class="has-icon">{{__ "Response identifier"}}</label>
    <span class="icon-help tooltipstered" data-tooltip="~ .tooltip-content:first" data-tooltip-theme="info"></span>
    <div class="tooltip-content">{{__ 'The identifier of the choice. This identifier must not be used by any other response or item variable. An identifier is a string of characters that must start with a Letter or an underscore ("_") and contain only Letters, underscores, hyphens
        ("-"), period (".", a.k.a. full-stop), Digits, CombiningChars and Extenders.'}}</div>

    <input type="text" name="identifier" value="{{identifier}}" placeholder="e.g. RESPONSE" data-validate="$notEmpty; $qtiIdentifier; $availableIdentifier(serial={{serial}});">
</div>