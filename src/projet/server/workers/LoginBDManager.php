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

    function checkLogin($username)
    {
        $result = null;
        $requete = "SELECT MotDePasse from T_administrateur where Login = :username";
        $params = array('username' => $username);
        $data = Connexion::getInstance()->selectSingleQuery($requete, $params);
        if (count($data) > 0) {
            $result = $data;
        }
        return $result;
    }
}