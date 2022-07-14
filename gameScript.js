function setupGrid () {
    const squareSize=30;
    const gridContainer=document.getElementById("grid");
    const width=gridContainer.offsetWidth;
    const height=gridContainer.offsetHeight;
    const c = Math.floor(width/squareSize);
    const r = Math.floor(height/squareSize);
    gridContainer.style.gridTemplateColumns="repeat("+c+", 1fr)";
    gridContainer.style.gridTemplateRows="repeat("+r+", 1fr)";
}

function createGrid() {
    const squareSize=30;
    const gridContainer=document.getElementById("grid");
    const width=gridContainer.offsetWidth;
    const height=gridContainer.offsetHeight;
    const c = Math.floor(width/squareSize);
    const r = Math.floor(height/squareSize);
    for (let i=0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            let div=document.createElement("div");
            div.id=String(i)+String(j);
            gridContainer.appendChild(div);
        }
    }
}

setupGrid();
createGrid();
