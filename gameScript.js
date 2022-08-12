function randomInt(num1, num2) {
  return Math.floor(Math.random() * (num2 - num1 + 1)) + num1;
}

class Bullet {
  constructor(direction, divIndex, c, r) {
    this.x = divIndex % c;
    this.y = Math.floor(divIndex / c);
    this.direction = direction;
    this.length = 1;
    this.width = 0.5;
    this.bulletDiv;
  }

  add(c, r) {
    const bullet = document.createElement("div");
    bullet.classList.add("bullet");
    if (this.direction === "up" || this.direction === "down") {
      bullet.style.width = this.width + "vh";
      bullet.style.height = this.length + "vh";
    } else {
      bullet.style.width = this.length + "vh";
      bullet.style.height = this.width + "vh";
    }
    const body = document.getElementsByTagName("body")[0];
    this.y = (body.offsetHeight / r) * this.y + body.offsetHeight / r / 2;
    this.x = (body.offsetWidth / c) * this.x + body.offsetWidth / c / 2;
    bullet.style.top = this.y + "px";
    bullet.style.left = this.x + "px";
    const container = document.getElementById("bulletContainer");
    this.bulletDiv = bullet;
    container.appendChild(bullet);
  }

  checkKill(squareObjs, c, r, enemiesObjs) {
    const body = document.getElementsByTagName("body")[0];
    const xSquare = Math.floor(this.x / (body.offsetWidth / c));
    const ySquare = Math.floor(this.y / (body.offsetHeight / r));
    let index = ySquare * c + xSquare;
    for (let i = 0; i < enemiesObjs.length; i++) {
      if (enemiesObjs[i].divIndex === index) {
        enemiesObjs.splice(i, 1);
        squareObjs[index].changeColor("#26313b");
        PlayerObj.killEnemy();
        for (let i = 0; i < PlayerObj.BulletObjs.length; i++) {
          if (
            PlayerObj.BulletObjs[i].x === this.x &&
            PlayerObj.BulletObjs[i].y === this.y
          ) {
            const container = document.getElementById("bulletContainer");
            container.removeChild(this.bulletDiv);
            PlayerObj.BulletObjs.splice(i, 1);
          }
        }
      }
    }
  }

  move() {
    if (this.direction === "left") {
      this.x -= 3;
    }
    if (this.direction === "right") {
      this.x += 3;
    }
    if (this.direction === "up") {
      this.y -= 3;
    }
    if (this.direction === "down") {
      this.y += 3;
    }

    this.bulletDiv.style.top = this.y + "px";
    this.bulletDiv.style.left = this.x + "px";
  }
}

class SpecialSquares {
  findSquare(squareObjs) {
    let added = false;
    while (!added) {
      this.x = randomInt(1, this.GridObj.c - 2);
      this.y = randomInt(1, this.GridObj.r - 2);
      let i = this.y * this.GridObj.c + this.x;
      if (squareObjs[i].color === "#26313b") {
        squareObjs[i].changeColor(this.color);
        this.divIndex = i;
        added = true;
      }
    }
  }
}

class Enemy extends SpecialSquares {
  constructor(GridObj, PlayerObj) {
    super();
    this.color = "#00b4d8";
    this.divIndex;
    this.x;
    this.y;
    this.GridObj = GridObj;
    this.PlayerObj = PlayerObj;
  }
  moveRight(squareObjs) {
    if (squareObjs[this.divIndex + 1].color === "#26313b") {
      squareObjs[this.divIndex].changeColor("#26313b");
      this.divIndex += 1;
      squareObjs[this.divIndex].changeColor(this.color);
    } else if (squareObjs[this.divIndex + 1].color === this.PlayerObj.color) {
      this.PlayerObj.kill();
    }
  }
  moveLeft(squareObjs) {
    if (squareObjs[this.divIndex - 1].color === "#26313b") {
      squareObjs[this.divIndex].changeColor("#26313b");
      this.divIndex -= 1;
      squareObjs[this.divIndex].changeColor(this.color);
    } else if (squareObjs[this.divIndex - 1].color === this.PlayerObj.color) {
      this.PlayerObj.kill();
    }
  }
  moveUp(squareObjs) {
    if (squareObjs[this.divIndex - this.GridObj.c].color === "#26313b") {
      squareObjs[this.divIndex].changeColor("#26313b");
      this.divIndex -= this.GridObj.c;
      squareObjs[this.divIndex].changeColor(this.color);
    } else if (
      squareObjs[this.divIndex - this.GridObj.c].color === this.PlayerObj.color
    ) {
      this.PlayerObj.kill();
    }
  }
  moveDown(squareObjs) {
    if (squareObjs[this.divIndex + this.GridObj.c].color === "#26313b") {
      squareObjs[this.divIndex].changeColor("#26313b");
      this.divIndex += this.GridObj.c;
      squareObjs[this.divIndex].changeColor(this.color);
    } else if (
      squareObjs[this.divIndex + this.GridObj.c].color === this.PlayerObj.color
    ) {
      this.PlayerObj.kill();
    }
  }

