const divResultat = document.querySelector("#resultat");
let coup = 0;

let tabJeu = [
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
  [0, 0, 0, 0],
];

let tabResulat = genereTableauAleatoire();

let oldSelection = [];
let nbAffiche = 0;
let ready = true;

afficherTableau();

function afficherTableau() {
  let txt = "";

  for (let i = 0; i < tabJeu.length; i++) {
    txt += "<div>";
    for (let j = 0; j < tabJeu[i].length; j++) {
      if (tabJeu[i][j] === 0) {
        txt +=
          "<button class = 'btn btn-primary m-2' style='width:100px;height:100px;background-color: #161A23;border:none;'  onclick='verif(\"" +
          i +
          "-" +
          j +
          "\")'>Retourner</button>";
      } else {
        txt +=
          "<img src='" +
          getImage(tabJeu[i][j]) +
          "' style='width:100px;height:100px' class='m-2'>";
      }
    }
    txt += "</div>";
  }

  divResultat.innerHTML = txt;
}
function updateStats() {
  document.querySelector("#coup-stats").textContent = `Coup: ${coup}`;
}

function getImage(valeur) {
  let imgTxt = "img/";
  switch (valeur) {
    case 1:
      imgTxt += "elephant.png";
      break;
    case 2:
      imgTxt += "giraffe.png";
      break;
    case 3:
      imgTxt += "hippo.png";
      break;
    case 4:
      imgTxt += "monkey.png";
      break;
    case 5:
      imgTxt += "panda.png";
      break;
    case 6:
      imgTxt += "parrot.png";
      break;
    case 7:
      imgTxt += "pig.png";
      break;
    case 8:
      imgTxt += "rabbit.png";
      break;
    default:
      console.log("non pris en compte");
  }
  return imgTxt;
}

function verif(bouton) {
  if (ready) {
    nbAffiche++;
    let ligne = bouton.substr(0, 1);
    let colonne = bouton.substr(2, 1);

    tabJeu[ligne][colonne] = tabResulat[ligne][colonne];
    afficherTableau();

    if (nbAffiche > 1) {
      ready = false;
      setTimeout(() => {
        if (
          tabJeu[ligne][colonne] !==
          tabResulat[oldSelection[0]][oldSelection[1]]
        ) {
          tabJeu[ligne][colonne] = 0;
          tabJeu[oldSelection[0]][oldSelection[1]] = 0;
        }
        afficherTableau();
        ready = true;
        nbAffiche = 0;
        oldSelection = [ligne, colonne];
      }, 1000);
    } else {
      oldSelection = [ligne, colonne];
    }
  }
}

function genereTableauAleatoire() {
  let tab = [];

  let nbImagePosition = [0, 0, 0, 0, 0, 0, 0, 0];

  for (let i = 0; i < 4; i++) {
    let ligne = [];
    for (let j = 0; j < 4; j++) {
      let fin = false;
      while (!fin) {
        let randomImage = Math.floor(Math.random() * 8);
        if (nbImagePosition[randomImage] < 2) {
          ligne.push(randomImage + 1);
          nbImagePosition[randomImage]++;
          fin = true;
        }
      }
    }
    tab.push(ligne);
  }
  return tab;
}
