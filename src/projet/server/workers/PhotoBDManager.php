<?php
include_once('Connexion.php');

/**
 * Classe PhotoBDManager
 *
 * Cette classe permet la gestion des photo des joueurs dans la base de données
 *
 */
class PhotoBDManager
{
    /**
     * Fonction permettant la lecture des photos.
     * Cette fonction permet de retourner la liste des photos se trouvant dans la liste
     *
     * @return liste des photos
     */
    public function readPhotos()
    {
        $count = 0;
        $liste = array();
        $connection = Connexion::getInstance();
        $query = $connection->selectQuery("select * from T_photo", array());
        foreach ($query as $data) {
            $photo = new Photo($data['PK_photo'], $data['Nom'], $data['Photo']);
            $liste[$count++] = $photo;
        }
        return $liste;
    }

    /**
     * Fonction permettant de retourner la liste des photos en XML.
     *
     * @return String. Liste des photos en XML
     */
    public function getInXML()
    {
        $listPhotos = $this->readPhotos();
        $result = '<photos>';
        for ($i = 0; $i < sizeof($listPhotos); $i++) {
            $result = $result . $listPhotos[$i]->toXML();
        }
        $result = $result . '</photos>';
        return $result;
    }
}

?>