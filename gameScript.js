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
    this.div=div,
    this.color="#26313b";
    this.x= x,
    this.y= y,
    this.changeColor = function (color) {
        div.style.backgroundColor=color;
        this.color=color;
    }
}

function Player(GridObj) {
    if (!(this instanceof Player)) {
        return new Player(GridObj);
    }
    this.x=Math.floor(GridObj.c/2);
    this.y=Math.floor(GridObj.r/2);
    this.color="#ff3366";
    this.divIndex;
    this.findSquare = function (squareObjs) {
        for (let i=0;i < squareObjs.length; i++) {
            if (squareObjs[i].y === this.y && squareObjs[i].x === this.x) {
                squareObjs[i].changeColor("#ff3366");
                this.divIndex=i;
            }
        }
    }
    this.moveRight = function (squareObjs) {
        if (squareObjs[this.divIndex+1].color === "#26313b") {
            squareObjs[this.divIndex].changeColor("#26313b");
            this.divIndex+=1;
            squareObjs[this.divIndex].changeColor(this.color);
        }
    }
    this.moveLeft = function (squareObjs) {
        if (squareObjs[this.divIndex-1].color === "#26313b") {
            squareObjs[this.divIndex].changeColor("#26313b");
            this.divIndex-=1;
            squareObjs[this.divIndex].changeColor(this.color);
        }
    }
    this.moveUp = function (squareObjs) {
        if (squareObjs[this.divIndex-GridObj.c].color === "#26313b") {
            squareObjs[this.divIndex].changeColor("#26313b");
            this.divIndex-=GridObj.c;
            squareObjs[this.divIndex].changeColor(this.color);
        }
    }
    this.moveDown = function (squareObjs) {
        if (squareObjs[this.divIndex+GridObj.c].color === "#26313b") {
            squareObjs[this.divIndex].changeColor("#26313b");
            this.divIndex+=GridObj.c;
            squareObjs[this.divIndex].changeColor(this.color);
        }
    }
}

function checkKey(e) {
    if (e.code == "KeyW") {
        PlayerObj.moveUp(squareObjs);
    }
    else if (e.code == "KeyA") {
        PlayerObj.moveLeft(squareObjs);
    }
    else if (e.code == "KeyS") {
        PlayerObj.moveDown(squareObjs);
    }
    else if (e.code == "KeyD") {
        PlayerObj.moveRight(squareObjs);
    }
}

let squareObjs=[];
var GridObj= new Grid();
GridObj.setup();
GridObj.create(squareObjs);
var PlayerObj= new Player(GridObj);
PlayerObj.findSquare(squareObjs);
PlayerObj.moveUp(squareObjs);

window.addEventListener("keydown",checkKey);