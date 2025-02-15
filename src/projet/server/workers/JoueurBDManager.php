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
    public function readJoueurs($fkPays)
    {
        $count = 0;
        $liste = array();
        $connection = Connexion::getInstance();
        $query = $connection->selectQuery("select * from T_joueur where FK_equipe=" . $fkPays, array());
        foreach ($query as $data) {
            $joueur = new Joueur($data['PK_joueur'], $data['Nom'], $data['DateNaissance'],
             $data['Numero'], $data['Salaire'], $data['NbrBut'], $data['NbrTitre'],
             $data['FK_position'],$data['FK_equipe'],$data['FK_Photo']);
            $liste[$count++] = $joueur;
        }
        return $liste;
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