
class AjouterCtrl {
  constructor() {
    var valider = document.getElementById("valider");

    $.getScript("js/beans/Equipe.js");
    $.getScript("js/beans/Joueur.js");
    $.getScript("js/beans/Position.js");

    http.chargerEquipe(this.chargerEquipeSuccess, this.gestionErreurEquipe);
    http.chargerPosition(this.chargerPositionSuccess,this.gestionErreurPosition);
    http.chargerphoto(this.chargerPhotoSuccess, this.gestionErreurPhoto);

    valider.addEventListener("click", () => {
        http.ajouterJoueur(document.getElementById('nom').value, document.getElementById('dateNaissance').value,
            document.getElementById('numero').value, document.getElementById('nbrTitre').value, document.getElementById('salaire').value, document.getElementById('nbrBut').value,
            document.getElementById('cmbPosition').value, document.getElementById('cmbEquipe').value,document.getElementById('cmbPhoto').value, this.afficheAjoutSuccess, this.afficheAjoutErreur)
    });
  }

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

  chargerPhotoSuccess(data, text, jqXHR) {
    document.getElementById("cmbPosition").innerHTML = "";
    var cmbPhoto = document.getElementById("cmbPhoto");
    $(data).find("photoJoueur").each(function () {
        var photo = new Photo();
        photo.setNom($(this).find("nom").text());
        photo.setPk($(this).find("pk_photo").text());
        photo.setPhoto($(this).find("photo").text());
        var option = new Option(photo, photo.getPk());
        cmbPhoto.options[cmbPhoto.options.length] = option;
      });
  }

  chargerPositionSuccess(data, text, jqXHR) {
    var cmbPosition = document.getElementById("cmbPosition");
    $(data).find("position").each(function () {
        var position = new Position();
        position.setNom($(this).find("nom").text());
        position.setPk($(this).find("pk_position").text());
        var option = new Option(position, position.getPk());
        cmbPosition.options[cmbPosition.options.length] = option;
      });
  }

  afficheAjoutSuccess() {
    alert("L'ajout du joueur s'est fait correctement");
    indexCtrl.loadAuthentifie();
  }

  afficheAjoutErreur(xhr, status, error){
    console.error("Une valeur entrée n'est pas valide", status, error);
    alert(
      "Une valeur entrée n'est pas valide"
    );
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

  gestionErreurPhoto(xhr, status, error) {
    console.error("Erreur lors du chargement des photos :", status, error);
    alert(
      "Une erreur est survenue lors du chargement des photos. Veuillez réessayer plus tard."
    );
  }
}
