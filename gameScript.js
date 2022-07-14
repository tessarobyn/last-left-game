function factorySquare(div,x,y) {
    var obj={
        div: div,
        x: x,
        y: y,
        changeColor(color) {
            div.style.backgroundColor=color;
        },
    };
    return obj;
}

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

function createGrid(squareObjs) {
    const squareSize=30;
    const gridContainer=document.getElementById("grid");
    const width=gridContainer.offsetWidth;
    const height=gridContainer.offsetHeight;
    const c = Math.floor(width/squareSize);
    const r = Math.floor(height/squareSize);
    for (let i=0; i < r; i++) {
        for (let j = 0; j < c; j++) {
            let div=document.createElement("div");
            let divObj=factorySquare(div,j,i);
            if (divObj.x === 0 || divObj.x === c-1 || divObj.y === 0 || divObj.y === r-1){
                divObj.changeColor("#0e171d");
            }
            squareObjs.push(divObj);
            gridContainer.appendChild(div);
        }
    }
}

let squareObjs=[];
setupGrid();
createGrid(squareObjs);
