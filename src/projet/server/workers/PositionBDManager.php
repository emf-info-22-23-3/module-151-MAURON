<?php
include_once('Connexion.php');

/**
 * Classe PositionBDManager
 *
 * Cette classe permet la gestion des positions des joueurs dans la base de données
 *
 */
class PositionBDManager
{
    /**
     * Fonction permettant la lecture des positions.
     * Cette fonction permet de retourner la liste des positions se trouvant dans la liste
     *
     * @return liste des positions
     */
    public function readPositions()
    {
        $count = 0;
        $liste = array();
        $connection = Connexion::getInstance();
        $query = $connection->selectQuery("select * from T_position", array());
        foreach ($query as $data) {
            $position = new Position($data['PK_position'], $data['Nom']);
            $liste[$count++] = $position;
        }
        return $liste;
    }

    /**
     * Fonction permettant de retourner la liste des positions en XML.
     *
     * @return String. Liste des positions en XML
     */
    public function getInXML()
    {
        $listPositions = $this->readPositions();
        $result = '<positions>';
        for ($i = 0; $i < sizeof($listPositions); $i++) {
            $result = $result . $listPositions[$i]->toXML();
        }
        $result = $result . '</positions>';
        return $result;
    }
}

?>