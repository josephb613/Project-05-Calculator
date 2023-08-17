let champSaisie = document.getElementById("input");
const boutonsNumeriques = document.querySelectorAll(".numpad");
const affichageCalcul = document.getElementById("calcul");
const symboleEgal = document.getElementById("equals");
const boutonPourcentage = document.getElementById("percentage");
const boutonEffacerSaisie = document.getElementById("clear");
const boutonReinitialiser = document.getElementById("reset");
const boutonPlusMoins = document.getElementById("plusoumoins");

champSaisie.value = "";
affichageCalcul.innerText = "";
let empecherMultiplesEgaux = 0;
let progressionMath = 0;

const touchesOperation = ['plus', 'minus', 'times', 'divideby'];
const boutonsOperation = [];
touchesOperation.forEach(function toucheOperation(key){
    boutonsOperation.push(document.getElementById(key));
});

function reinitialiserDonneesSaisie() {
    grandeListeElements = [];
    petiteListe = [];
}

function reinitialiserToutesDonnees(event) {
    if (affichageCalcul.innerText.includes("=")) {
        reinitialiserDonneesSaisie();
        champSaisie.value = "";
        affichageCalcul.innerText = "";
    }
}

let grandeListeElements = [];
let petiteListe = [];

function supprimerPointEtZero(tableau) {
    let gestionPointZero = [];
    tableau.forEach((element) => {
        switch (element) {
            case '0':
                if (gestionPointZero.length >= 1 || affichageCalcul.innerText !== "") {
                    gestionPointZero.push(element);
                }
                break;
            case '.':
                if (gestionPointZero.length >= 1 && !gestionPointZero.includes(".")) {
                    gestionPointZero.push(".");
                } else if (gestionPointZero.length === 0) {
                    gestionPointZero.push("0");
                    gestionPointZero.push(".");
                }
                break;
            default:
                gestionPointZero.push(element);
        }
    });
    return gestionPointZero;
}

function effacerSaisie() {
    reinitialiserDonneesSaisie();
    champSaisie.value = "";
}

function effacerToutesDonnees(event) {
    event.preventDefault();
    reinitialiserDonneesSaisie();
    champSaisie.value = "";
    affichageCalcul.innerText = "";
}

function calculer() {
    let nouveauLabel = affichageCalcul.innerText;
    let nouvelleValeurLabel = nouveauLabel.replace("×", "*").replace("÷", "/").replace("=", "");
    champSaisie.value = `${eval(nouvelleValeurLabel + champSaisie.value)}`;
}

function changerLabel(event, param) {
    event.preventDefault();
    if (affichageCalcul.innerText !== "" || champSaisie.value !== "") {
        progressionMath += 1;
        if (progressionMath > 1) {
            calculer();
        }
        affichageCalcul.innerText = champSaisie.value + " " + param.innerText;
    }
    reinitialiserDonneesSaisie();
    empecherMultiplesEgaux = 0;
}

function changerValeurSaisie(event) {
    reinitialiserToutesDonnees();
    if (affichageCalcul.innerText === "") {
        grandeListeElements.push(event.target.innerText);
        champSaisie.value = supprimerPointEtZero(grandeListeElements).join("");
    } else {
        petiteListe.push(event.target.innerText);
        champSaisie.value = supprimerPointEtZero(petiteListe).join("");
    }
}

function afficherValeurSaisie(event) {
    event.addEventListener("click", changerValeurSaisie);
}

function afficherResultat(event) {
    event.preventDefault();
    empecherMultiplesEgaux += 1;
    progressionMath = 0;
    if (empecherMultiplesEgaux > 1) {
        return;
    }
    affichageCalcul.innerText = `${affichageCalcul.innerText} ${champSaisie.value} =`;
    champSaisie.value = "";
    calculer();
}

function transformerEnPourcentage(event) {
    event.preventDefault();
    champSaisie.value = Number(champSaisie.value) / 100;
}

function basculerPlusMoins() {
    champSaisie.value = `${champSaisie.value * (-1)}`;
}

boutonPlusMoins.addEventListener("click", basculerPlusMoins);
boutonsNumeriques.forEach((bouton) => afficherValeurSaisie(bouton));
boutonsOperation.forEach((operateur) => operateur.addEventListener("click", () => {
    changerLabel(event, operateur);
}));
symboleEgal.addEventListener("click", afficherResultat);
boutonPourcentage.addEventListener("click", transformerEnPourcentage);
boutonEffacerSaisie.addEventListener("click", effacerSaisie);
boutonReinitialiser.addEventListener("click", effacerToutesDonnees);



