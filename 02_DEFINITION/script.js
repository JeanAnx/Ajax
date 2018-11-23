'use strict'

/* // APPEL DE L'OBJET QUI NOUS SERVIRA POUR LA REQUÊTE AJAX
var req = new XMLHttpRequest();

// ON APPELLE L'ÉVÈNEMENT OPEN AVEC LA MÉTHODE HTTP GET ET LA DESTINATION DU FICHIER JSON
req.open('GET','file:///home/stagiaire/POEJA/AJAX/02_DEFINITION/data.json', false);
req.send(null);

console.log(req);

console.log(req.responseText);

var result = JSON.parse(req.responseText);
console.log(result.user.fname);
 */


// Ajax avec une API externe (OpenWeatherMap)
var req = new XMLHttpRequest();
req.open('GET','http://api.openweathermap.org/data/2.5/weather?q=Nantes&APPID=86606b015288f65482550734899d86a2',true);
req.setRequestHeader("Content-Type","application/x-www-form-urlencoded");
req.send(null);
console.log(req);

setTimeout(function(){

    if (req.status === 200) {
        console.log("réponse reçue : ", req.status , req.responseText);
        console.log(req.responseText);
        var result = JSON.parse(req.responseText);
        console.log(result);

    } else {
        console.log("Status de la réponse : " , req.status , req.statusText);
    }
    
},1000);


