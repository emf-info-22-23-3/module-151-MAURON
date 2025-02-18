class AuthentifieCtrl {
    constructor() {
        var cmbEquipe = document.getElementById("cmbEquipe");
        var cmbJoueurs = document.getElementById("cmbJoueur");
        var butDeco = document.getElementById("deconnecter");
        var ajouter = document.getElementById("ajouter");
        var modifier = document.getElementById("modifier");

        $.getScript("js/beans/Equipe.js");
        $.getScript("js/beans/Joueur.js");
        $.getScript("js/beans/Position.js");

        http.chargerEquipe(this.chargerEquipeSuccess, this.gestionErreurEquipe);
        http.chargerPosition(this.chargerPositionSuccess, this.gestionErreurPosition);

        cmbEquipe.addEventListener("change", () => {http.chargerJoueur(cmbEquipe.value,this.chargerJoueurSuccess,this.gestionErreurJoueur);});

        cmbJoueurs.addEventListener("change", this.afficheInfoJoueur.bind(this));

        ajouter.addEventListener("click", this.loadAjouter.bind(this));

        modifier.addEventListener("click", () => {http.modifierJoueur(document.getElementById('nom').value, document.getElementById('dateNaissance').value, 
            document.getElementById('numero').value, document.getElementById('nbrTitre').value, document.getElementById('salaire').value, document.getElementById('nbrBut').value,
            document.getElementById('cmbPosition').value, 1, this.afficheModificationSuccess, this.afficheModificationErreur)});

        butDeco.addEventListener("click", () => {
            http.disconnect(this.deconnectSuccess, this.gestionErreurLogin);
        });

        document.addEventListener("DOMContentLoaded", function () {
            if (sessionStorage.getItem('isConnected == true')){
              indexCtrl.loadAuthentifie();
            }
          });
    }

    connectSuccess(data, text, jqXHR) {
        if ($(data).find("result").text() != null) {
            alert("Login ok");
            indexCtrl.loadAuthentifie();
        }
        else {
            alert("Erreur lors du login");
        }

    }

    chargerEquipeSuccess(data, text, jqXHR) {
        var cmbEquipe = document.getElementById("cmbEquipe");
        $(data).find("equipe").each(function () {
                var equipe = new Equipe();
                equipe.setNom($(this).find("nom").text());
                equipe.setPk($(this).find("pk_equipe").text());
                cmbEquipe.options[cmbEquipe.options.length] = new Option(
                    equipe,
                    JSON.stringify(equipe.pk_equipe)
                );
            });
    }

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

    chargerPositionSuccess(data, text, jqXHR) {
        var cmbPosition = document.getElementById("cmbPosition");
        $(data).find("position").each(function () {
            var position = new Position();
            position.setNom($(this).find("nom").text());
            position.setPk($(this).find("pk_position").text());
            cmbPosition.options[cmbPosition.options.length] = new Option(
                position,
                position
            );
        });
    }

    deconnectSuccess (data, text, jqXHR) {
        if ($(data).find("result").text() != null) {
            sessionStorage.removeItem('isConnected');
            alert("Déconnexion réussie :)");
            indexCtrl.loadNonAuthentifie();
        }
        else {
            alert("Erreur lors du login");
        }
    }

    afficheModificationSuccess(){
        alert("La modification du joueur s'est fait correctement")
    }

    afficheModificationErreur(status, error) {
        console.error("Erreur lors de la modification du joueur:", status, error);
        alert(
            "Une erreur est survenue lors de la modification du joueur. Veuillez réessayer plus tard."
        );
    }

    loadAjouter(){
        indexCtrl.loadAjouter();
    }

    gestionErreurPosition(xhr, status, error) {
        console.error("Erreur lors du chargement des positions:", status, error);
        alert(
            "Une erreur est survenue lors du chargement des positions. Veuillez réessayer plus tard."
        );
    }

    gestionErreurEquipe(xhr, status, error) {
        console.error("Erreur lors du chargement des équipes :", status, error);
        alert(
            "Une erreur est survenue lors du chargement des équipes. Veuillez réessayer plus tard."
        );
    }

    gestionErreurJoueur(xhr, status, error) {
        console.error("Erreur lors du chargement des équipes :", status, error);
        alert(
            "Une erreur est survenue lors du chargement des équipes. Veuillez réessayer plus tard."
        );
    }

    gestionErreurLogin(xhr, status, error) {
        console.error("Erreur lors de votre login : ", status, error);
        alert("une erreur est survenue lors de votre login");
    }

    afficheInfoJoueur(event) {
        var cmbJoueurs = document.getElementById("cmbJoueur");
        var joueurJson = JSON.parse(cmbJoueurs.value);
        document.getElementById("nom").textContent = joueurJson.nom;
        document.getElementById("dateNaissance").value = joueurJson.datenaissance;
        document.getElementById("salaire").value = joueurJson.salaire + " CHF";
        document.getElementById("nbrBut").value = joueurJson.nbrBut;
        document.getElementById("nbrTitre").value = joueurJson.nbrTitre;
        document.getElementById("numero").value = joueurJson.numero;
        document.getElementById("cmbPosition").value = joueurJson.fk_position;
        document.getElementById("photo").src = joueurJson.fk_photo;
    }
}


