class Joueur {
  /**
   * Setter pour le nom de l'équipe
   * @param {string} nom - Nom du joueur
   */
  setNom(nom) {
    this.nom = nom;
  }

  setPK(pk_joueur){
    this.pk_joueur = pk_joueur;
  }


  setSalaire(salaire) {
    this.salaire = salaire;
  }



  setNbrBut(nbrBut) {
    this.nbrBut = nbrBut;
  }


  setNbrTitre(nbrTitre) {
    this.nbrTitre = nbrTitre;
  }


  setFkPhoto(fk_photo) {
    this.fk_photo = fk_photo;
  }


  setFkPosition(fk_position) {
    this.fk_position = fk_position;
  }


  setDatenaissance(datenaissance) {
    this.datenaissance = datenaissance;
  }


  setNumero(numero) {
    this.numero = numero;
  }


  /**
   * Retourne le nom de l'équipe sous forme de texte
   * @returns {string} Le nom de l'équipe
   */
  toString() {
    return this.nom;
  }
}
