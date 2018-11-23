'use strict'
/**************************************************************************/
/*** ANCIENNE MÉTHODE AJAX AVEC L'OBJET XMLHTTPREQUEST *********************/    


    /************** VARIABLES *******************/


// Identification des éléments du DOM

var selectedCity = document.querySelector('#city');
var sectionMeteoData = document.querySelector('#current');
var bouton = document.querySelector('#boutonSubmit');
var sectionPred = document.querySelector('#predictions')

    /************** FONCTIONS *****************/

function toCelsius(tempK) {
    var tempC = (tempK - 273.15);
    return Math.round(tempC);
}

function toFrench(word) {
    var trad;

    switch (word) {
        case "Drizzle":
            trad = "Bruine";
            break;
    
        case "Mist":
            trad = "Brume";
            break;

        case "Fog":
            trad = "Brouillard";
            break;

        case "Clear":
            trad = "Ciel dégagé";
            break;

        case "Clouds":
            trad = "Couvert";
            break;

        case "Rain":
            trad = "Pluie";
            break;

        case "Haze":
            trad = "Brume de pollution"
            break;

            case "Snow":
            trad = "Neige"
            break;

        default:
            break;
    }
   return trad;
}

function getNameDay(integer){
    var day;

    switch (integer) {
        case 0:
            day = "Dimanche"
            break;

        case 1:
            day = "Lundi"
            break;

        case 2:
            day = "Mardi"
            break;

        case 3:
            day = "Mercredi"
            break;

        case 4:
            day = "Jeudi"
            break;

        case 5:
            day = "Vendredi"
            break;

        case 6:
            day = "Samedi"
            break;
        
        default:
        break;
    }

    return day;
}

function getMeteoFrom(city){
    var req = new XMLHttpRequest();
    // Je récupère l'API via cet URL (en méthode GET)
    req.open('GET','http://api.openweathermap.org/data/2.5/weather?q=' + city + "&APPID=86606b015288f65482550734899d86a2",true);
    // Je précise via "une RequestHeader" le type d'élément que je veux récupérer
    req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
    // Et comme je n'envoie rien, je le précise avec cette méthode
    req.send(null);

    setTimeout(function(){

    console.log(req.status , req.responseText);

    if (req.status == 200) {
    
    var requestValue = JSON.parse(req.responseText);
    console.log(requestValue);

    displayMeteo(requestValue);

    } else {

        displayErreur();

    }

},500);

}

// TENTATIVE AVEC LE NOUVEAU PROCÉDÉ FETCH()

function getPredictions(city) {
    fetch('http://api.openweathermap.org/data/2.5/forecast?q=' + city + "&APPID=86606b015288f65482550734899d86a2", {mode: 'cors'})
  
    .then(function(response) {
    return response.json();
  })

    .then(function(text) {
        console.log('Request successful', text);
        displayPred(text.list);

  })

    .catch(function(error) {
        console.log('Request failed', error)
  })
};


function displayMeteo(data){
    
    var meteo = "<div class='meteoData'>"
    + "<h3>"+ data.name + "</h3>"
    + "<h4>"+ toCelsius(data.main.temp) + " °C </h4>"
    + "<h4>" + toFrench(data.weather[0].main) + "</h4>"
    + "<img class='icon' src='img/" + data.weather[0].main + ".png'>"
    + "</div>";
    
    sectionMeteoData.innerHTML = meteo;
}

function displayPred(data){

    sectionPred.innerHTML = "";
    var titlePred = document.createElement('h2');
    titlePred.setAttribute('class','titrePrédictions');
    titlePred.innerHTML = "Prédictions";
    sectionPred.appendChild(titlePred);

    for (let row of data) {
        
        var dateBrute = new Date(row.dt_txt);
        var jour = dateBrute.getDay();
        console.log(jour);
        var jourMois = dateBrute.getDate();
        var heure = dateBrute.getHours();
        console.log(heure);


        var newDivPred = document.createElement('div');

        sectionPred.appendChild(newDivPred);
        
        newDivPred.innerHTML = 
        "<h5>" + getNameDay(jour) + " " + jourMois + "</h5>"
        + "<h5>" + heure + "h</h5>"
        + "<p>" + toCelsius(row.main.temp) + " °C </p>"
        + "<p>" + toFrench(row.weather[0].main) + "</p>"
        + "<img class='icon' src='img/" + row.weather[0].main + ".png'>"
        + "</div>";

    }


}

function displayErreur(){
    sectionMeteoData.innerHTML = "<h3 class='error'>Oups, something went wrong</h3><img src='img/error.png'>";
}

    /************ ÉVÈNEMENTS *********************/


// Quand le "select" change, je récupère sa valeur
bouton.addEventListener('click',function(event){

    event.preventDefault();
    var theCity = selectedCity.value;
    console.log(theCity);

    getMeteoFrom(theCity);

    console.log("----------------------------------------------------------------------------------------");

    setTimeout(function(){

        getPredictions(theCity);

    },600);
})

