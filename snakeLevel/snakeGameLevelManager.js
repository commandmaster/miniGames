import { MonoBehaviour } from "../sketch.js";

export default class SnakeGameLevelManager{
    constructor(p5Var, gameEngine, levelName){
      this.p5 = p5Var;
      this.gameEngine = gameEngine;
      this.levelName = levelName;
    }

    Start(){
      this.gameOver = false;
      this.dificultyChosen = false;

      this.squareSize = 25;
      this.spacing = 5;
      this.startingPos = this.p5.createVector(0, 0);
      this.pieceQueue = 0;
      
      this.pieces = [];
      this.direction = this.p5.createVector(1, 0);
      this.dificulty = 1;
      
      this.endPos = this.p5.createVector(Math.min(this.gameEngine.screenWidth, this.gameEngine.screenHeight), Math.min(this.gameEngine.screenWidth, this.gameEngine.screenHeight));
      
      this.timeSinceLastMove = 0;

      this.gameEngine.inputSystem.addKeyboardInput('snakeUp', 'w', 'bool')
      this.gameEngine.inputSystem.addKeyboardInput('snakeDown', 's', 'bool')
      this.gameEngine.inputSystem.addKeyboardInput('snakeLeft', 'a', 'bool')
      this.gameEngine.inputSystem.addKeyboardInput('snakeRight', 'd', 'bool')
      this.gameEngine.inputSystem.addKeyboardInput('restart', 'r', 'bool')

      this.gameEngine.inputSystem.addBindToKeyboardInput('snakeUp', 38)
      this.gameEngine.inputSystem.addBindToKeyboardInput('snakeDown', 40)
      this.gameEngine.inputSystem.addBindToKeyboardInput('snakeLeft', 37)
      this.gameEngine.inputSystem.addBindToKeyboardInput('snakeRight', 39)
      this.gameEngine.inputSystem.addBindToKeyboardInput('restart', 82)

      this.gameEngine.inputSystem.addKeyboardInput('menu', 'm', 'bool')
      this.gameEngine.inputSystem.addBindToKeyboardInput('menu', 77)

      
      this.grid = [];
      let indexX = 0; 
      for (let i = this.startingPos.x; i < this.endPos.x - this.squareSize; i += this.squareSize + this.spacing) {
        this.grid.push([]);
        let indexY = 0; 
        for (let j = this.startingPos.y; j < this.endPos.y - this.squareSize; j += this.squareSize + this.spacing) {
          
          if (j > (this.endPos.y - this.squareSize) - (this.squareSize + this.spacing) || j < this.startingPos.y + this.squareSize + this.spacing || i > (this.endPos.x - this.squareSize) - (this.squareSize + this.spacing) || i < this.startingPos.x + this.squareSize + this.spacing){
            this.grid[indexX].push(1);
          }


          else{
            this.grid[indexX].push(0);
          }
          
          indexY++; 
        }

        indexX++; 
      }

      this.score = 3;
      this.pieces.push({x: 3, y: 3, direction: this.p5.createVector(1, 0)});
      this.pieces.push({x: 2, y: 3, direction: this.p5.createVector(1, 0)});
      this.pieces.push({x: 1, y: 3, direction: this.p5.createVector(1, 0)});
      

      this.spawnApple();
      this.spawnApple();
      this.spawnApple();
      

      this.scoreTxt = this.p5.createButton("Score: " + this.score);
      this.scoreTxt.position(25, 25);
      this.scoreTxt.style("font-size", String(48 * this.gameEngine.screenHeight/1440) + "px");
      this.scoreTxt.style("font-family", "Pixelo, Arial");
      this.scoreTxt.style("background-color", "transparent");
      this.scoreTxt.style("border", "none");
      this.scoreTxt.style("color", "#00ff00");
      this.scoreTxt.style("outline", "none");
      this.scoreTxt.style("z-index", "1000");
    }

