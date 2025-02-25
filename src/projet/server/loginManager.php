<?php

require_once("workers/LoginBDManager.php");
require_once("SessionManager.php");


if (isset($_SERVER['REQUEST_METHOD'])) {

    $sessionManager = new SessionManager();

    if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['action'] == 'connect') {
        if (isset($_POST['login']) && isset($_POST['password'])) {
            $username = $_POST['login'];
            $password = $_POST['password'];
            $loginBD = new LoginBDManager();

            $result = $loginBD->checkLogin($username);
            if ($result != null) {
                if (password_verify($password, $result['MotDePasse'])) {

                    $sessionManager->openSession($username);
                    echo '<retour><result>true</result><user>' . $sessionManager->currentUser() . '</user></retour>';
                    http_response_code(200);
                } else {
                    http_response_code(401);
                    echo '<result>Mot de passe incorrect </result>';
                }
            } else {
                http_response_code(404);
                echo '<result>Username incorrecte</result>';
               
            }
        } else {
            http_response_code(400);
            echo '<result>Champs manquants</result>';
        }
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['action'] == 'disconnect') {
        $sessionManager->destroySession();
        http_response_code(200);
        echo '<result>true</result>';
    }
}