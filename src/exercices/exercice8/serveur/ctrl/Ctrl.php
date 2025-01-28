<?php
require_once("./wrk/Wrk.php");

class Ctrl {
    
    private $wrk;

    public function __construct() {
        $this->wrk = new Wrk();
    }

    public function getJoueursXML($idEquipe)
    {
        $joueurs = $this->wrk->getJoueurs($idEquipe);
        
        // Création de l'objet XML
        $xml = new SimpleXMLElement('<joueurs></joueurs>');
        
        foreach ($joueurs as $joueur) {
            $joueurElement = $xml->addChild('joueur');
            $joueurElement->addChild('id', $joueur->getId());
            $joueurElement->addChild('nom', $joueur->getNom());
            $joueurElement->addChild('equipe', $joueur->getEquipe());
            $joueurElement->addChild('points', $joueur->getPoints());
        }

        // Retourne le XML sous forme de chaîne
        return $xml->asXML();
    }

    public function getEquipesXML()
    {
        $equipes = $this->wrk->getEquipes();
        
        $xml = new SimpleXMLElement('<equipes></equipes>');
        
        foreach ($equipes as $equipe) {
            $equipeElement = $xml->addChild('equipe');
            $equipeElement->addChild('id', $equipe->getId());
            $equipeElement->addChild('nom', $equipe->getNom());
        }

        // Retourne le XML sous forme de chaîne
        return $xml->asXML();
    }


}