  move(squareObjs) {
    let move = randomInt(1, 4);
    if (move === 1) {
      this.moveRight(squareObjs);
    } else if (move === 2) {
      this.moveLeft(squareObjs);
    } else if (move === 3) {
      this.moveUp(squareObjs);
    } else if (move === 4) {
      this.moveDown(squareObjs);
    }
  }
}

class Coin extends SpecialSquares {
  constructor(GridObj) {
    super();
    this.color = "#ffc857";
    this.GridObj = GridObj;
  }
}

class Grid {
  constructor() {
    (this.squareSize = 30),
      (this.gridContainer = document.getElementById("grid")),
      (this.width = this.gridContainer.offsetWidth),
      (this.height = this.gridContainer.offsetHeight),
      (this.c = Math.floor(this.width / this.squareSize)),
      (this.r = Math.floor(this.height / this.squareSize)),
      (this.emptyColor = "#26313b");
    this.wallColor = "#0e171d";
  }

  setup() {
    this.gridContainer.style.gridTemplateColumns =
      "repeat(" + this.c + ", 1fr)";
    this.gridContainer.style.gridTemplateRows = "repeat(" + this.r + ", 1fr)";
  }

  create(squareObjs) {
    for (let i = 0; i < this.r; i++) {
      for (let j = 0; j < this.c; j++) {
        let div = document.createElement("div");
        let SquareObj = new Square(div, j, i);
        if (
          SquareObj.x === 0 ||
          SquareObj.x === this.c - 1 ||
          SquareObj.y === 0 ||
          SquareObj.y === this.r - 1
        ) {
          SquareObj.changeColor(this.wallColor);
        }
        squareObjs.push(SquareObj);
        this.gridContainer.appendChild(div);
      }
    }
  }

  addWalls(squareObjs) {
    const numOfSquares = this.c * this.r;
    const areaToPerimeter = numOfSquares / (this.c * 2 + this.r * 2);
    console.log(areaToPerimeter);
    let ratio;
    if (areaToPerimeter < 7) {
      ratio = 9 - areaToPerimeter / 2;
    } else {
      ratio = 10 - areaToPerimeter / 2;
    }
    const totalWallSquares = Math.round(numOfSquares / ratio);
    const num1 = Math.round(numOfSquares / 100);
    const num2 = Math.round(numOfSquares / 20);
    let addedWallSquares = 0;
    while (addedWallSquares < totalWallSquares) {
      let length = randomInt(num1, num2);
      let startPos = randomInt(this.c + 2, numOfSquares - this.c - 2);
      let generatingWall = true;
      let possMoves = [
        -this.c,
        -1,
        +1,
        this.c,
        this.c + 1,
        -this.c + 1,
        -this.c - 1,
        this.c - 1,
      ];
      for (let i = 0; i < length; i++) {
        if (generatingWall) {
          let moveNum = randomInt(0, 3);
          startPos += possMoves[moveNum];
          let empty = true;
          try {
            if (squareObjs[startPos].color === this.emptyColor) {
              for (let j = 0; j < possMoves.length; j++) {
                if (j !== moveNum) {
                  if (
                    squareObjs[startPos + possMoves[j]].color !==
                    this.emptyColor
                  ) {
                    empty = false;
                  }
                }
              }
            } else {
              empty = false;
            }

            if (empty) {
              squareObjs[startPos].changeColor(this.wallColor);
              addedWallSquares += 1;
            } else {
              generatingWall = false;
            }
          } catch {
            generatingWall = false;
          }
        }
      }
    }
  }
}

