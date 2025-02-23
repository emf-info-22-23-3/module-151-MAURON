/*
  But :    Classe qui permet de faire des requêtes sur les API
  Auteur : Simon Mauron
  Date :   11.06.2024 / V1.0
*/

var BASE_URL = "http://localhost:8080/projet/server/";

class ServiceHttp {
  constructor() {}

  chargerEquipe(successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "xml",
      url: BASE_URL + "equipeManager.php",
      success: successCallback,
      error: errorCallback,
    });
  }

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

  chargerPosition(successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "xml",
      url: BASE_URL + "positionManager.php",
      success: successCallback,
      error: errorCallback,
    });
  }

  chargerphoto(successCallback, errorCallback) {
    $.ajax({
      type: "GET",
      dataType: "xml",
      url: BASE_URL + "photoManager.php",
      success: successCallback,
      error: errorCallback,
    });
  }

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

  ajouterJoueur(
    nom,
    dateNaissance,
    numero,
    nbrTitre,
    salaire,
    nbrBut,
    fk_position,
    fk_equipe,
    fk_photo,
    successCallback,
    errorCallback
  ) {
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

  modifierJoueur(
    nom,
    dateNaissance,
    numero,
    nbrTitre,
    salaire,
    nbrBut,
    fk_position,
    pk_joueur,
    successCallback,
    errorCallback
  ) {
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
