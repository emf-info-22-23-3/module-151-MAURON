/**
 * Méthode appelée lors du retour avec succès du résultat
 * @param {type} data
 * @param {type} text
 * @param {type} jqXHR
 */
function chargerTeamSuccess(data, text, jqXHR) {
    // appelé lorsque l'on reçoit les données de la part du PHP
    var tblContent = $("#tableContent");
    var txt = '';

    $(data).find("equipe").each(function () {
        //alert($(this).find("nom").text());
        txt = "<tr><td>" + $(this).find("id").text() + "</td><td>" + $(this).find("nom").text() + "</td></tr>";
        $(txt).appendTo(tblContent);
    })
}

/**
 * Méthode appelée en cas d'erreur lors de la lecture du webservice
 * @param {type} data
 * @param {type} text
 * @param {type} jqXHR
 */
function chargerTeamError(request, status, error) {
    // appelé s'il y a une erreur lors du retour
    alert("erreur : " + error + ", request: " + request + ", status: " + status);
}

$(document).ready(function () {
    $.getScript("javascripts/serviceHttp.js", function () {
        console.log("servicesHttp.js chargé !");
        chargerTeam(chargerTeamSuccess, chargerTeamError);
    });
    
});
