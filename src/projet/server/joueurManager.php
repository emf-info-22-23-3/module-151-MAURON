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
			echo '<result>'.$bdReader->add(
				htmlspecialchars( $_POST['nom'],ENT_QUOTES, 'utf-8'),
				htmlspecialchars( $_POST['dateNaissance'],ENT_QUOTES, 'utf-8'),
				htmlspecialchars( $_POST['numero'],ENT_QUOTES, 'utf-8'),
				htmlspecialchars( $_POST['nbrTitre'],ENT_QUOTES, 'utf-8'),
				htmlspecialchars( $_POST['salaire'],ENT_QUOTES, 'utf-8'),
				htmlspecialchars( $_POST['nbrBut'],ENT_QUOTES, 'utf-8'),
				htmlspecialchars( $_POST['fk_position'],ENT_QUOTES, 'utf-8'),
				htmlspecialchars( $_POST['fk_equipe'],ENT_QUOTES, 'utf-8'),
				htmlspecialchars( $_POST['fk_photo'],ENT_QUOTES, 'utf-8'),
			).'</result>';
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
			echo $bdReader->update(
				htmlspecialchars( $_POST['pk_joueur'],ENT_QUOTES, 'utf-8'),
				htmlspecialchars( $_POST['nom'],ENT_QUOTES, 'utf-8'),
				htmlspecialchars( $_POST['dateNaissance'],ENT_QUOTES, 'utf-8'),
				htmlspecialchars( $_POST['numero'],ENT_QUOTES, 'utf-8'),
				htmlspecialchars( $_POST['nbrTitre'],ENT_QUOTES, 'utf-8'),
				htmlspecialchars( $_POST['salaire'],ENT_QUOTES, 'utf-8'),
				htmlspecialchars( $_POST['nbrBut'],ENT_QUOTES, 'utf-8'),
				htmlspecialchars( $_POST['fk_position'],ENT_QUOTES, 'utf-8')
			);
		}
	}
}

?>