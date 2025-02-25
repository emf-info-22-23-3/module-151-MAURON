<?php
include_once('Connexion.php');

/**
 * Classe LoginBDManager
 *
 * Cette classe permet le controle des logins
 * @author Simon Mauron
 * @version 1
 */
class LoginBDManager
{

    /**
     * function qui check si un username est dans la db
     * @param mixed $username usersame a check
     * return un array qui contient le mot de passe
     */
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