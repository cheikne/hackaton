// Set new default font family and font color to mimic Bootstrap's default styling
Chart.defaults.global.defaultFontFamily =
  '-apple-system,system-ui,BlinkMacSystemFont,"Segoe UI",Roboto,"Helvetica Neue",Arial,sans-serif';
Chart.defaults.global.defaultFontColor = "#292b2c";
// Récupérer la balise <script> qui inclut ce fichier JavaScript
var scriptTag = document.currentScript;

// Récupérer la valeur de l'attribut de données personnalisé
var dataSet = scriptTag.getAttribute("dataSet")
  ? JSON.parse(scriptTag.getAttribute("dataSet"))
  : null;
console.log(dataSet);
var idGraph = scriptTag.getAttribute("idGraph")
  ? scriptTag.getAttribute("idGraph")
  : null;
var ctxBar = document.getElementById(idGraph + "Bar");
// var ctxMois = document.getElementById("myBarChartMois");
// var ctxAnnee = document.getElementById("myBarChartAnnee");
var anneeAvant = { 2020: "2020", 2021: "2020", 2022: "2021" };
const bgColor = [
  "red",
  "green",
  "blue",
  "orange",
  "brown",
  "red",
  "green",
  "blue",
  "orange",
  "brown",
  "orange",
  "brown",
  "red",
  "green",
  "blue",
  "red",
  "green",
  "blue",
  "orange",
  "brown",
  "red",
  "green",
  "blue",
  "orange",
  "brown",
  "orange",
  "brown",
  "red",
  "green",
  "blue",
];
var mois = [
  "Janvier",
  "Fevrier",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Aout",
  "Septembre",
  "Octobre",
  "Novembre",
  "Decembre",
];
var annees = [2020, 2021, 2022];
var dict_anne_mois = buildDataSet("annee_mois");
var dict_annee = buildDataSet("annee");

function myGraph(annee, mois_, status) {
  const str =
    status === "tout"
      ? " pour les annees " + annees[0] + ", " + annees[1] + " et " + annees[2]
      : status === "mois"
      ? "pour l'annee " + annee
      : "pour le mois " + mois_;
  document.getElementById("co2_impact").innerText = str;
  document.getElementById("conso_impact").innerText = str;
  var myLineChart = new Chart(ctxBar, {
    type: "bar",
    data: {
      labels:
        status === "tout" ? annees : status === "mois" ? mois : buildJour(),
      datasets: [
        {
          label: "Consommation",
          backgroundColor: bgColor,
          borderColor: "rgba(2,117,216,1)",
          data:
            status === "tout"
              ? summer()
              : status === "mois"
              ? dict_annee[annee]
              : dict_anne_mois[annee + "_" + mois_],
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            time: {
              unit: "month",
            },
            gridLines: {
              display: false,
            },
            ticks: {
              maxTicksLimit: 7,
            },
          },
        ],
        yAxes: [
          {
            ticks: {
              min: 0,
              max: status === "tout" ? 100000 : 15000,
              maxTicksLimit: 5,
            },
            gridLines: {
              display: true,
            },
          },
        ],
      },
      legend: {
        display: false,
      },
    },
  });

  myChartAreaGraph(annee, mois_, status);
  status === "mois" ? boxInformationsMois(annee) : "";
  if (status === "tout" || status === "mois") fillDataTableMois(annee, mois_);
  else fillDataTableJour(mois_);

  // console.log("execute avec ");
}
myGraph("2020", "", "mois");
function getRandom() {
  var annee = [];
  for (let i = 1; i <= 12; i++) {
    annee.push(Math.random() * (15000 - 5000) + 5000);
  }
  return annee;
}
function valRandom(max, min, nb) {
  var annee = [];
  for (let i = 1; i <= nb; i++) {
    annee.push(Math.random() * (max - min) + min);
  }
  return annee;
}
function buildDataSet(status) {
  var dict = {};
  if (status === "annee") {
    for (let index = 0; index < annees.length; index++) {
      const element = annees[index];
      dict[element] = valRandom(15000, 5000, 12);
    }
    return dict;
  }
  for (let index = 0; index < annees.length; index++) {
    const annee = annees[index];
    for (let index = 0; index < mois.length; index++) {
      const elem = mois[index];
      // if (!dict.hasOwnProperty(elem)) dict[annee][mois] = [];
      dict[annee + "_" + elem] = valRandom(10000, 3000, 30);
    }
  }
  console.log("gggggggggggggggg", dict);
  return dict;
}
function buildJour() {
  var element = [];
  for (let index = 1; index < 30; index++) element.push("J" + index);
  return element;
}
function summer(mois) {
  var tab = getRandom();
  var sum_ = 0;
  var data = [];
  for (let i = 0; i < annees.length; i++) {
    sum_ = 0;
    for (let j = 0; j < dict_annee[annees[i]].length; j++) {
      const element = dict_annee[annees[i]][j];
      sum_ = sum_ + element;
    }
    data.push(sum_);
  }
  return data;
}

function fillDataTableMois(annee, mois_) {
  var tds = "";
  for (let index = 0; index < dict_annee[annee].length; index++) {
    const element = dict_annee[annee][index];
    tds += `<tr><td>Label</td><td>123</td><td>${element} kWh</td><td>${
      element - 5000
    }</td><td>${mois_ + " " + annee}</td><td>${Math.floor(
      element * 0.011
    )} &emsp; euro</td></tr>`;
  }
  document.getElementById("myBodyTable").innerHTML = tds;
}

function fillDataTableJour(mois_) {}

function boxInformationsMois(annee) {
  var sum = 0;
  var sumCo2 = 0;
  let index = 0;
  prix_curr = 0;
  prix_old = 0;
  for (index = 0; index < dict_annee[annee].length; index++) {
    const element = dict_annee[annee][index];
    sum += element;
    sumCo2 += element - 5000;
    prix_curr += element * 0.011;
  }
  if (anneeAvant[annee] == annee) prix_old = prix_curr;
  else
    for (index = 0; index < dict_annee[anneeAvant[annee]].length; index++) {
      const element = dict_annee[annee][index];
      prix_old += element * 0.011;
    }

  document.getElementById("moyenConso").innerText = sum / index;
  document.getElementById("moyenCo2").innerText = sumCo2 / index;
  if (prix_curr - prix_old < 0) {
    document.getElementById("differencePrix").innerText =
      prix_curr - prix_old + " " + "Euro";
  } else {
    document.getElementById("differencePrix").innerText =
      prix_curr - prix_old + " " + "Euro";
  }
}
