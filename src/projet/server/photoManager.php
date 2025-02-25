<?php 
    // Inclusion des fichiers nécessaires
    include_once('workers/PhotoBDManager.php');
    include_once('beans/Photo.php'); 
        
    // Vérification de l'existence de la requête HTTP
    if (isset($_SERVER['REQUEST_METHOD']))
    {
        // Vérification si la méthode de requête est GET
        if ($_SERVER['REQUEST_METHOD'] == 'GET')
        {
            // Création d'une instance de PhotoBDManager
            $photoBD = new PhotoBDManager();
            
            // Récupération des données en format XML et affichage
            echo $photoBD->getInXML();
        }
    }
?>