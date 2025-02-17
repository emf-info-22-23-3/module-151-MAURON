<?php
include_once('Connexion.php');

/**
 * Classe LoginBDManager
 *
 * Cette classe permet le controle des logins
 *
 */
class LoginBDManager
{

    function checkLogin($username, $password)
    {
        $result = null;
        $requete = "SELECT * from T_administrateur where Login = :username AND MotDePasse = :password";
        $params = array('username' => $username,'password'=> $password);
        $data = Connexion::getInstance()->selectSingleQuery($requete, $params);
        if (count($data) > 0) {
            $result = $data;
        }
        return $result;
    }
}