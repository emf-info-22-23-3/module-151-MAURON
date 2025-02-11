
class NonAuthentifieCtrl {

    constructor() {
        http.chargerEquipe(this.creationListe.bind(this), this.gestionErreur.bind(this));
    }

    connect() {

    }

    creationListe(data) {
        let select = $("cmbEquipe");
        select.empty(); // Vider les anciennes options

        $(data).find("equipe").each(function () {
            let id = $(this).find("pk_equipe").text();
            let nom = $(this).find("nom").text();
            select.append(`<option value="${id}">${nom}</option>`);
        });
    }

    
    gestionErreur(xhr, status, error) {
        console.error("Erreur lors du chargement des équipes :", status, error);
        alert("Une erreur est survenue lors du chargement des équipes. Veuillez réessayer plus tard.");
    }
}