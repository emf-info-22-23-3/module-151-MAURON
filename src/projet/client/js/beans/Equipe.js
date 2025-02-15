class Equipe {
  /**
   * Constructeur de la classe Equipe
   * @param {number} pk_equipe - PK de l'équipe
   * @param {string} nom - Nom de l'équipe
   */
  constructor(pk_equipe, nom) {
    this.pk_equipe = pk_equipe;
    this.nom = nom;
  }

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
   * Retourne le nom de l'équipe sous forme de texte
   * @returns {string} Le nom de l'équipe
   */
  toString() {
    return this.nom;
  }
}
