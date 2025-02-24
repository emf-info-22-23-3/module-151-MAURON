

class Joueur {
  /**
   * Sette du nom du joueur
   * @param {string} nom - Nom du joueur
   */
  setNom(nom) {
    this.nom = nom;
  }

  /**
   * Setter de l'identifiant unique du joueur (Primary Key)
   * @param {number} pk_joueur - Identifiant du joueur
   */
  setPK(pk_joueur) {
    this.pk_joueur = pk_joueur;
  }

  /**
   * Setter le salaire du joueur
   * @param {number} salaire - Salaire du joueur en euros/dollars/etc.
   */
  setSalaire(salaire) {
    this.salaire = salaire;
  }

  /**
   * Setter le nombre de buts marqués par le joueur
   * @param {number} nbrBut - Nombre de buts
   */
  setNbrBut(nbrBut) {
    this.nbrBut = nbrBut;
  }

  /**
   * Setter le nombre de titres remportés par le joueur
   * @param {number} nbrTitre - Nombre de titres gagnés
   */
  setNbrTitre(nbrTitre) {
    this.nbrTitre = nbrTitre;
  }

  /**
   * Setter l'identifiant de la photo associée au joueur
   * @param {number} fk_photo - Clé étrangère vers l'entité Photo
   */
  setFkPhoto(fk_photo) {
    this.fk_photo = fk_photo;
  }

  /**
   * Setter la position du joueur sur le terrain
   * @param {number} fk_position - Clé étrangère vers l'entité Position
   */
  setFkPosition(fk_position) {
    this.fk_position = fk_position;
  }

  /**
   * Setter la date de naissance du joueur
   * @param {string} datenaissance - Date de naissance au format YYYY-MM-DD
   */
  setDatenaissance(datenaissance) {
    this.datenaissance = datenaissance;
  }

  /**
   * Setter le numéro du maillot du joueur
   * @param {number} numero - Numéro du maillot
   */
  setNumero(numero) {
    this.numero = numero;
  }

  /**
   * Retourne le nom du joueur sous forme de texte
   * @returns {string} - Nom du joueur
   */
  toString() {
    return this.nom;
  }
}
