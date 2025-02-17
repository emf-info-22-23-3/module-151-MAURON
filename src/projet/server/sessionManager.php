<?php

session_start();
class SessionManager {
    // Démarre la session si elle n'est pas déjà démarrée
    public function openSession($user) {
        // Si la session n'est pas démarrée, on la démarre
        if (session_status() == PHP_SESSION_NONE) {
            session_start();
        }

        // On stocke les informations de l'utilisateur dans la session
        $_SESSION['user'] = $user;
    }

    // Détruit la session en cours
    public function destroySession() {
        // On détruit la session et toutes ses variables
        session_unset();
        session_destroy();
    }

    // Vérifie si l'utilisateur est connecté (si une session existe)
    public function isConnected() {
        return isset($_SESSION['user']);
    }

    // Retourne l'utilisateur actuel
    public function currentUser() {
        // Si un utilisateur est connecté, on retourne ses informations
        return isset($_SESSION['user']) ? $_SESSION['user'] : null;
    }
}

?>

