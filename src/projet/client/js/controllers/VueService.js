/*
  But :    Classe qui permet des charger les vues
  Auteur : Simon Mauron
  Date :   25.02.2025 / V1.0
*/

class VueService {
    constructor() {}
  
    chargerVue(vue, callback) {
      // charger la vue demandee
      $("#view").load("views/" + vue + ".html", function () {
        // si une fonction de callback est spécifiée, on l'appelle ici
        if (typeof callback !== "undefined") {
          callback();
        }
      });
    }
  }
  