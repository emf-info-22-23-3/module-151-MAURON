<?php
include_once('Connexion.php');

/**
 * Classe EquipeBDManager
 *
 * Cette classe permet la gestion des équipes dans la base de données
 *
 */
class EquipeBDManager
{
    /**
     * Fonction permettant la lecture des equipes.
     * Cette fonction permet de retourner la liste des equipes se trouvant dans la liste
     *
     * @return liste des equipes
     */
    public function readEquipes()
    {
        $count = 0;
        $liste = array();
        $connection = Connexion::getInstance();
        $query = $connection->selectQuery("select * from T_equipe order by Nom", array());
        foreach ($query as $data) {
            $equipe = new Equipe($data['PK_equipe'], $data['Nom']);
            $liste[$count++] = $equipe;
        }
        return $liste;
    }

    /**
     * Fonction permettant de retourner la liste des equipes en XML.
     *
     * @return String. Liste des equipes en XML
     */
    public function getInXML()
    {
        $listEquipes = $this->readEquipes();
        $result = '<equipes>';
        for ($i = 0; $i < sizeof($listEquipes); $i++) {
            $result = $result . $listEquipes[$i]->toXML();
        }
        $result = $result . '</equipes>';
        return $result;
    }
}

?>