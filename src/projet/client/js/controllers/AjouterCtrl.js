/**
 * La classe AjouterCtrl gère l'ajout d'un joueur en s'interfaçant avec l'utilisateur et en effectuant des appels HTTP pour récupérer
 * les équipes, les positions et les photos des joueurs. Elle inclut également des mécanismes de validation des données et de gestion des erreurs.
 * @author Simon Mauron
 * @version 1.0
 */

class AjouterCtrl {
  /**
   * Constructeur de la classe AjouterCtrl. Initialise les éléments nécessaires à l'ajout d'un joueur, charge les scripts nécessaires et
   * effectue les appels HTTP pour charger les équipes, les positions et les photos.
   */
  constructor() {
    var valider = document.getElementById("valider");
    var retour = document.getElementById("retour");

    $.getScript("js/beans/Equipe.js");
    $.getScript("js/beans/Joueur.js");
    $.getScript("js/beans/Position.js");

    http.chargerEquipe(this.chargerEquipeSuccess, this.gestionErreurEquipe);
    http.chargerPosition(
      this.chargerPositionSuccess,
      this.gestionErreurPosition
    );
    http.chargerphoto(this.chargerPhotoSuccess, this.gestionErreurPhoto);
    // Ajout des écouteurs d'événements
    valider.addEventListener("click", () => {
      http.ajouterJoueur(
        document.getElementById("nom").value,
        document.getElementById("dateNaissance").value,
        document.getElementById("numero").value,
        document.getElementById("nbrTitre").value,
        document.getElementById("salaire").value,
        document.getElementById("nbrBut").value,
        document.getElementById("cmbPosition").value,
        document.getElementById("cmbEquipe").value,
        document.getElementById("cmbPhoto").value,
        this.afficheAjoutSuccess,
        this.afficheAjoutErreur
      );
    });

    retour.addEventListener("click", () => {
      indexCtrl.loadPage(sessionStorage.getItem("utilisateur"));
    });
  }

  /**
   * Méthode appelée après avoir chargé avec succès les données des équipes.
   * Elle remplit la liste déroulante des équipes avec les options correspondant aux équipes récupérées.
   *
   * @param {Object} data - Données reçues du serveur.
   * @param {string} text - Message texte.
   * @param {Object} jqXHR - Objet de la requête AJAX.
   */
  chargerEquipeSuccess(data, text, jqXHR) {
    var cmbEquipe = document.getElementById("cmbEquipe");
    cmbEquipe.options.length = 0;
    $(data)
      .find("equipe")
      .each(function () {
        var equipe = new Equipe();
        equipe.setNom($(this).find("nom").text());
        equipe.setPk($(this).find("pk_equipe").text());
        var option = new Option(equipe.getNom(), equipe.getPk());
        cmbEquipe.options[cmbEquipe.options.length] = option;
      });
  }

  /**
   * Méthode appelée après avoir chargé avec succès les données des photos.
   * Elle remplit la liste déroulante des photos avec les options correspondant aux photos des joueurs récupérées.
   *
   * @param {Object} data - Données reçues du serveur.
   * @param {string} text - Message texte.
   * @param {Object} jqXHR - Objet de la requête AJAX.
   */
  chargerPhotoSuccess(data, text, jqXHR) {
    var cmbPhoto = document.getElementById("cmbPhoto");
    $(data)
      .find("photoJoueur")
      .each(function () {
        var photo = new Photo();
        photo.setNom($(this).find("nom").text());
        photo.setPk($(this).find("pk_photo").text());
        photo.setPhoto($(this).find("photo").text());
        var option = new Option(photo, photo.getPk());
        cmbPhoto.options[cmbPhoto.options.length] = option;
      });
  }

  /**
   * Méthode appelée après avoir chargé avec succès les données des positions.
   * Elle remplit la liste déroulante des positions avec les options correspondant aux positions récupérées.
   *
   * @param {Object} data - Données reçues du serveur.
   * @param {string} text - Message texte.
   * @param {Object} jqXHR - Objet de la requête AJAX.
   */
  chargerPositionSuccess(data, text, jqXHR) {
    var cmbPosition = document.getElementById("cmbPosition");
    $(data)
      .find("position")
      .each(function () {
        var position = new Position();
        position.setNom($(this).find("nom").text());
        position.setPk($(this).find("pk_position").text());
        var option = new Option(position, position.getPk());
        cmbPosition.options[cmbPosition.options.length] = option;
      });
  }

  /**
   * Méthode appelée après un ajout réussi d'un joueur. Affiche un message de succès et redirige l'utilisateur vers la page d'accueil.
   *
   * @param {Object} data - Données reçues du serveur.
   */
  afficheAjoutSuccess(data) {
    if ($(data).text() == "true") {
      alert("L'ajout du joueur s'est fait correctement");
      indexCtrl.loadPage(sessionStorage.getItem("utilisateur"));
    } else {
      alert("Une valeur entrée n'est pas valide");
    }
  }

  /**
   * Méthode appelée en cas d'erreur lors de l'ajout d'un joueur. Affiche un message d'erreur.
   *
   * @param {Object} xhr - Objet de la requête HTTP.
   * @param {string} status - Statut de la requête.
   * @param {string} error - Message d'erreur.
   */
  afficheAjoutErreur(xhr, status, error) {
    console.error("Une valeur entrée n'est pas valide", status, error);
    alert("Une valeur entrée n'est pas valide");
  }

  /**
   * Méthode de gestion des erreurs lors du chargement des positions.
   * Affiche un message d'erreur en cas d'échec.
   *
   * @param {Object} xhr - Objet de la requête HTTP.
   * @param {string} status - Statut de la requête.
   * @param {string} error - Message d'erreur.
   */
  gestionErreurPosition(xhr, status, error) {
    console.error("Erreur lors du chargement des positions:", status, error);
    alert(
      "Une erreur est survenue lors du chargement des positions. Veuillez réessayer plus tard."
    );
  }

  /**
   * Méthode de gestion des erreurs lors du chargement des équipes.
   * Affiche un message d'erreur en cas d'échec.
   *
   * @param {Object} xhr - Objet de la requête HTTP.
   * @param {string} status - Statut de la requête.
   * @param {string} error - Message d'erreur.
   */
  gestionErreurEquipe(xhr, status, error) {
    console.error("Erreur lors du chargement des équipes :", status, error);
    alert(
      "Une erreur est survenue lors du chargement des équipes. Veuillez réessayer plus tard."
    );
  }

  /**
   * Méthode de gestion des erreurs lors du chargement des photos.
   * Affiche un message d'erreur en cas d'échec.
   *
   * @param {Object} xhr - Objet de la requête HTTP.
   * @param {string} status - Statut de la requête.
   * @param {string} error - Message d'erreur.
   */
  gestionErreurPhoto(xhr, status, error) {
    console.error("Erreur lors du chargement des photos :", status, error);
    alert(
      "Une erreur est survenue lors du chargement des photos. Veuillez réessayer plus tard."
    );
  }
}
