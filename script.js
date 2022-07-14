function setSquareSize() {
    const squareContainer = document.getElementById("squares");
    squareContainer.style.height=(squareContainer.offsetWidth/3)+"px";
}

setSquareSize();
window.onresize=setSquareSize;