/*
  But :    Classe qui permet de faire des requêtes au server
  Auteur : Simon Mauron
  Date :   25.02.2025 / V1.0
*/
// Définition de l'URL de base du serveur
var BASE_URL = "http://localhost:8080/projet/server/";

class ServiceHttp {
  constructor() {}

  /**
   * Charge la liste des équipes en effectuant une requête GET.
   * @param {function} successCallback - Fonction de rappel en cas de succès.
   * @param {function} errorCallback - Fonction de rappel en cas d'erreur.
   */
  chargerEquipe(successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "xml",
      url: BASE_URL + "equipeManager.php",
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Charge la liste de tous les joueurs.
   * @param {function} successCallback - Fonction de rappel en cas de succès.
   * @param {function} errorCallback - Fonction de rappel en cas d'erreur.
   */
  chargerAllJoueur(successCallback, errorCallback){
    $.ajax({
      type: "GET",
      dataType: "xml",
      url: BASE_URL + "joueurManager.php",
      data: "action=allJoueur",
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Charge les joueurs d'une équipe spécifique.
   * @param {number} fk_equipe - Clé étrangère de l'équipe.
   * @param {function} successCallback - Fonction de rappel en cas de succès.
   * @param {function} errorCallback - Fonction de rappel en cas d'erreur.
   */
  chargerJoueur(fk_equipe, successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "xml",
      url: BASE_URL + "joueurManager.php",
      data: "action=joueurEquipe&FK_equipe=" + fk_equipe,
      success: successCallback,
      error: errorCallback,
    });
  }

    /**
   * Charge la liste des positions disponibles.
   * @param {function} successCallback - Fonction de rappel en cas de succès.
   * @param {function} errorCallback - Fonction de rappel en cas d'erreur.
   */

  chargerPosition(successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "xml",
      url: BASE_URL + "positionManager.php",
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Charge les photos associées aux joueurs.
   * @param {function} successCallback - Fonction de rappel en cas de succès.
   * @param {function} errorCallback - Fonction de rappel en cas d'erreur.
   */
  chargerphoto(successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "xml",
      url: BASE_URL + "photoManager.php",
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Effectue une connexion utilisateur avec un login et un mot de passe.
   * @param {string} login - Nom d'utilisateur.
   * @param {string} passwd - Mot de passe.
   * @param {function} successCallback - Fonction de rappel en cas de succès.
   * @param {function} errorCallback - Fonction de rappel en cas d'erreur.
   */
  connect(login, passwd, successCallback, errorCallback) {
    $.ajax({
      type: "POST",
      dataType: "xml",
      url: BASE_URL + "loginManager.php",
      data: "action=connect&login=" + login + "&password=" + passwd,
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Déconnecte l'utilisateur.
   * @param {function} successCallback - Fonction de rappel en cas de succès.
   * @param {function} errorCallback - Fonction de rappel en cas d'erreur.
   */
  disconnect(successCallback, errorCallback) {
    $.ajax({
      type: "POST",
      dataType: "xml",
      url: BASE_URL + "loginManager.php",
      data: "action=disconnect",
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Ajoute un joueur à la base de données.
   * @param {string} nom - Nom du joueur.
   * @param {string} dateNaissance - Date de naissance du joueur.
   * @param {number} numero - Numéro du joueur.
   * @param {number} nbrTitre - Nombre de titres remportés.
   * @param {number} salaire - Salaire du joueur.
   * @param {number} nbrBut - Nombre de buts marqués.
   * @param {number} fk_position - Clé étrangère de la position du joueur.
   * @param {number} fk_equipe - Clé étrangère de l'équipe du joueur.
   * @param {number} fk_photo - Clé étrangère de la photo du joueur.
   * @param {function} successCallback - Fonction de rappel en cas de succès.
   * @param {function} errorCallback - Fonction de rappel en cas d'erreur.
   */
  ajouterJoueur(nom,dateNaissance,numero,nbrTitre,salaire,nbrBut,fk_position,fk_equipe,fk_photo,successCallback,errorCallback) {
    $.ajax({
      type: "POST",
      dataType: "xml",
      url: BASE_URL + "joueurManager.php",
      data:
        "action=ajouter&nom=" +
        nom +
        "&dateNaissance=" +
        dateNaissance +
        "&numero=" +
        numero +
        "&nbrTitre=" +
        nbrTitre +
        "&salaire=" +
        salaire +
        "&nbrBut=" +
        nbrBut +
        "&fk_position=" +
        fk_position +
        "&fk_equipe=" +
        fk_equipe +
        "&fk_photo=" +
        fk_photo,
      success: successCallback,
      error: errorCallback,
    });
  }

  /**
   * Modifie les informations d'un joueur existant.
   * @param {string} nom - Nom du joueur.
   * @param {string} dateNaissance - Date de naissance du joueur.
   * @param {number} numero - Numéro du joueur.
   * @param {number} nbrTitre - Nombre de titres remportés.
   * @param {number} salaire - Salaire du joueur.
   * @param {number} nbrBut - Nombre de buts marqués.
   * @param {number} fk_position - Clé étrangère de la position du joueur.
   * @param {number} pk_joueur - Clé primaire du joueur à modifier.
   * @param {function} successCallback - Fonction de rappel en cas de succès.
   * @param {function} errorCallback - Fonction de rappel en cas d'erreur.
   */
  modifierJoueur(nom,dateNaissance,numero,nbrTitre,salaire,nbrBut,fk_position,pk_joueur,successCallback,errorCallback) {
    $.ajax({
      type: "PUT",
      url: BASE_URL + "joueurManager.php",
      data: {
        pk_joueur: pk_joueur,
        nom: nom,
        dateNaissance: dateNaissance,
        numero: numero,
        nbrTitre: nbrTitre,
        salaire: salaire,
        nbrBut: nbrBut,
        fk_position: fk_position,
      },
      success: successCallback,
      error: errorCallback,
    });
  }
}
