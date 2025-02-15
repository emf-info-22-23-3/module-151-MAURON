<?php 
	include_once('workers/JoueurBDManager.php');
	include_once('beans/Joueur.php');
    if (isset($_SERVER['REQUEST_METHOD']))
	{
		if ($_SERVER['REQUEST_METHOD'] == 'GET')
		{
			$bdReader = new JoueurBDManager();
			echo $bdReader->getInXML($_GET['FK_equipe']);
		}
	}

?>