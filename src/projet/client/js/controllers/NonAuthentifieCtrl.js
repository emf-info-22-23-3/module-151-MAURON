
class NonAuthentifieCtrl {

    constructor() {
        $.getScript("javascripts/beans/Equipe.js",function () { console.log("chargement réussie") });
        http.chargerEquipe(this.chargerPaysSuccess, this.gestionErreurEquipe);
        
    }

    connect() {

    }

    chargerPaysSuccess(data, text, jqXHR)
    {   
        var cmbEquipe = document.getElementById("cmbEquipe");
        $(data).find("equipe").each(function() {
          var pays = new Equipe();
          pays.setNom($(this).find("nom").text());
          pays.setPk($(this).find("pk_pays").text());
          cmbEquipe.options[cmbEquipe.options.length] = new Option(cmbEquipe, JSON.stringify(cmbEquipe));
        });  
    }

    
    gestionErreurEquipe(xhr, status, error) {
        console.error("Erreur lors du chargement des équipes :", status, error);
        alert("Une erreur est survenue lors du chargement des équipes. Veuillez réessayer plus tard.");
    }


    gestionErreurJoueur(xhr, status, error) {
        console.error("Erreur lors du chargement des équipes :", status, error);
        alert("Une erreur est survenue lors du chargement des équipes. Veuillez réessayer plus tard.");
    }
}