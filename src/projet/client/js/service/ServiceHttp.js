/*
  But :    Classe qui permet de faire des requêtes sur les API
  Auteur : Simon Mauron
  Date :   11.06.2024 / V1.0
*/

var BASE_URL = "http://localhost:8080/projet/server/";

class ServiceHttp {

    constructor(){
      
    }


    chargerEquipe(successCallback, errorCallback) {
      $.ajax({
        type: "GET",
        dataType: "xml",
        url: BASE_URL + "equipeManager.php",
        success: successCallback,
        error: errorCallback
      });
    }

    chargerEtRemplirSelect() {
      http.chargerEquipe(
          (data) => { // Success callback
              let select = $("cmbEquipe");
              select.empty(); // Vider les anciennes options
              
              $(data).find("equipe").each(function() {
                  let id = $(this).find("pk_equipe").text();
                  let nom = $(this).find("nom").text();
                  select.append(`<option value="${id}">${nom}</option>`);
              });
          },
          (xhr, status, error) => { // Error callback
              console.error("Erreur lors du chargement des équipes :", status, error);
          }
      );
  }
  
    centraliserErreurHttp(httpErrorCallbackFn) {
      $.ajaxSetup({
        error: function (xhr, exception) {
          let msg;
          if (xhr.status === 0) {
            msg = "Pas d'accès à la ressource serveur demandée !";
          } else if (xhr.status === 404) {
            msg = "Page demandée non trouvée [404] !";
          } else if (xhr.status === 500) {
            msg = "Erreur interne sur le serveur [500] !";
          } else if (exception === "parsererror") {
            msg = "Erreur de parcours dans le JSON !";
          } else if (exception === "timeout") {
            msg = "Erreur de délai dépassé [Time out] !";
          } else if (exception === "abort") {
            msg = "Requête Ajax stoppée !";
          } else {
            msg = "Erreur inconnue : \n" + xhr.responseText;
          }
          httpErrorCallbackFn(msg);
        },
      });
    }
  }
  