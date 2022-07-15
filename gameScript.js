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
        const num1=Math.round(numOfSquares/100);
        const num2=Math.round(numOfSquares/50);
        let addedWallSquares=0;
        while (addedWallSquares < totalWallSquares) {
            let wallLength=randomInt(num1,num2);
            addedWallSquares+=wallLength;
            let wallDirection=randomInt(1,4);
            let start=randomInt(0,numOfSquares-1)
            // 1: right, 2: left, 3: up, 4: down

            if (wallDirection === 1) {
                for (let i=0; i < wallLength; i++) {
                    try {
                        if (squareObjs[start+i].color===this.emptyColor 
                        && squareObjs[start+(i+1)].color===this.emptyColor //right 1
                        && squareObjs[start-(i*this.c)].color===this.emptyColor //up
                        && squareObjs[start+(i*this.c)].color===this.emptyColor //down
                        && squareObjs[(start-(i*this.c))+(i+1)].color===this.emptyColor //up,right 1
                        && squareObjs[(start+(i*this.c))+(i+1)].color===this.emptyColor //down,right 1
                        && squareObjs[(start-(i*this.c))-(i+1)].color===this.emptyColor //up,left 1
                        && squareObjs[(start+(i*this.c))+(i+1)].color===this.emptyColor //down,left 1 
                        ) {
                            squareObjs[start+i].changeColor(this.wallColor);
                        }
                        else {
                            addedWallSquares-=1;
                        }
                    }
                    catch {
                        addedWallSquares-=1;
                    }
                }
            }

            if (wallDirection === 2) {
                for (let i=0; i < wallLength; i++) {
                    try {
                        if (squareObjs[start-i].color===this.emptyColor 
                        && squareObjs[start-(i+1)].color===this.emptyColor // left 1
                        && squareObjs[start-(i*this.c)].color===this.emptyColor //up
                        && squareObjs[start+(i*this.c)].color===this.emptyColor //down
                        && squareObjs[(start-(i*this.c))-(i+1)].color===this.emptyColor //up,left 1
                        && squareObjs[(start+(i*this.c))-(i+1)].color===this.emptyColor //down,left 1 
                        && squareObjs[(start-(i*this.c))+(i+1)].color===this.emptyColor //up,right 1
                        && squareObjs[(start+(i*this.c))+(i+1)].color===this.emptyColor //down,right 1
                        ) {
                            squareObjs[start-i].changeColor(this.wallColor);
                        }
                        else {
                            addedWallSquares-=1;
                        }
                    }
                    catch {
                        addedWallSquares-=1;
                    }
                }
            }

            if (wallDirection === 3) {
                for (let i=0; i < wallLength; i++) {
                    try {
                        if (squareObjs[start-(i*this.c)].color===this.emptyColor 
                        && squareObjs[start-((i+1)*this.c)].color===this.emptyColor
                        && squareObjs[(start-(i*this.c))+1].color===this.emptyColor //right
                        && squareObjs[(start-(i*this.c))-1].color===this.emptyColor //left
                        && squareObjs[(start-((i+1)*this.c))+1].color===this.emptyColor //up, right
                        && squareObjs[(start-((i+1)*this.c))-1].color===this.emptyColor //up, left
                        && squareObjs[(start+((i+1)*this.c))+1].color===this.emptyColor //down, right
                        && squareObjs[(start+((i+1)*this.c))-1].color===this.emptyColor //down, left
                        ) {
                            squareObjs[start-(i*this.c)].changeColor(this.wallColor);
                        }
                        else {
                            addedWallSquares-=1;
                        }
                    }
                    catch {
                        addedWallSquares-=1;
                    }
                }
            }

            if (wallDirection === 4) {
                for (let i=0; i < wallLength; i++) {
                    try {
                        if (squareObjs[start+(i*this.c)].color===this.emptyColor 
                        && squareObjs[start+((i+1)*this.c)].color===this.emptyColor
                        && squareObjs[(start+(i*this.c))+1].color===this.emptyColor //right
                        && squareObjs[(start+(i*this.c))-1].color===this.emptyColor //left
                        && squareObjs[(start+((i+1)*this.c))+1].color===this.emptyColor //down, right
                        && squareObjs[(start+((i+1)*this.c))-1].color===this.emptyColor //down, left
                        && squareObjs[(start-((i+1)*this.c))+1].color===this.emptyColor //up, right
                        && squareObjs[(start-((i+1)*this.c))-1].color===this.emptyColor //up, left
                        ) {
                            squareObjs[start+(i*this.c)].changeColor(this.wallColor);
                        }
                        else {
                            addedWallSquares-=1;
                        }
                    }
                    catch {
                        addedWallSquares-=1;
                    }
                }
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

function Bullet(direction,divIndex,c,r) {
    if (!(this instanceof Bullet)) {
        return new Bullet();
    }
    this.x=divIndex%c;
    this.y=Math.floor(divIndex/c);
    this.direction=direction;
    this.length=1;
    this.width=0.5;
    this.bullet;
    this.add = function (c,r) {
        const bullet = document.createElement("div");
        bullet.classList.add("bullet");
        if (this.direction === "up" || this.direction === "down") {
            bullet.style.width=this.width+"vh";
            bullet.style.height=this.length+"vh";
        }
        else {
            bullet.style.width=this.length+"vh";
            bullet.style.height=this.width+"vh";
        }
        const body=document.getElementsByTagName("body")[0];
        this.y=(body.offsetHeight/r)*this.y + (body.offsetHeight/r)/2;
        this.x=(body.offsetWidth/c)*this.x + (body.offsetWidth/c)/2;
        bullet.style.top=this.y+"px";
        bullet.style.left=this.x+"px";
        const container = document.getElementById("bulletContainer");
        this.bullet=bullet;
        container.appendChild(bullet);
    }

    this.checkKill = function (squareObjs,c,r,PlayerObj) {
        const body=document.getElementsByTagName("body")[0];
        const xSquare=Math.floor(this.x/(body.offsetWidth/c));
        const ySquare=Math.floor(this.y/(body.offsetHeight/r));
        let index=ySquare*c+xSquare;
        for (let i=0; i < PlayerObj.enemiesObjs.length; i++) {
            if (PlayerObj.enemiesObjs[i].divIndex === index) {
                PlayerObj.enemiesObjs.splice(i,1);
                squareObjs[index].changeColor("#26313b");
                PlayerObj.showKillEnemy();
                for (let i = 0;i < PlayerObj.BulletObjs.length; i++) {
                    if (PlayerObj.BulletObjs[i].x === this.x && PlayerObj.BulletObjs[i].y === this.y) {
                        const container = document.getElementById("bulletContainer");
                        container.removeChild(this.bullet);
                        PlayerObj.BulletObjs.splice(i,1);
                    }
                }
            }
        }
    }
    
    this.move = function () {
        if (this.direction === "left") {
            this.x-=3;
        }
        if (this.direction === "right") {
            this.x+=3;
        }
        if (this.direction === "up") {
            this.y-=3;
        }
        if (this.direction === "down") {
            this.y+=3;
        }
        
        this.bullet.style.top=this.y+"px";
        this.bullet.style.left=this.x+"px"; 
    }
}

function Player(GridObj) {
    if (!(this instanceof Player)) {
        return new Player(GridObj);
    }
    this.x=Math.floor(GridObj.c/2);
    this.y=Math.floor(GridObj.r/2);
    this.color="#ff3366";
    this.enemyColor="#00b4d8";
    this.coinColor="#ffc857";
    this.coinsCollected=-1;
    this.enemiesKilled=-1;
    this.totalCoins;
    this.totalEnemies;
    this.divIndex;
    this.direction="up";
    this.BulletObjs=[];
    this.enemiesObjs=[];
    this.findSquare = function (squareObjs) {
        for (let i=0;i < squareObjs.length; i++) {
            if (squareObjs[i].y === this.y && squareObjs[i].x === this.x) {
                squareObjs[i].changeColor(this.color);
                this.divIndex=i;
            }
        }
    }
    this.kill = function () {
        window.location.href="gameOver.html";
    }

    this.moveRight = function (squareObjs) {
        if (squareObjs[this.divIndex+1].color === "#26313b" || squareObjs[this.divIndex+1].color === this.coinColor) {
            squareObjs[this.divIndex].changeColor("#26313b");
            this.divIndex+=1;
            if (squareObjs[this.divIndex].color === this.coinColor) {
                this.showCollectCoin();
            }
            squareObjs[this.divIndex].changeColor(this.color);
            this.direction="right";
        }
        else if (squareObjs[this.divIndex+1].color === this.enemyColor) {
            this.kill();
        }
    }
    this.moveLeft = function (squareObjs) {
        if (squareObjs[this.divIndex-1].color === "#26313b" || squareObjs[this.divIndex-1].color === this.coinColor) {
            squareObjs[this.divIndex].changeColor("#26313b");
            this.divIndex-=1;
            if (squareObjs[this.divIndex].color === this.coinColor) {
                this.showCollectCoin(coinObjs.length);
            }
            squareObjs[this.divIndex].changeColor(this.color);
            this.direction="left";
        }
        else if (squareObjs[this.divIndex-1].color === this.enemyColor) {
            this.kill();
        }
    }
    this.moveUp = function (squareObjs) {
        if (squareObjs[this.divIndex-GridObj.c].color === "#26313b" || squareObjs[this.divIndex-GridObj.c].color === this.coinColor) {
            squareObjs[this.divIndex].changeColor("#26313b");
            this.divIndex-=GridObj.c;
            if (squareObjs[this.divIndex].color === this.coinColor) {
                this.showCollectCoin(coinObjs.length);
            }
            squareObjs[this.divIndex].changeColor(this.color);
            this.direction="up";
        }
        else if (squareObjs[this.divIndex-GridObj.c].color === this.enemyColor) {
            this.kill();
        }
    }
    this.moveDown = function (squareObjs) {
        if (squareObjs[this.divIndex+GridObj.c].color === "#26313b" || squareObjs[this.divIndex+GridObj.c].color === this.coinColor) {
            squareObjs[this.divIndex].changeColor("#26313b");
            this.divIndex+=GridObj.c;
            if (squareObjs[this.divIndex].color === this.coinColor) {
                this.showCollectCoin(coinObjs.length);
            }
            squareObjs[this.divIndex].changeColor(this.color);
            this.direction="down";
        }
        else if (squareObjs[this.divIndex+GridObj.c].color === this.enemyColor) {
            this.kill();
        }
    }

    this.showCollectCoin = function() {
        const coinCount=document.getElementById("coinCount");
        this.coinsCollected+=1
        coinCount.innerText="Coins collected: "+String(this.coinsCollected)+"/"+String(this.totalCoins);
        checkFinish(this);
    }

    this.showKillEnemy = function() {
        const killCount=document.getElementById("killCount");
        this.enemiesKilled+=1
        killCount.innerText="Enemies killed: "+String(this.enemiesKilled)+"/"+String(this.totalEnemies);
        checkFinish(this);
    } 

    this.shoot = function() {
        var BulletObj= new Bullet(this.direction,this.divIndex,GridObj.c,GridObj.r);
        BulletObj.add(GridObj.c,GridObj.r);
        this.BulletObjs.push(BulletObj);
    }
}

function Enemy(GridObj) {
    if (!(this instanceof Enemy)) {
        return new Enemy(GridObj);
    }
    this.color="#00b4d8";
    this.divIndex;
    this.x;
    this.y;

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

Enemy.prototype.findSquare = function (squareObjs) {
    added=false;
    while (!added) {
        this.x=randomInt(1, GridObj.c-2);
        this.y=randomInt(1, GridObj.r-2);
        let i=this.y*GridObj.c+this.x;
        if (squareObjs[i].color === "#26313b") {
            squareObjs[i].changeColor(this.color);
            this.divIndex=i;
            added=true;
        }
    }
}


function Coin(GridObj) {
    if (!(this instanceof Coin)) {
        return new Coin(GridObj);
    }
    this.color="#ffc857";
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
    else if (e.code == "Space") {
        PlayerObj.shoot();
    }
}

function addInteractiveSquares(GridObj,squareObjs,interactiveObjs,ObjType) {
    const numOfSquares = GridObj.r*GridObj.c;
    const num = Math.round(numOfSquares/75);
    for (let i=0;i < num; i++) {
        if (ObjType === Coin) {
            Coin.prototype=Object.create(Enemy.prototype);
        }
        var Obj=new ObjType(GridObj);
        Obj.findSquare(squareObjs);
        interactiveObjs.push(Obj);
    }
    return interactiveObjs;
}

function moveEnemies(PlayerObj,squareObjs) {
    for (let i = 0; i < PlayerObj.enemiesObjs.length; i++) {
        PlayerObj.enemiesObjs[i].move(squareObjs);
    }
}

function moveBullets(PlayerObj,squareObjs,GridObj) {
    for (let i = 0; i < PlayerObj.BulletObjs.length; i++) {
        PlayerObj.BulletObjs[i].move();
        PlayerObj.BulletObjs[i].checkKill(squareObjs,GridObj.c,GridObj.r,PlayerObj);
    }
}

function deleteBullets(PlayerObj) {
    const body = document.getElementsByTagName("body")[0];
    const maxWidth = body.offsetWidth;
    const maxHeight = body.offsetHeight;
    for (let i = 0;i < PlayerObj.BulletObjs.length; i++) {
        if (PlayerObj.BulletObjs[i].x < 0 || PlayerObj.BulletObjs[i].x > maxWidth || PlayerObj.BulletObjs[i].y < 0 || PlayerObj.BulletObjs[i].y > maxHeight) {
            const container = document.getElementById("bulletContainer");
            container.removeChild(PlayerObj.BulletObjs[i].bullet);
            PlayerObj.BulletObjs.splice(i,1);
        }
    }
}

function checkFinish(PlayerObj) {
    if (PlayerObj.coinsCollected === PlayerObj.totalCoins && PlayerObj.enemiesKilled === PlayerObj.totalEnemies) {
        window.location.href="win.html";
    }
}

let squareObjs=[];
let coinObjs=[];
let enemiesObjs=[];
var GridObj= new Grid();
GridObj.setup();
GridObj.create(squareObjs);

var PlayerObj= new Player(GridObj);
PlayerObj.findSquare(squareObjs);

enemiesObjs=addInteractiveSquares(GridObj,squareObjs,enemiesObjs,Enemy);
coinObjs=addInteractiveSquares(GridObj,squareObjs,coinObjs,Coin);

PlayerObj.totalCoins = coinObjs.length;
PlayerObj.totalEnemies = enemiesObjs.length;
PlayerObj.enemiesObjs=enemiesObjs;
PlayerObj.showCollectCoin();
PlayerObj.showKillEnemy();

GridObj.addWalls(squareObjs);

var moveE=setInterval(function () {
    moveEnemies(PlayerObj,squareObjs);
    },
    500);

var moveB=setInterval(function () {
    moveBullets(PlayerObj,squareObjs,GridObj);
    },
    5);

var deleteB=setInterval(function () {
    deleteBullets(PlayerObj);
    },
    5);

window.addEventListener("keydown",checkKey);