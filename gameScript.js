function randomInt(num1,num2) {
    return Math.floor(Math.random()*(num2-num1+1))+num1;
}

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
    this.emptyColor="#26313b";
    this.wallColor="#0e171d";

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
                    SquareObj.changeColor(this.wallColor);
                }
                squareObjs.push(SquareObj);
                this.gridContainer.appendChild(div);
            }
        }
    }

    this.addWalls = function (squareObjs) {
        const numOfSquares=this.c*this.r;
        const totalWallSquares=Math.round(numOfSquares/5);
        const num1=Math.round(numOfSquares/200);
        const num2=Math.round(numOfSquares/50);
        let addedWallSquares=0;
        while (addedWallSquares < totalWallSquares) {
            let wallLength=randomInt(num1,num2);
            addedWallSquares+=wallLength;
            let wallDirection=randomInt(1,4);
            let start=randomInt(0,numOfSquares-1)
            // 1: left, 2: right, 3: up, 4: down

            if (wallDirection === 1) {
                for (let i=0; i < wallLength; i++) {
                    if (squareObjs[start+i] !== undefined && squareObjs[start+(i+1)] !== undefined) {
                        if (squareObjs[start+i].color===this.emptyColor && squareObjs[start+(i+1)].color===this.emptyColor) {
                            squareObjs[start+i].changeColor(this.wallColor);
                        }
                        else {
                            addedWallSquares-=1;
                        }
                    }
                    else {
                        addedWallSquares-=1;
                    }
                }
            }

            if (wallDirection === 2) {
                for (let i=0; i < wallLength; i++) {
                    if (squareObjs[start-i] !== undefined && squareObjs[start-(i+1)] !== undefined) {
                        if (squareObjs[start-i].color===this.emptyColor && squareObjs[start-(i+1)].color===this.emptyColor) {
                            squareObjs[start-i].changeColor(this.wallColor);
                        }
                        else {
                            addedWallSquares-=1;
                        }
                    }
                    else {
                        addedWallSquares-=1;
                    }
                }
            }

            if (wallDirection === 3) {
                for (let i=0; i < wallLength; i++) {
                    if (squareObjs[start-(i*this.c)] !== undefined && squareObjs[start-((i+1)*this.c)] !== undefined) {
                        if (squareObjs[start-(i*this.c)].color===this.emptyColor && squareObjs[start-((i+1)*this.c)].color===this.emptyColor) {
                            squareObjs[start-(i*this.c)].changeColor(this.wallColor);
                        }
                        else {
                            addedWallSquares-=1;
                        }
                    }
                    else {
                        addedWallSquares-=1;
                    }
                }
            }

            if (wallDirection === 4) {
                for (let i=0; i < wallLength; i++) {
                    if (squareObjs[start+(i*this.c)] !== undefined && squareObjs[start+((i+1)*this.c)] !== undefined) {
                        if (squareObjs[start+(i*this.c)].color===this.emptyColor && squareObjs[start+((i+1)*this.c)].color===this.emptyColor) {
                            squareObjs[start+(i*this.c)].changeColor(this.wallColor);
                        }
                        else {
                            addedWallSquares-=1;
                        }
                    }
                    else {
                        addedWallSquares-=1;
                    }
                }
            }
        }

    }

    this.floodCheck = function (squareObjs) {
        let startx = 1;
        let starty = 1;
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
                squareObjs[i].changeColor(this.color);
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
        else if (squareObjs[this.divIndex+1].color === PlayerObj.color) {
            this.kill();
        }
    }
    this.moveLeft = function (squareObjs) {
        if (squareObjs[this.divIndex-1].color === "#26313b") {
            squareObjs[this.divIndex].changeColor("#26313b");
            this.divIndex-=1;
            squareObjs[this.divIndex].changeColor(this.color);
        }
        else if (squareObjs[this.divIndex-1].color === PlayerObj.color) {
            this.kill();
        }
    }
    this.moveUp = function (squareObjs) {
        if (squareObjs[this.divIndex-GridObj.c].color === "#26313b") {
            squareObjs[this.divIndex].changeColor("#26313b");
            this.divIndex-=GridObj.c;
            squareObjs[this.divIndex].changeColor(this.color);
        }
        else if (squareObjs[this.divIndex-GridObj.c].color === PlayerObj.color) {
            this.kill();
        }
    }
    this.moveDown = function (squareObjs) {
        if (squareObjs[this.divIndex+GridObj.c].color === "#26313b") {
            squareObjs[this.divIndex].changeColor("#26313b");
            this.divIndex+=GridObj.c;
            squareObjs[this.divIndex].changeColor(this.color);
        }
        else if (squareObjs[this.divIndex+GridObj.c].color === PlayerObj.color) {
            this.kill();
        }
    }
    this.kill = function () {
        window.location.href="gameOver.html";
    }
}

