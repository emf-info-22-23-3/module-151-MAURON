<?php

require_once("workers/LoginBDManager.php");
require_once("SessionManager.php");

// Vérification de l'existence de la requête HTTP
if (isset($_SERVER['REQUEST_METHOD'])) {
    // Création d'une instance de SessionManager
    $sessionManager = new SessionManager();

    // Gestion de la connexion
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['action'] == 'connect') {
        if (isset($_POST['login']) && isset($_POST['password'])) {
            $username = $_POST['login'];
            $password = $_POST['password'];
            $loginBD = new LoginBDManager();

            $result = $loginBD->checkLogin($username);
            if ($result != null) {
                if (password_verify($password, $result['MotDePasse'])) {
                    // Ouverture de session en cas de succès
                    $sessionManager->openSession($username);
                    echo '<retour><result>true</result><user>' . $sessionManager->currentUser() . '</user></retour>';
                    http_response_code(200);
                } else {
                    // Mot de passe incorrect
                    http_response_code(401);
                    echo '<result>Mot de passe incorrect </result>';
                }
            } else {
                // Nom d'utilisateur incorrect
                http_response_code(404);
                echo '<result>Username incorrecte</result>';
               
            }
        } else {
            // Champs manquants
            http_response_code(400);
            echo '<result>Champs manquants</result>';
        }
    }
    
    // Gestion de la déconnexion
    if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['action'] == 'disconnect') {
        $sessionManager->destroySession();
        http_response_code(200);
        echo '<result>true</result>';
    }
}