    Update(){
      if (!this.dificultyChosen){
        while (true){
          let dificulty = prompt("Choose a dificulty between 1 and 3");
          if (dificulty === "1" || dificulty === "2" || dificulty === "3"){
            this.dificulty = Number(dificulty);
            this.dificultyChosen = true;
            break;
          }
        }
        return;
      }


      if (this.gameOver){
        if (!this.gOverTxt || !this.restTxt || !this.scoreTxt){
          this.gOverTxt = this.p5.createButton("Game Over");
          this.gOverTxt.style("font-size", String(256 * this.gameEngine.screenHeight/1440) + "px");
          this.gOverTxt.style("font-family", "Pixelo, Arial");
          this.gOverTxt.size(this.gameEngine.screenWidth, this.gOverTxt.size().height)
          this.gOverTxt.position(this.gameEngine.screenWidth/2 - this.gOverTxt.size().width/2, this.gameEngine.screenHeight/2 - 750 * this.gameEngine.screenHeight/1440);
          this.gOverTxt.style("background-color", "transparent");
          this.gOverTxt.style("border", "none");
          this.gOverTxt.style("color", "#00ff00");
          this.gOverTxt.style("outline", "none");
          this.gOverTxt.style("z-index", "1000");

          this.restTxt = this.p5.createButton("Press R to restart");
          this.restTxt.style("font-size", String(64 * this.gameEngine.screenHeight/1440) + "px");
          this.restTxt.size(this.gameEngine.screenWidth, this.restTxt.size().height)
          this.restTxt.style("font-family", "Pixelo, Arial");
          this.restTxt.position(this.gameEngine.screenWidth/2 - this.restTxt.size().width/2, this.gameEngine.screenHeight/2 - 250 * this.gameEngine.screenHeight/1440);
          this.restTxt.style("background-color", "transparent");
          this.restTxt.style("border", "none");
          this.restTxt.style("color", "#00ff00");
          this.restTxt.style("outline", "none");
          this.restTxt.style("z-index", "1000");

          this.menuTxt = this.p5.createButton("Press M to go back to the menu");
          this.menuTxt.style("font-size", String(64 * this.gameEngine.screenHeight/1440) + "px");
          this.menuTxt.size(this.gameEngine.screenWidth, this.menuTxt.size().height)
          this.menuTxt.style("font-family", "Pixelo, Arial");
          this.menuTxt.position(this.gameEngine.screenWidth/2 - this.menuTxt.size().width/2, this.gameEngine.screenHeight/2 - 100 * this.gameEngine.screenHeight/1440);
          this.menuTxt.style("background-color", "transparent");
          this.menuTxt.style("border", "none");
          this.menuTxt.style("color", "#00ff00");
          this.menuTxt.style("outline", "none");
          this.menuTxt.style("z-index", "1000");


          
        }

        if (this.p5.getItem("snakeHighScore") === null){
          this.p5.storeItem("snakeHighScore", this.score);
        }

        else if (this.score > Number(this.p5.getItem("snakeHighScore"))){
          this.p5.storeItem("snakeHighScore", this.score);
        }

        this.scoreTxt.value("Score " + String(this.score) + " High Score " + this.p5.getItem("snakeHighScore"));
        this.scoreTxt.html("Score " + String(this.score) + " High Score " + this.p5.getItem("snakeHighScore"));
        this.scoreTxt.position(this.gameEngine.screenWidth/2 - this.scoreTxt.size().width/2, this.gameEngine.screenHeight/2 + 100  * this.gameEngine.screenHeight/1440);

        if (this.gameEngine.inputSystem.getInputDown("restart")){
          this.gameEngine.loadLevel("snakeGameLevel", "snakeGameLevelManager");
        }

        if (this.gameEngine.inputSystem.getInputDown("menu")){
          this.gameEngine.loadLevel("titleScreen", "titleLevelManager");
        }
        
        return;
      }
        
      

      this.timeSinceLastMove += this.p5.deltaTime;

      if (!this.gameOver){
        if (this.gameEngine.inputSystem.getInputDown("snakeUp")){
          if (this.pieces[0].direction.y !== 1){
            this.direction = this.p5.createVector(0, -1);
          }

        }

        if (this.gameEngine.inputSystem.getInputDown("snakeDown")){
            if (this.pieces[0].direction.y !== -1){
              this.direction = this.p5.createVector(0, 1);
            }

        }

        if (this.gameEngine.inputSystem.getInputDown("snakeLeft")){
            if (this.pieces[0].direction.x !== 1){
              this.direction = this.p5.createVector(-1, 0);
            }

        }

        if (this.gameEngine.inputSystem.getInputDown("snakeRight")){
            if (this.pieces[0].direction.x !== -1){
              this.direction = this.p5.createVector(1, 0);
            } 

        }

        if (this.timeSinceLastMove > 200){
          if (this.pieceQueue > 0){
            this.createPiece()
            this.pieceQueue--;
          }

          this.timeSinceLastMove = 0;
          this.updatePieces();
        }
      }

      else{
        
      }
      
      
      
      this.drawGrid();
      
      this.scoreTxt.value("Score " + String(this.score));
      this.scoreTxt.html("Score " + String(this.score));
    }

