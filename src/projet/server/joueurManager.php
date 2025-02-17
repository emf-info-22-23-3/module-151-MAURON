<?php
include_once('workers/JoueurBDManager.php');
include_once('beans/Joueur.php');
if (isset($_SERVER['REQUEST_METHOD'])) {
	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		$bdReader = new JoueurBDManager();
		echo $bdReader->getInXML($_GET['FK_equipe']);
	}

	if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
		//lit les données brutes de la requête (php://input) et de les analyser en un tableau $vars
		parse_str(file_get_contents("php://input"), $vars);

		if (isset($vars['nom']) and isset($vars['dateNaissance']) and isset($vars['numero']) and isset($vars['nbrTitre']) 
		and isset($vars['salaire']) and isset($vars['nbrBut']) and isset($vars['fk_position']) and isset($vars['pk_joueur'])) {

			$bdReader = new JoueurBDManager();
			echo $bdReader->Update($vars['pk_joueur'], $vars['nom'], $vars['dateNaissance'], 
			$vars['numero'], $vars['nbrTitre'],$vars['salaire'], $vars['nbrBut'],$vars['fk_position']);
		}
	}
}

?>