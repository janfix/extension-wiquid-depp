<div class="panel">
    <label for="panelSizer">{{__ "Panneau Outils Blocks"}}</label>
    <span class="icon-help tooltipstered" data-tooltip="~ .tooltip-content:first" data-tooltip-theme="info"></span>
    <span class="tooltip-content">{{__ "Faites disparaître les blocks et les catégories de blocks pour simplifier
        l'interface."}}</span>
    <select name="panelSizer" class="panelSizer select2" data-has-search="false">
        <option class="opt" value="visible"> Visible </option>
        <option class="opt" value="nonVisible">Non-visible</option>
    </select>
</div>
<div class="panel">
    <label for="testLimiter">{{__ "Limiter le nombre d'essais"}}</label>
    <span class="icon-help tooltipstered" data-tooltip="~ .tooltip-content:first" data-tooltip-theme="info"></span>
    <span class="tooltip-content">{{__ "Activer le limiteur d'essai pour contraindre l'élève à résoudre la conception de son programme en deça d'un nombre maximum de test"}}</span>
    <select name="testLimiter" class="testLimiter select2" data-has-search="false">
        <option value="0" selected>Aucune limite</option>
        <option value="1">1 essai max</option>
        <option value="2">2 essais max</option>
        <option value="3">3 essais max</option>
        <option value="4">4 essais max</option>
        <option value="5">5 essais max</option>
    </select>
</div>
<hr>
<div class="panel">
    <div class="smallTitle">Importer un Projet</div>
    <p class="parag">Construisez votre projet depuis <a href="https://wiquid.fr/projects/depp/snap6/snap.html" target="_blank"> une version de Snap en ligne (inférieure version 6.1)</a> et exportez le, puis utilisez l'outil d'importation ci-dessous. </p>
    <input type="button" name="scriptImporter" value="Importer un projet Snap" class="scriptImporter btn-info small"><br>
<hr>
    <div class="smallTitle">Sauvez votre projet</div>
    <input type="button" name="saveSnapState" value="Sauver votre projet Snap" class="saveSnapState btn-info small"><br>
    <div>
        <hr>
    </div>
    <div class="smallTitle">Encodage de la réponse</div> 
    <span class="icon-help tooltipstered" data-tooltip="~ .tooltip-content:first" data-tooltip-theme="info"></span>
    <span class="tooltip-content">{{__ "Attention, veillez à n'utiliser le rapport HTML que sur des projets dont la taille reste limitée. Si vous avez des images lourdes intégrées à votre item, sélectionnez de préférence le format XML. Verifier les capacités de stockage de la database, ces paramètres peuvent être ajustés"}}</span>
<br/>
    <input id="dataXML" type="checkbox" checked/><label for="dataXML" style="font-weight : normal" class="labeldataformater" >Sauver le projet(XML) </label> <br/> 
    <input id="dataHTML" type="checkbox"/><label for="dataHTML" style="font-weight : normal" class="labeldataformater">Sauver le rapport(HTML)</label> 
    <br/> 
    <input id="SnapShot" type="checkbox"/><label for="SnapShot" style="font-weight : normal" class="labeldataformater">Simple snapshot(PNG)</label>    
    
    <div>
        <hr>
    </div>
    <div class="panel">
        <label for="" class="has-icon">{{__ "Response identifier"}}</label>
        <span class="icon-help tooltipstered" data-tooltip="~ .tooltip-content:first" data-tooltip-theme="info"></span>
        <div class="tooltip-content">{{__ 'The identifier of the choice. This identifier must not be used by any other response or item variable. An identifier is a string of characters that must start with a Letter or an underscore ("_") and contain only Letters, underscores, hyphens ("-"), period (".", a.k.a. full-stop),
            Digits, CombiningChars and Extenders.'}}</div>

        <input type="text" name="identifier" value="{{identifier}}" placeholder="e.g. RESPONSE" data-validate="$notEmpty; $qtiIdentifier; $availableIdentifier(serial={{serial}});">
    </div>
    <hr>
    <div class="panel">
        <p class="parag">Snap for TAO est une PCI conçue par la <a href="http://www.education.gouv.fr/pid25496/statistiques.html" target="blank">DEPP</a> - Ministère de l'éducation nationale - France.</p>
        <p class="parag">Adaptation et réalisation de la PCI par <a href="http://www.wiquid.fr" target="blank">Wiquid.</a></p>
        <p class="parag">Snap est un projet développé par <a href="http://snap.berkeley.edu/" target="blank">l'Université de Berkeley (Californie)</a>.</p>
    </div>