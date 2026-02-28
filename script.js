let history = [];
let period = 1;

function addData() {
  let result = document.getElementById("result").value;
  history.push(result);

  updateHeatmap(result);
  predict();

  period++;
  document.getElementById("periodDisplay").innerText = "Period: " + period;
}

function predict() {
  if (history.length < 6) {
    document.getElementById("output").innerText = "Collecting data...";
    return;
  }

  let last5 = history.slice(-5);

  let bigCount = last5.filter(x => x === "Big").length;
  let smallCount = last5.filter(x => x === "Small").length;

  let confidence = Math.abs(bigCount - smallCount) * 20;

  if (bigCount > smallCount) {
    document.getElementById("output").innerText =
      "Prediction: BIG | Confidence: " + confidence + "%";
  } else if (smallCount > bigCount) {
    document.getElementById("output").innerText =
      "Prediction: SMALL | Confidence: " + confidence + "%";
  } else {
    document.getElementById("output").innerText =
      "Neutral Pattern | 50% Probability";
  }
}

function updateHeatmap(result) {
  let cell = document.createElement("div");
  cell.classList.add("cell");
  cell.classList.add(result.toLowerCase());

  document.getElementById("heatmap").appendChild(cell);
}
