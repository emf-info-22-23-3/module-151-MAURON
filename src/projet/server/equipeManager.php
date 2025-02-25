<?php
// Inclusion des fichiers 
include_once('workers/EquipeBDManager.php');
include_once('beans/Equipe.php');

if (isset($_SERVER['REQUEST_METHOD'])) {
	// Vérification si la requête est de type GET
	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		// Création d'une instance de la classe EquipeBDManager
		$equipeBD = new EquipeBDManager();
		// Récupération des données en format XML et affichage
		echo $equipeBD->getInXML();
	}
}
?>