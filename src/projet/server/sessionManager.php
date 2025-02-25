<?php

session_start();

/**
 * Class SessionManager
 * Gère les sessions utilisateur, y compris l'ouverture, la fermeture et la vérification de connexion.
 */
class SessionManager
{
    /**
     * Démarre une session et stocke le nom de l'utilisateur.
     *
     * @param array $user le nom de l'utilisateur
     * @return void
     */
    public function openSession($user)
    {
        // Stocke le nom de l'utilisateur dans la session
        $_SESSION['user'] = $user;
    }

    /**
     * Détruit la session en cours et supprime toutes les variables de session.
     *
     * @return void
     */
    public function destroySession()
    {
        session_unset();  // Supprime toutes les variables de session
        session_destroy(); // Détruit la session
    }

    /**
     * Vérifie si un utilisateur est connecté.
     *
     * @return bool Retourne `true` si l'utilisateur est connecté, sinon `false`.
     */
    public function isConnected()
    {
        return isset($_SESSION['user']);
    }

    /**
     * Récupère les informations de l'utilisateur actuellement connecté.
     *
     * @return nom|null Retourne le nom de l'utilisateur, ou `null` si aucun utilisateur n'est connecté.
     */
    public function currentUser()
    {
        return $_SESSION['user'] ?? null;
    }
}

?>