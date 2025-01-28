<?php
	$bdd = new PDO('mysql:host=localhost;dbname=nomDB', 'root', 'pwd');
	$reponse = $bdd->prepare("SELECT titre FROM jeux_video");
	$reponse->execute();
	
	while ($donnees = $reponse->fetch()) {
		echo $donnees['titre'] . '<br>';
	}
	$reponse->closeCursor();
?>
