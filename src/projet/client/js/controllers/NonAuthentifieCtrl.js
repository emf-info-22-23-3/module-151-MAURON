
class NonAuthentifieCtrl {

    constructor(){}

    connect () {
        
    }

    chargerPaysSuccess(data, text, jqXHR)
{   
	var cmbEquipe = document.getElementById("cmbEquipe");
    $(data).find("equipes").each(function() {
      var pays = new Pays();
      pays.setNom($(this).find("nom").text());
      pays.setPk($(this).find("pk_pays").text());
	  cmbEquipe.options[cmbEquipe.options.length] = new Option(pays, JSON.stringify(pays));
    });  
}
}