<?php
include_once('Connexion.php');

/**
 * Classe EquipeBDManager
 *
 * Cette classe permet la gestion des équipes dans la base de données
 * @author Simon Mauron
 * @version 1
 */
class JoueurBDManager
{
    /**
     * Fonction permettant la lecture des joueurs en fonction d'une équipe.
     * Cette fonction permet de retourner la liste des joueurs en fonction d'une équipe
     *
     * @return liste des equipes
     */
    public function readJoueurs($fkEquipe)
    {
        $count = 0;
        $liste = array();
        $connection = Connexion::getInstance();
        $query = $connection->selectQuery(
            "SELECT T_joueur.*, T_position.Nom AS position_nom, T_photo.Photo AS photo_url
             FROM T_joueur
             LEFT JOIN T_position ON T_joueur.FK_position = T_position.PK_position
             LEFT JOIN T_photo ON T_joueur.FK_Photo = T_photo.PK_photo
             WHERE T_joueur.FK_equipe = :fkEquipe",
            array(":fkEquipe" => $fkEquipe)
        );
        foreach ($query as $data) {
            $joueur = new Joueur(
                $data['PK_joueur'],
                $data['Nom'],
                $data['DateNaissance'],
                $data['Numero'],
                $data['Salaire'],
                $data['NbrBut'],
                $data['NbrTitre'],
                $data['position_nom'],
                $data['FK_equipe'],
                $data['photo_url']
            );
            $liste[$count++] = $joueur;
        }
        return $liste;
    }

    /**
     * Fonction permettant la lecture de tous les joueurs.
     * Cette fonction permet de retourner la liste des joueurs se trouvant dans la DB
     *
     * @return liste des joueurs
     */
    public function readAllJoueurs()
    {
        $count = 0;
        $liste = array();
        $connection = Connexion::getInstance();
        $query = $connection->selectQuery(
            "SELECT T_joueur.*, T_position.Nom AS position_nom, T_photo.Photo AS photo_url
             FROM T_joueur
             LEFT JOIN T_position ON T_joueur.FK_position = T_position.PK_position
             LEFT JOIN T_photo ON T_joueur.FK_Photo = T_photo.PK_photo",
            array()
        );
        foreach ($query as $data) {
            $joueur = new Joueur(
                $data['PK_joueur'],
                $data['Nom'],
                $data['DateNaissance'],
                $data['Numero'],
                $data['Salaire'],
                $data['NbrBut'],
                $data['NbrTitre'],
                $data['position_nom'],
                $data['FK_equipe'],
                $data['photo_url']
            );
            $liste[$count++] = $joueur;
        }
        return $liste;
    }

    /**
     * Fonction permettant d'ajouter un joueur.
     * Cette fonction permet d'ajouter un joueur dans la DB
     *
     * @return  True si réussie sinon False
     */
    public function add($nom, $dateNaissance, $numero, $nbrTitre, $salaire, $nbrBut, $fk_position, $fk_equipe, $fk_photo)
    {
        $query = "INSERT INTO T_Joueur (Nom, DateNaissance, Numero, NbrTitre, Salaire, NbrBut, FK_position, FK_equipe, FK_Photo) 
        values(:nom, :dateNaissance, :numero, :nbrTitre, :salaire, :nbrBut, :fk_position, :fk_equipe, :fk_photo)";
        $params = array(
            'nom' => $nom,
            'dateNaissance' => $dateNaissance,
            'numero' => $numero,
            'nbrTitre' => $nbrTitre,
            'salaire' => $salaire,
            'nbrBut' => $nbrBut,
            'fk_position' => $fk_position,
            'fk_equipe' => $fk_equipe,
            'fk_photo' => $fk_photo
        );
        $res = connexion::getInstance()->ExecuteQuery($query, $params);
        if ($res > 0) {
            return true;
        } else {
            return false;
        }

    }

    /**
     * Fonction permettant de modifier un joueur.
     * Cette fonction permet de modifier un joueur
     *
     * @return  True si réussie sinon False
     */

    public function update($pk_joueur, $nom, $dateNaissance, $numero, $nbrTitre, $salaire, $nbrBut, $fk_position)
    {
        $query = "UPDATE T_joueur set Nom = :nom, DateNaissance = :dateNaissance, Numero = :numero, NbrTitre = :nbrTitre, Salaire = :salaire,
        NbrBut = :nbrBut, FK_position = :fk_position where PK_joueur = :pk_joueur";
        $params = array(
            'nom' => $nom,
            'dateNaissance' => $dateNaissance,
            'numero' => $numero,
            'nbrTitre' => $nbrTitre,
            'salaire' => $salaire,
            'nbrBut' => $nbrBut,
            'fk_position' => $fk_position,
            'pk_joueur' => $pk_joueur
        );
        $res = connexion::getInstance()->executeQuery($query, $params);
        if ($res > 0) {
            return true;
        } else {
            return false;

        }
    }

    /**
     * Fonction permettant de retourner la liste des joueurs en fonction d'une équipe en XML.
     *
     * @return String. Liste des joueurs en XML
     */
    public function getInXML($fkPays)
    {
        $listJoueurs = $this->readJoueurs($fkPays);
        $result = '<joueurs>';
        for ($i = 0; $i < sizeof($listJoueurs); $i++) {
            $result = $result . $listJoueurs[$i]->toXML();
        }
        $result = $result . '</joueurs>';
        return $result;
    }

    /**
     * Fonction permettant de retourner la liste des joueurs en XML.
     *
     * @return String. Liste des joueurs en XML
     */
    public function getInXMLALL()
    {
        $listJoueurs = $this->readAllJoueurs();
        $result = '<joueurs>';
        for ($i = 0; $i < sizeof($listJoueurs); $i++) {
            $result = $result . $listJoueurs[$i]->toXML();
        }
        $result = $result . '</joueurs>';
        return $result;
    }
}

?>