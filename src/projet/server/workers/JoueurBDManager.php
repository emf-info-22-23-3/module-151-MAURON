<?php
include_once('Connexion.php');

/**
 * Classe EquipeBDManager
 *
 * Cette classe permet la gestion des équipes dans la base de données
 *
 */
class JoueurBDManager
{
    /**
     * Fonction permettant la lecture des equipes.
     * Cette fonction permet de retourner la liste des equipes se trouvant dans la liste
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
             WHERE T_joueur.FK_equipe = " . $fkEquipe, 
            array());
        foreach ($query as $data) {
            $joueur = new Joueur($data['PK_joueur'], $data['Nom'], $data['DateNaissance'],
             $data['Numero'], $data['Salaire'], $data['NbrBut'], $data['NbrTitre'],
             $data['position_nom'],$data['FK_equipe'],$data['photo_url']);
            $liste[$count++] = $joueur;
        }
        return $liste;
    }

    public function Add($nom, $dateNaissance, $numero, $nbrTitre, $salaire, $nbrBut, $fk_position, $fk_equipe, $fk_photo)
    {
        $query = "INSERT INTO T_Joueur (Nom, DateNaissance, Numero, NbrTitre, Salaire, NbrBut, FK_position, FK_equipe, FK_Photo) 
        values(:nom, :dateNaissance, :numero, :nbrTitre, :salaire, :nbrBut, :fk_position, :fk_equipe, :fk_photo)";
        $params = array('nom' => $nom, 'dateNaissance' => $dateNaissance, 'numero' => $numero, 'nbrTitre' => $nbrTitre, 'salaire' => $salaire, 
        'nbrBut' => $nbrBut, 'fk_position' => $fk_position, 'fk_equipe'=> $fk_equipe, 'fk_photo' => $fk_photo);
        $res = connexion::getInstance()->ExecuteQuery($query, $params);
        return connexion::getInstance()->GetLastId('T_joueur');		
    }


    public function Update($pk_joueur, $nom, $dateNaissance, $numero, $nbrTitre, $salaire, $nbrBut, $fk_position)
    {
        $query = "UPDATE T_joueur set Nom = :nom, DateNaissance = :dateNaissance, Numero = :numero, NbrTitre = :nbrTitre, Salaire = :salaire,
        NbrBut = :nbrBut, FK_position = :fk_position where PK_joueur = :pk_joueur";
        $params = array('nom' => $nom, 'dateNaissance' => $dateNaissance, 'numero' => $numero, 'nbrTitre' => $nbrTitre, 'salaire' => $salaire, 
        'nbrBut' => $nbrBut, 'fk_position' => $fk_position, 'pk_joueur' => $pk_joueur);
        $res = connexion::getInstance()->ExecuteQuery($query, $params);
        if ($res > 0)
        {
            return 'True';
        }
        else{
            return 'False';
        }	
    }

    /**
     * Fonction permettant de retourner la liste des equipes en XML.
     *
     * @return String. Liste des equipes en XML
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
}

?>