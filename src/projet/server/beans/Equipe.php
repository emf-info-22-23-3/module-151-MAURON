<?php
/**
 * Classe Equipe
 *
 * Cette classe représente une Equipe.
 *
 */
class Equipe
{
    private $pk_equipe;
    private $nom;

    /**
     * Constructeur de la classe Equipe
     *
     * @param int $pk_equipe. PK de l'équipe
     * @param string $nom. Nom de l'equipe
     */
    public function __construct($pk_equipe, $nom)
    {
        $this->nom = $nom;
        $this->pk_equipe = $pk_equipe;
    }

    /**
     * Fonction qui retourne le nom de l'équipe.
     *
     * @return nom de l'équipe.
     */
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * Fonction qui retourne la pk de l'equipe.
     *
     * @return pk de l'equipe.
     */
    public function getPkEquipe()
    {
        return $this->pk_equipe;
    }

    /**
     * Fonction qui retourne le contenu du bean au format XML
     * @return le contenu du bean au format XML
     */
    public function toXML()
    {
        $result = '<equipe>';
        $result = $result . '<pk_equipe>' . $this->getPkEquipe() . '</pk_equipe>';
        $result = $result . '<nom>' . $this->getNom() . '</nom>';
        $result = $result . '</equipe>';
        return $result;
    }
}
?>