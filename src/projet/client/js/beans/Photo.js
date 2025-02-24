class Photo {

    /**
     * Setter pour le nom de la photo
     * @param {string} nom - Nom de la photo
     */
    setNom(nom) {
      this.nom = nom;
    }
  
    /**
     * Setter pour la clé primaire de la photo
     * @param {number} pk_equipe - Identifiant unique de la photo
     */
    setPk(pk_photo) {
      this.pk_photo = pk_photo;
    }

    /**
     * Getter pour la clé primaire de la photo
     * @returns Identifiant unique de la photo
     */
    getPk(){
      return this.pk_photo;
    }

    /**
     * Setter pour la photo
     * @param {number} photo - photo
     */
    setPhoto(photo){
        this.photo = photo;
    }
  
    /**
     * Retourne le nom de la photo sous forme de texte
     * @returns {string} Le nom de la photo
     */
    toString() {
      return this.nom;
    }
  }