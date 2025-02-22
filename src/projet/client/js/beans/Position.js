class Position {

    /**
     * Setter pour le nom de la Position
     * @param {string} nom - Nom de la Position
     */
    setNom(nom) {
      this.nom = nom;
    }
  
    /**
     * Setter pour la clé primaire de la Position
     * @param {number} pk_equipe - Identifiant unique de la Position
     */
    setPk(pk_position) {
      this.pk_position = pk_position;
    }

    getPk(){
      return this.pkk_position;
    }
  
    /**
     * Retourne le nom de la Position sous forme de texte
     * @returns {string} Le nom de la Position
     */
    toString() {
      return this.nom;
    }
  }