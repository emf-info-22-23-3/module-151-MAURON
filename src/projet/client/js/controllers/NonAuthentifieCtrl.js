/**
 * Classe contrôleur pour les utilisateurs non authentifiés.
 * Gère le chargement des équipes, des joueurs et la connexion utilisateur.
 * 
 */

class NonAuthentifieCtrl {
    constructor() {
        // Récupération des éléments HTML nécessaires
        var cmbEquipe = document.getElementById("cmbEquipe");
        var cmbJoueurs = document.getElementById("cmbJoueur");
        var butConnect = document.getElementById("connecter");

        $.getScript("js/beans/Equipe.js");
        $.getScript("js/beans/Joueur.js");
        // Chargement de la liste des équipes depuis le serveur
        http.chargerEquipe(this.chargerEquipeSuccess, this.gestionErreurEquipe);
        
        // Ajout d'un écouteur d'événements sur le changement de sélection d'une équipe
        cmbEquipe.addEventListener("change", () => {
            http.chargerJoueur(cmbEquipe.value,this.chargerJoueurSuccess,this.gestionErreurJoueur);
        });

        // Chargement de tous les joueurs au démarrage
        http.chargerAllJoueur(this.chargerJoueurSuccess,this.gestionErreurJoueur);

        // Ajout d'un écouteur d'événements pour afficher les informations du joueur sélectionné
        cmbJoueurs.addEventListener("change", this.afficheInfoJoueur);

        // Gestion de l'événement de connexion
        butConnect.addEventListener("click", () => {
            http.connect(document.getElementById("username").value, document.getElementById("mot de passe").value, this.connectSuccess.bind(this), this.gestionErreurLogin);
        });
    }

     /**
     * Callback de succès pour la connexion utilisateur.
     * @param {XMLDocument} data - Données de réponse du serveur.
     */
    connectSuccess(data, text, jqXHR) {
        if ($(data).find("result").text() == 'true') {
            alert("Login ok");
            sessionStorage.setItem("isConnected", "true");
            sessionStorage.setItem("utilisateur",$(data).find("user").text());
            indexCtrl.loadPage(sessionStorage.getItem("utilisateur"));
        }
        else {
            alert("Erreur lors du login");
        }

    }

    /**
     * Callback de succès pour le chargement des équipes.
     * @param {XMLDocument} data - Données de réponse du serveur.
     */
    chargerEquipeSuccess(data, text, jqXHR) {
        var cmbEquipe = document.getElementById("cmbEquipe");
        $(data).find("equipe").each(function () {
            var equipe = new Equipe();
            equipe.setNom($(this).find("nom").text());
            equipe.setPk($(this).find("pk_equipe").text());
            var option = new Option(equipe, equipe.getPk());
            cmbEquipe.options[cmbEquipe.options.length] = option;
          });
          document.getElementById("cmbEquipe").selectedIndex = -1;

    }

    /**
     * Callback de succès pour le chargement des joueurs.
     * @param {XMLDocument} data - Données de réponse du serveur.
     */
    chargerJoueurSuccess(data, text, jqXHR) {
        var cmbJoueurs = document.getElementById("cmbJoueur");
        cmbJoueurs.options.length = 0;
        $(data).find("joueur").each(function () {
            var joueur = new Joueur();
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
     * Gestion des erreurs lors du chargement des équipes.
     * @param {XMLHttpRequest} xhr - Objet XMLHttpRequest.
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
     * Gestion des erreurs lors du chargement des joueurs.
     * @param {XMLHttpRequest} xhr - Objet XMLHttpRequest.
     * @param {string} status - Statut de la requête.
     * @param {string} error - Message d'erreur.
     */
    gestionErreurJoueur(xhr, status, error) {
        console.error("Erreur lors du chargement des joueurs :", status, error);
        alert(
            "Une erreur est survenue lors du chargement des équipes. Veuillez réessayer plus tard."
        );
    }

        /**
     * Gestion des erreurs lors de la connexion.
     * @param {XMLHttpRequest} xhr - Objet XMLHttpRequest.
     * @param {string} status - Statut de la requête.
     * @param {string} error - Message d'erreur.
     */
    gestionErreurLogin(xhr, status, error) {
        console.error("Erreur lors de votre login : ", status, error);
        alert("une erreur est survenue lors de votre login");
    }

    /**
     * Affiche les informations du joueur sélectionné.
     */
    afficheInfoJoueur() {
        var cmbJoueurs = document.getElementById("cmbJoueur");
        var joueurJson = JSON.parse(cmbJoueurs.value);
        // Mise à jour des informations du joueur sélectionné dans l'interface
        document.getElementById("nom").textContent = joueurJson.nom;
        document.getElementById("dateNaissance").textContent = joueurJson.datenaissance;
        document.getElementById("salaire").textContent = joueurJson.salaire;
        document.getElementById("nbrBut").textContent = joueurJson.nbrBut;
        document.getElementById("nbrTitre").textContent = joueurJson.nbrTitre;
        document.getElementById("numero").textContent = joueurJson.numero;
        document.getElementById("position").textContent = joueurJson.fk_position;
        document.getElementById("photo").src = joueurJson.fk_photo;
    }
}
