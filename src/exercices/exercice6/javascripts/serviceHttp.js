var BASE_URL = "http://localhost:8080/exercices/exercice6/serveur.php";

/**
 * Fonction permettant de charger les données d'équipe.
 * @param {type} Fonction de callback lors du retour avec succès de l'appel.
 * @param {type} Fonction de callback en cas d'erreur.
 */
function chargerTeam(successCallback, errorCallback) {
    $.ajax({
    type: "GET",
    dataType: "xml",
    url: BASE_URL,
    data: "action=equipe",
    success: successCallback,
    error: errorCallback
    });
}