class Joueur {
  /**
   * Setter pour le nom de l'équipe
   * @param {string} nom - Nom du joueur
   */
  setNom(nom) {
    this.nom = nom;
  }

  getNom() {
    return this.nom;
  }

  setSalaire(salaire) {
    this.salaire = salaire;
  }

  getSalaire() {
    return this.salaire;
  }

  setNbrBut(nbrBut) {
    this.nbrBut = nbrBut;
  }

  getNbrBut() {
    return this.nbrBut;
  }

  setNbrTitre(nbrTitre) {
    this.nbrTitre = nbrTitre;
  }

  getNbrTitre() {
    return this.nbrTitre;
  }

  setFkPhoto(fk_photo) {
    this.fk_photo = fk_photo;
  }

  getFkPhoto() {
    return this.fk_photo;
  }

  setFkPosition(fk_position) {
    this.fk_position = fk_position;
  }

  getFkPosition() {
    return this.fk_position;
  }

  setDatenaissance(datenaissance) {
    this.datenaissance = datenaissance;
  }

  getDatenaissance() {
    return this.datenaissance;
  }

  setNumero(numero) {
    this.numero = numero;
  }

  getNumero() {
    return this.numero;
  }

  /**
   * Retourne le nom de l'équipe sous forme de texte
   * @returns {string} Le nom de l'équipe
   */
  toString() {
    return this.nom;
  }
}
