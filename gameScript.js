function Grid() {
    if (!(this instanceof Grid)) {
        return new Grid();
    }
    this.squareSize= 30,
    this.gridContainer= document.getElementById("grid"),
    this.width= this.gridContainer.offsetWidth,
    this.height= this.gridContainer.offsetHeight,
    this.c= Math.floor(this.width/this.squareSize),
    this.r= Math.floor(this.height/this.squareSize),

    this.setup = function () {
        this.gridContainer.style.gridTemplateColumns="repeat("+this.c+", 1fr)";
        this.gridContainer.style.gridTemplateRows="repeat("+this.r+", 1fr)";
    }

    this.create = function (squareObjs) {
        for (let i=0; i < this.r; i++) {
            for (let j = 0; j < this.c; j++) {
                let div=document.createElement("div");
                let SquareObj=Square(div,j,i);
                if (SquareObj.x === 0 || SquareObj.x === this.c-1 || SquareObj.y === 0 || SquareObj.y === this.r-1){
                    SquareObj.changeColor("#0e171d");
                }
                squareObjs.push(SquareObj);
                this.gridContainer.appendChild(div);
            }
        }
    }

}

function Square(div,x,y) {
    if (!(this instanceof Square)) {
        return new Square(div,x,y);
    }
    this.div= div,
    this.x= x,
    this.y= y,
    this.changeColor = function (color) {
        div.style.backgroundColor=color;
    }
}

let squareObjs=[];
var Grid=Grid();
Grid.setup();
Grid.create(squareObjs);
