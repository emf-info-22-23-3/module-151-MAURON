/*
  But :    Chargement des différentes vues 
  Auteur : Simon Mauron
  Date :   17.02.2025 / V1.0
*/

$().ready(function () {
  // http et indexCtrl sont des variables globales qui doivent être accessible depuis partout => pas de mot clé devant ou window.xxx
  http = new ServiceHttp();
  indexCtrl = new IndexCtrl(); // ctrl principal
  http.centraliserErreurHttp(indexCtrl.afficherErreurHttp);
});

class IndexCtrl {
  constructor() {
    this.vue = new VueService();
    this.loadPage();
  }

  //Toutes ces méthodes permettent le chargement des pages

  loadPage() {
    if (sessionStorage.getItem("isConnected") === "true") {
      console.log("charger");
      this.loadAuthentifie();
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

  loadAuthentifie() {
    this.vue.chargerVue("authentifie", function () {
      new AuthentifieCtrl();
    });
  }

  loadAjouter() {
    this.vue.chargerVue("ajouter", function () {
      new AjouterCtrl();
    });
  }
}
