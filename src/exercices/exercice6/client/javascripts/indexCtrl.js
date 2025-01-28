/**
 * Méthode appelée lors du retour avec succès du résultat
 * @param {type} data
 * @param {type} text
 * @param {type} jqXHR
 */
function chargerTeamSuccess(data, text, jqXHR) {
    var tblContent = $("#tableContent");
    var txt = '';

    $.each(data, function(index, team) {
        var row = '<tr><td>' + team.id + '</td><td>' + team.name + '</td></tr>';
        $('#teams-table tbody').append(row);
    });
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
