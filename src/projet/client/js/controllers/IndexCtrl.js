/*
  But :    Chargement des différentes vues 
  Auteur : Simon Mauron
  Date :   25.02.2025 / V1.0
*/

$().ready(function () {
  // http et indexCtrl sont des variables globales qui doivent être accessible depuis partout => pas de mot clé devant ou window.xxx
  http = new ServiceHttp();
  indexCtrl = new IndexCtrl(); // ctrl principal
});

class IndexCtrl {
  
  constructor() {
    this.vue = new VueService();
    this.loadPage(sessionStorage.getItem("utilisateur"));
  }

  //Toutes ces méthodes permettent le chargement des pages

  loadPage(user) {
    if (sessionStorage.getItem("isConnected") === "true") {
      this.loadAuthentifie(user);
    } else {
      this.loadNonAuthentifie();
    }
  }

  afficherErreurHttp(msg) {
    alert(msg);
  }

  loadNonAuthentifie() {
    this.vue.chargerVue("nonAuthentifie", function () {
      new NonAuthentifieCtrl();
    });
  }

  loadAuthentifie(user) {
    this.vue.chargerVue("authentifie", function () {
      new AuthentifieCtrl(user);
    });
  }

  loadAjouter() {
    this.vue.chargerVue("ajouter", function () {
      new AjouterCtrl();
    });
  }
}