function Enemy(GridObj) {
    if (!(this instanceof Enemy)) {
        return new Enemy(GridObj);
    }
    this.color="#00b4d8";
    this.divIndex;
    this.x=3;
    this.y=3;
    this.findSquare = function (squareObjs) {
        this.x=randomInt(1, GridObj.c-2);
        this.y=randomInt(1, GridObj.r-2);
        for (let i=0;i < squareObjs.length; i++) {
            if (squareObjs[i].y === this.y && squareObjs[i].x === this.x) {
                squareObjs[i].changeColor(this.color);
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
        else if (squareObjs[this.divIndex+1].color === PlayerObj.color) {
            PlayerObj.kill();
        }
    }
    this.moveLeft = function (squareObjs) {
        if (squareObjs[this.divIndex-1].color === "#26313b") {
            squareObjs[this.divIndex].changeColor("#26313b");
            this.divIndex-=1;
            squareObjs[this.divIndex].changeColor(this.color);
        }
        else if (squareObjs[this.divIndex-1].color === PlayerObj.color) {
            PlayerObj.kill();
        }
    }
    this.moveUp = function (squareObjs) {
        if (squareObjs[this.divIndex-GridObj.c].color === "#26313b") {
            squareObjs[this.divIndex].changeColor("#26313b");
            this.divIndex-=GridObj.c;
            squareObjs[this.divIndex].changeColor(this.color);
        }
        else if (squareObjs[this.divIndex-GridObj.c].color === PlayerObj.color) {
            PlayerObj.kill();
        }
    }
    this.moveDown = function (squareObjs) {
        if (squareObjs[this.divIndex+GridObj.c].color === "#26313b") {
            squareObjs[this.divIndex].changeColor("#26313b");
            this.divIndex+=GridObj.c;
            squareObjs[this.divIndex].changeColor(this.color);
        }
        else if (squareObjs[this.divIndex+GridObj.c].color === PlayerObj.color) {
            PlayerObj.kill();
        }
    }

    this.move=function(squareObjs) {
            let move = randomInt(1,4);
            if (move === 1) {
                this.moveRight(squareObjs);
            }
            else if (move === 2) {
                this.moveLeft(squareObjs);
            }
            else if (move === 3) {
                this.moveUp(squareObjs);
            }
            else if (move === 4) {
                this.moveDown(squareObjs);
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

function addEnemies(GridObj,squareObjs,enemiesObjs) {
    const numOfSquares = GridObj.r*GridObj.c;
    const numOfEnemies = Math.round(numOfSquares/75);
    for (let i=0;i < numOfEnemies; i++) {
        var EnemyObj=new Enemy(GridObj);
        EnemyObj.findSquare(squareObjs);
        enemiesObjs.push(EnemyObj);
    }
}

function moveEnemies(enemiesObjs,squareObjs) {
    for (let i = 0; i < enemiesObjs.length; i++) {
        enemiesObjs[i].move(squareObjs);
    }
}

let squareObjs=[];
let enemiesObjs=[];
var GridObj= new Grid();
GridObj.setup();
GridObj.create(squareObjs);

var PlayerObj= new Player(GridObj);
PlayerObj.findSquare(squareObjs);

addEnemies(GridObj,squareObjs,enemiesObjs);

GridObj.addWalls(squareObjs);

var t=setInterval(function () {
    moveEnemies(enemiesObjs,squareObjs)
    },
    300);

window.addEventListener("keydown",checkKey);