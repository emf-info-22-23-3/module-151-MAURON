<?php 

class Equipe implements JsonSerializable {
private $id;
private $nom;

function __construct($id = null, $nom = null){
    $this->id = $id;
    $this->nom = $nom;
}

    public function getId() {
        return $this->id;
    }

    public function getNom() {
        return $this->nom;
    }

    public function jsonSerialize() {
        return [
            'id' => $this->id,
            'nom' => $this->nom
        ];
    }

    public function setId($id) {
        $this->id = $id;
    }

    public function setNom($nom) {
        $this->nom = $nom;
    }
}

