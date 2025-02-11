
class NonAuthentifieCtrl {

    constructor() {
        http.chargerEquipe(this.creationListeEquipe.bind(this), this.gestionErreurEquipe.bind(this));
        
    }

    connect() {

    }

    creationListeEquipe(data) {
        let select = $("#cmbEquipe");
        select.empty();
        $(data).find("equipe").each(function () {
            let id = $(this).find("pk_equipe").text();
            let nom = $(this).find("nom").text();
            select.append(`<option value="${id}">${nom}</option>`);
        });
    }

    
    gestionErreurEquipe(xhr, status, error) {
        console.error("Erreur lors du chargement des équipes :", status, error);
        alert("Une erreur est survenue lors du chargement des équipes. Veuillez réessayer plus tard.");
    }

    creationListeJoueur(data){
        let select = $("#cmbJoueur");
        select.empty();
        $(data).find("joueur").each(function () {
            let id = $(this).find("pk_equipe").text();
            let nom = $(this).find("nom").text();
            select.append(`<option value="${id}">${nom}</option>`);
        });
    }

    gestionErreurJoueur(xhr, status, error) {
        console.error("Erreur lors du chargement des équipes :", status, error);
        alert("Une erreur est survenue lors du chargement des équipes. Veuillez réessayer plus tard.");
    }
}