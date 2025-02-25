/**
 * La classe AuthentifieCtrl gère l'authentification et l'interaction avec l'utilisateur authentifié.
 * Elle permet de charger des équipes, des joueurs et des positions, tout en gérant les événements liés à la modification et à l'ajout de joueurs,
 * ainsi que la déconnexion.
 * @author Simon Mauron
 * @version 1
 */

class AuthentifieCtrl {
  /**
   * Constructeur de la classe AuthentifieCtrl. Initialise les éléments de l'interface utilisateur, charge les données nécessaires
   * (équipes, joueurs, positions), et ajoute des écouteurs d'événements pour la gestion des actions de l'utilisateur.
   *
   * @param {string} user - Le nom d'utilisateur authentifié.
   */
  constructor(user) {
    var cmbEquipe = document.getElementById("cmbEquipe");
    var cmbJoueurs = document.getElementById("cmbJoueur");
    var butDeco = document.getElementById("deconnecter");
    var ajouter = document.getElementById("ajouter");
    var modifier = document.getElementById("modifier");

    document.getElementById("user").textContent = user;
    $.getScript("js/beans/Equipe.js");
    $.getScript("js/beans/Joueur.js");
    $.getScript("js/beans/Position.js");

    // Chargement des équipes, des joueurs et des positions
    http.chargerEquipe(this.chargerEquipeSuccess, this.gestionErreurEquipe);
    http.chargerAllJoueur(this.chargerJoueurSuccess, this.gestionErreurJoueur);
    http.chargerPosition(
      this.chargerPositionSuccess,
      this.gestionErreurPosition
    );

    // Écouteurs d'événements
    cmbEquipe.addEventListener("change", () => {
      http.chargerJoueur(
        cmbEquipe.value,
        this.chargerJoueurSuccess,
        this.gestionErreurJoueur
      );
    });

    cmbJoueurs.addEventListener("change", this.afficheInfoJoueur.bind(this));

    ajouter.addEventListener("click", this.loadAjouter.bind(this));

    modifier.addEventListener("click", () => {
      http.modifierJoueur(
        document.getElementById("nom").value,
        document.getElementById("dateNaissance").value,
        document.getElementById("numero").value,
        document.getElementById("nbrTitre").value,
        document.getElementById("salaire").value,
        document.getElementById("nbrBut").value,
        document.getElementById("cmbPosition").value,
        JSON.parse(cmbJoueurs.value).pk_joueur,
        this.afficheModificationSuccess,
        this.afficheModificationErreur
      );
    });
    // Écouteur de la déconnexion
    butDeco.addEventListener("click", () => {
      http.disconnect(this.deconnectSuccess, this.gestionErreurLogin);
    });
  }

  /**
   * Méthode appelée après le chargement réussi des équipes. Remplit la liste déroulante des équipes.
   *
   * @param {Object} data - Données reçues du serveur.
   * @param {string} text - Message texte.
   * @param {Object} jqXHR - Objet de la requête AJAX.
   */
  chargerEquipeSuccess(data, text, jqXHR) {
    var cmbEquipe = document.getElementById("cmbEquipe");
    $(data)
      .find("equipe")
      .each(function () {
        var equipe = new Equipe();
        equipe.setNom($(this).find("nom").text());
        equipe.setPk($(this).find("pk_equipe").text());
        var option = new Option(equipe, equipe.getPk());
        cmbEquipe.options[cmbEquipe.options.length] = option;
      });
    document.getElementById("cmbEquipe").selectedIndex = -1;
  }