class Player {
  constructor(GridObj, CoinText) {
    this.x = Math.floor(GridObj.c / 2);
    this.y = Math.floor(GridObj.r / 2);
    this.color = "#ff3366";
    this.enemyColor = "#00b4d8";
    this.coinColor = "#ffc857";
    this.coinsCollected = 0;
    this.enemiesKilled = 0;
    this.divIndex;
    this.direction = "up";
    this.BulletObjs = [];
    this.GridObj = GridObj;
  }

  findSquare(squareObjs) {
    for (let i = 0; i < squareObjs.length; i++) {
      if (squareObjs[i].y === this.y && squareObjs[i].x === this.x) {
        squareObjs[i].changeColor(this.color);
        this.divIndex = i;
      }
    }
  }
  kill() {
    window.location.href = "gameOver.html";
  }

  moveRight(squareObjs) {
    if (
      squareObjs[this.divIndex + 1].color === "#26313b" ||
      squareObjs[this.divIndex + 1].color === this.coinColor
    ) {
      squareObjs[this.divIndex].changeColor("#26313b");
      this.divIndex += 1;
      if (squareObjs[this.divIndex].color === this.coinColor) {
        this.collectCoin();
      }
      squareObjs[this.divIndex].changeColor(this.color);
      this.direction = "right";
    } else if (squareObjs[this.divIndex + 1].color === this.enemyColor) {
      this.kill();
    }
  }
  moveLeft(squareObjs) {
    if (
      squareObjs[this.divIndex - 1].color === "#26313b" ||
      squareObjs[this.divIndex - 1].color === this.coinColor
    ) {
      squareObjs[this.divIndex].changeColor("#26313b");
      this.divIndex -= 1;
      if (squareObjs[this.divIndex].color === this.coinColor) {
        this.collectCoin();
      }
      squareObjs[this.divIndex].changeColor(this.color);
      this.direction = "left";
    } else if (squareObjs[this.divIndex - 1].color === this.enemyColor) {
      this.kill();
    }
  }
  moveUp(squareObjs) {
    if (
      squareObjs[this.divIndex - this.GridObj.c].color === "#26313b" ||
      squareObjs[this.divIndex - this.GridObj.c].color === this.coinColor
    ) {
      squareObjs[this.divIndex].changeColor("#26313b");
      this.divIndex -= this.GridObj.c;
      if (squareObjs[this.divIndex].color === this.coinColor) {
        this.collectCoin();
      }
      squareObjs[this.divIndex].changeColor(this.color);
      this.direction = "up";
    } else if (
      squareObjs[this.divIndex - this.GridObj.c].color === this.enemyColor
    ) {
      this.kill();
    }
  }
  moveDown(squareObjs) {
    if (
      squareObjs[this.divIndex + this.GridObj.c].color === "#26313b" ||
      squareObjs[this.divIndex + this.GridObj.c].color === this.coinColor
    ) {
      squareObjs[this.divIndex].changeColor("#26313b");
      this.divIndex += this.GridObj.c;
      if (squareObjs[this.divIndex].color === this.coinColor) {
        this.collectCoin();
      }
      squareObjs[this.divIndex].changeColor(this.color);
      this.direction = "down";
    } else if (
      squareObjs[this.divIndex + this.GridObj.c].color === this.enemyColor
    ) {
      this.kill();
    }
  }

  collectCoin() {
    this.coinsCollected += 1;
    CoinText.update(this.coinsCollected);
    checkFinish(this);
  }

  killEnemy() {
    this.enemiesKilled += 1;
    EnemyText.update(this.enemiesKilled);
    checkFinish(this);
  }

  shoot() {
    var BulletObj = new Bullet(
      this.direction,
      this.divIndex,
      this.GridObj.c,
      this.GridObj.r
    );
    BulletObj.add(this.GridObj.c, this.GridObj.r);
    this.BulletObjs.push(BulletObj);
  }
}

