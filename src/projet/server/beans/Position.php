<?php
/**
 * Classe Position
 *
 * Cette classe représente une Position.
 *
 */
class Position
{
    private $pk_position;
    private $nom;

    /**
     * Constructeur de la classe Position
     *
     * @param int $pk_position. PK de la position
     * @param string $nom. Nom de la position
     */
    public function __construct($pk_position, $nom)
    {
        $this->nom = $nom;
        $this->pk_position = $pk_position;
    }

    /**
     * Fonction qui retourne le nom de la position.
     *
     * @return nom de la position.
     */
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * Fonction qui retourne la pk de la position.
     *
     * @return pk de la position.
     */
    public function getPkPosition()
    {
        return $this->pk_position;
    }

    /**
     * Fonction qui retourne le contenu du bean au format XML
     * @return le contenu du bean au format XML
     */
    public function toXML()
    {
        $result = '<position>';
        $result = $result . '<pk_position>' . $this->getPkPosition() . '</pk_position>';
        $result = $result . '<nom>' . $this->getNom() . '</nom>';
        $result = $result . '</position>';
        return $result;
    }
}
?>