function setSquareSize() {
  const squareContainer = document.getElementById("squares");
  squareContainer.style.height = squareContainer.offsetWidth / 3 + "px";
}

function startGame() {
  window.location.href = "game.html";
}

function showRules() {
  window.location.href = "rules.html";
}

setSquareSize();
window.onresize = setSquareSize;

const playButton = document.getElementById("play");
playButton.addEventListener("click", () => {
  startGame();
});

const rulesButton = document.getElementById("rules");
rulesButton.addEventListener("click", () => {
  showRules();
});
