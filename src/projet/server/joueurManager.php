<?php
include_once('workers/JoueurBDManager.php');
include_once('beans/Joueur.php');
if (isset($_SERVER['REQUEST_METHOD'])) {
	if ($_SERVER['REQUEST_METHOD'] == 'GET') {
		$bdReader = new JoueurBDManager();
		echo $bdReader->getInXML($_GET['FK_equipe']);
	}

	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		$bdReader = new JoueurBDManager();
		if (
			isset($_POST['nom']) and isset($_POST['dateNaissance']) and isset($_POST['numero']) and isset($_POST['nbrTitre'])
			and isset($_POST['salaire']) and isset($_POST['nbrBut']) and isset($_POST['fk_position']) and isset($_POST['fk_equipe'])
			and isset($_POST['fk_photo'])
		) {
			echo $bdReader->Add(
				$_POST['nom'],
				$_POST['dateNaissance'],
				$_POST['numero'],
				$_POST['nbrTitre'],
				$_POST['salaire'],
				$_POST['nbrBut'],
				$_POST['fk_position'],
				$_POST['fk_equipe'],
				$_POST['fk_photo']
			);
		}

	}

	if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
		//lit les données brutes de la requête (php://input) et de les analyser en un tableau $vars
		parse_str(file_get_contents("php://input"), $vars);

		if (
			isset($vars['nom']) and isset($vars['dateNaissance']) and isset($vars['numero']) and isset($vars['nbrTitre'])
			and isset($vars['salaire']) and isset($vars['nbrBut']) and isset($vars['fk_position']) and isset($vars['pk_joueur'])
		) {

			$bdReader = new JoueurBDManager();
			echo $bdReader->Update(
				$vars['pk_joueur'],
				$vars['nom'],
				$vars['dateNaissance'],
				$vars['numero'],
				$vars['nbrTitre'],
				$vars['salaire'],
				$vars['nbrBut'],
				$vars['fk_position']
			);
		}
	}
}

?>