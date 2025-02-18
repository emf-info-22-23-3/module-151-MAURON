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
            if ($result !== null) {
                if (password_verify($password, $result['MotDePasse'])) {
                     
                    $sessionManager->openSession($username);
                    echo '<result>'.$sessionManager->currentUser().'</result>';
                    //http_response_code(200);
                }
            }
        } else {
            echo '<result>false</result>';
            //http_response_code(401);
        }
    }

    if ($_SERVER['REQUEST_METHOD'] == 'POST' && $_POST['action'] == 'disconnect'){
        $sessionManager->destroySession();
        echo '<result>true</result>';
    }

}