    updatePieces(){
      this.grid[this.pieces[this.pieces.length - 1].x][this.pieces[this.pieces.length - 1].y] = 0;
      for (let i = this.pieces.length - 1; i >= 0; i--) {
        if (i > 0){
          this.pieces[i].x = this.pieces[i - 1].x;
          this.pieces[i].y = this.pieces[i - 1].y;
          this.pieces[i].direction = this.pieces[i - 1].direction;
          this.grid[this.pieces[i].x][this.pieces[i].y] = 3;
        }

        else if (i === 0){
          this.pieces[i].x += this.direction.x;
          this.pieces[i].y += this.direction.y;
          this.pieces[i].direction = this.direction;

          if (this.grid[this.pieces[i].x][this.pieces[i].y] === 1){
            console.log("Game Over");
            this.gameOver = true;
            return;
          }

          else if (this.grid[this.pieces[i].x][this.pieces[i].y] === 2){
            this.score += 4 - this.dificulty;
            this.grid[this.pieces[i].x][this.pieces[i].y] = 3;
            
            
            this.pieceQueue += 4 - this.dificulty;
            

            this.spawnApple();
            
          }

          else if (this.grid[this.pieces[i].x][this.pieces[i].y] === 3){
            this.gameOver = true;
            console.log("Game Over");
            return;
          }

          else if (this.grid[this.pieces[i].x][this.pieces[i].y] === 0){
            this.grid[this.pieces[i].x][this.pieces[i].y] = 3;
          }
          
        }
      }
    
    }

    createPiece(){
      this.pieces.push({x:this.pieces[this.pieces.length - 1].x - this.pieces[this.pieces.length - 1].direction.x, y:this.pieces[this.pieces.length - 1].y - this.pieces[this.pieces.length - 1].direction.y, direction: this.pieces[this.pieces.length - 1].direction});
    }

    spawnApple(){
      let x = Math.floor(Math.random() * this.grid.length);
      let y = Math.floor(Math.random() * this.grid[0].length);
      if (this.grid[x][y] === 0){
        this.grid[x][y] = 2;
      }

      else{
        this.spawnApple();
      }
    }


    drawGrid(){
      this.p5.push();
      this.p5.noStroke();
      for (let i = 0; i < this.grid.length; i++) {
        for (let j = 0; j < this.grid[i].length; j++) {
          if (this.grid[i][j] === 1){
            this.p5.drawingContext.shadowBlur = 17;
            this.p5.drawingContext.shadowColor = this.p5.color(255, 255, 255);
            this.p5.fill(255, 255, 255);
            this.p5.rect(i * (this.squareSize + this.spacing), j * (this.squareSize + this.spacing), this.squareSize, this.squareSize);
          }

          else if (this.grid[i][j] === 3){
            this.p5.drawingContext.shadowBlur = 12;
            this.p5.drawingContext.shadowColor = this.p5.color(0, 255, 0);
            this.p5.fill(0, 255, 0);
            this.p5.rect(i * (this.squareSize + this.spacing), j * (this.squareSize + this.spacing), this.squareSize, this.squareSize);
          }

          else if (this.grid[i][j] === 2){
            this.p5.drawingContext.shadowBlur = 17;
            this.p5.drawingContext.shadowColor = this.p5.color(255, 0, 0);
            this.p5.fill(255, 0, 0);
            this.p5.rect(i * (this.squareSize + this.spacing), j * (this.squareSize + this.spacing), this.squareSize, this.squareSize);
          }
        }
      }

      this.p5.pop();

      
    }
  

    End(){
      this.scoreTxt.remove();
      this.gOverTxt.remove();
      this.restTxt.remove();
      this.menuTxt.remove();
    }

    
  }



  