  /**
   * Méthode appelée après le chargement réussi des joueurs. Remplit la liste déroulante des joueurs.
   *
   * @param {Object} data - Données reçues du serveur.
   * @param {string} text - Message texte.
   * @param {Object} jqXHR - Objet de la requête AJAX.
   */
  chargerJoueurSuccess(data, text, jqXHR) {
    var cmbJoueurs = document.getElementById("cmbJoueur");
    cmbJoueurs.options.length = 0;
    $(data)
      .find("joueur")
      .each(function () {
        var joueur = new Joueur();
        joueur.setPK($(this).find("pk_joueur").text());
        joueur.setNom($(this).find("nom").text());
        joueur.setDatenaissance($(this).find("dateNaissance").text());
        joueur.setNbrBut($(this).find("nbrBut").text());
        joueur.setNbrTitre($(this).find("nbrTitre").text());
        joueur.setFkPhoto($(this).find("fk_photo").text());
        joueur.setFkPosition($(this).find("fk_position").text());
        joueur.setSalaire($(this).find("salaire").text());
        joueur.setNumero($(this).find("numero").text());
        cmbJoueurs.options[cmbJoueurs.options.length] = new Option(
          joueur,
          JSON.stringify(joueur)
        );
      });
  }
  /**
   * Méthode appelée après le chargement réussi des positions. Remplit la liste déroulante des positions.
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
   * Méthode appelée après une déconnexion réussie. Retire les données de session et redirige vers la page d'accueil.
   *
   * @param {Object} data - Données reçues du serveur.
   * @param {string} text - Message texte.
   * @param {Object} jqXHR - Objet de la requête AJAX.
   */
  deconnectSuccess(data, text, jqXHR) {
    if ($(data).find("result").text() != null) {
      sessionStorage.removeItem("isConnected");
      sessionStorage.removeItem("utilisateur");
      alert("Déconnexion réussie :)");
      indexCtrl.loadNonAuthentifie();
    } else {
      alert("Erreur lors de la déconnexion");
    }
  }

  /**
   * Méthode appelée après une modification réussie d'un joueur. Affiche un message de succès.
   *
   * @param {Object} data - Données reçues du serveur.
   * @param {string} text - Message texte.
   * @param {Object} jqXHR - Objet de la requête AJAX.
   */
  afficheModificationSuccess(data, text, jqXHR) {
    if ($(data).text() == "true") {
      alert("Modification réussie");
    } else {
      alert("Aucune donnée modifié ou donnée invalide");
    }
  }

  /**
   * Méthode appelée en cas d'erreur lors de la modification d'un joueur. Affiche un message d'erreur.
   *
   * @param {Object} xhr - Objet de la requête HTTP.
   * @param {string} status - Statut de la requête.
   * @param {string} error - Message d'erreur.
   */
  afficheModificationErreur(xhr, status, error) {
    console.error("Erreur lors de la modification du joueur:", status, error);
    alert(
      "Une erreur est survenue lors de la modification du joueur. Veuillez réessayer plus tard."
    );
  }

  /**
   * Charge la page d'ajout d'un joueur.
   */
  loadAjouter() {
    indexCtrl.loadAjouter();
  }

  /**
   * Méthode de gestion des erreurs lors du chargement des positions. Affiche un message d'erreur en cas d'échec.
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
   * Méthode de gestion des erreurs lors du chargement des équipes. Affiche un message d'erreur en cas d'échec.
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
   * Méthode de gestion des erreurs lors du chargement des joueurs. Affiche un message d'erreur en cas d'échec.
   *
   * @param {Object} xhr - Objet de la requête HTTP.
   * @param {string} status - Statut de la requête.
   * @param {string} error - Message d'erreur.
   */
  gestionErreurJoueur(xhr, status, error) {
    console.error("Erreur lors du chargement des équipes :", status, error);
    alert(
      "Une erreur est survenue lors du chargement des équipes. Veuillez réessayer plus tard."
    );
  }

  /**
   * Affiche les informations du joueur sélectionné dans les champs du formulaire.
   */
  afficheInfoJoueur() {
    var cmbJoueurs = document.getElementById("cmbJoueur");
    var joueurJson = JSON.parse(cmbJoueurs.value);
    document.getElementById("nom").value = joueurJson.nom;
    document.getElementById("dateNaissance").value = joueurJson.datenaissance;
    document.getElementById("salaire").value = joueurJson.salaire;
    document.getElementById("nbrBut").value = joueurJson.nbrBut;
    document.getElementById("nbrTitre").value = joueurJson.nbrTitre;
    document.getElementById("numero").value = joueurJson.numero;
    document.getElementById("photo").src = joueurJson.fk_photo;
    this.selectByText(joueurJson.fk_position);
  }

  /**
   * Sélectionne un élément dans la liste déroulante des positions en fonction du texte de l'option.
   *
   * @param {string} text - Le texte de l'option à sélectionner.
   */
  selectByText(text) {
    let select = document.getElementById("cmbPosition");
    for (let option of select.options) {
      if (option.text === text) {
        option.selected = true;
      }
    }
  }
}
