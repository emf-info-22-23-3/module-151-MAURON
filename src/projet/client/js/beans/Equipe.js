class Equipe {
  /**
   * Setter pour le nom de l'équipe
   * @param {string} nom - Nom de l'équipe
   */
  setNom(nom) {
    this.nom = nom;
  }

  /**
   * Setter pour la clé primaire de l'équipe
   * @param {number} pk_equipe - Identifiant unique de l'équipe
   */
  setPk(pk_equipe) {
    this.pk_equipe = pk_equipe;
  }

  /**
   * Getter pour le nom de l'équipe
   * @returns nom de l'équipe
   */
  getNom() {
    return this.nom;
  }

  /**
   * Getter pour la pk de l'équipe
   * @returns pk de l'équipe
   */
  getPk(){
    return this.pk_equipe;
  }

  /**
   * Retourne le nom de l'équipe sous forme de texte
   * @returns {string} Le nom de l'équipe
   */
  toString() {
    return this.nom;
  }
}
