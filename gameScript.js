function addGrid () {
    const squareSize=30;
    const gridContainer=document.getElementById("grid");
    const width=gridContainer.offsetWidth;
    const height=gridContainer.offsetHeight;
    const c = Math.floor(width/squareSize);
    const r = Math.floor(height/squareSize);
    gridContainer.style.gridTemplateColumns="repeat("+c+", 1fr)";
    gridContainer.style.gridTemplateRows="repeat("+r+", 1fr)";
}

addGrid();