<?php
/**
 * Classe Joueur
 *
 * Cette classe représente un Joueur.
 * @author Simon Mauron
 * @version 1
 */
class Joueur
{
    private $pk_joueur;
    private $nom;
    private $dateNaissance;
    private $numero;
    private $salaire;
    private $nbrBut;
    private $nbrTitre;
    private $fk_position;
    private $fk_equipe;
    private $fk_photo;



    public function __construct($pk_joueur,$nom,$dateNaissance,$numero,$salaire,$nbrBut,$nbrTitre,$fk_position,$fk_equipe,$fk_photo) {

        $this->pk_joueur = $pk_joueur;
        $this->nom = $nom; 
        $this->dateNaissance = $dateNaissance;
        $this->numero = $numero;
        $this->salaire = $salaire;
        $this->nbrBut = $nbrBut;
        $this->nbrTitre = $nbrTitre;
        $this->fk_position = $fk_position;
        $this->fk_equipe = $fk_equipe;
        $this->fk_photo = $fk_photo;
    }
   
    
    /**
     * Fonction qui retourne le nom du joueur.
     *
     * @return nom du joueur.
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
    public function getPKJoueur()
    {
        return $this->pk_joueur;
    }

    public function getDateNaissance(){
        return $this->dateNaissance;
    }

    public function getNumero(){
        return $this->numero;
    }
    public function getSalaire(){
        return $this->salaire;
    }
    public function getnbrBut(){
        return $this->nbrBut;
    }
    public function getnbrTitre(){
        return $this->nbrTitre;
    }

    public function getfkPosition(){
        
        return $this->fk_position;
    }
    public function getfkEquipe(){
        return $this->fk_equipe;
    }

    public function getfkPhoto(){
        return $this->fk_photo;

    }

    /**
     * Fonction qui retourne le contenu du bean au format XML
     * @return le contenu du bean au format XML
     */
    public function toXML()
    {
        $result = '<joueur>';
        $result = $result . '<pk_joueur>' . $this->getPKJoueur() . '</pk_joueur>';
        $result = $result . '<nom>' . $this->getNom() . '</nom>';
        $result = $result . '<dateNaissance>' . $this->getDateNaissance() . '</dateNaissance>';
        $result = $result . '<numero>'. $this->getNumero() . '</numero>';
        $result = $result . '<salaire>'. $this->getSalaire() . '</salaire>';
        $result = $result . '<nbrBut>'. $this->getnbrBut() . '</nbrBut>';
        $result = $result . '<nbrTitre>'. $this->getnbrTitre() . '</nbrTitre>';
        $result = $result . '<fk_equipe>'. $this->getFKEquipe() . '</fk_equipe>';
        $result = $result . '<fk_position>'. $this->getfkPosition() . '</fk_position>';
        $result = $result . '<fk_photo>'. $this->getfkPhoto() . '</fk_photo>';
        $result = $result . '</joueur>';
        return $result;
    }
}
?>