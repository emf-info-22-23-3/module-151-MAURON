
class AuthentifieCtrl {
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

    http.chargerEquipe(this.chargerEquipeSuccess, this.gestionErreurEquipe);
    http.chargerAllJoueur(this.chargerJoueurSuccess,this.gestionErreurJoueur);
    http.chargerPosition(
      this.chargerPositionSuccess,
      this.gestionErreurPosition
    );

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

    butDeco.addEventListener("click", () => {
      http.disconnect(this.deconnectSuccess, this.gestionErreurLogin);
    });
  }

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

  chargerJoueurSuccess(data, text, jqXHR) {
    var cmbJoueurs = document.getElementById("cmbJoueur");
    cmbJoueurs.options.length = 0;
    $(data).find("joueur").each(function () {
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

  deconnectSuccess(data, text, jqXHR) {
    if ($(data).find("result").text() != null) {
      sessionStorage.removeItem("isConnected");
      alert("Déconnexion réussie :)");
      indexCtrl.loadNonAuthentifie();
    } else {
      alert("Erreur lors de la déconnexion");
    }
  }

  afficheModificationSuccess(data,text, jqXHR) {
    console.log("test");
    console.log($(data).text());

    if($(data).text() != null){
    if($(data).text() == "true" ){
        alert("Modification réussie");
    } else {
        alert("Aucune donnée modifié ou donnée invalide");
    }}else {
        alert(" donnée invalide");
    }
}
  

  afficheModificationErreur(xhr,status, error) {
    console.error("Erreur lors de la modification du joueur:", status, error);
    alert(
      "Une erreur est survenue lors de la modification du joueur. Veuillez réessayer plus tard."
    );
  }

  loadAjouter() {
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

  selectByText(text) {
    let select = document.getElementById("cmbPosition");
    for (let option of select.options) {
      if (option.text === text) {
        option.selected = true;
      }
    }
  }
}