class Square {
  constructor(div, x, y) {
    this.div = div;
    this.color = "#26313b";
    this.x = x;
    this.y = y;
  }
  changeColor(color) {
    this.div.style.backgroundColor = color;
    this.color = color;
  }
}

class UIText {
  constructor(element, text, total) {
    this.element = element;
    this.text = text;
    this.total = total;
  }
  update(num) {
    this.element.innerText = this.text + String(num) + "/" + String(this.total);
  }
}

function checkKey(e) {
  if (e.code == "KeyW") {
    PlayerObj.moveUp(squareObjs);
  } else if (e.code == "KeyA") {
    PlayerObj.moveLeft(squareObjs);
  } else if (e.code == "KeyS") {
    PlayerObj.moveDown(squareObjs);
  } else if (e.code == "KeyD") {
    PlayerObj.moveRight(squareObjs);
  } else if (e.code == "Space") {
    PlayerObj.shoot();
  }
}

function addInteractiveSquares(GridObj, squareObjs, interactiveObjs, ObjType) {
  const numOfSquares = GridObj.r * GridObj.c;
  const num = Math.round(numOfSquares / 75);
  let Obj;
  for (let i = 0; i < num; i++) {
    if (ObjType === Coin) {
      Obj = new Coin(GridObj, PlayerObj);
    } else if (ObjType === Enemy) {
      Obj = new Enemy(GridObj, PlayerObj);
    }
    Obj.findSquare(squareObjs);
    interactiveObjs.push(Obj);
  }
  return interactiveObjs;
}

function moveEnemies(squareObjs, enemiesObjs) {
  for (let i = 0; i < enemiesObjs.length; i++) {
    enemiesObjs[i].move(squareObjs);
  }
}

function moveBullets(PlayerObj, squareObjs, GridObj) {
  for (let i = 0; i < PlayerObj.BulletObjs.length; i++) {
    PlayerObj.BulletObjs[i].move();
    PlayerObj.BulletObjs[i].checkKill(
      squareObjs,
      GridObj.c,
      GridObj.r,
      enemiesObjs
    );
  }
}

function deleteBullets(PlayerObj) {
  const body = document.getElementsByTagName("body")[0];
  const maxWidth = body.offsetWidth;
  const maxHeight = body.offsetHeight;
  for (let i = 0; i < PlayerObj.BulletObjs.length; i++) {
    if (
      PlayerObj.BulletObjs[i].x < 0 ||
      PlayerObj.BulletObjs[i].x > maxWidth ||
      PlayerObj.BulletObjs[i].y < 0 ||
      PlayerObj.BulletObjs[i].y > maxHeight
    ) {
      const container = document.getElementById("bulletContainer");
      container.removeChild(PlayerObj.BulletObjs[i].bulletDiv);
      PlayerObj.BulletObjs.splice(i, 1);
    }
  }
}

function checkFinish(PlayerObj) {
  if (
    PlayerObj.coinsCollected === totalCoins &&
    PlayerObj.enemiesKilled === totalEnemies
  ) {
    window.location.href = "win.html";
  }
}

let squareObjs = [];
let coinObjs = [];
let enemiesObjs = [];
var GridObj = new Grid();
GridObj.setup();
GridObj.create(squareObjs);

const PlayerObj = new Player(GridObj);
PlayerObj.findSquare(squareObjs);

enemiesObjs = addInteractiveSquares(GridObj, squareObjs, enemiesObjs, Enemy);
coinObjs = addInteractiveSquares(GridObj, squareObjs, coinObjs, Coin);

let totalCoins = coinObjs.length;
let totalEnemies = enemiesObjs.length;

const CoinText = new UIText(
  document.getElementById("coinCount"),
  "Coins collected: ",
  totalCoins
);
CoinText.update(0);
const EnemyText = new UIText(
  document.getElementById("killCount"),
  "Enemies killed: ",
  totalEnemies
);
EnemyText.update(0);

GridObj.addWalls(squareObjs);

const moveE = setInterval(function () {
  moveEnemies(squareObjs, enemiesObjs);
}, 500);

const moveB = setInterval(function () {
  moveBullets(PlayerObj, squareObjs, GridObj);
}, 5);

const deleteB = setInterval(function () {
  deleteBullets(PlayerObj);
}, 5);

window.addEventListener("keydown", checkKey);
