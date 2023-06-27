<div class="panel">
    <label for="inventaire">{{__ "Correction"}}</label>
    <span class="icon-help tooltipstered" data-tooltip="~ .tooltip-content:first" data-tooltip-theme="info"></span>
    <span class="tooltip-content">{{__ "Correction TODO"}}</span>
    <button id="correct">Sauver la correction</button>
    <div class="etiqSaved"></div>
    <label for="inventaire">{{__ "Notes de Dev."}}</label>
    <div style="font-size: 0.7em;">
        <p>On note que dans cette version, nous ne disposons pas d'un loader. Le concepteur d'item ne peut pas figer l'état du circuit sur le canvas. L'élève doit pour le moment commencer son travail avec un canvas vide. L'item rechargé dans l'éditeur présente
            lui-aussi un canvas vide, même si la logique de la correction a été enregistrée.</p>
        <p>Nous sommes bien en mesure de mémoriser la logique du Circuit à travers un JSON. Le concepteur d'item peut ainsi sauvegarder sa correction qui peut s'afficher sous la forme d'une vignette dans le panel option de la PCI.
        </p>
        <p>Présentées sous la forme d'un JSON, les valeurs des connecteurs permettent de définir quel connecteur est connecté avec quel autre. Exemple : un connecteur 1 de la batterie aura comme valeur 2, il est connecté avec le cable qui a son connecteur1
            de valeur 2 également.</p>
        <p>On pourrait envisager la correction automatique, partielle ou totale en comparant le JSON de correction avec le JSON représentant la production de l'élève.</p>
        <p>Pistes futurs dev. : </p>
        <ol>
            <li>Loader de composant à partir d'un script JSON</li>
            <li>Correction automatique.</li>
            <li>Utiliser ce framework pour une PCI MindMap plus ouverte</li>
            <li>Envisager des sets de composants</li>
        </ol>
    </div>
</div>