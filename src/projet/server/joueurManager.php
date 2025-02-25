<?php
include_once('workers/JoueurBDManager.php');
include_once('SessionManager.php');
include_once('beans/Joueur.php');

// Vérification de l'existence de la requête HTTP
if (isset($_SERVER['REQUEST_METHOD'])) {

	//Récupération des joueurs en fonction d'une équipe 
	if ($_SERVER['REQUEST_METHOD'] == 'GET' && $_GET['action'] == "joueurEquipe") {
		$bdReader = new JoueurBDManager();
		http_response_code(200);
		echo $bdReader->getInXML($_GET['FK_equipe']);
	}

	//Récupération de tous les joueurs
	if ($_SERVER['REQUEST_METHOD'] == 'GET' && $_GET['action'] == "allJoueur") {
		$bdReader = new JoueurBDManager();
		http_response_code(200);
		echo $bdReader->getInXMLALL();
	}
    // Création d'une instance de SessionManager pour gérer les sessions utilisateur
	$manager = new SessionManager();

	//Gestion de l'ajout d'un joueur
	if ($_SERVER['REQUEST_METHOD'] == 'POST') {
		//Vérifie que l'utilisateur est connecté
		if ($manager->isConnected()) {
			$bdReader = new JoueurBDManager();
			if (
				!empty($_POST['nom']) and isset($_POST['nom']) and isset($_POST['dateNaissance']) and isset($_POST['numero']) and isset($_POST['nbrTitre'])
				and isset($_POST['salaire']) and isset($_POST['nbrBut']) and isset($_POST['fk_position']) and isset($_POST['fk_equipe'])
				and isset($_POST['fk_photo'])
			) {
				if($bdReader->add(
					htmlspecialchars($_POST['nom'], ENT_QUOTES, 'utf-8'),
					htmlspecialchars($_POST['dateNaissance'], ENT_QUOTES, 'utf-8'),
					htmlspecialchars($_POST['numero'], ENT_QUOTES, 'utf-8'),
					htmlspecialchars($_POST['nbrTitre'], ENT_QUOTES, 'utf-8'),
					htmlspecialchars($_POST['salaire'], ENT_QUOTES, 'utf-8'),
					htmlspecialchars($_POST['nbrBut'], ENT_QUOTES, 'utf-8'),
					htmlspecialchars($_POST['fk_position'], ENT_QUOTES, 'utf-8'),
					htmlspecialchars($_POST['fk_equipe'], ENT_QUOTES, 'utf-8'),
					htmlspecialchars($_POST['fk_photo'], ENT_QUOTES, 'utf-8'),
				)){
					http_response_code(200);
					echo '<result>true</result>';
				} else {
					http_response_code(500);
					echo '<result>false</result>';
				}
			} else {
				http_response_code(400);
				echo '<result>Champs invalide</result>';
			}
		} else {
			http_response_code(401);
			echo '<result>Pas connecté</result>';
		}
	}

	//Gestion de la modification des joueurs
	if ($_SERVER['REQUEST_METHOD'] == 'PUT') {
		//Vérifie que l'utilisateur est connecté
		if ($manager->isConnected()) {
			//lit les données brutes de la requête (php://input) et de les analyser en un tableau $vars
			parse_str(file_get_contents("php://input"), $vars);

			if (
				$vars['nom'] != "" and isset($vars['nom']) and isset($vars['dateNaissance']) and isset($vars['numero']) and isset($vars['nbrTitre'])
				and isset($vars['salaire']) and isset($vars['nbrBut']) and isset($vars['fk_position']) and isset($vars['pk_joueur'])
			) {

				$bdReader = new JoueurBDManager();
				if ($bdReader->update(
					htmlspecialchars($vars['pk_joueur'], ENT_QUOTES, 'utf-8'),
					htmlspecialchars($vars['nom'], ENT_QUOTES, 'utf-8'),
					htmlspecialchars($vars['dateNaissance'], ENT_QUOTES, 'utf-8'),
					htmlspecialchars($vars['numero'], ENT_QUOTES, 'utf-8'),
					htmlspecialchars($vars['nbrTitre'], ENT_QUOTES, 'utf-8'),
					htmlspecialchars($vars['salaire'], ENT_QUOTES, 'utf-8'),
					htmlspecialchars($vars['nbrBut'], ENT_QUOTES, 'utf-8'),
					htmlspecialchars($vars['fk_position'], ENT_QUOTES, 'utf-8')
				)){
					http_response_code(200);
					echo '<result>true</result>';
				} else {
					http_response_code(500);
					echo '<result>false</result>';
				}
			} else {
				http_response_code(400);
				echo '<result>Champs invalide</result>';
			}
		} else {
			http_response_code(401);
			echo '<result>Pas connecté</result>';
		}
	}
}
?>