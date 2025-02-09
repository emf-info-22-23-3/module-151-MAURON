<?php
/**
 * Classe Photo
 *
 * Cette classe représente une Photo.
 *
 */
class Photo
{
    private $pk_photo;
    private $nom;
    private $photo;

    /**
     * Constructeur de la classe Photo
     * @param mixed $pk_equipe
     * @param mixed $nom
     * @param mixed $photo
     */
    public function __construct($pk_photo, $nom, $photo)
    {
        $this->nom = $nom;
        $this->pk_photo = $pk_photo;
        $this->photo = $photo;
    }

    /**
     * Fonction qui retourne le nom de la Photo.
     *
     * @return nom de la Photo.
     */
    public function getNom()
    {
        return $this->nom;
    }

    /**
     * Fonction qui retourne la pk de la Photo.
     *
     * @return pk de la Photo.
     */
    public function getPkPhoto()
    {
        return $this->pk_photo;
    }

    /**
     * Fonction qui retourne la photo d'un joueur
     *
     * @return photo d'un joueur.
     */
    public function getPhoto()
    {
        return $this->photo;
    }

    /**
     * Fonction qui retourne le contenu du bean au format XML
     * @return le contenu du bean au format XML
     */
    public function toXML()
    {
        $result = '<photoJoueur>';
        $result = $result . '<pk_photo>' . $this->getPkPhoto() . '</pk_photo>';
        $result = $result . '<nom>' . $this->getNom() . '</nom>';
        $result = $result . '<photo>' . $this->getPhoto() . '</photo>';
        $result = $result . '</photoJoueur>';
        return $result;
    }
}
?>