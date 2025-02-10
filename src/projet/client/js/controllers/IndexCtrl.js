/*
  But :    Chargement des différentes vues 
  Auteur : Simon Mauron
  Date :   28.05.2024 / V1.0
*/

$().ready(function () {
    // service et indexCtrl sont des variables globales qui doivent être accessible depuis partout => pas de mot clé devant ou window.xxx
    http = new ServiceHttp();
    indexCtrl = new IndexCtrl(); // ctrl principal
    http.centraliserErreurHttp(indexCtrl.afficherErreurHttp);
  });
  
  class IndexCtrl {
    constructor() {
      this.vue = new VueService();
      this.loadNonAuthentifie();
    }
  
    //Toutes ces méthodes permettent le chargement des pages
  
    afficherErreurHttp(msg) {
      alert(msg);
    }
  
    loadNonAuthentifie() {
      this.vue.chargerVue("nonAuthentifie", function () {
        new NonAuthentifieCtrl();
      });
    }
  
    loadDepartement() {
      this.vue.chargerVue("departement", function () {
        new DepartementCtrl();
      });
    }
  
    loadCarte(fkDepartement) {
      this.vue.chargerVue("carte", function () {
        new CarteCtrl(fkDepartement);
      });
    }
  
    loadDetail(fkDepartement) {
      this.vue.chargerVue("detail", function () {
        new DetailCtrl(fkDepartement);
      });
    }
  }
  