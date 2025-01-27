<?php
require_once('Wrk.php');

$wrk = new Wrk();

$equipes = $wrk->getEquipes();

// Créer l'entête XML
header('Content-Type: application/xml');
echo '<equipes>';
foreach ($equipes as $equipe) {
    echo '<equipe>';
    echo '<id>' . $equipe['id'] . '</id>';
    echo '<nom>' . $equipe['nom'] . '</nom>';
    echo '</equipe>';
}
echo '</equipes>';

?>