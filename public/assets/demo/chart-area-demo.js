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
var idGraph = scriptTag.getAttribute("idGraph")
  ? scriptTag.getAttribute("idGraph")
  : null;

// Utiliser la valeur de l'argument dans votre script
// console.log("L'argument passé est : " + dataSet["mois"]);

// Area Chart Example
var ctx = document.getElementById(idGraph + "Area");
// var ctxMois = document.getElementById("myAreaChartMois");
// var ctxAnnee = document.getElementById("myAreaChartAnnee");
function myChartAreaGraph(annee, mois_, status) {
  var myLineChart = new Chart(ctx, {
    type: "line",
    data: {
      labels:
        status === "tout" ? annees : status === "mois" ? mois : buildJour(),
      datasets: [
        {
          label: "Sessions",
          lineTension: 0.3,
          backgroundColor: "rgba(2,117,216,0.2)",
          borderColor: "rgba(2,117,216,1)",
          pointRadius: 5,
          pointBackgroundColor: "rgba(2,117,216,1)",
          pointBorderColor: "rgba(255,255,255,0.8)",
          pointHoverRadius: 5,
          pointHoverBackgroundColor: "rgba(2,117,216,1)",
          pointHitRadius: 50,
          pointBorderWidth: 2,
          data:
            status === "tout"
              ? subValCo2(summer(), val, 60000)
              : status === "mois"
              ? subValCo2(dict_annee[annee], 10000)
              : subValCo2(dict_anne_mois[annee + "_" + mois_], 5000),
          // [
          //   10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849,
          //   24159, 32651, 31984, 38451,
          // ],
        },
      ],
    },
    options: {
      scales: {
        xAxes: [
          {
            time: {
              unit: "date",
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
              max: 15000,
              maxTicksLimit: 5,
            },
            gridLines: {
              color: "rgba(0, 0, 0, .125)",
            },
          },
        ],
      },
      legend: {
        display: true,
      },
    },
  });
}

function subValCo2(data, val) {
  var temp = [];
  for (let index = 0; index < data.length; index++) {
    temp[index] = Math.floor(data[index] - val);
  }
  return data;
}
// var myLineChart1 = new Chart(ctxMois, {
//   type: "line",
//   data: {
//     labels: [
//       "Mar 1",
//       "Mar 2",
//       "Mar 3",
//       "Mar 4",
//       "Mar 5",
//       "Mar 6",
//       "Mar 7",
//       "Mar 8",
//       "Mar 9",
//       "Mar 10",
//       "Mar 11",
//       "Mar 12",
//       "Mar 13",
//     ],
//     datasets: [
//       {
//         label: "Sessions",
//         lineTension: 0.3,
//         backgroundColor: "rgba(2,117,216,0.2)",
//         borderColor: "rgba(2,117,216,1)",
//         pointRadius: 5,
//         pointBackgroundColor: "rgba(2,117,216,1)",
//         pointBorderColor: "rgba(255,255,255,0.8)",
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: "rgba(2,117,216,1)",
//         pointHitRadius: 50,
//         pointBorderWidth: 2,
//         data: [
//           10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159,
//           32651, 31984, 38451,
//         ],
//       },
//     ],
//   },
//   options: {
//     scales: {
//       xAxes: [
//         {
//           time: {
//             unit: "date",
//           },
//           gridLines: {
//             display: false,
//           },
//           ticks: {
//             maxTicksLimit: 7,
//           },
//         },
//       ],
//       yAxes: [
//         {
//           ticks: {
//             min: 0,
//             max: 40000,
//             maxTicksLimit: 5,
//           },
//           gridLines: {
//             color: "rgba(0, 0, 0, .125)",
//           },
//         },
//       ],
//     },
//     legend: {
//       display: false,
//     },
//   },
// });

// var myLineChart2 = new Chart(ctxAnnee, {
//   type: "line",
//   data: {
//     labels: [
//       "Mar 1",
//       "Mar 2",
//       "Mar 3",
//       "Mar 4",
//       "Mar 5",
//       "Mar 6",
//       "Mar 7",
//       "Mar 8",
//       "Mar 9",
//       "Mar 10",
//       "Mar 11",
//       "Mar 12",
//       "Mar 13",
//     ],
//     datasets: [
//       {
//         label: "Sessions",
//         lineTension: 0.3,
//         backgroundColor: "rgba(2,117,216,0.2)",
//         borderColor: "rgba(2,117,216,1)",
//         pointRadius: 5,
//         pointBackgroundColor: "rgba(2,117,216,1)",
//         pointBorderColor: "rgba(255,255,255,0.8)",
//         pointHoverRadius: 5,
//         pointHoverBackgroundColor: "rgba(2,117,216,1)",
//         pointHitRadius: 50,
//         pointBorderWidth: 2,
//         data: [
//           10000, 30162, 26263, 18394, 18287, 28682, 31274, 33259, 25849, 24159,
//           32651, 31984, 38451,
//         ],
//       },
//     ],
//   },
//   options: {
//     scales: {
//       xAxes: [
//         {
//           time: {
//             unit: "date",
//           },
//           gridLines: {
//             display: false,
//           },
//           ticks: {
//             maxTicksLimit: 7,
//           },
//         },
//       ],
//       yAxes: [
//         {
//           ticks: {
//             min: 0,
//             max: 40000,
//             maxTicksLimit: 5,
//           },
//           gridLines: {
//             color: "rgba(0, 0, 0, .125)",
//           },
//         },
//       ],
//     },
//     legend: {
//       display: false,
//     },
//   },
// });
